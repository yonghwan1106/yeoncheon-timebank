'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
  variant?: 'default' | 'dark' | 'colored';
  glow?: boolean;
  shimmer?: boolean;
  hover?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      children,
      variant = 'default',
      glow = false,
      shimmer = false,
      hover = true,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative rounded-2xl overflow-hidden',
          variant === 'default' && 'glass-card',
          variant === 'dark' && 'glass-dark',
          variant === 'colored' && 'glass bg-gradient-to-br from-primary/10 to-secondary/10',
          glow && 'animate-glow-pulse',
          hover && 'card-enhanced',
          className
        )}
        whileHover={hover ? { scale: 1.01 } : undefined}
        transition={{ duration: 0.2 }}
      >
        {/* Shimmer Overlay */}
        {shimmer && <div className="shimmer-overlay" />}

        {/* Content */}
        <div className="relative z-10">{children}</div>

        {/* Inner Border Gradient */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

interface GlassCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const GlassCardHeader = React.forwardRef<HTMLDivElement, GlassCardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pb-4', className)}
      {...props}
    />
  )
);

GlassCardHeader.displayName = 'GlassCardHeader';

interface GlassCardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const GlassCardContent = React.forwardRef<HTMLDivElement, GlassCardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 pb-6', className)}
      {...props}
    />
  )
);

GlassCardContent.displayName = 'GlassCardContent';

interface GlassCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const GlassCardTitle = React.forwardRef<HTMLHeadingElement, GlassCardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
);

GlassCardTitle.displayName = 'GlassCardTitle';

export { GlassCard, GlassCardHeader, GlassCardContent, GlassCardTitle };
