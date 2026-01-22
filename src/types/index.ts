// 연천 타임뱅크 타입 정의

// 사용자 타입
export type UserRole = 'soldier' | 'senior' | 'admin' | 'merchant';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  email?: string;
  phone?: string;
  address?: string;
  // 군인 전용
  unit?: string; // 소속 부대
  rank?: string; // 계급
  skills?: string[]; // 보유 스킬
  // 어르신 전용
  age?: number;
  farmType?: string; // 농가 유형
  needs?: string[]; // 필요 도움
  // 게이미피케이션
  level: number;
  experience: number;
  badges: string[];
  totalCredits: number;
  totalHours: number;
  streak: number; // 연속 활동 일수
  joinedAt: string;
}

// 봉사 서비스 타입
export type ServiceCategory =
  | 'farming' // 농사
  | 'digital' // 디지털
  | 'living' // 생활
  | 'health' // 건강
  | 'transport'; // 이동

export type ServiceStatus =
  | 'pending' // 대기
  | 'matched' // 매칭됨
  | 'in_progress' // 진행 중
  | 'completed' // 완료
  | 'cancelled'; // 취소

export interface Service {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  status: ServiceStatus;
  credits: number; // 타임 크레딧
  estimatedHours: number;
  location: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  requesterId: string;
  requesterName: string;
  providerId?: string;
  providerName?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  completedAt?: string;
  rating?: number;
  review?: string;
  createdAt: string;
  tags?: string[];
}

// 트랜잭션 타입
export type TransactionType =
  | 'earn' // 적립
  | 'spend' // 사용
  | 'transfer' // 전송
  | 'bonus' // 보너스
  | 'refund'; // 환불

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  fromUserId?: string;
  fromUserName?: string;
  toUserId: string;
  toUserName: string;
  serviceId?: string;
  storeId?: string;
  description: string;
  blockHash?: string;
  timestamp: string;
}

// 블록체인 타입
export interface Block {
  index: number;
  timestamp: string;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  nonce: number;
}

// 프로그램 타입
export type ProgramCategory =
  | 'digital_education' // 디지털 할매·할배 학교
  | 'traditional_wisdom' // 전통 지혜 아카데미
  | 'physical_exchange' // 체력 품앗이단
  | 'generation_exchange'; // 세대 교류

export interface Program {
  id: string;
  title: string;
  description: string;
  category: ProgramCategory;
  image?: string;
  schedule: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  creditReward: number;
  instructorId?: string;
  instructorName?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  startDate: string;
  endDate?: string;
  participants?: string[];
}

// 가맹점 타입
export type StoreCategory =
  | 'pcroom' // PC방
  | 'cafe' // 카페
  | 'restaurant' // 식당
  | 'convenience' // 편의점
  | 'pharmacy' // 약국
  | 'other'; // 기타

export interface Store {
  id: string;
  name: string;
  category: StoreCategory;
  description?: string;
  image?: string;
  address: string;
  phone?: string;
  operatingHours: string;
  creditPolicy: string; // "100TC = 10,000원"
  discountRate?: number; // 할인율
  coordinates?: {
    lat: number;
    lng: number;
  };
  isActive: boolean;
}

// 뱃지 타입
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'beginner' | 'expert' | 'special' | 'seasonal';
  requirement: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// 레벨 타입
export interface Level {
  level: number;
  title: string;
  minExp: number;
  maxExp: number;
  benefits: string[];
}

// 매칭 결과 타입
export interface MatchResult {
  serviceId: string;
  candidateId: string;
  candidateName: string;
  score: number; // 0-100
  matchReasons: string[];
  distance?: number; // km
  skillMatch: number;
  availabilityMatch: number;
}

// 대시보드 통계 타입
export interface DashboardStats {
  totalCredits: number;
  totalHours: number;
  totalUsers: number;
  totalMatches: number;
  weeklyData: {
    day: string;
    hours: number;
    credits: number;
  }[];
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  type: 'service_completed' | 'credit_earned' | 'badge_earned' | 'level_up' | 'program_joined';
  userId: string;
  userName: string;
  userRole: UserRole;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// 알림 타입
export interface Notification {
  id: string;
  userId: string;
  type: 'match' | 'credit' | 'program' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

// 카테고리 아이콘 매핑
export const SERVICE_CATEGORY_ICONS: Record<ServiceCategory, string> = {
  farming: '🌾',
  digital: '💻',
  living: '🏠',
  health: '❤️',
  transport: '🚗',
};

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  farming: '농사 도움',
  digital: '디지털 지원',
  living: '생활 지원',
  health: '건강 돌봄',
  transport: '이동 지원',
};

export const STORE_CATEGORY_LABELS: Record<StoreCategory, string> = {
  pcroom: 'PC방',
  cafe: '카페',
  restaurant: '식당',
  convenience: '편의점',
  pharmacy: '약국',
  other: '기타',
};

export const PROGRAM_CATEGORY_LABELS: Record<ProgramCategory, string> = {
  digital_education: '디지털 할매·할배 학교',
  traditional_wisdom: '전통 지혜 아카데미',
  physical_exchange: '체력 품앗이단',
  generation_exchange: '세대 교류 프로그램',
};
