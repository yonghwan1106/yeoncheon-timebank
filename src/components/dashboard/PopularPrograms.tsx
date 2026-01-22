'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Program } from '@/types';
import { PROGRAM_CATEGORY_LABELS } from '@/types';

interface PopularProgramsProps {
  programs: Program[];
}

const programEmojis: Record<string, string> = {
  digital_education: '💻',
  traditional_wisdom: '🧓',
  physical_exchange: '💪',
  generation_exchange: '🤝',
};

export function PopularPrograms({ programs }: PopularProgramsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-xl">🔥</span>
            인기 프로그램
          </CardTitle>
          <Link href="/programs">
            <Button variant="ghost" size="sm" className="text-primary">
              더보기 <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {programs.slice(0, 4).map((program, index) => {
            const participationRate = Math.round(
              (program.currentParticipants / program.maxParticipants) * 100
            );

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/programs/${program.id}`}>
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-3xl flex-shrink-0">
                      {programEmojis[program.category]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-sm line-clamp-1">
                          {program.title}
                        </h4>
                        <Badge
                          variant={program.status === 'ongoing' ? 'default' : 'secondary'}
                          className="flex-shrink-0 text-xs"
                        >
                          {program.status === 'ongoing' ? '진행중' : '예정'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {program.currentParticipants}/{program.maxParticipants}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {program.schedule.split(' ')[1]}
                        </span>
                      </div>
                      <div className="mt-2">
                        <Progress value={participationRate} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
