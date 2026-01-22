import type { Service, ServiceCategory, ServiceStatus } from '@/types';
import { seniorUsers, soldierUsers } from './users';

const categories: ServiceCategory[] = ['farming', 'digital', 'living', 'health', 'transport'];
const statuses: ServiceStatus[] = ['pending', 'matched', 'in_progress', 'completed'];

const serviceTitles: Record<ServiceCategory, string[]> = {
  farming: [
    '고추 수확 도움이 필요해요',
    '배추 밭 김매기 도와주세요',
    '사과 따기 인력이 필요합니다',
    '감자 캐기 도움 요청',
    '농기계 운전 도와주실 분',
    '비닐하우스 정리 도움',
    '퇴비 나르기 도와주세요',
    '과수원 가지치기 도움',
  ],
  digital: [
    '스마트폰 카카오톡 설치 도움',
    '인터넷 뱅킹 알려주세요',
    '손자와 영상통화 하고 싶어요',
    '사진 찍고 보내는 법 알려주세요',
    '키오스크 사용법 배우고 싶어요',
    'TV 리모컨 설정 도와주세요',
    '유튜브 보는 법 알려주세요',
    '카카오페이 설정 도움',
  ],
  living: [
    '무거운 짐 옮기기 도움',
    '집 청소 도와주실 분',
    '전구 교체 도움이 필요해요',
    '장 봐다 주실 분 구해요',
    '반찬 만들기 도움',
    '빨래 도움이 필요해요',
    '마당 쓸기 도와주세요',
    '창문 닦기 도움',
  ],
  health: [
    '병원 동행해 주실 분',
    '산책 같이 해요',
    '건강 체조 알려주세요',
    '혈압 재는 법 알려주세요',
    '약 챙겨주실 분',
    '물리치료 동행 부탁',
    '건강검진 동행 필요',
    '치과 동행 부탁드려요',
  ],
  transport: [
    '읍내 마트 데려다 주세요',
    '병원 가는 길 동행',
    '기차역까지 이동 도움',
    '시장 가는 길 부탁해요',
    '관공서 방문 동행',
    '은행 가는 길 도움',
    '약국 다녀오기 도움',
    '손자 집 방문 도움',
  ],
};

const serviceDescriptions: Record<ServiceCategory, string> = {
  farming: '농번기에 일손이 부족합니다. 건강한 청년의 도움이 필요해요.',
  digital: '디지털 기기 사용이 어려워요. 친절하게 알려주실 분을 찾습니다.',
  living: '혼자서 하기 어려운 집안일이 있어요. 도움의 손길이 필요합니다.',
  health: '건강 관리에 도움이 필요합니다. 함께해 주실 분을 찾아요.',
  transport: '이동이 불편해서 도움이 필요해요. 안전하게 동행해 주세요.',
};

const locations = ['연천읍', '전곡읍', '청산면', '백학면', '미산면', '왕징면', '신서면', '중면'];

// 100개의 봉사 서비스 생성
export const mockServices: Service[] = Array.from({ length: 100 }, (_, i) => {
  const category = categories[i % 5];
  const status = statuses[Math.floor(i / 25)];
  const titles = serviceTitles[category];
  const requester = seniorUsers[i % seniorUsers.length];
  const provider = status !== 'pending' ? soldierUsers[i % soldierUsers.length] : undefined;

  const createdDate = new Date();
  createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 60));

  const scheduledDate = new Date();
  scheduledDate.setDate(scheduledDate.getDate() + Math.floor(Math.random() * 14) - 7);

  return {
    id: `service-${i + 1}`,
    title: titles[i % titles.length],
    description: serviceDescriptions[category],
    category,
    status,
    credits: Math.floor(Math.random() * 3) + 1, // 1-3 TC
    estimatedHours: Math.floor(Math.random() * 3) + 1,
    location: locations[i % locations.length],
    address: `경기도 연천군 ${locations[i % locations.length]} ${['중앙로', '전곡로', '청정로'][i % 3]} ${Math.floor(Math.random() * 200) + 1}`,
    coordinates: {
      lat: 38.0 + Math.random() * 0.2,
      lng: 127.0 + Math.random() * 0.2,
    },
    requesterId: requester.id,
    requesterName: requester.name,
    providerId: provider?.id,
    providerName: provider?.name,
    scheduledDate: scheduledDate.toISOString().split('T')[0],
    scheduledTime: ['09:00', '10:00', '14:00', '15:00'][i % 4],
    completedAt: status === 'completed' ? new Date().toISOString() : undefined,
    rating: status === 'completed' ? Math.floor(Math.random() * 2) + 4 : undefined, // 4-5
    review: status === 'completed' ? '정말 감사합니다. 큰 도움이 되었어요!' : undefined,
    createdAt: createdDate.toISOString(),
    tags: [category, locations[i % locations.length]],
  };
});

// 대기 중인 서비스
export const pendingServices = mockServices.filter((s) => s.status === 'pending');

// 진행 중인 서비스
export const activeServices = mockServices.filter(
  (s) => s.status === 'matched' || s.status === 'in_progress'
);

// 완료된 서비스
export const completedServices = mockServices.filter((s) => s.status === 'completed');

// 카테고리별 서비스
export const getServicesByCategory = (category: ServiceCategory) =>
  mockServices.filter((s) => s.category === category);

// 위치별 서비스
export const getServicesByLocation = (location: string) =>
  mockServices.filter((s) => s.location === location);

// 최근 서비스
export const recentServices = [...mockServices]
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .slice(0, 10);

// 추천 서비스 (대기 중 + 높은 크레딧)
export const recommendedServices = pendingServices
  .sort((a, b) => b.credits - a.credits)
  .slice(0, 6);
