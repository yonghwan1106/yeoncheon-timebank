'use client';

import { motion } from 'framer-motion';
import {
  User,
  Award,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  TrendingUp,
  Edit,
  Settings,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { demoSoldier, getTransactionsByUser, badges, getLevelByExp, getLevelProgress, getBadgeById } from '@/lib/mock-data';
import { mockServices } from '@/lib/mock-data';

export default function ProfilePage() {
  const user = demoSoldier;
  const currentLevel = getLevelByExp(user.experience);
  const levelProgress = getLevelProgress(user.experience);
  const userTransactions = getTransactionsByUser(user.id);
  const userServices = mockServices.filter(
    (s) => s.providerId === user.id || s.requesterId === user.id
  );
  const completedServices = userServices.filter((s) => s.status === 'completed');
  const userBadges = user.badges.map((id) => getBadgeById(id)).filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary via-primary/80 to-secondary" />
          <CardContent className="relative pt-0 pb-6 px-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-4xl bg-primary/20">
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 sm:pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-muted-foreground">
                      {user.unit} · {user.rank}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      편집
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <QuickStat
                icon={<Star className="h-5 w-5 text-amber-500" />}
                label="레벨"
                value={`Lv.${user.level}`}
              />
              <QuickStat
                icon={<Clock className="h-5 w-5 text-blue-500" />}
                label="봉사 시간"
                value={`${user.totalHours}h`}
              />
              <QuickStat
                icon={<TrendingUp className="h-5 w-5 text-green-500" />}
                label="크레딧"
                value={`${user.totalCredits} TC`}
              />
              <QuickStat
                icon={<Award className="h-5 w-5 text-purple-500" />}
                label="뱃지"
                value={`${userBadges.length}개`}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Level Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">레벨 진행</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary text-white mb-2">
                  <span className="text-2xl font-bold">{user.level}</span>
                </div>
                <h3 className="font-semibold text-lg">{currentLevel.title}</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">경험치</span>
                  <span className="font-medium">
                    {user.experience} / {currentLevel.maxExp === Infinity ? '∞' : currentLevel.maxExp}
                  </span>
                </div>
                <Progress value={levelProgress} className="h-3" />
                <p className="text-xs text-muted-foreground text-center">
                  다음 레벨까지 {currentLevel.maxExp === Infinity ? '최고 레벨' : `${currentLevel.maxExp - user.experience} XP`}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">현재 레벨 혜택</h4>
                <div className="space-y-1">
                  {currentLevel.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-green-500">✓</span>
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">연락처 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {user.email && (
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
              )}
              {user.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{user.unit}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  가입일: {new Date(user.joinedAt).toLocaleDateString('ko-KR')}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="badges">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="badges">뱃지</TabsTrigger>
                  <TabsTrigger value="skills">스킬</TabsTrigger>
                  <TabsTrigger value="history">활동 이력</TabsTrigger>
                </TabsList>

                <TabsContent value="badges" className="mt-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {userBadges.map((badge) => badge && (
                      <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`p-4 rounded-xl text-center badge-${badge.rarity}`}
                      >
                        <span className="text-4xl">{badge.icon}</span>
                        <h4 className="font-semibold mt-2">{badge.name}</h4>
                        <p className="text-xs mt-1 opacity-80">{badge.description}</p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {badge.rarity === 'common' ? '일반' :
                           badge.rarity === 'rare' ? '희귀' :
                           badge.rarity === 'epic' ? '에픽' : '전설'}
                        </Badge>
                      </motion.div>
                    ))}
                    {userBadges.length === 0 && (
                      <div className="col-span-full text-center py-8 text-muted-foreground">
                        아직 획득한 뱃지가 없습니다
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="skills" className="mt-6">
                  <div className="space-y-4">
                    {user.skills?.map((skill, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{skill}</span>
                          <Badge variant="secondary">숙련</Badge>
                        </div>
                        <Progress value={70 + Math.random() * 30} className="h-2" />
                      </div>
                    ))}
                    {!user.skills?.length && (
                      <div className="text-center py-8 text-muted-foreground">
                        등록된 스킬이 없습니다
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="history" className="mt-6">
                  <div className="space-y-3">
                    {completedServices.slice(0, 5).map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Star className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{service.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {service.requesterName}님 도움
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">+{service.credits} TC</Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {service.completedAt && new Date(service.completedAt).toLocaleDateString('ko-KR')}
                          </p>
                        </div>
                      </div>
                    ))}
                    {completedServices.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        완료된 봉사 활동이 없습니다
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function QuickStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="text-center p-3 bg-gray-50 rounded-lg">
      <div className="flex justify-center mb-1">{icon}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
