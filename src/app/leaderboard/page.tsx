'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp, Clock, Heart, Star, ChevronDown } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

type LeaderboardCategory = 'credits' | 'hours' | 'matches' | 'streak';

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  userType: 'soldier' | 'senior' | 'citizen' | 'admin';
  value: number;
  change: number;
  badge?: string;
}

const mockLeaderboardData: Record<LeaderboardCategory, LeaderboardUser[]> = {
  credits: [
    { rank: 1, name: '김태양', avatar: '🧑‍✈️', userType: 'soldier', value: 2450, change: 5, badge: '봉사왕' },
    { rank: 2, name: '이하늘', avatar: '👨‍🌾', userType: 'citizen', value: 2180, change: 2, badge: '마을영웅' },
    { rank: 3, name: '박민수', avatar: '🧑‍✈️', userType: 'soldier', value: 1920, change: -1 },
    { rank: 4, name: '정연희', avatar: '👩‍💼', userType: 'citizen', value: 1750, change: 3 },
    { rank: 5, name: '최영호', avatar: '👴', userType: 'senior', value: 1680, change: 0 },
    { rank: 6, name: '김연천', avatar: '🧑‍✈️', userType: 'soldier', value: 1520, change: 4 },
    { rank: 7, name: '이정민', avatar: '👩', userType: 'citizen', value: 1450, change: -2 },
    { rank: 8, name: '한미영', avatar: '👵', userType: 'senior', value: 1380, change: 1 },
    { rank: 9, name: '오성훈', avatar: '🧑‍✈️', userType: 'soldier', value: 1290, change: 0 },
    { rank: 10, name: '송지현', avatar: '👩‍🌾', userType: 'citizen', value: 1150, change: 2 },
  ],
  hours: [
    { rank: 1, name: '이하늘', avatar: '👨‍🌾', userType: 'citizen', value: 245, change: 3, badge: '시간부자' },
    { rank: 2, name: '김태양', avatar: '🧑‍✈️', userType: 'soldier', value: 218, change: 1 },
    { rank: 3, name: '정연희', avatar: '👩‍💼', userType: 'citizen', value: 195, change: 5, badge: '성실왕' },
    { rank: 4, name: '박민수', avatar: '🧑‍✈️', userType: 'soldier', value: 178, change: 0 },
    { rank: 5, name: '김연천', avatar: '🧑‍✈️', userType: 'soldier', value: 156, change: 2 },
    { rank: 6, name: '최영호', avatar: '👴', userType: 'senior', value: 142, change: -1 },
    { rank: 7, name: '한미영', avatar: '👵', userType: 'senior', value: 138, change: 1 },
    { rank: 8, name: '이정민', avatar: '👩', userType: 'citizen', value: 125, change: 0 },
    { rank: 9, name: '오성훈', avatar: '🧑‍✈️', userType: 'soldier', value: 112, change: 3 },
    { rank: 10, name: '송지현', avatar: '👩‍🌾', userType: 'citizen', value: 98, change: -2 },
  ],
  matches: [
    { rank: 1, name: '정연희', avatar: '👩‍💼', userType: 'citizen', value: 89, change: 4, badge: '매칭마스터' },
    { rank: 2, name: '김태양', avatar: '🧑‍✈️', userType: 'soldier', value: 76, change: 2 },
    { rank: 3, name: '이하늘', avatar: '👨‍🌾', userType: 'citizen', value: 68, change: 0 },
    { rank: 4, name: '한미영', avatar: '👵', userType: 'senior', value: 54, change: 1, badge: '인기왕' },
    { rank: 5, name: '박민수', avatar: '🧑‍✈️', userType: 'soldier', value: 48, change: -1 },
    { rank: 6, name: '최영호', avatar: '👴', userType: 'senior', value: 42, change: 3 },
    { rank: 7, name: '김연천', avatar: '🧑‍✈️', userType: 'soldier', value: 38, change: 0 },
    { rank: 8, name: '이정민', avatar: '👩', userType: 'citizen', value: 35, change: 2 },
    { rank: 9, name: '오성훈', avatar: '🧑‍✈️', userType: 'soldier', value: 31, change: -2 },
    { rank: 10, name: '송지현', avatar: '👩‍🌾', userType: 'citizen', value: 28, change: 1 },
  ],
  streak: [
    { rank: 1, name: '박민수', avatar: '🧑‍✈️', userType: 'soldier', value: 45, change: 0, badge: '불꽃연속' },
    { rank: 2, name: '김태양', avatar: '🧑‍✈️', userType: 'soldier', value: 38, change: 0 },
    { rank: 3, name: '정연희', avatar: '👩‍💼', userType: 'citizen', value: 32, change: 0 },
    { rank: 4, name: '이하늘', avatar: '👨‍🌾', userType: 'citizen', value: 28, change: 0 },
    { rank: 5, name: '김연천', avatar: '🧑‍✈️', userType: 'soldier', value: 21, change: 0 },
    { rank: 6, name: '오성훈', avatar: '🧑‍✈️', userType: 'soldier', value: 18, change: 0 },
    { rank: 7, name: '최영호', avatar: '👴', userType: 'senior', value: 14, change: 0 },
    { rank: 8, name: '한미영', avatar: '👵', userType: 'senior', value: 12, change: 0 },
    { rank: 9, name: '이정민', avatar: '👩', userType: 'citizen', value: 9, change: 0 },
    { rank: 10, name: '송지현', avatar: '👩‍🌾', userType: 'citizen', value: 7, change: 0 },
  ],
};

