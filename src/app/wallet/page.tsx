'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  QrCode,
  Send,
  History,
  TrendingUp,
  Shield,
  ExternalLink,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { demoSoldier, getTransactionsByUser, getDailyStats } from '@/lib/mock-data';
import { getBlockchainStats } from '@/lib/blockchain/chain';
import type { Transaction } from '@/types';

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [displayBalance, setDisplayBalance] = useState(0);
  const user = demoSoldier;
  const transactions = getTransactionsByUser(user.id);
  const blockchainStats = getBlockchainStats();

  // 애니메이션으로 잔액 표시 (마운트 시 1회만 실행)
  useEffect(() => {
    const actualBalance = user.totalCredits;
    setBalance(actualBalance);

    // 숫자 카운트업 애니메이션
    let current = 0;
    const increment = actualBalance / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= actualBalance) {
        setDisplayBalance(actualBalance);
        clearInterval(timer);
      } else {
        setDisplayBalance(Math.floor(current));
      }
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">크레딧 지갑</h1>
        <p className="text-muted-foreground mt-1">
          블록체인으로 안전하게 관리되는 타임크레딧
        </p>
      </div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-gradient-to-br from-primary via-primary to-primary/80 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('/patterns/circuit.svg')] opacity-10" />
          <CardContent className="p-6 relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-white/80 text-sm">보유 크레딧</p>
                <motion.h2
                  className="text-5xl font-bold mt-1"
                  key={displayBalance}
                >
                  {displayBalance.toLocaleString()}
                  <span className="text-2xl ml-2 font-normal opacity-80">TC</span>
                </motion.h2>
              </div>
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Wallet className="h-8 w-8" />
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <p className="text-xs text-white/70">이번 달 적립</p>
                <p className="text-lg font-semibold flex items-center gap-1">
                  <ArrowDownLeft className="h-4 w-4 text-green-300" />
                  +{Math.floor(balance * 0.3)} TC
                </p>
              </div>
              <div className="flex-1 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <p className="text-xs text-white/70">이번 달 사용</p>
                <p className="text-lg font-semibold flex items-center gap-1">
                  <ArrowUpRight className="h-4 w-4 text-amber-300" />
                  -{Math.floor(balance * 0.1)} TC
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-0 flex-col h-auto py-3"
              >
                <QrCode className="h-5 w-5 mb-1" />
                <span className="text-xs">QR 결제</span>
              </Button>
              <Button
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-0 flex-col h-auto py-3"
              >
                <Send className="h-5 w-5 mb-1" />
                <span className="text-xs">전송</span>
              </Button>
              <Button
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-0 flex-col h-auto py-3"
              >
                <History className="h-5 w-5 mb-1" />
                <span className="text-xs">내역</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Blockchain Security Badge */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">블록체인 보안 적용</p>
            <p className="text-xs text-muted-foreground">
              모든 거래가 블록체인에 기록되어 투명하게 관리됩니다
            </p>
          </div>
          <a href="/blockchain">
            <Button variant="ghost" size="sm" className="text-blue-600">
              탐색기 <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </a>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <History className="h-5 w-5" />
            거래 내역
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="earn">적립</TabsTrigger>
              <TabsTrigger value="spend">사용</TabsTrigger>
              <TabsTrigger value="transfer">전송</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <TransactionList transactions={transactions.slice(0, 20)} />
            </TabsContent>
            <TabsContent value="earn">
              <TransactionList
                transactions={transactions.filter((t) => t.type === 'earn' || t.type === 'bonus').slice(0, 20)}
              />
            </TabsContent>
            <TabsContent value="spend">
              <TransactionList
                transactions={transactions.filter((t) => t.type === 'spend').slice(0, 20)}
              />
            </TabsContent>
            <TabsContent value="transfer">
              <TransactionList
                transactions={transactions.filter((t) => t.type === 'transfer').slice(0, 20)}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-green-500" />}
          label="총 적립"
          value={`${Math.floor(balance * 1.5)} TC`}
        />
        <StatCard
          icon={<ArrowUpRight className="h-5 w-5 text-amber-500" />}
          label="총 사용"
          value={`${Math.floor(balance * 0.5)} TC`}
        />
        <StatCard
          icon={<Shield className="h-5 w-5 text-blue-500" />}
          label="블록 수"
          value={`${blockchainStats.totalBlocks}개`}
        />
        <StatCard
          icon={<History className="h-5 w-5 text-purple-500" />}
          label="총 거래"
          value={`${transactions.length}건`}
        />
      </div>
    </div>
  );
}

function TransactionList({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        거래 내역이 없습니다
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-2">
        {transactions.map((tx, index) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <TransactionItem transaction={tx} />
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );
}

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const isIncome = transaction.type === 'earn' || transaction.type === 'bonus';
  const isSpend = transaction.type === 'spend';

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div
        className={`p-2 rounded-lg ${
          isIncome
            ? 'bg-green-100'
            : isSpend
            ? 'bg-amber-100'
            : 'bg-blue-100'
        }`}
      >
        {isIncome ? (
          <ArrowDownLeft className="h-4 w-4 text-green-600" />
        ) : isSpend ? (
          <ArrowUpRight className="h-4 w-4 text-amber-600" />
        ) : (
          <Send className="h-4 w-4 text-blue-600" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{transaction.description}</p>
        <p className="text-xs text-muted-foreground">
          {new Date(transaction.timestamp).toLocaleDateString('ko-KR', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
      <div className="text-right">
        <p
          className={`font-semibold ${
            isIncome ? 'text-green-600' : isSpend ? 'text-amber-600' : 'text-blue-600'
          }`}
        >
          {isIncome ? '+' : '-'}
          {transaction.amount} TC
        </p>
        {transaction.blockHash && (
          <p className="text-xs text-muted-foreground font-mono truncate max-w-[80px]">
            {transaction.blockHash.slice(0, 10)}...
          </p>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
