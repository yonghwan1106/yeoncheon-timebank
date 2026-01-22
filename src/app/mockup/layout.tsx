'use client';

export default function MockupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mockup-layout">
      {children}
      <style jsx global>{`
        /* 목업 페이지에서 기본 레이아웃 숨기기 */
        body > div > .fixed,
        body > div > .flex > header,
        body > div > .flex > aside,
        body > div > .flex > nav,
        body > div > div:first-child,
        [class*="sidebar"],
        [class*="header"],
        [class*="bottom-nav"] {
          display: none !important;
        }

        /* 메인 컨텐츠를 전체 화면으로 */
        body > div > .flex {
          display: block !important;
        }

        body > div > .flex > main {
          padding: 0 !important;
          margin: 0 !important;
          width: 100vw !important;
          max-width: 100vw !important;
        }

        .mockup-layout {
          position: fixed;
          inset: 0;
          overflow: auto;
        }
      `}</style>
    </div>
  );
}
