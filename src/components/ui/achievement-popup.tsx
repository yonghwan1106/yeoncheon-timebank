'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ConfettiEffect } from '@/components/effects/ConfettiEffect';

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: Rarity;
  xpReward?: number;
  creditReward?: number;
}

interface AchievementPopupProps {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
}

const rarityConfig: Record<
  Rarity,
  {
    label: string;
    color: string;
    bgGradient: string;
    glowClass: string;
    borderColor: string;
  }
> = {
  common: {
    label: '일반',
    color: 'text-gray-600',
    bgGradient: 'from-gray-100 to-gray-200',
    glowClass: 'glow-common',
    borderColor: 'border-gray-300',
  },
  rare: {
    label: '희귀',
    color: 'text-blue-600',
    bgGradient: 'from-blue-100 to-blue-200',
    glowClass: 'glow-rare',
    borderColor: 'border-blue-400',
  },
  epic: {
    label: '영웅',
    color: 'text-purple-600',
    bgGradient: 'from-purple-100 to-purple-200',
    glowClass: 'glow-epic',
    borderColor: 'border-purple-400',
  },
  legendary: {
    label: '전설',
    color: 'text-amber-600',
    bgGradient: 'from-amber-100 via-yellow-100 to-orange-100',
    glowClass: 'glow-legendary',
    borderColor: 'border-amber-400',
  },
};

export function AchievementPopup({
  achievement,
  isOpen,
  onClose,
}: AchievementPopupProps) {
  const config = achievement ? rarityConfig[achievement.rarity] : rarityConfig.common;

  return (
    <>
      <ConfettiEffect
        trigger={isOpen && achievement?.rarity !== 'common'}
        type="achievement"
      />

      <AnimatePresence>
        {isOpen && achievement && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Popup */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className={cn(
                  'relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto',
                  config.glowClass
                )}
                initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotateY: 180 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  stiffness: 200,
                }}
              >
                {/* Rotating Glow Background */}
                {achievement.rarity !== 'common' && (
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <div className="rotate-glow-bg" />
                  </div>
                )}

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Content */}
                <div className="relative p-8 pt-12 text-center">
                  {/* Sparkle Effects */}
                  <motion.div
                    className="absolute top-6 left-6"
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles className="w-6 h-6 text-amber-400" />
                  </motion.div>
                  <motion.div
                    className="absolute top-10 right-8"
                    animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  </motion.div>

                  {/* Achievement Title */}
                  <motion.p
                    className="text-sm font-medium text-muted-foreground mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    업적 달성!
                  </motion.p>

                  {/* Badge Icon */}
                  <motion.div
                    className={cn(
                      'mx-auto w-24 h-24 rounded-2xl flex items-center justify-center text-5xl mb-6',
                      `bg-gradient-to-br ${config.bgGradient}`,
                      `border-2 ${config.borderColor}`,
                      config.glowClass
                    )}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: 'spring',
                      damping: 10,
                      stiffness: 150,
                      delay: 0.1,
                    }}
                  >
                    {achievement.icon}
                  </motion.div>

                  {/* Rarity Badge */}
                  <motion.div
                    className={cn(
                      'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-3',
                      `bg-gradient-to-r ${config.bgGradient}`,
                      config.color
                    )}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    {config.label}
                  </motion.div>

                  {/* Achievement Details */}
                  <motion.h3
                    className="text-xl font-bold mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {achievement.title}
                  </motion.h3>

                  <motion.p
                    className="text-muted-foreground mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {achievement.description}
                  </motion.p>

                  {/* Rewards */}
                  {(achievement.xpReward || achievement.creditReward) && (
                    <motion.div
                      className="flex items-center justify-center gap-4 mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      {achievement.xpReward && (
                        <div className="flex items-center gap-1 px-3 py-2 bg-purple-100 rounded-xl">
                          <span className="text-lg">⚡</span>
                          <span className="font-semibold text-purple-600">
                            +{achievement.xpReward} XP
                          </span>
                        </div>
                      )}
                      {achievement.creditReward && (
                        <div className="flex items-center gap-1 px-3 py-2 bg-amber-100 rounded-xl">
                          <span className="text-lg">🪙</span>
                          <span className="font-semibold text-amber-600">
                            +{achievement.creditReward} TC
                          </span>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Close Button */}
                  <motion.button
                    onClick={onClose}
                    className={cn(
                      'w-full py-3 px-6 rounded-xl font-medium transition-all',
                      'bg-gradient-to-r from-primary to-primary/80 text-white',
                      'hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                    )}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    확인
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default AchievementPopup;
