'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Menu,
  Search,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  Accessibility,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuthStore } from '@/store/authStore';
import { demoSoldier } from '@/lib/mock-data';

export function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, isSeniorMode, toggleSeniorMode, login, logout } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // 데모용: 로그인되어 있지 않으면 자동 로그인
  const currentUser = user || demoSoldier;

  const notifications = [
    { id: 1, title: '새 봉사 매칭', message: '김순자 어르신의 요청과 매칭되었습니다', time: '5분 전', unread: true },
    { id: 2, title: '크레딧 적립', message: '3 TC가 적립되었습니다', time: '1시간 전', unread: true },
    { id: 3, title: '프로그램 알림', message: '내일 스마트폰 교육이 있습니다', time: '2시간 전', unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo & Menu */}
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                  <span className="text-2xl">🌿</span>
                  연천 타임뱅크
                </Link>
                <div className="border-t pt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        pathname === item.href
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="hidden sm:inline-block font-bold text-lg text-primary">
              연천 타임뱅크
            </span>
          </Link>

          {/* 공모전 출품작 표시 */}
          <div className="hidden md:flex items-center gap-1.5 ml-2 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full">
            <span className="text-sm">🏆</span>
            <span className="text-xs font-medium text-amber-700">2025 공모전 출품작</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Senior Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSeniorMode}
            className="hidden sm:flex"
            title={isSeniorMode ? '일반 모드로 전환' : '어르신 모드로 전환'}
          >
            <Accessibility className={`h-5 w-5 ${isSeniorMode ? 'text-green-500' : ''}`} />
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border p-4 z-50"
                >
                  <h3 className="font-semibold mb-3">알림</h3>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg ${
                          notification.unread ? 'bg-blue-50' : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <p className="font-medium text-sm">{notification.title}</p>
                          {notification.unread && (
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full mt-3 text-sm">
                    모든 알림 보기
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <span className="text-sm font-medium">{currentUser.name}</span>
            </Button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border p-2 z-50"
                >
                  <div className="px-3 py-2 border-b mb-2">
                    <p className="font-medium">{currentUser.name}</p>
                    <p className="text-sm text-gray-500">{currentUser.email || currentUser.unit}</p>
                    <Badge variant="secondary" className="mt-1">
                      {currentUser.role === 'soldier' ? '군인' : currentUser.role === 'senior' ? '어르신' : '관리자'}
                    </Badge>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    <User className="h-4 w-4" />
                    <span className="text-sm">프로필</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    <Settings className="h-4 w-4" />
                    <span className="text-sm">설정</span>
                  </Link>
                  <button
                    onClick={toggleSeniorMode}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 w-full text-left"
                  >
                    <Accessibility className="h-4 w-4" />
                    <span className="text-sm">
                      {isSeniorMode ? '일반 모드' : '어르신 모드'}
                    </span>
                  </button>
                  <div className="border-t mt-2 pt-2">
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 w-full text-left text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm">로그아웃</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

const navItems = [
  { href: '/', label: '대시보드', icon: '📊' },
  { href: '/services', label: '봉사 서비스', icon: '🤝' },
  { href: '/wallet', label: '크레딧 지갑', icon: '💳' },
  { href: '/programs', label: '프로그램', icon: '📚' },
  { href: '/stores', label: '가맹점', icon: '🏪' },
  { href: '/matching', label: 'AI 매칭', icon: '🤖' },
];
