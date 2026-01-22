'use client';

import { useState, useEffect } from 'react';
import { SmartphoneFrame, LaptopFrame, TabletFrame } from '@/components/mockup';
import { MockupDashboard } from '@/components/mockup/MockupDashboard';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export default function MockupGalleryPage() {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // 디바이스 타입 결정
      if (width < 768) {
        setDeviceType('mobile');
        // 스마트폰 프레임 크기(375px)에 맞춰 스케일 조정
        const baseScale = Math.min(width / 420, height / 900);
        setScale(Math.min(baseScale, 1));
      } else if (width < 1200) {
        setDeviceType('tablet');
        // 태블릿 프레임 크기에 맞춰 스케일 조정
        const baseScale = Math.min(width / 1100, height / 850);
        setScale(Math.min(baseScale, 0.85));
      } else {
        setDeviceType('desktop');
        // 멀티 디바이스 레이아웃에 맞춰 스케일 조정
        const baseScale = Math.min(width / 1400, height / 950);
        setScale(Math.min(baseScale, 1));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="mockup-gallery">
      {/* 헤더 */}
      <div className="gallery-header">
        <h1>연천 타임뱅크</h1>
        <p className="subtitle">
          {deviceType === 'mobile' && '모바일 앱'}
          {deviceType === 'tablet' && '태블릿 앱'}
          {deviceType === 'desktop' && '멀티 플랫폼 지원'}
        </p>
      </div>

      {/* 디바이스 표시 영역 */}
      <div className="device-display">
        {/* 모바일: 스마트폰만 */}
        {deviceType === 'mobile' && (
          <div className="single-device" style={{ transform: `scale(${scale})` }}>
            <SmartphoneFrame rotateY={0} rotateX={0} scale={1}>
              <MockupDashboard variant="mobile" />
            </SmartphoneFrame>
          </div>
        )}

        {/* 태블릿: 태블릿 + 작은 스마트폰 */}
        {deviceType === 'tablet' && (
          <div className="tablet-layout" style={{ transform: `scale(${scale})` }}>
            <div className="tablet-main">
              <TabletFrame rotateY={5} rotateX={3} scale={0.8} orientation="landscape">
                <MockupDashboard variant="tablet" />
              </TabletFrame>
            </div>
            <div className="tablet-phone">
              <SmartphoneFrame rotateY={-10} rotateX={5} scale={0.5}>
                <MockupDashboard variant="mobile" />
              </SmartphoneFrame>
            </div>
          </div>
        )}

        {/* 데스크톱: 모든 디바이스 */}
        {deviceType === 'desktop' && (
          <div className="multi-device" style={{ transform: `scale(${scale})` }}>
            {/* 노트북 - 중앙 뒤 */}
            <div className="device laptop">
              <LaptopFrame rotateY={0} rotateX={5} scale={0.6}>
                <MockupDashboard variant="desktop" />
              </LaptopFrame>
            </div>

            {/* 태블릿 - 왼쪽 앞 */}
            <div className="device tablet">
              <TabletFrame rotateY={18} rotateX={3} scale={0.5}>
                <MockupDashboard variant="tablet" />
              </TabletFrame>
            </div>

            {/* 스마트폰 - 오른쪽 앞 */}
            <div className="device smartphone">
              <SmartphoneFrame rotateY={-15} rotateX={5} scale={0.7}>
                <MockupDashboard variant="mobile" />
              </SmartphoneFrame>
            </div>
          </div>
        )}
      </div>

      {/* 디바이스 인디케이터 */}
      <div className="device-indicator">
        <button
          className={`indicator-btn ${deviceType === 'mobile' ? 'active' : ''}`}
          onClick={() => {
            setDeviceType('mobile');
            setScale(0.9);
          }}
        >
          📱
        </button>
        <button
          className={`indicator-btn ${deviceType === 'tablet' ? 'active' : ''}`}
          onClick={() => {
            setDeviceType('tablet');
            setScale(0.7);
          }}
        >
          📱
        </button>
        <button
          className={`indicator-btn ${deviceType === 'desktop' ? 'active' : ''}`}
          onClick={() => {
            setDeviceType('desktop');
            setScale(0.85);
          }}
        >
          💻
        </button>
      </div>

      <style jsx global>{`
        body > div > .fixed,
        body > div > div:first-child {
          display: none !important;
        }
        body > div > .flex {
          display: contents !important;
        }
        body > div > .flex > *:not(main) {
          display: none !important;
        }
        body > div > .flex > main {
          padding: 0 !important;
          margin: 0 !important;
          position: fixed !important;
          inset: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          max-width: none !important;
          overflow: hidden !important;
        }
      `}</style>

      <style jsx>{`
        .mockup-gallery {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(
            135deg,
            oklch(0.95 0.04 145) 0%,
            oklch(0.96 0.03 240) 25%,
            oklch(0.97 0.02 85) 50%,
            oklch(0.95 0.04 145) 75%,
            oklch(0.96 0.03 200) 100%
          );
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
          display: flex;
          flex-direction: column;
          z-index: 9999;
          overflow: hidden;
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .gallery-header {
          text-align: center;
          padding: 20px;
          flex-shrink: 0;
        }

        .gallery-header h1 {
          font-size: clamp(24px, 5vw, 42px);
          font-weight: 800;
          background: linear-gradient(135deg, oklch(0.55 0.15 145), oklch(0.65 0.12 240));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 4px 0;
        }

        .subtitle {
          font-size: clamp(12px, 2.5vw, 16px);
          color: oklch(0.5 0.05 145);
          font-weight: 500;
          margin: 0;
        }

        .device-display {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          overflow: hidden;
        }

        /* 모바일 - 단일 디바이스 */
        .single-device {
          transform-origin: center center;
          transition: transform 0.3s ease;
        }

        /* 태블릿 레이아웃 */
        .tablet-layout {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-origin: center center;
          transition: transform 0.3s ease;
        }

        .tablet-main {
          z-index: 1;
        }

        .tablet-phone {
          position: absolute;
          right: -100px;
          bottom: -50px;
          z-index: 2;
        }

        /* 데스크톱 - 멀티 디바이스 */
        .multi-device {
          position: relative;
          width: 1200px;
          height: 750px;
          display: flex;
          justify-content: center;
          align-items: center;
          transform-origin: center center;
          transition: transform 0.3s ease;
        }

        .device {
          position: absolute;
          transition: all 0.5s ease;
        }

        .laptop {
          z-index: 1;
          transform: translateY(-20px);
        }

        .tablet {
          z-index: 2;
          left: -30px;
          transform: translateX(-180px) translateY(100px);
        }

        .smartphone {
          z-index: 3;
          right: -30px;
          transform: translateX(300px) translateY(130px);
        }

        /* 디바이스 인디케이터 */
        .device-indicator {
          display: flex;
          justify-content: center;
          gap: 12px;
          padding: 16px;
          flex-shrink: 0;
        }

        .indicator-btn {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.5);
          font-size: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .indicator-btn:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: scale(1.1);
        }

        .indicator-btn.active {
          background: oklch(0.55 0.15 145);
          border-color: oklch(0.55 0.15 145);
          box-shadow: 0 4px 12px oklch(0.55 0.15 145 / 0.4);
        }

        /* 반응형 미디어 쿼리 */
        @media (max-width: 767px) {
          .gallery-header {
            padding: 12px;
          }

          .device-indicator {
            padding: 12px;
          }

          .indicator-btn {
            width: 40px;
            height: 40px;
            font-size: 18px;
          }
        }

        @media (min-width: 768px) and (max-width: 1199px) {
          .tablet-phone {
            right: -80px;
            bottom: -30px;
          }
        }
      `}</style>
    </div>
  );
}
