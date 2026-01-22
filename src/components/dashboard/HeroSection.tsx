'use client';

import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Clock, Users } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { ProgressRing } from '@/components/ui/progress-ring';

interface HeroSectionProps {
  userName?: string;
  level?: number;
  xp?: number;
  maxXp?: number;
  todayHours?: number;
  todayGoal?: number;
  streak?: number;
}

export function HeroSection({
  userName = '연천 주민',
  level = 12,
  xp = 2450,
  maxXp = 3000,
  todayHours = 2.5,
  todayGoal = 4,
  streak = 7,
}: HeroSectionProps) {
  const xpProgress = (xp / maxXp) * 100;
  const todayProgress = (todayHours / todayGoal) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <GlassCard variant="colored" shimmer className="relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative p-6 md:p-8">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Welcome Message */}
            <div className="space-y-3">
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-2xl">👋</span>
                <span className="text-sm font-medium text-muted-foreground">
                  환영합니다
                </span>
              </motion.div>

              <motion.h1
                className="text-2xl md:text-3xl font-bold"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                안녕하세요, <span className="gradient-text">{userName}</span>님!
              </motion.h1>

              <motion.p
                className="text-muted-foreground max-w-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                오늘도 연천 타임뱅크와 함께 따뜻한 하루 보내세요.
                지역사회에 기여하는 당신의 시간이 소중합니다.
              </motion.p>

              {/* Level & XP */}
              <motion.div
                className="flex items-center gap-4 pt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">
                    레벨 {level}
                  </span>
                </div>
                <div className="flex-1 max-w-[200px]">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>경험치</span>
                    <span>{xp.toLocaleString()} / {maxXp.toLocaleString()} XP</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${xpProgress}%` }}
                      transition={{ duration: 1, delay: 0.6 }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats Summary */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              {/* Today Progress */}
              <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-white/5 rounded-2xl">
                <ProgressRing
                  progress={todayProgress}
                  size={70}
                  strokeWidth={6}
                  showPercentage={false}
                  delay={0.5}
                >
                  <Clock className="w-6 h-6 text-primary" />
                </ProgressRing>
                <div>
                  <p className="text-sm text-muted-foreground">오늘의 봉사</p>
                  <p className="text-lg font-bold">
                    {todayHours}시간 <span className="text-sm font-normal text-muted-foreground">/ {todayGoal}시간</span>
                  </p>
                </div>
              </div>

              {/* Streak */}
              <div className="flex items-center gap-4 p-4 bg-white/50 dark:bg-white/5 rounded-2xl">
                <div className="w-[70px] h-[70px] flex items-center justify-center">
                  <motion.div
                    className="text-4xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🔥
                  </motion.div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">연속 봉사</p>
                  <p className="text-lg font-bold">
                    {streak}일 <span className="text-sm font-normal text-amber-600">연속!</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Stats Bar */}
          <motion.div
            className="mt-6 pt-6 border-t border-border/50 grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <QuickStat
              icon={<TrendingUp className="w-4 h-4" />}
              label="이번 주 봉사"
              value="12.5시간"
              trend="+2.5h"
              trendPositive
            />
            <QuickStat
              icon={<Users className="w-4 h-4" />}
              label="도움 받은 분"
              value="8명"
              trend="이번 달"
            />
            <QuickStat
              icon="🪙"
              label="보유 크레딧"
              value="156 TC"
              trend="+12 TC"
              trendPositive
            />
            <QuickStat
              icon="🏆"
              label="획득 뱃지"
              value="12개"
              trend="2개 진행 중"
            />
          </motion.div>

          {/* DMZ Peace Badge */}
          <motion.div
            className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 px-3 py-1.5 bg-white/70 dark:bg-white/10 rounded-full shadow-sm"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: 'spring' }}
          >
            <span className="text-lg">🕊️</span>
            <span className="text-xs font-medium text-primary hidden sm:inline">
              DMZ 평화 지역
            </span>
          </motion.div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

interface QuickStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
  trendPositive?: boolean;
}

function QuickStat({ icon, label, value, trend, trendPositive }: QuickStatProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-primary/10 rounded-lg text-primary">
        {typeof icon === 'string' ? <span className="text-base">{icon}</span> : icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
        {trend && (
          <p className={`text-xs ${trendPositive ? 'text-green-600' : 'text-muted-foreground'}`}>
            {trend}
          </p>
        )}
      </div>
    </div>
  );
}

export default HeroSection;
