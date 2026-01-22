import type { Store, StoreCategory } from '@/types';

export const mockStores: Store[] = [
  // PC방
  {
    id: 'store-1',
    name: '연천 PC존',
    category: 'pcroom',
    description: '최신 사양 컴퓨터로 쾌적하게 이용하세요',
    address: '경기도 연천군 연천읍 중앙로 45',
    phone: '031-833-1234',
    operatingHours: '24시간',
    creditPolicy: '1TC = 1시간 이용',
    discountRate: 50,
    isActive: true,
  },
  {
    id: 'store-2',
    name: '전곡 게임랜드',
    category: 'pcroom',
    description: '넓은 공간, 편안한 의자',
    address: '경기도 연천군 전곡읍 전곡로 128',
    phone: '031-834-5678',
    operatingHours: '09:00-24:00',
    creditPolicy: '1TC = 1시간 이용',
    discountRate: 50,
    isActive: true,
  },

  // 카페
  {
    id: 'store-3',
    name: '평화카페',
    category: 'cafe',
    description: 'DMZ 전망이 아름다운 카페',
    address: '경기도 연천군 연천읍 평화로 89',
    phone: '031-835-1111',
    operatingHours: '10:00-22:00',
    creditPolicy: '1TC = 5,000원',
    discountRate: 20,
    isActive: true,
  },
  {
    id: 'store-4',
    name: '숲속 커피',
    category: 'cafe',
    description: '자연 속 힐링 카페',
    address: '경기도 연천군 청산면 청정로 56',
    phone: '031-835-2222',
    operatingHours: '11:00-20:00',
    creditPolicy: '1TC = 5,000원',
    discountRate: 15,
    isActive: true,
  },
  {
    id: 'store-5',
    name: '전곡리 다방',
    category: 'cafe',
    description: '추억의 다방 분위기',
    address: '경기도 연천군 전곡읍 전곡로 45',
    phone: '031-835-3333',
    operatingHours: '08:00-21:00',
    creditPolicy: '1TC = 4,000원',
    discountRate: 25,
    isActive: true,
  },

  // 식당
  {
    id: 'store-6',
    name: '연천 한우촌',
    category: 'restaurant',
    description: '청정 연천 한우 전문점',
    address: '경기도 연천군 연천읍 중앙로 112',
    phone: '031-836-1000',
    operatingHours: '11:00-21:00',
    creditPolicy: '1TC = 10,000원',
    discountRate: 10,
    isActive: true,
  },
  {
    id: 'store-7',
    name: '고향 손두부',
    category: 'restaurant',
    description: '직접 만든 순두부로 정성을 담아',
    address: '경기도 연천군 청산면 청정로 78',
    phone: '031-836-2000',
    operatingHours: '07:00-20:00',
    creditPolicy: '1TC = 8,000원',
    discountRate: 15,
    isActive: true,
  },
  {
    id: 'store-8',
    name: '엄마밥상',
    category: 'restaurant',
    description: '어머니 손맛 그대로',
    address: '경기도 연천군 전곡읍 선사로 34',
    phone: '031-836-3000',
    operatingHours: '06:00-21:00',
    creditPolicy: '1TC = 7,000원',
    discountRate: 20,
    isActive: true,
  },
  {
    id: 'store-9',
    name: '장병 식당',
    category: 'restaurant',
    description: '장병 할인 전문 식당',
    address: '경기도 연천군 연천읍 군부대로 56',
    phone: '031-836-4000',
    operatingHours: '10:00-22:00',
    creditPolicy: '1TC = 6,000원',
    discountRate: 30,
    isActive: true,
  },

  // 편의점
  {
    id: 'store-10',
    name: 'CU 연천점',
    category: 'convenience',
    description: '24시간 편의점',
    address: '경기도 연천군 연천읍 중앙로 23',
    phone: '031-837-1234',
    operatingHours: '24시간',
    creditPolicy: '1TC = 5,000원',
    discountRate: 10,
    isActive: true,
  },
  {
    id: 'store-11',
    name: 'GS25 전곡점',
    category: 'convenience',
    description: '24시간 편의점',
    address: '경기도 연천군 전곡읍 전곡로 67',
    phone: '031-837-5678',
    operatingHours: '24시간',
    creditPolicy: '1TC = 5,000원',
    discountRate: 10,
    isActive: true,
  },
  {
    id: 'store-12',
    name: '세븐일레븐 청산점',
    category: 'convenience',
    description: '24시간 편의점',
    address: '경기도 연천군 청산면 청정로 12',
    phone: '031-837-9999',
    operatingHours: '24시간',
    creditPolicy: '1TC = 5,000원',
    discountRate: 10,
    isActive: true,
  },

  // 약국
  {
    id: 'store-13',
    name: '연천 온누리약국',
    category: 'pharmacy',
    description: '친절한 상담, 정확한 조제',
    address: '경기도 연천군 연천읍 중앙로 89',
    phone: '031-838-1234',
    operatingHours: '09:00-21:00',
    creditPolicy: '1TC = 5,000원',
    discountRate: 5,
    isActive: true,
  },
  {
    id: 'store-14',
    name: '전곡 건강약국',
    category: 'pharmacy',
    description: '어르신 건강 상담 전문',
    address: '경기도 연천군 전곡읍 전곡로 156',
    phone: '031-838-5678',
    operatingHours: '08:30-20:00',
    creditPolicy: '1TC = 5,000원',
    discountRate: 5,
    isActive: true,
  },

  // 기타
  {
    id: 'store-15',
    name: '연천 문구사',
    category: 'other',
    description: '학용품, 사무용품 전문',
    address: '경기도 연천군 연천읍 학교로 34',
    phone: '031-839-1111',
    operatingHours: '09:00-19:00',
    creditPolicy: '1TC = 5,000원',
    discountRate: 15,
    isActive: true,
  },
  {
    id: 'store-16',
    name: '전곡 미용실',
    category: 'other',
    description: '어르신 커트 전문',
    address: '경기도 연천군 전곡읍 선사로 78',
    phone: '031-839-2222',
    operatingHours: '10:00-20:00',
    creditPolicy: '1TC = 5,000원',
    discountRate: 20,
    isActive: true,
  },
];

// 추가 가맹점 생성 (총 30개)
const additionalStores: Store[] = Array.from({ length: 14 }, (_, i) => {
  const categories: StoreCategory[] = ['pcroom', 'cafe', 'restaurant', 'convenience', 'pharmacy', 'other'];
  const category = categories[i % 6];
  const locations = ['연천읍', '전곡읍', '청산면', '백학면', '미산면'];

  return {
    id: `store-${17 + i}`,
    name: `${locations[i % 5]} ${
      category === 'pcroom' ? 'PC방' :
      category === 'cafe' ? '카페' :
      category === 'restaurant' ? '식당' :
      category === 'convenience' ? '마트' :
      category === 'pharmacy' ? '약국' : '상점'
    } ${i + 1}호점`,
    category,
    address: `경기도 연천군 ${locations[i % 5]} 상가로 ${(i + 1) * 10}`,
    phone: `031-83${i % 10}-${1000 + i}`,
    operatingHours: category === 'convenience' ? '24시간' : '09:00-21:00',
    creditPolicy: '1TC = 5,000원',
    discountRate: 10 + (i % 3) * 5,
    isActive: true,
  };
});

export const allStores = [...mockStores, ...additionalStores];

// 카테고리별 가맹점
export const getStoresByCategory = (category: StoreCategory) =>
  allStores.filter((s) => s.category === category);

// 활성 가맹점
export const activeStores = allStores.filter((s) => s.isActive);
