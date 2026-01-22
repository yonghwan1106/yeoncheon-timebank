'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, Heart, Wallet, HelpCircle, Volume2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { demoSenior } from '@/lib/mock-data';

export default function SeniorModePage() {
  const user = demoSenior;

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 -m-4 md:-m-6 p-6" data-mode="senior">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-green-800 mb-2">
          안녕하세요, {user.name}님!
        </h1>
        <p className="text-xl text-green-700">
          무엇을 도와드릴까요?
        </p>
        <Button
          variant="ghost"
          size="lg"
          className="mt-4 text-green-700"
          onClick={() => speak(`안녕하세요 ${user.name}님, 무엇을 도와드릴까요?`)}
        >
          <Volume2 className="h-6 w-6 mr-2" />
          음성으로 듣기
        </Button>
      </motion.div>

      {/* Credit Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-white border-4 border-green-300 mb-8">
          <CardContent className="p-8 text-center">
            <p className="text-xl text-gray-600 mb-2">내 타임크레딧</p>
            <p className="text-6xl font-bold text-green-600 mb-2">
              {user.totalCredits}
              <span className="text-3xl ml-2">TC</span>
            </p>
            <p className="text-lg text-gray-500">
              약 {(user.totalCredits * 5000).toLocaleString()}원 가치
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Big Action Buttons */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <BigButton
            icon={<Heart className="h-10 w-10" />}
            title="도움 요청하기"
            description="젊은 군인에게 도움을 요청해요"
            href="/senior/help"
            color="bg-red-500 hover:bg-red-600"
            onClick={() => speak('도움 요청하기 버튼입니다')}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <BigButton
            icon={<Wallet className="h-10 w-10" />}
            title="크레딧 확인"
            description="내 타임크레딧을 확인해요"
            href="/senior/wallet"
            color="bg-blue-500 hover:bg-blue-600"
            onClick={() => speak('크레딧 확인 버튼입니다')}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <BigButton
            icon={<Phone className="h-10 w-10" />}
            title="전화 문의"
            description="담당자에게 전화해요"
            href="tel:031-839-2000"
            color="bg-green-500 hover:bg-green-600"
            onClick={() => speak('전화 문의 버튼입니다')}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <BigButton
            icon={<HelpCircle className="h-10 w-10" />}
            title="사용 방법"
            description="타임뱅크 사용법을 알아봐요"
            href="/senior/guide"
            color="bg-purple-500 hover:bg-purple-600"
            onClick={() => speak('사용 방법 버튼입니다')}
          />
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <Card className="bg-white border-2 border-green-200">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              최근 도움 받은 내역
            </h2>
            <div className="space-y-4">
              <RecentActivity
                icon="💻"
                title="스마트폰 교육"
                helper="김태현 병장"
                date="3일 전"
              />
              <RecentActivity
                icon="🌾"
                title="고추 수확 도움"
                helper="이준호 상병"
                date="1주일 전"
              />
              <RecentActivity
                icon="🏥"
                title="병원 동행"
                helper="박성민 병장"
                date="2주일 전"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Emergency Contact */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 p-6 bg-red-50 border-2 border-red-200 rounded-2xl text-center"
      >
        <p className="text-xl text-red-700 mb-3">긴급 연락처</p>
        <a
          href="tel:119"
          className="text-4xl font-bold text-red-600 hover:text-red-700"
        >
          119
        </a>
        <p className="text-lg text-red-600 mt-2">응급 상황시 연락하세요</p>
      </motion.div>
    </div>
  );
}

function BigButton({
  icon,
  title,
  description,
  href,
  color,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: string;
  onClick?: () => void;
}) {
  return (
    <Link href={href} onClick={onClick}>
      <Card
        className={`${color} text-white border-none cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]`}
      >
        <CardContent className="p-6 flex items-center gap-6">
          <div className="p-4 bg-white/20 rounded-2xl">{icon}</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-1">{title}</h3>
            <p className="text-lg opacity-90">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function RecentActivity({
  icon,
  title,
  helper,
  date,
}: {
  icon: string;
  title: string;
  helper: string;
  date: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
      <span className="text-4xl">{icon}</span>
      <div className="flex-1">
        <p className="text-xl font-semibold text-gray-800">{title}</p>
        <p className="text-lg text-gray-600">도우미: {helper}</p>
      </div>
      <p className="text-lg text-gray-500">{date}</p>
    </div>
  );
}
