import type { Program, ProgramCategory } from '@/types';

export const mockPrograms: Program[] = [
  // 디지털 할매·할배 학교
  {
    id: 'program-1',
    title: '스마트폰 기초반',
    description: '스마트폰 기본 사용법부터 카카오톡, 사진 찍기까지 차근차근 배워봐요.',
    category: 'digital_education',
    image: '/programs/smartphone.jpg',
    schedule: '매주 화요일 10:00-12:00',
    location: '연천군 평생학습관 2층',
    maxParticipants: 20,
    currentParticipants: 18,
    creditReward: 2,
    instructorName: '김태현 병장',
    status: 'ongoing',
    startDate: '2025-01-07',
    endDate: '2025-03-25',
  },
  {
    id: 'program-2',
    title: '인터넷 뱅킹 마스터',
    description: '은행 앱 설치부터 송금, 공과금 납부까지 안전하게 배워요.',
    category: 'digital_education',
    image: '/programs/banking.jpg',
    schedule: '매주 목요일 14:00-16:00',
    location: '전곡읍 주민센터',
    maxParticipants: 15,
    currentParticipants: 15,
    creditReward: 2,
    instructorName: '이준호 상병',
    status: 'ongoing',
    startDate: '2025-01-09',
    endDate: '2025-02-27',
  },

  // 전통 지혜 아카데미
  {
    id: 'program-3',
    title: '전통 장 담그기',
    description: '어르신들의 손맛으로 배우는 전통 된장, 고추장 담그기',
    category: 'traditional_wisdom',
    image: '/programs/jang.jpg',
    schedule: '매주 수요일 09:00-12:00',
    location: '청산면 마을회관',
    maxParticipants: 25,
    currentParticipants: 22,
    creditReward: 3,
    instructorName: '김순자 어르신',
    status: 'ongoing',
    startDate: '2025-01-08',
    endDate: '2025-02-26',
  },
  {
    id: 'program-4',
    title: '약초 산행 & 약초 이야기',
    description: '연천의 산과 들에서 자라는 약초를 알아보고 활용법을 배워요.',
    category: 'traditional_wisdom',
    image: '/programs/herbs.jpg',
    schedule: '격주 토요일 08:00-13:00',
    location: '재인폭포 일대',
    maxParticipants: 30,
    currentParticipants: 28,
    creditReward: 4,
    instructorName: '박말순 어르신',
    status: 'upcoming',
    startDate: '2025-02-01',
    endDate: '2025-04-26',
  },

  // 체력 품앗이단
  {
    id: 'program-5',
    title: '새벽 건강 체조',
    description: '아침을 여는 건강 체조! 어르신과 장병이 함께해요.',
    category: 'physical_exchange',
    image: '/programs/exercise.jpg',
    schedule: '매일 06:00-07:00',
    location: '연천읍 체육공원',
    maxParticipants: 50,
    currentParticipants: 35,
    creditReward: 1,
    status: 'ongoing',
    startDate: '2025-01-02',
  },
  {
    id: 'program-6',
    title: '농번기 특별 품앗이단',
    description: '바쁜 농번기, 다같이 힘을 모아 농사일을 도와요.',
    category: 'physical_exchange',
    image: '/programs/farming.jpg',
    schedule: '농번기 수시 운영',
    location: '연천군 전역',
    maxParticipants: 100,
    currentParticipants: 67,
    creditReward: 5,
    status: 'upcoming',
    startDate: '2025-03-01',
    endDate: '2025-06-30',
  },

  // 세대 교류 프로그램
  {
    id: 'program-7',
    title: '할머니 손맛 요리교실',
    description: '어르신의 레시피로 함께 요리하고 나눠 먹어요.',
    category: 'generation_exchange',
    image: '/programs/cooking.jpg',
    schedule: '매주 금요일 11:00-14:00',
    location: '백학면 경로당',
    maxParticipants: 20,
    currentParticipants: 19,
    creditReward: 2,
    instructorName: '이영순 어르신',
    status: 'ongoing',
    startDate: '2025-01-10',
    endDate: '2025-03-28',
  },
  {
    id: 'program-8',
    title: '추억의 보드게임 대회',
    description: '윷놀이, 화투, 장기 등 전통 놀이로 세대를 잇는 시간',
    category: 'generation_exchange',
    image: '/programs/games.jpg',
    schedule: '매월 마지막 일요일 13:00-17:00',
    location: '연천문화원',
    maxParticipants: 60,
    currentParticipants: 45,
    creditReward: 2,
    status: 'ongoing',
    startDate: '2025-01-26',
  },
];

// 카테고리별 프로그램
export const getProgramsByCategory = (category: ProgramCategory) =>
  mockPrograms.filter((p) => p.category === category);

// 진행 중 프로그램
export const ongoingPrograms = mockPrograms.filter((p) => p.status === 'ongoing');

// 예정 프로그램
export const upcomingPrograms = mockPrograms.filter((p) => p.status === 'upcoming');

// 인기 프로그램 (참가율 높은 순)
export const popularPrograms = [...mockPrograms]
  .sort((a, b) =>
    (b.currentParticipants / b.maxParticipants) - (a.currentParticipants / a.maxParticipants)
  )
  .slice(0, 4);
