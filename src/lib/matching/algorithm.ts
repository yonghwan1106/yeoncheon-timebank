import type { Service, User, MatchResult } from '@/types';
import { soldierUsers } from '@/lib/mock-data/users';
import { pendingServices } from '@/lib/mock-data/services';

// 스킬-카테고리 매핑
const skillCategoryMap: Record<string, string[]> = {
  farming: ['농기계 조작', '운전', '짐 나르기', '농사일'],
  digital: ['컴퓨터 수리', 'MS Office', '스마트폰 교육', 'SNS 활용', '영상 편집'],
  living: ['요리', '청소', '집 수리', '장보기'],
  health: ['건강 관리', '운동 보조', '말벗', '병원 동행'],
  transport: ['운전', '차량 지원'],
};

// 거리 계산 (Haversine formula)
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // 지구 반경 (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 스킬 매칭 점수 (0-40)
function calculateSkillMatch(user: User, service: Service): number {
  if (!user.skills) return 10;

  const relevantSkills = skillCategoryMap[service.category] || [];
  const matchCount = user.skills.filter((skill) =>
    relevantSkills.some(
      (rs) => rs.includes(skill) || skill.includes(rs)
    )
  ).length;

  return Math.min(40, matchCount * 15 + 10);
}

// 거리 점수 (0-30)
function calculateDistanceScore(
  userLocation: string,
  serviceLocation: string
): number {
  // 같은 지역이면 최고 점수
  if (userLocation === serviceLocation) return 30;

  // 연천군 내 지역 거리 매핑 (시뮬레이션)
  const locationDistances: Record<string, Record<string, number>> = {
    연천읍: { 전곡읍: 10, 청산면: 15, 백학면: 12, 미산면: 20 },
    전곡읍: { 연천읍: 10, 청산면: 8, 백학면: 15, 미산면: 12 },
    청산면: { 연천읍: 15, 전곡읍: 8, 백학면: 10, 미산면: 8 },
    백학면: { 연천읍: 12, 전곡읍: 15, 청산면: 10, 미산면: 18 },
    미산면: { 연천읍: 20, 전곡읍: 12, 청산면: 8, 백학면: 18 },
  };

  const distance = locationDistances[userLocation]?.[serviceLocation] || 15;

  // 거리에 따른 점수 (가까울수록 높음)
  if (distance <= 5) return 28;
  if (distance <= 10) return 24;
  if (distance <= 15) return 18;
  if (distance <= 20) return 12;
  return 5;
}

// 경험 점수 (0-15)
function calculateExperienceScore(user: User): number {
  const completedServices = user.totalHours;
  if (completedServices >= 50) return 15;
  if (completedServices >= 30) return 12;
  if (completedServices >= 15) return 9;
  if (completedServices >= 5) return 6;
  return 3;
}

// 가용성 점수 (0-15)
function calculateAvailabilityScore(user: User): number {
  // 연속 활동 중인 사용자에게 가산점
  const streakBonus = Math.min(5, user.streak);
  const levelBonus = Math.min(10, user.level);
  return streakBonus + levelBonus;
}

// 매칭 알고리즘
export function calculateMatchScore(user: User, service: Service): MatchResult {
  const skillMatch = calculateSkillMatch(user, service);
  const distanceScore = calculateDistanceScore(
    user.unit || '연천읍',
    service.location
  );
  const experienceScore = calculateExperienceScore(user);
  const availabilityScore = calculateAvailabilityScore(user);

  const totalScore = skillMatch + distanceScore + experienceScore + availabilityScore;

  const matchReasons: string[] = [];
  if (skillMatch >= 25) matchReasons.push('스킬 일치');
  if (distanceScore >= 24) matchReasons.push('가까운 거리');
  if (experienceScore >= 12) matchReasons.push('풍부한 경험');
  if (availabilityScore >= 10) matchReasons.push('활발한 활동');

  return {
    serviceId: service.id,
    candidateId: user.id,
    candidateName: user.name,
    score: totalScore,
    matchReasons,
    skillMatch,
    availabilityMatch: availabilityScore,
  };
}

// 서비스에 대한 최적의 매칭 후보 찾기
export function findBestMatches(
  service: Service,
  limit: number = 5
): MatchResult[] {
  const candidates = soldierUsers
    .filter((u) => u.id !== service.requesterId)
    .map((user) => calculateMatchScore(user, service))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return candidates;
}

// 사용자에게 추천할 서비스 찾기
export function findRecommendedServices(
  user: User,
  limit: number = 5
): { service: Service; score: number; reasons: string[] }[] {
  if (user.role !== 'soldier') return [];

  const recommendations = pendingServices
    .map((service) => {
      const matchResult = calculateMatchScore(user, service);
      return {
        service,
        score: matchResult.score,
        reasons: matchResult.matchReasons,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return recommendations;
}

// AI 매칭 시뮬레이션 결과
export function simulateAIMatching(serviceId: string): {
  service: Service | undefined;
  matches: MatchResult[];
  processingTime: number;
  confidence: number;
} {
  const service = pendingServices.find((s) => s.id === serviceId);

  if (!service) {
    return {
      service: undefined,
      matches: [],
      processingTime: 0,
      confidence: 0,
    };
  }

  const startTime = Date.now();
  const matches = findBestMatches(service, 5);
  const processingTime = Date.now() - startTime + Math.random() * 100; // 시뮬레이션용 지연

  // 신뢰도 계산 (최고 점수 기반)
  const topScore = matches[0]?.score || 0;
  const confidence = Math.min(100, Math.round(topScore * 1.2));

  return {
    service,
    matches,
    processingTime,
    confidence,
  };
}
