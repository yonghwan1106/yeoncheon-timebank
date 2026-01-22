'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Blocks,
  Shield,
  Hash,
  Clock,
  FileText,
  ChevronRight,
  Check,
  Search,
  ExternalLink,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  blockchain,
  getBlockchainStats,
  getBlockByIndex,
  verifyChain,
} from '@/lib/blockchain/chain';
import type { Block } from '@/types';

export default function BlockchainPage() {
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [searchHash, setSearchHash] = useState('');
  const stats = getBlockchainStats();
  const isChainValid = verifyChain(blockchain);
  const recentBlocks = [...blockchain].reverse().slice(0, 20);

  const handleBlockClick = (block: Block) => {
    setSelectedBlock(block);
  };

  const handleSearch = () => {
    const found = blockchain.find((b) =>
      b.hash.toLowerCase().includes(searchHash.toLowerCase())
    );
    if (found) {
      setSelectedBlock(found);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Blocks className="h-7 w-7 text-primary" />
          블록체인 탐색기
        </h1>
        <p className="text-muted-foreground mt-1">
          모든 거래가 투명하게 기록되는 연천 타임뱅크 블록체인
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Blocks className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">총 블록 수</p>
                  <p className="text-xl font-bold">{stats.totalBlocks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">총 트랜잭션</p>
                  <p className="text-xl font-bold">{stats.totalTransactions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">체인 상태</p>
                  <div className="flex items-center gap-1">
                    <Check className="h-4 w-4 text-green-600" />
                    <p className="text-sm font-semibold text-green-600">유효함</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">최신 블록</p>
                  <p className="text-xl font-bold">#{stats.latestBlockIndex}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="블록 해시로 검색..."
                value={searchHash}
                onChange={(e) => setSearchHash(e.target.value)}
                className="pl-10 font-mono text-sm"
              />
            </div>
            <Button onClick={handleSearch}>검색</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Block List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">최근 블록</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              <div className="space-y-2">
                {recentBlocks.map((block, index) => (
                  <motion.div
                    key={block.index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <button
                      onClick={() => handleBlockClick(block)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedBlock?.index === block.index
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Blocks className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-semibold">블록 #{block.index}</p>
                            <p className="text-xs text-muted-foreground font-mono">
                              {block.hash.slice(0, 16)}...
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">
                            {block.transactions.length} TX
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(block.timestamp).toLocaleDateString('ko-KR')}
                          </p>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Block Detail */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">블록 상세</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedBlock ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">블록 번호</p>
                  <p className="text-2xl font-bold">#{selectedBlock.index}</p>
                </div>

                <div className="space-y-3">
                  <DetailRow
                    icon={<Hash className="h-4 w-4" />}
                    label="블록 해시"
                    value={selectedBlock.hash}
                    mono
                  />
                  <DetailRow
                    icon={<Hash className="h-4 w-4" />}
                    label="이전 블록 해시"
                    value={selectedBlock.previousHash}
                    mono
                  />
                  <DetailRow
                    icon={<Clock className="h-4 w-4" />}
                    label="생성 시간"
                    value={new Date(selectedBlock.timestamp).toLocaleString('ko-KR')}
                  />
                  <DetailRow
                    icon={<FileText className="h-4 w-4" />}
                    label="트랜잭션 수"
                    value={`${selectedBlock.transactions.length}개`}
                  />
                  <DetailRow
                    icon={<Shield className="h-4 w-4" />}
                    label="Nonce"
                    value={selectedBlock.nonce.toString()}
                  />
                </div>

                {selectedBlock.transactions.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">포함된 트랜잭션</h4>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-2">
                        {selectedBlock.transactions.map((tx) => (
                          <div
                            key={tx.id}
                            className="p-3 bg-gray-50 rounded-lg text-sm"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{tx.description}</span>
                              <Badge
                                variant={tx.type === 'earn' ? 'default' : 'secondary'}
                              >
                                {tx.type === 'earn' ? '+' : '-'}
                                {tx.amount} TC
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {tx.toUserName}
                            </p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Blocks className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>블록을 선택하면 상세 정보가 표시됩니다</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
  mono = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      <div className="p-1.5 bg-white rounded-md text-muted-foreground">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p
          className={`text-sm font-medium break-all ${
            mono ? 'font-mono text-xs' : ''
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
