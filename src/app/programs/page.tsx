'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Award,
  Filter,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockPrograms } from '@/lib/mock-data';
import type { Program, ProgramCategory } from '@/types';
import { PROGRAM_CATEGORY_LABELS } from '@/types';

const programEmojis: Record<ProgramCategory, string> = {
  digital_education: '💻',
  traditional_wisdom: '🧓',
  physical_exchange: '💪',
  generation_exchange: '🤝',
};

const categoryColors: Record<ProgramCategory, string> = {
  digital_education: 'bg-blue-100 text-blue-800',
  traditional_wisdom: 'bg-amber-100 text-amber-800',
  physical_exchange: 'bg-green-100 text-green-800',
  generation_exchange: 'bg-purple-100 text-purple-800',
};

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPrograms =
    selectedCategory === 'all'
      ? mockPrograms
      : mockPrograms.filter((p) => p.category === selectedCategory);

  const ongoingCount = mockPrograms.filter((p) => p.status === 'ongoing').length;
  const upcomingCount = mockPrograms.filter((p) => p.status === 'upcoming').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">프로그램</h1>
          <p className="text-muted-foreground mt-1">
            세대를 잇는 다양한 교류 프로그램에 참여하세요
          </p>
        </div>
        <div className="flex gap-3">
          <Badge variant="secondary" className="px-3 py-1">
            진행 중 {ongoingCount}
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            예정 {upcomingCount}
          </Badge>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
        >
          전체
        </Button>
        {(Object.keys(PROGRAM_CATEGORY_LABELS) as ProgramCategory[]).map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className="gap-1"
          >
            {programEmojis[cat]} {PROGRAM_CATEGORY_LABELS[cat].split(' ')[0]}
          </Button>
        ))}
      </div>

      {/* Programs Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredPrograms.map((program, index) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProgramCard program={program} />
          </motion.div>
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          해당 카테고리에 프로그램이 없습니다
        </div>
      )}
    </div>
  );
}

function ProgramCard({ program }: { program: Program }) {
  const participationRate = Math.round(
    (program.currentParticipants / program.maxParticipants) * 100
  );
  const isFull = participationRate >= 100;

  return (
    <Card className="card-hover overflow-hidden">
      <div
        className={`h-2 ${
          program.status === 'ongoing' ? 'bg-green-500' : 'bg-amber-500'
        }`}
      />
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`p-3 rounded-xl ${categoryColors[program.category]}`}
          >
            <span className="text-2xl">{programEmojis[program.category]}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg">{program.title}</h3>
              <Badge
                variant={program.status === 'ongoing' ? 'default' : 'secondary'}
              >
                {program.status === 'ongoing' ? '진행 중' : '예정'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {PROGRAM_CATEGORY_LABELS[program.category]}
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {program.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="truncate">{program.schedule}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{program.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>
              {program.currentParticipants}/{program.maxParticipants}명
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Award className="h-4 w-4" />
            <span>{program.creditReward} TC 보상</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">참여율</span>
            <span className="font-medium">{participationRate}%</span>
          </div>
          <Progress value={participationRate} className="h-2" />
        </div>

        {program.instructorName && (
          <p className="text-sm text-muted-foreground mb-4">
            진행: <span className="font-medium">{program.instructorName}</span>
          </p>
        )}

        <Button className="w-full" disabled={isFull}>
          {isFull ? '마감됨' : '참여 신청하기'}
        </Button>
      </CardContent>
    </Card>
  );
}
