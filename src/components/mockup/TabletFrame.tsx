'use client';

import { ReactNode } from 'react';

interface TabletFrameProps {
  children: ReactNode;
  className?: string;
  rotateY?: number;
  rotateX?: number;
  scale?: number;
  orientation?: 'portrait' | 'landscape';
}

export function TabletFrame({
  children,
  className = '',
  rotateY = 10,
  rotateX = 3,
  scale = 1,
  orientation = 'landscape',
}: TabletFrameProps) {
  const isLandscape = orientation === 'landscape';
  const width = isLandscape ? 1024 : 768;
  const height = isLandscape ? 768 : 1024;

  return (
    <div
      className={`tablet-container ${className}`}
      style={{
        transform: `perspective(1200px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* iPad-style Frame */}
      <div className="tablet-frame" data-orientation={orientation}>
        {/* Outer bezel */}
        <div className="tablet-bezel">
          {/* Camera */}
          <div className="tablet-camera" />

          {/* Screen */}
          <div className="tablet-screen">
            {/* Status Bar */}
            <div className="status-bar">
              <span className="status-time">9:41</span>
              <div className="status-icons">
                <svg className="wifi-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0-6c3.03 0 5.78 1.23 7.76 3.22l-2.12 2.12C16.2 15.9 14.2 15 12 15s-4.2.9-5.64 2.34l-2.12-2.12C6.22 13.23 8.97 12 12 12zm0-6c4.42 0 8.44 1.8 11.33 4.71l-2.12 2.12C18.78 10.4 15.56 9 12 9s-6.78 1.4-9.21 3.83l-2.12-2.12C3.56 7.8 7.58 6 12 6z"/>
                </svg>
                <div className="battery-icon">
                  <div className="battery-level" style={{ width: '92%' }} />
                </div>
                <span className="battery-percent">92%</span>
              </div>
            </div>

            {/* App Content */}
            <div className="screen-content">
              {children}
            </div>

            {/* Home Indicator */}
            <div className="home-indicator" />
          </div>
        </div>

        {/* Side Buttons */}
        <div className="side-button power-button" />
        <div className="side-button volume-up" />
        <div className="side-button volume-down" />

        {/* Frame Reflection */}
        <div className="frame-reflection" />
      </div>

      {/* Shadow */}
      <div className="tablet-shadow" />

      <style jsx>{`
        .tablet-container {
          position: relative;
          display: inline-block;
        }

        .tablet-frame {
          position: relative;
          width: ${width}px;
          height: ${height}px;
          background: linear-gradient(
            145deg,
            #3a3a3a 0%,
            #2a2a2a 50%,
            #1a1a1a 100%
          );
          border-radius: 32px;
          padding: 16px;
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 0 0 1px rgba(255, 255, 255, 0.05),
            0 30px 60px -15px rgba(0, 0, 0, 0.5);
        }

        .tablet-bezel {
          position: relative;
          width: 100%;
          height: 100%;
          background: #000;
          border-radius: 20px;
          overflow: hidden;
        }

        .tablet-camera {
          position: absolute;
          ${isLandscape ? 'top: 50%; left: 10px; transform: translateY(-50%);' : 'top: 10px; left: 50%; transform: translateX(-50%);'}
          width: 10px;
          height: 10px;
          background: radial-gradient(circle at 30% 30%, #3a3a4a, #1a1a2a);
          border-radius: 50%;
          box-shadow: 0 0 0 2px #222;
          z-index: 10;
        }

        .tablet-screen {
          width: 100%;
          height: 100%;
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .status-bar {
          height: 44px;
          padding: 10px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: transparent;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 5;
        }

        .status-time {
          font-size: 16px;
          font-weight: 600;
          color: #000;
        }

        .status-icons {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .wifi-icon {
          width: 18px;
          height: 18px;
          color: #000;
        }

        .battery-icon {
          width: 28px;
          height: 13px;
          border: 2px solid #000;
          border-radius: 4px;
          padding: 1px;
          position: relative;
        }

        .battery-icon::after {
          content: '';
          position: absolute;
          right: -5px;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 6px;
          background: #000;
          border-radius: 0 2px 2px 0;
        }

        .battery-level {
          height: 100%;
          background: #000;
          border-radius: 2px;
        }

        .battery-percent {
          font-size: 14px;
          font-weight: 500;
          color: #000;
        }

        .screen-content {
          flex: 1;
          overflow: hidden;
          background: oklch(0.985 0.002 106.424);
        }

        .home-indicator {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 180px;
          height: 5px;
          background: #000;
          border-radius: 3px;
          opacity: 0.2;
        }

        /* Side Buttons */
        .side-button {
          position: absolute;
          background: linear-gradient(
            ${isLandscape ? 'to bottom' : 'to right'},
            #1a1a1a 0%,
            #4a4a4a 50%,
            #1a1a1a 100%
          );
        }

        .power-button {
          ${isLandscape ? `
            top: -3px;
            right: 80px;
            width: 60px;
            height: 3px;
            border-radius: 3px 3px 0 0;
          ` : `
            right: -3px;
            top: 60px;
            width: 3px;
            height: 60px;
            border-radius: 0 3px 3px 0;
          `}
        }

        .volume-up {
          ${isLandscape ? `
            top: -3px;
            right: 160px;
            width: 40px;
            height: 3px;
            border-radius: 3px 3px 0 0;
          ` : `
            right: -3px;
            top: 140px;
            width: 3px;
            height: 40px;
            border-radius: 0 3px 3px 0;
          `}
        }

        .volume-down {
          ${isLandscape ? `
            top: -3px;
            right: 210px;
            width: 40px;
            height: 3px;
            border-radius: 3px 3px 0 0;
          ` : `
            right: -3px;
            top: 190px;
            width: 3px;
            height: 40px;
            border-radius: 0 3px 3px 0;
          `}
        }

        .frame-reflection {
          position: absolute;
          top: 0;
          left: 0;
          right: 60%;
          bottom: 60%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 50%
          );
          border-radius: 32px 0 0 0;
          pointer-events: none;
        }

        .tablet-shadow {
          position: absolute;
          bottom: -25px;
          left: 8%;
          right: 8%;
          height: 50px;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 0.3) 0%,
            transparent 70%
          );
          filter: blur(12px);
          transform: rotateX(80deg);
        }
      `}</style>
    </div>
  );
}

export default TabletFrame;
