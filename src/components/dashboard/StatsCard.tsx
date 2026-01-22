'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTiltEffect } from '@/hooks/useTiltEffect';

interface StatsCardProps {
  title: string;
  value: number | string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  delay?: number;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'text-primary',
  delay = 0,
}: StatsCardProps) {
  const { ref, style, glareStyle, isHovering } = useTiltEffect<HTMLDivElement>({
    max: 8,
    scale: 1.02,
    speed: 400,
    glare: true,
    maxGlare: 0.15,
  });

  const [countComplete, setCountComplete] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div
        ref={ref}
        style={style}
        className={cn(
          'relative rounded-2xl overflow-hidden cursor-pointer',
          'glass-card card-enhanced'
        )}
      >
        {/* Tilt Glare Effect */}
        {glareStyle && <div style={glareStyle} />}

        {/* Content */}
        <div className="relative p-6 z-10">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <motion.div
                className="text-3xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: delay + 0.2 }}
              >
                {typeof value === 'number' ? (
                  <CountUp
                    end={value}
                    duration={1500}
                    delay={delay * 1000}
                    onComplete={() => setCountComplete(true)}
                  />
                ) : (
                  <span>{value}</span>
                )}
              </motion.div>
              {change && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + 0.4 }}
                  className={cn(
                    'text-xs font-medium flex items-center gap-1',
                    changeType === 'positive' && 'text-green-600',
                    changeType === 'negative' && 'text-red-600',
                    changeType === 'neutral' && 'text-muted-foreground'
                  )}
                >
                  {changeType === 'positive' && (
                    <motion.span
                      initial={{ y: 5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: delay + 0.5 }}
                    >
                      ↑
                    </motion.span>
                  )}
                  {changeType === 'negative' && (
                    <motion.span
                      initial={{ y: -5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: delay + 0.5 }}
                    >
                      ↓
                    </motion.span>
                  )}
                  {change}
                </motion.p>
              )}
            </div>

            {/* Icon with enhanced effects */}
            <motion.div
              className={cn(
                'relative p-3 rounded-xl transition-all duration-300',
                iconColor.includes('blue') && 'bg-blue-100 dark:bg-blue-900/30',
                iconColor.includes('green') && 'bg-green-100 dark:bg-green-900/30',
                iconColor.includes('amber') && 'bg-amber-100 dark:bg-amber-900/30',
                iconColor.includes('purple') && 'bg-purple-100 dark:bg-purple-900/30',
                iconColor.includes('pink') && 'bg-pink-100 dark:bg-pink-900/30',
                !iconColor.includes('blue') &&
                  !iconColor.includes('green') &&
                  !iconColor.includes('amber') &&
                  !iconColor.includes('purple') &&
                  !iconColor.includes('pink') &&
                  'bg-primary/10'
              )}
              animate={
                isHovering
                  ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.5 }}
            >
              <Icon className={cn('h-6 w-6', iconColor)} />

              {/* Pulse ring on hover */}
              {isHovering && (
                <motion.div
                  className={cn(
                    'absolute inset-0 rounded-xl',
                    iconColor.includes('blue') && 'bg-blue-400/30',
                    iconColor.includes('green') && 'bg-green-400/30',
                    iconColor.includes('amber') && 'bg-amber-400/30',
                    iconColor.includes('purple') && 'bg-purple-400/30',
                    iconColor.includes('pink') && 'bg-pink-400/30',
                    !iconColor.includes('blue') &&
                      !iconColor.includes('green') &&
                      !iconColor.includes('amber') &&
                      !iconColor.includes('purple') &&
                      !iconColor.includes('pink') &&
                      'bg-primary/30'
                  )}
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              )}
            </motion.div>
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className={cn(
            'absolute bottom-0 left-0 h-1 rounded-full',
            iconColor.includes('blue') && 'bg-blue-500',
            iconColor.includes('green') && 'bg-green-500',
            iconColor.includes('amber') && 'bg-amber-500',
            iconColor.includes('purple') && 'bg-purple-500',
            iconColor.includes('pink') && 'bg-pink-500',
            !iconColor.includes('blue') &&
              !iconColor.includes('green') &&
              !iconColor.includes('amber') &&
              !iconColor.includes('purple') &&
              !iconColor.includes('pink') &&
              'bg-primary'
          )}
          initial={{ width: '0%' }}
          animate={{ width: countComplete || typeof value === 'string' ? '100%' : '0%' }}
          transition={{ duration: 0.8, delay: delay + 1.5 }}
        />
      </div>
    </motion.div>
  );
}

interface CountUpProps {
  end: number;
  duration?: number;
  delay?: number;
  onComplete?: () => void;
}

function CountUp({ end, duration = 1500, delay = 0, onComplete }: CountUpProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        // Easing function for smoother animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * end);

        if (currentCount !== countRef.current) {
          countRef.current = currentCount;
          setCount(currentCount);
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
          onComplete?.();
        }
      };
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [end, duration, delay, onComplete]);

  return (
    <motion.span
      key={count}
      initial={{ opacity: 0.8, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
    >
      {count.toLocaleString()}
    </motion.span>
  );
}

export default StatsCard;
