'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Heart,
  Coins,
  TrendingUp,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  allUsers,
  soldierUsers,
  seniorUsers,
  mockServices,
  mockTransactions,
  getDailyStats,
} from '@/lib/mock-data';
import { getBlockchainStats } from '@/lib/blockchain/chain';

const weeklyData = getDailyStats(7);
const blockchainStats = getBlockchainStats();

const userDistribution = [
  { name: '군인', value: soldierUsers.length, color: '#3B82F6' },
  { name: '어르신', value: seniorUsers.length, color: '#22C55E' },
  { name: '관리자', value: 5, color: '#A855F7' },
];

const serviceStatusData = [
  { name: '대기', value: mockServices.filter((s) => s.status === 'pending').length },
  { name: '매칭', value: mockServices.filter((s) => s.status === 'matched').length },
  { name: '진행', value: mockServices.filter((s) => s.status === 'in_progress').length },
  { name: '완료', value: mockServices.filter((s) => s.status === 'completed').length },
];

export default function AdminPage() {
  const totalUsers = allUsers.length;
  const totalServices = mockServices.length;
  const totalTransactions = mockTransactions.length;
  const completedServices = mockServices.filter((s) => s.status === 'completed').length;
  const matchRate = Math.round((completedServices / totalServices) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">관리자 대시보드</h1>
          <p className="text-muted-foreground mt-1">
            연천 타임뱅크 운영 현황을 모니터링합니다
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Shield className="h-3 w-3" />
            관리자 권한
          </Badge>
          <Badge className="bg-green-100 text-green-800 gap-1">
            <CheckCircle className="h-3 w-3" />
            시스템 정상
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="총 사용자"
          value={totalUsers}
          change="+12%"
          changeType="positive"
          icon={<Users className="h-5 w-5" />}
          color="bg-blue-500"
        />
        <KPICard
          title="봉사 건수"
          value={totalServices}
          change="+8%"
          changeType="positive"
          icon={<Heart className="h-5 w-5" />}
          color="bg-pink-500"
        />
        <KPICard
          title="총 거래"
          value={totalTransactions}
          change="+15%"
          changeType="positive"
          icon={<Coins className="h-5 w-5" />}
          color="bg-amber-500"
        />
        <KPICard
          title="매칭 성공률"
          value={`${matchRate}%`}
          change="+3%"
          changeType="positive"
          icon={<TrendingUp className="h-5 w-5" />}
          color="bg-green-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              주간 활동 추이
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorEarned" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="earned"
                    stroke="#22C55E"
                    fill="url(#colorEarned)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* User Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              사용자 분포
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                  >
                    {userDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Status & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Service Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5" />
              봉사 상태 현황
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceStatusData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={60} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2D8B4E" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              시스템 상태
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <StatusRow
              label="블록체인 네트워크"
              status="정상"
              statusType="success"
              value={`${blockchainStats.totalBlocks} 블록`}
            />
            <StatusRow
              label="API 서버"
              status="정상"
              statusType="success"
              value="응답 시간 45ms"
            />
            <StatusRow
              label="데이터베이스"
              status="정상"
              statusType="success"
              value="99.9% 가용성"
            />
            <StatusRow
              label="매칭 엔진"
              status="정상"
              statusType="success"
              value="v2.0 실행 중"
            />
            <StatusRow
              label="알림 서비스"
              status="점검중"
              statusType="warning"
              value="예정된 점검"
            />
          </CardContent>
        </Card>
      </div>

      {/* Recent Users Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">최근 가입 사용자</CardTitle>
          <Button variant="outline" size="sm">
            전체 보기
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground border-b">
                  <th className="pb-3 font-medium">이름</th>
                  <th className="pb-3 font-medium">유형</th>
                  <th className="pb-3 font-medium">레벨</th>
                  <th className="pb-3 font-medium">크레딧</th>
                  <th className="pb-3 font-medium">가입일</th>
                  <th className="pb-3 font-medium">상태</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.slice(0, 5).map((user) => (
                  <tr key={user.id} className="border-b last:border-0">
                    <td className="py-3 font-medium">{user.name}</td>
                    <td className="py-3">
                      <Badge
                        variant="secondary"
                        className={
                          user.role === 'soldier'
                            ? 'user-soldier'
                            : user.role === 'senior'
                            ? 'user-senior'
                            : 'user-admin'
                        }
                      >
                        {user.role === 'soldier'
                          ? '군인'
                          : user.role === 'senior'
                          ? '어르신'
                          : '관리자'}
                      </Badge>
                    </td>
                    <td className="py-3">Lv.{user.level}</td>
                    <td className="py-3">{user.totalCredits} TC</td>
                    <td className="py-3 text-sm text-muted-foreground">
                      {new Date(user.joinedAt).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="py-3">
                      <Badge className="bg-green-100 text-green-800">활성</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function KPICard({
  title,
  value,
  change,
  changeType,
  icon,
  color,
}: {
  title: string;
  value: number | string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-3xl font-bold mt-1">{value}</p>
              <p
                className={`text-xs mt-1 ${
                  changeType === 'positive'
                    ? 'text-green-600'
                    : changeType === 'negative'
                    ? 'text-red-600'
                    : 'text-gray-500'
                }`}
              >
                {change} 지난 주 대비
              </p>
            </div>
            <div className={`p-3 rounded-xl ${color} text-white`}>{icon}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StatusRow({
  label,
  status,
  statusType,
  value,
}: {
  label: string;
  status: string;
  statusType: 'success' | 'warning' | 'error';
  value: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        {statusType === 'success' ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : statusType === 'warning' ? (
          <AlertTriangle className="h-5 w-5 text-amber-500" />
        ) : (
          <AlertTriangle className="h-5 w-5 text-red-500" />
        )}
        <span className="font-medium">{label}</span>
      </div>
      <div className="text-right">
        <Badge
          variant="secondary"
          className={
            statusType === 'success'
              ? 'bg-green-100 text-green-800'
              : statusType === 'warning'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-red-100 text-red-800'
          }
        >
          {status}
        </Badge>
        <p className="text-xs text-muted-foreground mt-1">{value}</p>
      </div>
    </div>
  );
}
