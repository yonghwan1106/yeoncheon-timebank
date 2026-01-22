import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, Sidebar, BottomNav } from "@/components/layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "연천 타임뱅크 | 민-관-군 상생 플랫폼",
  description: "1시간 봉사 = 1 타임크레딧. 군 장병과 고령 농가를 잇는 블록체인 기반 타임뱅크 플랫폼",
  keywords: ["연천", "타임뱅크", "봉사", "군인", "어르신", "블록체인", "DMZ"],
  authors: [{ name: "연천군" }],
  openGraph: {
    title: "연천 타임뱅크",
    description: "민-관-군 상생 타임뱅크 플랫폼",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6 overflow-x-hidden">
              {children}
            </main>
          </div>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
