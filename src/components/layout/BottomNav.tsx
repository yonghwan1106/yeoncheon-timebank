'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Heart, Wallet, Store, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';

const navItems = [
  { href: '/', label: '홈', icon: Home },
  { href: '/services', label: '봉사', icon: Heart },
  { href: '/wallet', label: '지갑', icon: Wallet },
  { href: '/stores', label: '가맹점', icon: Store },
  { href: '/profile', label: '프로필', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const { isSeniorMode } = useAuthStore();

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 bg-white border-t md:hidden',
        isSeniorMode && 'pb-2'
      )}
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center py-2 px-4 relative',
                isSeniorMode && 'py-3 px-6'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="bottomnav-active"
                  className="absolute inset-x-2 top-0 h-0.5 bg-primary"
                  transition={{ type: 'spring', duration: 0.3 }}
                />
              )}
              <Icon
                className={cn(
                  'h-6 w-6 transition-colors',
                  isActive ? 'text-primary' : 'text-gray-400',
                  isSeniorMode && 'h-8 w-8'
                )}
              />
              <span
                className={cn(
                  'text-xs mt-1 transition-colors',
                  isActive ? 'text-primary font-medium' : 'text-gray-500',
                  isSeniorMode && 'text-sm font-medium'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Safe Area for iOS */}
      <div className="h-safe-area-inset-bottom" />
    </nav>
  );
}