const categoryInfo = {
  credits: { label: '타임크레딧', icon: Trophy, unit: 'TC', color: 'text-amber-500' },
  hours: { label: '봉사시간', icon: Clock, unit: '시간', color: 'text-blue-500' },
  matches: { label: '완료 매칭', icon: Heart, unit: '회', color: 'text-pink-500' },
  streak: { label: '연속 봉사', icon: TrendingUp, unit: '일', color: 'text-green-500' },
};

const userTypeColors = {
  soldier: 'bg-blue-100 text-blue-700',
  senior: 'bg-green-100 text-green-700',
  citizen: 'bg-purple-100 text-purple-700',
  admin: 'bg-gray-100 text-gray-700',
};

const userTypeLabels = {
  soldier: '군인',
  senior: '어르신',
  citizen: '주민',
  admin: '관리자',
};

export default function LeaderboardPage() {
  const [category, setCategory] = useState<LeaderboardCategory>('credits');
  const data = mockLeaderboardData[category];
  const { label, icon: Icon, unit, color } = categoryInfo[category];

  const topThree = data.slice(0, 3);
  const rest = data.slice(3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-7 w-7 text-amber-500" />
            리더보드
          </h1>
          <p className="text-muted-foreground mt-1">
            연천 타임뱅크 최고의 봉사자들을 만나보세요
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(categoryInfo) as LeaderboardCategory[]).map((cat) => {
            const info = categoryInfo[cat];
            const CatIcon = info.icon;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <CatIcon className="h-4 w-4" />
                {info.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 md:gap-6">
        {/* 2nd Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="order-1"
        >
          <GlassCard className="relative pt-8 pb-4 text-center">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-3xl md:text-4xl shadow-lg border-4 border-white">
                {topThree[1]?.avatar}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gray-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
            </div>
            <Medal className="h-6 w-6 text-gray-400 mx-auto mb-2 mt-4" />
            <p className="font-bold text-sm md:text-base">{topThree[1]?.name}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full ${userTypeColors[topThree[1]?.userType || 'citizen']}`}>
              {userTypeLabels[topThree[1]?.userType || 'citizen']}
            </span>
            <p className={`text-lg md:text-xl font-bold mt-2 ${color}`}>
              {topThree[1]?.value.toLocaleString()} {unit}
            </p>
          </GlassCard>
        </motion.div>

        {/* 1st Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="order-2 -mt-4"
        >
          <GlassCard className="relative pt-10 pb-4 text-center border-2 border-amber-300 bg-gradient-to-b from-amber-50 to-white">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center text-4xl md:text-5xl shadow-xl border-4 border-white animate-pulse">
                {topThree[0]?.avatar}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-500 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                1
              </div>
            </div>
            <Trophy className="h-8 w-8 text-amber-500 mx-auto mb-2 mt-4" />
            <p className="font-bold text-base md:text-lg">{topThree[0]?.name}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full ${userTypeColors[topThree[0]?.userType || 'citizen']}`}>
              {userTypeLabels[topThree[0]?.userType || 'citizen']}
            </span>
            {topThree[0]?.badge && (
              <div className="mt-2 inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-medium">
                <Star className="h-3 w-3" />
                {topThree[0].badge}
              </div>
            )}
            <p className={`text-xl md:text-2xl font-bold mt-2 ${color}`}>
              {topThree[0]?.value.toLocaleString()} {unit}
            </p>
          </GlassCard>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="order-3"
        >
          <GlassCard className="relative pt-8 pb-4 text-center">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 flex items-center justify-center text-3xl md:text-4xl shadow-lg border-4 border-white">
                {topThree[2]?.avatar}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-orange-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
            </div>
            <Award className="h-6 w-6 text-orange-400 mx-auto mb-2 mt-4" />
            <p className="font-bold text-sm md:text-base">{topThree[2]?.name}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full ${userTypeColors[topThree[2]?.userType || 'citizen']}`}>
              {userTypeLabels[topThree[2]?.userType || 'citizen']}
            </span>
            <p className={`text-lg md:text-xl font-bold mt-2 ${color}`}>
              {topThree[2]?.value.toLocaleString()} {unit}
            </p>
          </GlassCard>
        </motion.div>
      </div>

      {/* Rest of the Rankings */}
      <GlassCard>
        <div className="divide-y">
          {rest.map((user, index) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 text-center font-bold text-gray-400">
                {user.rank}
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                {user.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{user.name}</p>
                  {user.badge && (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                      {user.badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${userTypeColors[user.userType]}`}>
                  {userTypeLabels[user.userType]}
                </span>
              </div>
              <div className="text-right">
                <p className={`font-bold ${color}`}>
                  {user.value.toLocaleString()} {unit}
                </p>
                <div className={`text-xs flex items-center justify-end gap-1 ${
                  user.change > 0 ? 'text-green-500' : user.change < 0 ? 'text-red-500' : 'text-gray-400'
                }`}>
                  {user.change > 0 && <TrendingUp className="h-3 w-3" />}
                  {user.change < 0 && <ChevronDown className="h-3 w-3" />}
                  {user.change !== 0 ? `${Math.abs(user.change)}등 ${user.change > 0 ? '상승' : '하락'}` : '유지'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* My Ranking Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <GlassCard variant="colored" className="bg-gradient-to-r from-primary to-primary/80">
          <div className="p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                🧑‍✈️
              </div>
              <div>
                <p className="text-sm opacity-80">나의 순위</p>
                <p className="text-xl font-bold">6위 · 김연천</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">1,520 TC</p>
              <p className="text-sm opacity-80 flex items-center justify-end gap-1">
                <TrendingUp className="h-4 w-4" />
                4등 상승
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
