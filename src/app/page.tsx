'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Clock, Users, Heart } from 'lucide-react';
import {
  StatsCard,
  ActivityFeed,
  WeeklyChart,
  RecommendedServices,
  PopularPrograms,
  HeroSection,
} from '@/components/dashboard';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { getDashboardStats, recommendedServices, popularPrograms } from '@/lib/mock-data';
import type { DashboardStats } from '@/types';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const data = getDashboardStats();
    setStats(data);
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="text-6xl block"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            🌿
          </motion.span>
          <motion.p
            className="mt-4 text-muted-foreground font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            연천 타임뱅크 로딩 중...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <AnimatedBackground particleCount={15} showParticles />

      {/* Main Content */}
      <div className="relative z-10 space-y-6">
        {/* Hero Section */}
        <HeroSection
          userName="김연천"
          level={12}
          xp={2450}
          maxXp={3000}
          todayHours={2.5}
          todayGoal={4}
          streak={7}
        />

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="총 타임크레딧"
            value={stats.totalCredits}
            change="지난 주 대비 +12%"
            changeType="positive"
            icon={Coins}
            iconColor="text-amber-500"
            delay={0}
          />
          <StatsCard
            title="총 봉사 시간"
            value={`${stats.totalHours}h`}
            change="지난 주 대비 +8%"
            changeType="positive"
            icon={Clock}
            iconColor="text-blue-500"
            delay={0.1}
          />
          <StatsCard
            title="참여 인원"
            value={stats.totalUsers}
            change="이번 달 신규 +15명"
            changeType="positive"
            icon={Users}
            iconColor="text-green-500"
            delay={0.2}
          />
          <StatsCard
            title="완료된 매칭"
            value={stats.totalMatches}
            change="매칭 성공률 94%"
            changeType="neutral"
            icon={Heart}
            iconColor="text-pink-500"
            delay={0.3}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Chart - 2 columns */}
          <div className="lg:col-span-2">
            <WeeklyChart data={stats.weeklyData} />
          </div>

          {/* Activity Feed - 1 column */}
          <div className="lg:col-span-1">
            <ActivityFeed activities={stats.recentActivities} />
          </div>
        </div>

        {/* Recommended Services */}
        <RecommendedServices services={recommendedServices} />

        {/* Bottom Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Popular Programs */}
          <PopularPrograms programs={popularPrograms} />

          {/* Quick Actions Card - Glass Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GlassCard variant="colored" className="h-full">
              <div className="p-6 bg-gradient-to-br from-primary to-primary/80 rounded-2xl text-white h-full">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <motion.span
                    className="text-2xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🚀
                  </motion.span>
                  빠른 시작
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <QuickActionButton
                    emoji="🤝"
                    label="봉사 신청하기"
                    href="/services"
                  />
                  <QuickActionButton
                    emoji="💳"
                    label="지갑 확인"
                    href="/wallet"
                  />
                  <QuickActionButton
                    emoji="📚"
                    label="프로그램 참여"
                    href="/programs"
                  />
                  <QuickActionButton
                    emoji="🏪"
                    label="가맹점 보기"
                    href="/stores"
                  />
                </div>
                <motion.div
                  className="mt-6 p-4 bg-white/10 rounded-xl backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm opacity-90">
                    <span className="font-semibold">💡 오늘의 팁:</span> 연속 7일 봉사하면
                    불타는 연속 뱃지를 획득할 수 있어요!
                  </p>
                </motion.div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Banner - Glass Style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <GlassCard shimmer className="overflow-hidden">
            <div className="relative p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold gradient-text">
                    민-관-군 상생의 새로운 모델
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    1시간의 봉사가 1 타임크레딧으로, 지역 경제 활성화로 이어집니다
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {['🧑‍✈️', '👨‍🌾', '👩‍💼'].map((emoji, i) => (
                      <motion.div
                        key={i}
                        className="h-12 w-12 rounded-full bg-white shadow-md flex items-center justify-center text-2xl border-2 border-white"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.6 + i * 0.1,
                          type: 'spring',
                          stiffness: 200,
                        }}
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                      >
                        {emoji}
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold">연천군민과 함께</p>
                    <p className="text-muted-foreground">지금 바로 참여하세요</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <motion.div
                className="mt-6 flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button variant="gradient" size="lg" className="gap-2">
                  <span>🎯</span>
                  봉사 시작하기
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <span>📖</span>
                  자세히 알아보기
                </Button>
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}

function QuickActionButton({
  emoji,
  label,
  href,
}: {
  emoji: string;
  label: string;
  href: string;
}) {
  return (
    <motion.a
      href={href}
      className="flex items-center gap-2 px-4 py-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors backdrop-blur-sm"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span
        className="text-xl"
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ duration: 0.2 }}
      >
        {emoji}
      </motion.span>
      <span className="text-sm font-medium">{label}</span>
    </motion.a>
  );
}
