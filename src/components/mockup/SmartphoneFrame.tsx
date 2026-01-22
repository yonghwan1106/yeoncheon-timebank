'use client';

import { ReactNode } from 'react';

interface SmartphoneFrameProps {
  children: ReactNode;
  className?: string;
  rotateY?: number;
  rotateX?: number;
  scale?: number;
}

export function SmartphoneFrame({
  children,
  className = '',
  rotateY = -15,
  rotateX = 5,
  scale = 1,
}: SmartphoneFrameProps) {
  return (
    <div
      className={`smartphone-container ${className}`}
      style={{
        transform: `perspective(1200px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* iPhone-style Frame */}
      <div className="smartphone-frame">
        {/* Outer bezel */}
        <div className="smartphone-bezel">
          {/* Dynamic Island / Notch */}
          <div className="smartphone-notch">
            <div className="notch-camera" />
            <div className="notch-speaker" />
          </div>

          {/* Screen */}
          <div className="smartphone-screen">
            {/* Status Bar */}
            <div className="status-bar">
              <span className="status-time">9:41</span>
              <div className="status-icons">
                <svg className="signal-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <rect x="1" y="14" width="4" height="8" rx="1" />
                  <rect x="7" y="10" width="4" height="12" rx="1" />
                  <rect x="13" y="6" width="4" height="16" rx="1" />
                  <rect x="19" y="2" width="4" height="20" rx="1" />
                </svg>
                <svg className="wifi-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0-6c3.03 0 5.78 1.23 7.76 3.22l-2.12 2.12C16.2 15.9 14.2 15 12 15s-4.2.9-5.64 2.34l-2.12-2.12C6.22 13.23 8.97 12 12 12zm0-6c4.42 0 8.44 1.8 11.33 4.71l-2.12 2.12C18.78 10.4 15.56 9 12 9s-6.78 1.4-9.21 3.83l-2.12-2.12C3.56 7.8 7.58 6 12 6z"/>
                </svg>
                <div className="battery-icon">
                  <div className="battery-level" style={{ width: '85%' }} />
                </div>
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
        <div className="side-button silent-switch" />

        {/* Frame Reflection */}
        <div className="frame-reflection" />
      </div>

      {/* Shadow */}
      <div className="smartphone-shadow" />

      <style jsx>{`
        .smartphone-container {
          position: relative;
          display: inline-block;
        }

        .smartphone-frame {
          position: relative;
          width: 375px;
          height: 812px;
          background: linear-gradient(
            145deg,
            #2a2a2a 0%,
            #1a1a1a 50%,
            #0a0a0a 100%
          );
          border-radius: 55px;
          padding: 12px;
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 0 0 1px rgba(255, 255, 255, 0.05),
            0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .smartphone-bezel {
          position: relative;
          width: 100%;
          height: 100%;
          background: #000;
          border-radius: 45px;
          overflow: hidden;
        }

        .smartphone-notch {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 126px;
          height: 34px;
          background: #000;
          border-radius: 20px;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .notch-camera {
          width: 10px;
          height: 10px;
          background: radial-gradient(circle at 30% 30%, #3a3a4a, #1a1a2a);
          border-radius: 50%;
          box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.1);
        }

        .notch-speaker {
          width: 50px;
          height: 6px;
          background: #2a2a2a;
          border-radius: 3px;
        }

        .smartphone-screen {
          width: 100%;
          height: 100%;
          background: #fff;
          border-radius: 45px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .status-bar {
          height: 54px;
          padding: 14px 28px 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background: transparent;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 5;
        }

        .status-time {
          font-size: 15px;
          font-weight: 600;
          color: #000;
        }

        .status-icons {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .signal-icon,
        .wifi-icon {
          width: 16px;
          height: 16px;
          color: #000;
        }

        .battery-icon {
          width: 24px;
          height: 11px;
          border: 1.5px solid #000;
          border-radius: 3px;
          padding: 1px;
          position: relative;
        }

        .battery-icon::after {
          content: '';
          position: absolute;
          right: -4px;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          height: 5px;
          background: #000;
          border-radius: 0 2px 2px 0;
        }

        .battery-level {
          height: 100%;
          background: #000;
          border-radius: 1px;
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
          width: 134px;
          height: 5px;
          background: #000;
          border-radius: 3px;
          opacity: 0.3;
        }

        /* Side Buttons */
        .side-button {
          position: absolute;
          background: linear-gradient(
            to right,
            #1a1a1a 0%,
            #3a3a3a 50%,
            #1a1a1a 100%
          );
        }

        .power-button {
          right: -3px;
          top: 180px;
          width: 3px;
          height: 80px;
          border-radius: 0 3px 3px 0;
        }

        .volume-up {
          left: -3px;
          top: 140px;
          width: 3px;
          height: 50px;
          border-radius: 3px 0 0 3px;
        }

        .volume-down {
          left: -3px;
          top: 200px;
          width: 3px;
          height: 50px;
          border-radius: 3px 0 0 3px;
        }

        .silent-switch {
          left: -3px;
          top: 100px;
          width: 3px;
          height: 25px;
          border-radius: 3px 0 0 3px;
        }

        .frame-reflection {
          position: absolute;
          top: 0;
          left: 0;
          right: 50%;
          bottom: 50%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 50%
          );
          border-radius: 55px 0 0 0;
          pointer-events: none;
        }

        .smartphone-shadow {
          position: absolute;
          bottom: -20px;
          left: 10%;
          right: 10%;
          height: 40px;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 0.3) 0%,
            transparent 70%
          );
          filter: blur(10px);
          transform: rotateX(80deg);
        }
      `}</style>
    </div>
  );
}

export default SmartphoneFrame;
