import type { Badge, Level } from '@/types';

// 레벨 시스템 (1-21+)
export const levels: Level[] = [
  { level: 1, title: '새싹 봉사자', minExp: 0, maxExp: 100, benefits: ['기본 서비스 이용'] },
  { level: 2, title: '풀잎 봉사자', minExp: 100, maxExp: 250, benefits: ['프로필 꾸미기'] },
  { level: 3, title: '나무 봉사자', minExp: 250, maxExp: 500, benefits: ['우선 매칭 +5%'] },
  { level: 4, title: '숲 봉사자', minExp: 500, maxExp: 800, benefits: ['보너스 크레딧 +5%'] },
  { level: 5, title: '산 봉사자', minExp: 800, maxExp: 1200, benefits: ['전용 뱃지 획득'] },
  { level: 6, title: '구름 봉사자', minExp: 1200, maxExp: 1700, benefits: ['우선 매칭 +10%'] },
  { level: 7, title: '하늘 봉사자', minExp: 1700, maxExp: 2300, benefits: ['특별 프로그램 참여'] },
  { level: 8, title: '별 봉사자', minExp: 2300, maxExp: 3000, benefits: ['보너스 크레딧 +10%'] },
  { level: 9, title: '달 봉사자', minExp: 3000, maxExp: 3800, benefits: ['멘토 자격 부여'] },
  { level: 10, title: '태양 봉사자', minExp: 3800, maxExp: 4700, benefits: ['VIP 가맹점 할인'] },
  { level: 11, title: '은하 봉사자', minExp: 4700, maxExp: 5700, benefits: ['우선 매칭 +15%'] },
  { level: 12, title: '우주 봉사자', minExp: 5700, maxExp: 6800, benefits: ['특별 이벤트 초대'] },
  { level: 13, title: 'DMZ 수호자', minExp: 6800, maxExp: 8000, benefits: ['보너스 크레딧 +15%'] },
  { level: 14, title: '평화 전도사', minExp: 8000, maxExp: 9300, benefits: ['연천 홍보대사'] },
  { level: 15, title: '연천 영웅', minExp: 9300, maxExp: 10700, benefits: ['군수 표창장'] },
  { level: 16, title: '전설의 봉사자', minExp: 10700, maxExp: 12200, benefits: ['우선 매칭 +20%'] },
  { level: 17, title: '불멸의 봉사자', minExp: 12200, maxExp: 13800, benefits: ['VIP 전용 혜택'] },
  { level: 18, title: '신화의 봉사자', minExp: 13800, maxExp: 15500, benefits: ['보너스 크레딧 +20%'] },
  { level: 19, title: '최강 봉사자', minExp: 15500, maxExp: 17300, benefits: ['명예의 전당 등재'] },
  { level: 20, title: '궁극의 봉사자', minExp: 17300, maxExp: 19200, benefits: ['모든 혜택 적용'] },
  { level: 21, title: '타임뱅크 마스터', minExp: 19200, maxExp: Infinity, benefits: ['전설 뱃지 획득', '특별 칭호'] },
];

