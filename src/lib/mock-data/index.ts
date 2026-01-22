// Mock Data Index
export * from './users';
export * from './services';
export * from './transactions';
export * from './programs';
export * from './stores';
export * from './gamification';

// Dashboard Stats 생성
import { allUsers, soldierUsers, seniorUsers } from './users';
import { mockServices, completedServices } from './services';
import { mockTransactions, getDailyStats } from './transactions';
import { levels, getLevelByExp, badges, getBadgeById } from './gamification';
import type { Activity, DashboardStats } from '@/types';

// 대시보드 통계
export function getDashboardStats(): DashboardStats {
  const totalCredits = mockTransactions
    .filter((t) => t.type === 'earn' || t.type === 'bonus')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalHours = completedServices.reduce((sum, s) => sum + s.estimatedHours, 0);
  const totalUsers = allUsers.length;
  const totalMatches = mockServices.filter(
    (s) => s.status === 'matched' || s.status === 'in_progress' || s.status === 'completed'
  ).length;

  const weeklyData = getDailyStats(7).map((d) => ({
    day: d.day,
    hours: Math.floor(Math.random() * 50) + 10,
    credits: d.earned,
  }));

  // 최근 활동 생성
  const recentActivities: Activity[] = [];

  // 최근 완료된 서비스에서 활동 생성
  completedServices.slice(0, 5).forEach((service, i) => {
    const provider = soldierUsers.find((u) => u.id === service.providerId);
    if (provider) {
      recentActivities.push({
        id: `activity-service-${i}`,
        type: 'service_completed',
        userId: provider.id,
        userName: provider.name,
        userRole: 'soldier',
        description: `${service.title} 봉사를 완료했습니다`,
        timestamp: service.completedAt || new Date().toISOString(),
      });
    }
  });

  // 크레딧 적립 활동
  mockTransactions
    .filter((t) => t.type === 'earn')
    .slice(0, 3)
    .forEach((tx, i) => {
      recentActivities.push({
        id: `activity-credit-${i}`,
        type: 'credit_earned',
        userId: tx.toUserId,
        userName: tx.toUserName,
        userRole: 'soldier',
        description: `${tx.amount} TC를 적립했습니다`,
        timestamp: tx.timestamp,
      });
    });

  // 정렬 후 반환
  recentActivities.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return {
    totalCredits,
    totalHours,
    totalUsers,
    totalMatches,
    weeklyData,
    recentActivities: recentActivities.slice(0, 10),
  };
}

// 사용자 요약 정보
export function getUserSummary(userId: string) {
  const user = allUsers.find((u) => u.id === userId);
  if (!user) return null;

  const userTransactions = mockTransactions.filter(
    (t) => t.toUserId === userId || t.fromUserId === userId
  );

  const earnedCredits = userTransactions
    .filter((t) => t.toUserId === userId && (t.type === 'earn' || t.type === 'bonus'))
    .reduce((sum, t) => sum + t.amount, 0);

  const spentCredits = userTransactions
    .filter((t) => t.fromUserId === userId && t.type === 'spend')
    .reduce((sum, t) => sum + t.amount, 0);

  const userServices = mockServices.filter(
    (s) => s.providerId === userId || s.requesterId === userId
  );

  const level = getLevelByExp(user.experience);

  const userBadges = user.badges.map((id) => getBadgeById(id)).filter(Boolean);

  return {
    ...user,
    earnedCredits,
    spentCredits,
    balance: earnedCredits - spentCredits,
    servicesCompleted: userServices.filter((s) => s.status === 'completed').length,
    servicesInProgress: userServices.filter(
      (s) => s.status === 'matched' || s.status === 'in_progress'
    ).length,
    level,
    badgeDetails: userBadges,
  };
}

// 매칭 추천
export function getRecommendedMatches(userId: string, limit: number = 5) {
  const user = allUsers.find((u) => u.id === userId);
  if (!user || user.role !== 'soldier') return [];

  const pendingServices = mockServices.filter((s) => s.status === 'pending');

  return pendingServices
    .map((service) => {
      // 간단한 매칭 점수 계산
      let score = 50;

      // 스킬 매칭
      if (user.skills) {
        const skillMatch = user.skills.some((skill) =>
          service.title.includes(skill) || service.description.includes(skill)
        );
        if (skillMatch) score += 30;
      }

      // 위치 근접성 (랜덤 시뮬레이션)
      score += Math.floor(Math.random() * 20);

      return {
        service,
        score,
        matchReasons: score > 70 ? ['스킬 매칭', '위치 근접'] : ['위치 근접'],
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
