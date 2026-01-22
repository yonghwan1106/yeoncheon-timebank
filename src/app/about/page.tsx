'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Heart,
  Leaf,
  Shield,
  Smartphone,
  Award,
  TrendingUp,
  MapPin,
  Clock,
  Coins,
  Building,
  Target,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function AboutPage() {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-green-600 text-white p-8 md:p-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-4xl">🌿</span>
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
              2025 연천군 테마형 아이디어 공모전
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            연천 타임뱅크
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6">
            민-관-군 상생 플랫폼
          </p>
          <p className="text-lg text-white/80 max-w-2xl">
            1시간 봉사 = 1 타임크레딧. 군 장병과 고령 농가를 연결하는
            블록체인 기반 타임뱅크 플랫폼으로 지역 상생의 새로운 모델을 제시합니다.
          </p>
        </div>
      </motion.section>

      {/* Problem & Solution */}
      <section className="grid md:grid-cols-2 gap-6">
        <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
          <Card className="h-full border-red-200 bg-red-50/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Target className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-red-900">문제 인식</h2>
              </div>
              <ul className="space-y-3 text-red-800">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>연천군 고령화율 29.9% (경기도 1위)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>농촌 일손 부족으로 어르신들 농사 어려움</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>군 장병 사회봉사 기회 제한적</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>지역 내 세대 간 교류 단절</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
          <Card className="h-full border-green-200 bg-green-50/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Lightbulb className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-green-900">해결 방안</h2>
              </div>
              <ul className="space-y-3 text-green-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>타임뱅크 기반 봉사-보상 시스템 구축</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>군 장병-어르신 AI 매칭 서비스</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>블록체인으로 투명한 크레딧 관리</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>지역 가맹점 연계로 경제 활성화</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Core Concept */}
      <motion.section {...fadeInUp} transition={{ delay: 0.3 }}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Coins className="h-6 w-6 text-primary" />
          핵심 개념: 타임크레딧(TC)
        </h2>
        <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-4xl font-bold text-amber-600 mb-2">1시간</div>
                <div className="text-lg font-medium text-amber-800">봉사 활동</div>
                <div className="text-sm text-amber-600 mt-1">농사일, 디지털 교육 등</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-3xl">=</div>
              </div>
              <div className="text-center p-4">
                <div className="text-4xl font-bold text-primary mb-2">1 TC</div>
                <div className="text-lg font-medium text-green-800">타임크레딧</div>
                <div className="text-sm text-green-600 mt-1">지역 가맹점에서 사용</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Key Features */}
      <motion.section {...fadeInUp} transition={{ delay: 0.4 }}>
        <h2 className="text-2xl font-bold mb-6">주요 기능</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Heart, title: '봉사 매칭', desc: 'AI 기반 군인-어르신 매칭', color: 'text-red-500 bg-red-100' },
            { icon: Shield, title: '블록체인', desc: '투명한 크레딧 거래 기록', color: 'text-blue-500 bg-blue-100' },
            { icon: Smartphone, title: '어르신 모드', desc: '큰 글씨, 간편한 UI', color: 'text-green-500 bg-green-100' },
            { icon: Building, title: '가맹점 연계', desc: '지역 상점에서 TC 사용', color: 'text-purple-500 bg-purple-100' },
            { icon: Award, title: '게이미피케이션', desc: '레벨, 뱃지, 리더보드', color: 'text-amber-500 bg-amber-100' },
            { icon: TrendingUp, title: '통계 대시보드', desc: '실시간 활동 현황', color: 'text-cyan-500 bg-cyan-100' },
          ].map((feature, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`p-2 rounded-lg ${feature.color}`}>
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Stakeholders */}
      <motion.section {...fadeInUp} transition={{ delay: 0.5 }}>
        <h2 className="text-2xl font-bold mb-6">참여 주체</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-t-4 border-t-green-500">
            <CardContent className="p-6 text-center">
              <span className="text-5xl mb-4 block">🪖</span>
              <h3 className="text-xl font-bold mb-2">군 장병</h3>
              <p className="text-muted-foreground text-sm">
                봉사활동으로 TC 적립<br />
                지역사회 기여 경험<br />
                디지털 역량 활용
              </p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-amber-500">
            <CardContent className="p-6 text-center">
              <span className="text-5xl mb-4 block">👵</span>
              <h3 className="text-xl font-bold mb-2">어르신</h3>
              <p className="text-muted-foreground text-sm">
                농사일 도움 받기<br />
                디지털 교육 수강<br />
                지혜 나눔으로 TC 적립
              </p>
            </CardContent>
          </Card>
          <Card className="border-t-4 border-t-blue-500">
            <CardContent className="p-6 text-center">
              <span className="text-5xl mb-4 block">🏛️</span>
              <h3 className="text-xl font-bold mb-2">연천군</h3>
              <p className="text-muted-foreground text-sm">
                플랫폼 운영 지원<br />
                가맹점 인센티브<br />
                지역경제 활성화
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Expected Effects */}
      <motion.section {...fadeInUp} transition={{ delay: 0.6 }}>
        <h2 className="text-2xl font-bold mb-6">기대 효과</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: '500+', label: '참여 군인', icon: Users },
            { value: '300+', label: '수혜 어르신', icon: Heart },
            { value: '50+', label: '가맹점', icon: Building },
            { value: '10,000+', label: '봉사 시간/년', icon: Clock },
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-6 text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Location Info */}
      <motion.section {...fadeInUp} transition={{ delay: 0.7 }}>
        <Card className="bg-gradient-to-r from-slate-50 to-slate-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold">연천군 소개</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-muted-foreground mb-4">
                  경기도 최북단에 위치한 연천군은 DMZ와 접경지역으로,
                  군사적 요충지이자 청정 자연환경을 보유한 지역입니다.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-500" />
                    청정 자연환경 (한탄강, 재인폭포)
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    DMZ 접경지역 (안보관광)
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-amber-500" />
                    인구 약 4만 명 (고령화율 29.9%)
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <span className="text-6xl block mb-2">🌿</span>
                  <p className="font-bold text-primary">Peace Green</p>
                  <p className="text-sm text-muted-foreground">연천의 평화와 자연을 상징</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Footer CTA */}
      <motion.section
        className="text-center py-8"
        {...fadeInUp}
        transition={{ delay: 0.8 }}
      >
        <p className="text-lg text-muted-foreground mb-4">
          연천 타임뱅크와 함께 지역 상생의 새로운 모델을 만들어갑니다
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>🏆</span>
          <span>2025 연천군 테마형 아이디어 공모전 출품작</span>
        </div>
      </motion.section>
    </div>
  );
}
