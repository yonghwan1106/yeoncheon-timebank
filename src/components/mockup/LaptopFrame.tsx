'use client';

import { ReactNode } from 'react';

interface LaptopFrameProps {
  children: ReactNode;
  className?: string;
  rotateY?: number;
  rotateX?: number;
  scale?: number;
}

export function LaptopFrame({
  children,
  className = '',
  rotateY = 15,
  rotateX = 10,
  scale = 1,
}: LaptopFrameProps) {
  return (
    <div
      className={`laptop-container ${className}`}
      style={{
        transform: `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* MacBook-style Frame */}
      <div className="laptop-frame">
        {/* Screen Part */}
        <div className="laptop-lid">
          {/* Camera */}
          <div className="laptop-camera" />

          {/* Screen Bezel */}
          <div className="laptop-bezel">
            {/* Screen */}
            <div className="laptop-screen">
              {/* Browser Chrome */}
              <div className="browser-chrome">
                <div className="browser-buttons">
                  <span className="browser-btn close" />
                  <span className="browser-btn minimize" />
                  <span className="browser-btn maximize" />
                </div>
                <div className="browser-tabs">
                  <div className="browser-tab active">
                    <span className="tab-favicon">🌿</span>
                    <span className="tab-title">연천 타임뱅크</span>
                  </div>
                </div>
                <div className="browser-url-bar">
                  <svg className="lock-icon" viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                    <path d="M12 1C8.676 1 6 3.676 6 7v2H4v14h16V9h-2V7c0-3.324-2.676-6-6-6zm0 2c2.276 0 4 1.724 4 4v2H8V7c0-2.276 1.724-4 4-4zm0 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
                  </svg>
                  <span className="url-text">timebank.yeoncheon.go.kr</span>
                </div>
              </div>

              {/* Page Content */}
              <div className="screen-content">
                {children}
              </div>
            </div>
          </div>

          {/* Screen Reflection */}
          <div className="screen-reflection" />
        </div>

        {/* Keyboard Part */}
        <div className="laptop-base">
          {/* Keyboard */}
          <div className="keyboard">
            {/* Keyboard rows representation */}
            {[...Array(5)].map((_, rowIdx) => (
              <div key={rowIdx} className="key-row">
                {[...Array(rowIdx === 4 ? 8 : 12 + (rowIdx % 2))].map((_, keyIdx) => (
                  <div
                    key={keyIdx}
                    className={`key ${rowIdx === 4 && keyIdx === 4 ? 'space-key' : ''}`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Trackpad */}
          <div className="trackpad" />

          {/* Base Edge */}
          <div className="base-edge" />
        </div>

        {/* Hinge */}
        <div className="laptop-hinge" />
      </div>

      {/* Shadow */}
      <div className="laptop-shadow" />

      <style jsx>{`
        .laptop-container {
          position: relative;
          display: inline-block;
        }

        .laptop-frame {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Screen/Lid Part */
        .laptop-lid {
          position: relative;
          width: 900px;
          background: linear-gradient(
            180deg,
            #e8e8e8 0%,
            #d0d0d0 100%
          );
          border-radius: 20px 20px 0 0;
          padding: 16px 16px 0 16px;
          transform-origin: bottom center;
          box-shadow:
            0 0 0 1px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }

        .laptop-camera {
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 8px;
          background: radial-gradient(circle at 30% 30%, #4a4a5a, #1a1a2a);
          border-radius: 50%;
          box-shadow: 0 0 0 2px #333;
        }

        .laptop-bezel {
          background: #1a1a1a;
          border-radius: 8px 8px 0 0;
          padding: 8px 8px 0 8px;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        .laptop-screen {
          width: 860px;
          height: 538px;
          background: #fff;
          border-radius: 4px 4px 0 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .browser-chrome {
          height: 72px;
          background: linear-gradient(180deg, #f5f5f5 0%, #e8e8e8 100%);
          border-bottom: 1px solid #ddd;
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .browser-buttons {
          display: flex;
          gap: 6px;
        }

        .browser-btn {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .browser-btn.close {
          background: #ff5f57;
        }

        .browser-btn.minimize {
          background: #febc2e;
        }

        .browser-btn.maximize {
          background: #28c840;
        }

        .browser-tabs {
          display: flex;
          margin-top: 2px;
        }

        .browser-tab {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #fff;
          padding: 6px 16px;
          border-radius: 8px 8px 0 0;
          font-size: 12px;
          color: #333;
          box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.05);
        }

        .tab-favicon {
          font-size: 14px;
        }

        .tab-title {
          font-weight: 500;
        }

        .browser-url-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #fff;
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 12px;
          color: #666;
          max-width: 400px;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .lock-icon {
          color: #28c840;
        }

        .url-text {
          color: #333;
        }

        .screen-content {
          flex: 1;
          overflow: hidden;
          background: oklch(0.985 0.002 106.424);
        }

        .screen-reflection {
          position: absolute;
          top: 16px;
          left: 16px;
          right: 60%;
          bottom: 60%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.15) 0%,
            transparent 50%
          );
          border-radius: 8px;
          pointer-events: none;
        }

        /* Base/Keyboard Part */
        .laptop-base {
          width: 920px;
          height: 32px;
          background: linear-gradient(
            180deg,
            #c8c8c8 0%,
            #b0b0b0 50%,
            #a0a0a0 100%
          );
          border-radius: 0 0 20px 20px;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .keyboard {
          display: none;
        }

        .trackpad {
          display: none;
        }

        .base-edge {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 6px;
          background: linear-gradient(
            to bottom,
            #888,
            #666
          );
          border-radius: 0 0 3px 3px;
        }

        .laptop-hinge {
          width: 920px;
          height: 8px;
          background: linear-gradient(
            180deg,
            #888 0%,
            #666 100%
          );
          border-radius: 0 0 2px 2px;
          position: relative;
          top: -1px;
        }

        .laptop-shadow {
          position: absolute;
          bottom: -30px;
          left: 5%;
          right: 5%;
          height: 50px;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 0.25) 0%,
            transparent 70%
          );
          filter: blur(15px);
          transform: rotateX(80deg);
        }
      `}</style>
    </div>
  );
}

export default LaptopFrame;
