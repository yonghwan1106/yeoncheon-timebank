'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  trackColor?: string;
  progressColor?: string;
  showPercentage?: boolean;
  children?: React.ReactNode;
  animate?: boolean;
  delay?: number;
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  className,
  trackColor = 'stroke-muted',
  progressColor = 'stroke-primary',
  showPercentage = true,
  children,
  animate = true,
  delay = 0,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const offset = circumference - (clampedProgress / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={trackColor}
        />

        {/* Progress Arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={progressColor}
          style={{
            strokeDasharray: circumference,
          }}
          initial={animate ? { strokeDashoffset: circumference } : { strokeDashoffset: offset }}
          animate={{ strokeDashoffset: offset }}
          transition={{
            duration: 1,
            delay: delay,
            ease: 'easeOut',
          }}
        />

        {/* Glow Effect */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth + 4}
          strokeLinecap="round"
          className="stroke-primary/20"
          style={{
            strokeDasharray: circumference,
            filter: 'blur(4px)',
          }}
          initial={animate ? { strokeDashoffset: circumference } : { strokeDashoffset: offset }}
          animate={{ strokeDashoffset: offset }}
          transition={{
            duration: 1,
            delay: delay,
            ease: 'easeOut',
          }}
        />
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children ? (
          children
        ) : showPercentage ? (
          <motion.span
            className="text-2xl font-bold"
            initial={animate ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.5 }}
          >
            {Math.round(clampedProgress)}%
          </motion.span>
        ) : null}
      </div>
    </div>
  );
}

interface ProgressRingWithLabelProps extends ProgressRingProps {
  label: string;
  sublabel?: string;
}

export function ProgressRingWithLabel({
  label,
  sublabel,
  ...props
}: ProgressRingWithLabelProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <ProgressRing {...props} />
      <div className="text-center">
        <p className="font-medium">{label}</p>
        {sublabel && (
          <p className="text-sm text-muted-foreground">{sublabel}</p>
        )}
      </div>
    </div>
  );
}

export default ProgressRing;
