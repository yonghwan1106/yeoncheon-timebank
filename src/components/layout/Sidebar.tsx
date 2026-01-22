'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Heart,
  Wallet,
  GraduationCap,
  Store,
  Bot,
  Users,
  Blocks,
  Trophy,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';

const mainNavItems = [
  { href: '/', label: '대시보드', icon: LayoutDashboard },
  { href: '/services', label: '봉사 서비스', icon: Heart },
  { href: '/wallet', label: '크레딧 지갑', icon: Wallet },
  { href: '/programs', label: '프로그램', icon: GraduationCap },
  { href: '/stores', label: '가맹점', icon: Store },
  { href: '/matching', label: 'AI 매칭', icon: Bot },
];

const secondaryNavItems = [
  { href: '/leaderboard', label: '리더보드', icon: Trophy },
  { href: '/blockchain', label: '블록체인', icon: Blocks },
  { href: '/community', label: '커뮤니티', icon: Users },
];

const bottomNavItems = [
  { href: '/settings', label: '설정', icon: Settings },
  { href: '/help', label: '도움말', icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, isSeniorMode } = useAuthStore();

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col w-64 border-r bg-white h-[calc(100vh-4rem)] sticky top-16',
        isSeniorMode && 'w-72'
      )}
    >
      {/* User Info Card */}
      <div className="p-4 border-b">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <p className={cn('font-semibold', isSeniorMode && 'text-lg')}>
                {user?.name || '게스트'}
              </p>
              <p className="text-sm text-gray-500">Lv.{user?.level || 1}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-gray-600">보유 크레딧</span>
            <span className="font-bold text-primary">
              {user?.totalCredits || 0} TC
            </span>
          </div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              className="h-full bg-gradient-to-r from-primary to-secondary"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">다음 레벨까지 350 XP</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all',
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-800 hover:bg-gray-100 hover:text-gray-900',
                  isSeniorMode && 'py-3.5 text-lg'
                )}
              >
                <Icon className={cn('h-5 w-5', isSeniorMode && 'h-6 w-6')} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-primary rounded-lg -z-10"
                    transition={{ type: 'spring', duration: 0.3 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            더 보기
          </p>
          <div className="space-y-1">
            {secondaryNavItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all',
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                    isSeniorMode && 'py-3 text-base'
                  )}
                >
                  <Icon className={cn('h-5 w-5', isSeniorMode && 'h-6 w-6')} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t">
        <div className="space-y-1">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all',
                  isSeniorMode && 'py-3 text-base'
                )}
              >
                <Icon className={cn('h-5 w-5', isSeniorMode && 'h-6 w-6')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Senior Mode Banner */}
        {isSeniorMode && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-700 font-medium flex items-center gap-2">
              <span className="text-lg">👴</span>
              어르신 모드 활성화
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
