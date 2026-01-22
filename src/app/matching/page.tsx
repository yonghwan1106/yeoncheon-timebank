'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Sparkles,
  User,
  MapPin,
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  Brain,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { pendingServices, soldierUsers } from '@/lib/mock-data';
import { simulateAIMatching, findBestMatches } from '@/lib/matching/algorithm';
import type { Service, MatchResult } from '@/types';
import { SERVICE_CATEGORY_ICONS, SERVICE_CATEGORY_LABELS } from '@/types';

export default function MatchingPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const [confidence, setConfidence] = useState(0);

  const handleMatch = async (service: Service) => {
    setSelectedService(service);
    setIsMatching(true);
    setMatchResults([]);
    setConfidence(0);

    // 매칭 애니메이션 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = simulateAIMatching(service.id);

    // 점진적으로 결과 표시
    for (let i = 0; i <= 100; i += 5) {
      setConfidence(Math.min(i, result.confidence));
      await new Promise((resolve) => setTimeout(resolve, 30));
    }

    setMatchResults(result.matches);
    setIsMatching(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="h-7 w-7 text-primary" />
            AI 매칭
          </h1>
          <p className="text-muted-foreground mt-1">
            인공지능이 최적의 봉사자를 찾아드립니다
          </p>
        </div>
        <Badge variant="secondary" className="gap-1 px-3 py-1">
          <Sparkles className="h-3 w-3" />
          매칭 알고리즘 v2.0
        </Badge>
      </div>

      {/* How it Works */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI 매칭 원리
          </h3>
          <div className="grid sm:grid-cols-4 gap-4">
            <MatchingStep
              icon={<Target className="h-5 w-5" />}
              title="스킬 분석"
              description="봉사자 보유 스킬과 요청 카테고리 매칭"
            />
            <MatchingStep
              icon={<MapPin className="h-5 w-5" />}
              title="거리 계산"
              description="봉사자와 요청 위치 간 거리 분석"
            />
            <MatchingStep
              icon={<Star className="h-5 w-5" />}
              title="경험 평가"
              description="과거 봉사 이력과 평점 반영"
            />
            <MatchingStep
              icon={<Zap className="h-5 w-5" />}
              title="가용성 확인"
              description="활동 빈도와 연속성 점수 계산"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Service Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">매칭할 봉사 선택</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {pendingServices.slice(0, 10).map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <button
                    onClick={() => handleMatch(service)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedService?.id === service.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">
                        {SERVICE_CATEGORY_ICONS[service.category]}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{service.title}</h4>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {service.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {service.estimatedHours}시간
                          </span>
                        </div>
                      </div>
                      <Badge variant="secondary">{service.credits} TC</Badge>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Match Results */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              매칭 결과
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedService ? (
              <div className="text-center py-12 text-muted-foreground">
                <Bot className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p>봉사를 선택하면 AI가 최적의 봉사자를 찾아드립니다</p>
              </div>
            ) : isMatching ? (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="inline-block"
                >
                  <Bot className="h-16 w-16 text-primary" />
                </motion.div>
                <p className="mt-4 font-medium">AI가 분석 중입니다...</p>
                <div className="mt-4 max-w-xs mx-auto">
                  <Progress value={confidence} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">
                    신뢰도: {confidence}%
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Confidence Score */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-green-800">매칭 신뢰도</span>
                    <span className="text-2xl font-bold text-green-600">
                      {confidence}%
                    </span>
                  </div>
                  <Progress value={confidence} className="h-2 bg-green-200" />
                </div>

                {/* Match Results */}
                <AnimatePresence>
                  {matchResults.map((match, index) => (
                    <motion.div
                      key={match.candidateId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <MatchResultCard match={match} rank={index + 1} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MatchingStep({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="inline-flex p-3 bg-white rounded-xl shadow-sm mb-2">
        {icon}
      </div>
      <h4 className="font-medium text-sm">{title}</h4>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  );
}

function MatchResultCard({ match, rank }: { match: MatchResult; rank: number }) {
  const user = soldierUsers.find((u) => u.id === match.candidateId);

  return (
    <Card className={rank === 1 ? 'border-2 border-primary' : ''}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            {rank === 1 && (
              <div className="absolute -top-1 -right-1 h-5 w-5 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">1</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{match.candidateName}</h4>
              {rank === 1 && (
                <Badge className="bg-amber-100 text-amber-800">
                  <Star className="h-3 w-3 mr-1" />
                  최적 매칭
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {user?.unit} · Lv.{user?.level}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {match.matchReasons.map((reason, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {reason}
                </Badge>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{match.score}</div>
            <p className="text-xs text-muted-foreground">매칭 점수</p>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="flex justify-between text-muted-foreground mb-1">
              <span>스킬 매칭</span>
              <span>{match.skillMatch}/40</span>
            </div>
            <Progress value={(match.skillMatch / 40) * 100} className="h-1.5" />
          </div>
          <div>
            <div className="flex justify-between text-muted-foreground mb-1">
              <span>활동성</span>
              <span>{match.availabilityMatch}/15</span>
            </div>
            <Progress
              value={(match.availabilityMatch / 15) * 100}
              className="h-1.5"
            />
          </div>
        </div>

        <Button className="w-full mt-4" size="sm">
          매칭 요청하기
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
