import type { User } from '@/types';

// 군인 목업 데이터 (30명)
export const soldierUsers: User[] = Array.from({ length: 30 }, (_, i) => ({
  id: `soldier-${i + 1}`,
  name: [
    '김태현', '이준호', '박성민', '정우진', '최현우',
    '강동훈', '윤재혁', '임시우', '한지훈', '오승민',
    '신동현', '조민준', '서준영', '송태양', '황민석',
    '전승우', '권도윤', '노현서', '백준혁', '안지호',
    '유승현', '장민재', '문태훈', '양동우', '고시현',
    '배진우', '홍성준', '남궁현', '공유진', '류승민',
  ][i],
  role: 'soldier',
  avatar: `/avatars/soldier-${(i % 10) + 1}.png`,
  email: `soldier${i + 1}@army.mil.kr`,
  phone: `010-${String(Math.floor(Math.random() * 9000 + 1000))}-${String(Math.floor(Math.random() * 9000 + 1000))}`,
  unit: ['제1사단', '제5사단', '제6사단', '제15사단', '제28사단'][i % 5],
  rank: ['이병', '일병', '상병', '병장'][Math.floor(i / 8)],
  skills: [
    ['컴퓨터 수리', 'MS Office', '스마트폰 교육'],
    ['SNS 활용', '영상 편집', '사진 촬영'],
    ['농기계 조작', '운전', '짐 나르기'],
    ['요리', '청소', '집 수리'],
    ['건강 관리', '운동 보조', '말벗'],
  ][i % 5],
  level: Math.floor(Math.random() * 15) + 1,
  experience: Math.floor(Math.random() * 5000),
  badges: ['first-service', 'digital-helper', 'week-streak'].slice(0, Math.floor(Math.random() * 3) + 1),
  totalCredits: Math.floor(Math.random() * 200) + 50,
  totalHours: Math.floor(Math.random() * 100) + 10,
  streak: Math.floor(Math.random() * 30),
  joinedAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
}));

// 어르신 목업 데이터 (15명)
export const seniorUsers: User[] = Array.from({ length: 15 }, (_, i) => ({
  id: `senior-${i + 1}`,
  name: [
    '김순자', '박말순', '이영순', '정복남', '최순희',
    '강명자', '윤옥자', '임분이', '한정숙', '오영자',
    '신순옥', '조복순', '서춘자', '송말자', '황정순',
  ][i],
  role: 'senior',
  avatar: `/avatars/senior-${(i % 5) + 1}.png`,
  phone: `010-${String(Math.floor(Math.random() * 9000 + 1000))}-${String(Math.floor(Math.random() * 9000 + 1000))}`,
  address: `경기도 연천군 ${['연천읍', '전곡읍', '청산면', '백학면', '미산면'][i % 5]} ${['중앙로', '전곡로', '청정로'][i % 3]} ${Math.floor(Math.random() * 200) + 1}`,
  age: Math.floor(Math.random() * 20) + 65,
  farmType: ['논농사', '밭농사', '과수원', '축산', '혼합'][i % 5],
  needs: [
    ['스마트폰 배우기', '농사일 도움'],
    ['컴퓨터 배우기', '짐 나르기'],
    ['은행 앱 사용', '병원 동행'],
    ['영상통화 배우기', '청소 도움'],
    ['카카오톡 배우기', '장보기 도움'],
  ][i % 5],
  level: Math.floor(Math.random() * 5) + 1,
  experience: Math.floor(Math.random() * 1000),
  badges: ['wisdom-sharer', 'community-elder'].slice(0, Math.floor(Math.random() * 2) + 1),
  totalCredits: Math.floor(Math.random() * 100) + 20,
  totalHours: Math.floor(Math.random() * 50) + 5,
  streak: Math.floor(Math.random() * 10),
  joinedAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
}));

// 관리자 목업 데이터 (5명)
export const adminUsers: User[] = [
  {
    id: 'admin-1',
    name: '김민정',
    role: 'admin',
    avatar: '/avatars/admin-1.png',
    email: 'admin1@yeoncheon.go.kr',
    phone: '031-839-2000',
    level: 99,
    experience: 99999,
    badges: ['admin', 'founder'],
    totalCredits: 0,
    totalHours: 0,
    streak: 0,
    joinedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'admin-2',
    name: '이상훈',
    role: 'admin',
    avatar: '/avatars/admin-2.png',
    email: 'admin2@yeoncheon.go.kr',
    phone: '031-839-2001',
    level: 99,
    experience: 99999,
    badges: ['admin'],
    totalCredits: 0,
    totalHours: 0,
    streak: 0,
    joinedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'admin-3',
    name: '박현주',
    role: 'admin',
    avatar: '/avatars/admin-3.png',
    email: 'admin3@yeoncheon.go.kr',
    phone: '031-839-2002',
    level: 99,
    experience: 99999,
    badges: ['admin'],
    totalCredits: 0,
    totalHours: 0,
    streak: 0,
    joinedAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'admin-4',
    name: '정수민',
    role: 'admin',
    avatar: '/avatars/admin-4.png',
    email: 'admin4@army.mil.kr',
    phone: '031-839-2003',
    level: 99,
    experience: 99999,
    badges: ['admin', 'military-liaison'],
    totalCredits: 0,
    totalHours: 0,
    streak: 0,
    joinedAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 'admin-5',
    name: '최영호',
    role: 'admin',
    avatar: '/avatars/admin-5.png',
    email: 'admin5@yeoncheon.go.kr',
    phone: '031-839-2004',
    level: 99,
    experience: 99999,
    badges: ['admin'],
    totalCredits: 0,
    totalHours: 0,
    streak: 0,
    joinedAt: '2024-03-01T00:00:00Z',
  },
];

// 모든 사용자
export const allUsers: User[] = [...soldierUsers, ...seniorUsers, ...adminUsers];

// 데모용 기본 사용자
export const demoSoldier = soldierUsers[0];
export const demoSenior = seniorUsers[0];
export const demoAdmin = adminUsers[0];

// 사용자 찾기 헬퍼
export const findUserById = (id: string): User | undefined =>
  allUsers.find((user) => user.id === id);

export const findUsersByRole = (role: User['role']): User[] =>
  allUsers.filter((user) => user.role === role);