// 뱃지 시스템 (30개)
export const badges: Badge[] = [
  // 초보자 뱃지 (common)
  {
    id: 'first-service',
    name: '첫 발자국',
    description: '첫 번째 봉사 활동을 완료했습니다',
    icon: '👣',
    category: 'beginner',
    requirement: '봉사 1회 완료',
    rarity: 'common',
  },
  {
    id: 'first-credit',
    name: '첫 수확',
    description: '첫 번째 크레딧을 적립했습니다',
    icon: '🌱',
    category: 'beginner',
    requirement: '크레딧 1TC 적립',
    rarity: 'common',
  },
  {
    id: 'profile-complete',
    name: '자기소개',
    description: '프로필을 100% 완성했습니다',
    icon: '📝',
    category: 'beginner',
    requirement: '프로필 완성',
    rarity: 'common',
  },
  {
    id: 'first-program',
    name: '배움의 시작',
    description: '첫 프로그램에 참여했습니다',
    icon: '📚',
    category: 'beginner',
    requirement: '프로그램 1회 참여',
    rarity: 'common',
  },

  // 전문가 뱃지 (rare)
  {
    id: 'digital-helper',
    name: '디지털 도우미',
    description: '디지털 교육 봉사 10회 달성',
    icon: '💻',
    category: 'expert',
    requirement: '디지털 봉사 10회',
    rarity: 'rare',
  },
  {
    id: 'farm-helper',
    name: '농사 도우미',
    description: '농사 봉사 10회 달성',
    icon: '🌾',
    category: 'expert',
    requirement: '농사 봉사 10회',
    rarity: 'rare',
  },
  {
    id: 'health-helper',
    name: '건강 지킴이',
    description: '건강 돌봄 봉사 10회 달성',
    icon: '❤️',
    category: 'expert',
    requirement: '건강 봉사 10회',
    rarity: 'rare',
  },
  {
    id: 'living-helper',
    name: '생활 도우미',
    description: '생활 지원 봉사 10회 달성',
    icon: '🏠',
    category: 'expert',
    requirement: '생활 봉사 10회',
    rarity: 'rare',
  },
  {
    id: 'transport-helper',
    name: '이동 천사',
    description: '이동 지원 봉사 10회 달성',
    icon: '🚗',
    category: 'expert',
    requirement: '이동 봉사 10회',
    rarity: 'rare',
  },
  {
    id: 'all-rounder',
    name: '만능 봉사자',
    description: '모든 카테고리 봉사 완료',
    icon: '🌟',
    category: 'expert',
    requirement: '5개 카테고리 봉사',
    rarity: 'rare',
  },

  // 특별 뱃지 (epic)
  {
    id: 'week-streak',
    name: '일주일 연속',
    description: '7일 연속 봉사 활동',
    icon: '🔥',
    category: 'special',
    requirement: '7일 연속 활동',
    rarity: 'epic',
  },
  {
    id: 'month-streak',
    name: '한 달 연속',
    description: '30일 연속 봉사 활동',
    icon: '💪',
    category: 'special',
    requirement: '30일 연속 활동',
    rarity: 'epic',
  },
  {
    id: 'hundred-hours',
    name: '100시간 달성',
    description: '총 100시간 봉사 달성',
    icon: '⏰',
    category: 'special',
    requirement: '100시간 봉사',
    rarity: 'epic',
  },
  {
    id: 'hundred-credits',
    name: '100 크레딧',
    description: '총 100 크레딧 적립',
    icon: '💰',
    category: 'special',
    requirement: '100TC 적립',
    rarity: 'epic',
  },
  {
    id: 'mentor',
    name: '멘토',
    description: '신규 회원 5명 멘토링',
    icon: '🎓',
    category: 'special',
    requirement: '멘토링 5회',
    rarity: 'epic',
  },
  {
    id: 'five-star',
    name: '별 다섯 개',
    description: '평균 평점 5점 유지 (10회 이상)',
    icon: '⭐',
    category: 'special',
    requirement: '평균 5점 (10회+)',
    rarity: 'epic',
  },

  // 전설 뱃지 (legendary)
  {
    id: 'founder',
    name: '창립 멤버',
    description: '타임뱅크 창립 멤버',
    icon: '🏅',
    category: 'special',
    requirement: '서비스 런칭 참여',
    rarity: 'legendary',
  },
  {
    id: 'dmz-peace',
    name: 'DMZ 평화 수호자',
    description: 'DMZ 지역 봉사 50회 달성',
    icon: '🕊️',
    category: 'special',
    requirement: 'DMZ 봉사 50회',
    rarity: 'legendary',
  },
  {
    id: 'thousand-hours',
    name: '천 시간의 기적',
    description: '총 1000시간 봉사 달성',
    icon: '👑',
    category: 'special',
    requirement: '1000시간 봉사',
    rarity: 'legendary',
  },
  {
    id: 'generation-bridge',
    name: '세대를 잇다',
    description: '세대 교류 프로그램 완주',
    icon: '🌈',
    category: 'special',
    requirement: '세대 교류 완주',
    rarity: 'legendary',
  },

  // 시즌 뱃지 (seasonal)
  {
    id: 'spring-farmer',
    name: '봄 농사꾼',
    description: '봄 농번기 봉사 참여',
    icon: '🌸',
    category: 'seasonal',
    requirement: '봄 농사 봉사',
    rarity: 'rare',
  },
  {
    id: 'summer-helper',
    name: '여름 일꾼',
    description: '여름 농번기 봉사 참여',
    icon: '☀️',
    category: 'seasonal',
    requirement: '여름 농사 봉사',
    rarity: 'rare',
  },
  {
    id: 'autumn-harvester',
    name: '가을 수확자',
    description: '가을 수확기 봉사 참여',
    icon: '🍂',
    category: 'seasonal',
    requirement: '가을 수확 봉사',
    rarity: 'rare',
  },
  {
    id: 'winter-warmer',
    name: '겨울 온기',
    description: '겨울 난방/제설 봉사 참여',
    icon: '❄️',
    category: 'seasonal',
    requirement: '겨울 봉사',
    rarity: 'rare',
  },
  {
    id: 'new-year',
    name: '새해 첫 봉사',
    description: '새해 첫 봉사 활동',
    icon: '🎊',
    category: 'seasonal',
    requirement: '1월 1일 봉사',
    rarity: 'epic',
  },
  {
    id: 'chuseok',
    name: '추석 효도',
    description: '추석 연휴 봉사 활동',
    icon: '🥮',
    category: 'seasonal',
    requirement: '추석 봉사',
    rarity: 'epic',
  },

  // 어르신 전용 뱃지
  {
    id: 'wisdom-sharer',
    name: '지혜 나눔이',
    description: '전통 지혜를 나눠주셨습니다',
    icon: '🧓',
    category: 'expert',
    requirement: '지혜 공유 5회',
    rarity: 'rare',
  },
  {
    id: 'community-elder',
    name: '마을 어른',
    description: '마을 공동체의 기둥',
    icon: '🏘️',
    category: 'special',
    requirement: '커뮤니티 활동 20회',
    rarity: 'epic',
  },
  {
    id: 'digital-master',
    name: '디지털 달인',
    description: '어르신 디지털 교육 수료',
    icon: '📱',
    category: 'special',
    requirement: '디지털 교육 완료',
    rarity: 'rare',
  },
  {
    id: 'story-teller',
    name: '이야기꾼',
    description: '옛날이야기 10회 공유',
    icon: '📖',
    category: 'expert',
    requirement: '이야기 공유 10회',
    rarity: 'rare',
  },
];

