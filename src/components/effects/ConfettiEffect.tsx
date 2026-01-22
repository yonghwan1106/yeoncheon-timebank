'use client';

import { useCallback, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

type ConfettiType = 'celebration' | 'achievement' | 'levelup' | 'streak';

interface ConfettiEffectProps {
  trigger?: boolean;
  type?: ConfettiType;
  onComplete?: () => void;
}

const confettiConfigs: Record<ConfettiType, () => void> = {
  celebration: () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  },

  achievement: () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f59e0b', '#d97706'],
      shapes: ['star', 'circle'],
      scalar: 1.2,
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 50,
        origin: { x: 0 },
        colors: ['#fbbf24', '#f59e0b'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 50,
        origin: { x: 1 },
        colors: ['#fbbf24', '#f59e0b'],
      });
    }, 200);
  },

  levelup: () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        particleCount: Math.floor(count * particleRatio),
        ...opts,
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#22c55e'],
    });

    fire(0.2, {
      spread: 60,
      colors: ['#3b82f6'],
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#a855f7'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#f59e0b'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#ec4899'],
    });
  },

  streak: () => {
    const duration = 2000;
    const end = Date.now() + duration;

    const colors = ['#ff6b35', '#ff8c42', '#ffd166'];

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 30,
        origin: { x: 0, y: 1 },
        colors: colors,
        shapes: ['circle'],
        gravity: 1.2,
        drift: 0.5,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 30,
        origin: { x: 1, y: 1 },
        colors: colors,
        shapes: ['circle'],
        gravity: 1.2,
        drift: -0.5,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  },
};

export function ConfettiEffect({
  trigger = false,
  type = 'celebration',
  onComplete,
}: ConfettiEffectProps) {
  const hasTriggered = useRef(false);

  const fireConfetti = useCallback(() => {
    confettiConfigs[type]();

    setTimeout(() => {
      onComplete?.();
    }, 3000);
  }, [type, onComplete]);

  useEffect(() => {
    if (trigger && !hasTriggered.current) {
      hasTriggered.current = true;
      fireConfetti();
    }

    if (!trigger) {
      hasTriggered.current = false;
    }
  }, [trigger, fireConfetti]);

  return null;
}

export function useConfetti() {
  const fire = useCallback((type: ConfettiType = 'celebration') => {
    confettiConfigs[type]();
  }, []);

  return { fire };
}

export default ConfettiEffect;
