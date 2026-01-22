import type { Block, Transaction } from '@/types';
import { mockTransactions } from '@/lib/mock-data/transactions';

// SHA-256 해시 생성 (시뮬레이션)
function generateHash(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  const hashHex = Math.abs(hash).toString(16).padStart(16, '0');
  return `0x${hashHex}${hashHex}${hashHex}${hashHex}`;
}

// 블록 생성
function createBlock(
  index: number,
  transactions: Transaction[],
  previousHash: string
): Block {
  const timestamp = new Date();
  timestamp.setHours(timestamp.getHours() - (50 - index) * 2);

  const blockData = JSON.stringify({
    index,
    timestamp: timestamp.toISOString(),
    transactions: transactions.map((t) => t.id),
    previousHash,
  });

  const nonce = Math.floor(Math.random() * 100000);
  const hash = generateHash(blockData + nonce);

  return {
    index,
    timestamp: timestamp.toISOString(),
    transactions,
    previousHash,
    hash,
    nonce,
  };
}

// 50개 블록 생성 (제네시스 + 49개)
export function generateBlockchain(): Block[] {
  const blocks: Block[] = [];

  // 제네시스 블록
  const genesisBlock: Block = {
    index: 0,
    timestamp: '2024-01-01T00:00:00Z',
    transactions: [],
    previousHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
    nonce: 0,
  };
  blocks.push(genesisBlock);

  // 나머지 49개 블록
  for (let i = 1; i < 50; i++) {
    const txStartIndex = (i - 1) * 10;
    const blockTransactions = mockTransactions.slice(txStartIndex, txStartIndex + 10);
    const previousHash = blocks[i - 1].hash;

    const block = createBlock(i, blockTransactions, previousHash);
    blocks.push(block);
  }

  return blocks;
}

// 블록체인 인스턴스
export const blockchain = generateBlockchain();

// 블록 검증
export function verifyBlock(block: Block, previousBlock?: Block): boolean {
  // 이전 블록 해시 확인
  if (previousBlock && block.previousHash !== previousBlock.hash) {
    return false;
  }

  // 인덱스 확인
  if (previousBlock && block.index !== previousBlock.index + 1) {
    return false;
  }

  return true;
}

// 전체 체인 검증
export function verifyChain(chain: Block[]): boolean {
  for (let i = 1; i < chain.length; i++) {
    if (!verifyBlock(chain[i], chain[i - 1])) {
      return false;
    }
  }
  return true;
}

// 트랜잭션 찾기
export function findTransactionInChain(transactionId: string): {
  transaction: Transaction;
  block: Block;
} | null {
  for (const block of blockchain) {
    const transaction = block.transactions.find((t) => t.id === transactionId);
    if (transaction) {
      return { transaction, block };
    }
  }
  return null;
}

// 블록 통계
export function getBlockchainStats() {
  const totalBlocks = blockchain.length;
  const totalTransactions = blockchain.reduce(
    (sum, block) => sum + block.transactions.length,
    0
  );
  const latestBlock = blockchain[blockchain.length - 1];
  const isValid = verifyChain(blockchain);

  return {
    totalBlocks,
    totalTransactions,
    latestBlockHash: latestBlock.hash,
    latestBlockIndex: latestBlock.index,
    isValid,
    genesisTimestamp: blockchain[0].timestamp,
  };
}

// 블록 상세 조회
export function getBlockByIndex(index: number): Block | undefined {
  return blockchain.find((b) => b.index === index);
}

export function getBlockByHash(hash: string): Block | undefined {
  return blockchain.find((b) => b.hash === hash);
}

// 최근 블록
export function getRecentBlocks(count: number = 10): Block[] {
  return blockchain.slice(-count).reverse();
}