// 레벨 계산 헬퍼
export function getLevelByExp(exp: number): Level {
  for (let i = levels.length - 1; i >= 0; i--) {
    if (exp >= levels[i].minExp) {
      return levels[i];
    }
  }
  return levels[0];
}

// 다음 레벨까지 필요한 경험치
export function getExpToNextLevel(exp: number): number {
  const currentLevel = getLevelByExp(exp);
  if (currentLevel.level === levels.length) {
    return 0; // 최고 레벨
  }
  return currentLevel.maxExp - exp;
}

// 레벨 진행률 (0-100)
export function getLevelProgress(exp: number): number {
  const currentLevel = getLevelByExp(exp);
  if (currentLevel.maxExp === Infinity) {
    return 100;
  }
  const levelExp = exp - currentLevel.minExp;
  const levelRange = currentLevel.maxExp - currentLevel.minExp;
  return Math.round((levelExp / levelRange) * 100);
}

// 뱃지 찾기
export function getBadgeById(id: string): Badge | undefined {
  return badges.find((b) => b.id === id);
}

// 희귀도별 뱃지
export function getBadgesByRarity(rarity: Badge['rarity']): Badge[] {
  return badges.filter((b) => b.rarity === rarity);
}

// 카테고리별 뱃지
export function getBadgesByCategory(category: Badge['category']): Badge[] {
  return badges.filter((b) => b.category === category);
}

// 희귀도 색상
export const rarityColors: Record<Badge['rarity'], string> = {
  common: 'bg-gray-100 text-gray-800',
  rare: 'bg-blue-100 text-blue-800',
  epic: 'bg-purple-100 text-purple-800',
  legendary: 'bg-amber-100 text-amber-800',
};

// 리더보드 데이터 생성
export function generateLeaderboard(users: { id: string; name: string; totalHours: number; role: string }[]) {
  return users
    .filter((u) => u.role === 'soldier')
    .sort((a, b) => b.totalHours - a.totalHours)
    .slice(0, 10)
    .map((user, index) => ({
      rank: index + 1,
      ...user,
    }));
}
