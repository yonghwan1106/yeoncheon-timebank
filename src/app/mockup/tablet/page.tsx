'use client';

import { TabletFrame } from '@/components/mockup';
import { MockupDashboard } from '@/components/mockup/MockupDashboard';

export default function TabletMockupPage() {
  return (
    <div className="mockup-page">
      <div className="mockup-container">
        <TabletFrame rotateY={10} rotateX={5} scale={0.75} orientation="landscape">
          <MockupDashboard variant="tablet" />
        </TabletFrame>
      </div>

      <style jsx global>{`
        /* 전체 레이아웃 숨기기 */
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
          overflow: auto !important;
        }
      `}</style>

      <style jsx>{`
        .mockup-page {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
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
          z-index: 9999;
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .mockup-container {
          position: relative;
        }

        .mockup-container::after {
          content: '';
          position: absolute;
          bottom: -70px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 70px;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 0.2) 0%,
            transparent 70%
          );
          filter: blur(22px);
        }
      `}</style>
    </div>
  );
}
