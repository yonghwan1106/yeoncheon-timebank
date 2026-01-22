import type { Transaction, TransactionType } from '@/types';
import { soldierUsers, seniorUsers } from './users';
import { mockServices } from './services';

const transactionTypes: TransactionType[] = ['earn', 'spend', 'transfer', 'bonus'];

const earnDescriptions = [
  '농사 도움 봉사 완료',
  '디지털 교육 봉사 완료',
  '생활 지원 봉사 완료',
  '건강 돌봄 봉사 완료',
  '이동 지원 봉사 완료',
  '프로그램 참여 보상',
  '연속 활동 보너스',
  '첫 봉사 보너스',
];

const spendDescriptions = [
  'PC방 이용',
  '카페 음료 구매',
  '식당 식사',
  '편의점 간식',
  '약국 구매',
  '마트 장보기',
  '문화 공연 관람',
  '도서 구매',
];

const transferDescriptions = [
  '감사 선물로 전송',
  '가족에게 전송',
  '친구에게 전송',
  '후배에게 전송',
];

// 500개의 트랜잭션 생성
export const mockTransactions: Transaction[] = Array.from({ length: 500 }, (_, i) => {
  const type = transactionTypes[i % 4];
  const soldier = soldierUsers[i % soldierUsers.length];
  const senior = seniorUsers[i % seniorUsers.length];
  const service = mockServices[i % mockServices.length];

  const timestamp = new Date();
  timestamp.setDate(timestamp.getDate() - Math.floor(Math.random() * 90));
  timestamp.setHours(Math.floor(Math.random() * 14) + 8);

  let description: string;
  let amount: number;
  let fromUserId: string | undefined;
  let fromUserName: string | undefined;
  let toUserId: string;
  let toUserName: string;
  let serviceId: string | undefined;
  let storeId: string | undefined;

  switch (type) {
    case 'earn':
      description = earnDescriptions[i % earnDescriptions.length];
      amount = Math.floor(Math.random() * 3) + 1;
      toUserId = soldier.id;
      toUserName = soldier.name;
      serviceId = service.id;
      break;
    case 'spend':
      description = spendDescriptions[i % spendDescriptions.length];
      amount = -(Math.floor(Math.random() * 5) + 1);
      fromUserId = soldier.id;
      fromUserName = soldier.name;
      toUserId = `store-${(i % 30) + 1}`;
      toUserName = '가맹점';
      storeId = `store-${(i % 30) + 1}`;
      break;
    case 'transfer':
      description = transferDescriptions[i % transferDescriptions.length];
      amount = Math.floor(Math.random() * 10) + 1;
      fromUserId = soldier.id;
      fromUserName = soldier.name;
      toUserId = senior.id;
      toUserName = senior.name;
      break;
    case 'bonus':
      description = '시스템 보너스 지급';
      amount = Math.floor(Math.random() * 5) + 1;
      toUserId = soldier.id;
      toUserName = soldier.name;
      break;
    default:
      description = '기타 거래';
      amount = 1;
      toUserId = soldier.id;
      toUserName = soldier.name;
  }

  return {
    id: `tx-${i + 1}`,
    type,
    amount: Math.abs(amount),
    fromUserId,
    fromUserName,
    toUserId,
    toUserName,
    serviceId,
    storeId,
    description,
    blockHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
    timestamp: timestamp.toISOString(),
  };
});

// 사용자별 트랜잭션
export const getTransactionsByUser = (userId: string) =>
  mockTransactions.filter(
    (tx) => tx.fromUserId === userId || tx.toUserId === userId
  );

// 적립 내역
export const earnTransactions = mockTransactions.filter((tx) => tx.type === 'earn');

// 사용 내역
export const spendTransactions = mockTransactions.filter((tx) => tx.type === 'spend');

// 최근 트랜잭션
export const recentTransactions = [...mockTransactions]
  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  .slice(0, 20);

// 일별 통계
export const getDailyStats = (days: number = 7) => {
  const stats: { day: string; earned: number; spent: number }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    const dayTxs = mockTransactions.filter(
      (tx) => tx.timestamp.split('T')[0] === dateStr
    );

    const earned = dayTxs
      .filter((tx) => tx.type === 'earn' || tx.type === 'bonus')
      .reduce((sum, tx) => sum + tx.amount, 0);

    const spent = dayTxs
      .filter((tx) => tx.type === 'spend')
      .reduce((sum, tx) => sum + tx.amount, 0);

    stats.push({
      day: ['일', '월', '화', '수', '목', '금', '토'][date.getDay()],
      earned,
      spent,
    });
  }

  return stats;
};
