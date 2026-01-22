'use client';

import { useRef, useEffect, useCallback, useState } from 'react';

interface TiltOptions {
  max?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
  maxGlare?: number;
}

interface TiltValues {
  tiltX: number;
  tiltY: number;
  percentX: number;
  percentY: number;
}

export function useTiltEffect<T extends HTMLElement = HTMLDivElement>(
  options: TiltOptions = {}
) {
  const {
    max = 10,
    perspective = 1000,
    scale = 1.02,
    speed = 300,
    glare = true,
    maxGlare = 0.2,
  } = options;

  const ref = useRef<T>(null);
  const [tilt, setTilt] = useState<TiltValues>({
    tiltX: 0,
    tiltY: 0,
    percentX: 50,
    percentY: 50,
  });
  const [isHovering, setIsHovering] = useState(false);

  const calculateTilt = useCallback(
    (e: MouseEvent): TiltValues => {
      if (!ref.current) return { tiltX: 0, tiltY: 0, percentX: 50, percentY: 50 };

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      const tiltX = ((percentY - 50) / 50) * max;
      const tiltY = ((percentX - 50) / 50) * -max;

      return { tiltX, tiltY, percentX, percentY };
    },
    [max]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const values = calculateTilt(e);
      setTilt(values);
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setTilt({ tiltX: 0, tiltY: 0, percentX: 50, percentY: 50 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [calculateTilt]);

  const style = {
    transform: isHovering
      ? `perspective(${perspective}px) rotateX(${tilt.tiltX}deg) rotateY(${tilt.tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`
      : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
    willChange: 'transform' as const,
  };

  const glareStyle = glare
    ? {
        background: `linear-gradient(
          ${105 + tilt.tiltY * 2}deg,
          transparent 40%,
          rgba(255, 255, 255, ${Math.min(maxGlare, (Math.abs(tilt.tiltX) + Math.abs(tilt.tiltY)) / max * maxGlare)}) 45%,
          rgba(255, 255, 255, ${Math.min(maxGlare * 1.5, (Math.abs(tilt.tiltX) + Math.abs(tilt.tiltY)) / max * maxGlare * 1.5)}) 50%,
          rgba(255, 255, 255, ${Math.min(maxGlare, (Math.abs(tilt.tiltX) + Math.abs(tilt.tiltY)) / max * maxGlare)}) 55%,
          transparent 60%
        )`,
        opacity: isHovering ? 1 : 0,
        transition: `opacity ${speed}ms ease`,
        position: 'absolute' as const,
        inset: 0,
        pointerEvents: 'none' as const,
        borderRadius: 'inherit' as const,
      }
    : null;

  return {
    ref,
    style,
    glareStyle,
    tilt,
    isHovering,
  };
}

export default useTiltEffect;
