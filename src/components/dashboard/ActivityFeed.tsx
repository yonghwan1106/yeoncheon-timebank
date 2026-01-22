'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Activity } from '@/types';
import { cn } from '@/lib/utils';

interface ActivityFeedProps {
  activities: Activity[];
}

const activityIcons: Record<Activity['type'], string> = {
  service_completed: '✅',
  credit_earned: '💰',
  badge_earned: '🏆',
  level_up: '⬆️',
  program_joined: '📚',
};

const activityColors: Record<Activity['type'], string> = {
  service_completed: 'bg-green-100 text-green-800',
  credit_earned: 'bg-amber-100 text-amber-800',
  badge_earned: 'bg-purple-100 text-purple-800',
  level_up: 'bg-blue-100 text-blue-800',
  program_joined: 'bg-pink-100 text-pink-800',
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="text-xl">📊</span>
          실시간 활동
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <AnimatePresence mode="popLayout">
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-2xl flex-shrink-0">
                    {activityIcons[activity.type]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm">{activity.userName}</span>
                      <Badge
                        variant="secondary"
                        className={cn(
                          'text-xs',
                          activity.userRole === 'soldier' && 'user-soldier',
                          activity.userRole === 'senior' && 'user-senior'
                        )}
                      >
                        {activity.userRole === 'soldier' ? '군인' : '어르신'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 truncate">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;
  return date.toLocaleDateString('ko-KR');
}
