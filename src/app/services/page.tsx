'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  User,
  ChevronDown,
  Plus,
  Sparkles,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockServices } from '@/lib/mock-data';
import type { Service, ServiceCategory, ServiceStatus } from '@/types';
import { SERVICE_CATEGORY_ICONS, SERVICE_CATEGORY_LABELS } from '@/types';

const statusLabels: Record<ServiceStatus, string> = {
  pending: '대기 중',
  matched: '매칭됨',
  in_progress: '진행 중',
  completed: '완료',
  cancelled: '취소',
};

const statusColors: Record<ServiceStatus, string> = {
  pending: 'bg-amber-100 text-amber-800',
  matched: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
};

const locations = ['전체', '연천읍', '전곡읍', '청산면', '백학면', '미산면', '왕징면', '신서면', '중면'];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('전체');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('latest');

  const filteredServices = useMemo(() => {
    let result = [...mockServices];

    // 검색어 필터
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          s.requesterName.toLowerCase().includes(query)
      );
    }

    // 카테고리 필터
    if (categoryFilter !== 'all') {
      result = result.filter((s) => s.category === categoryFilter);
    }

    // 위치 필터
    if (locationFilter !== '전체') {
      result = result.filter((s) => s.location === locationFilter);
    }

    // 상태 필터
    if (statusFilter !== 'all') {
      result = result.filter((s) => s.status === statusFilter);
    }

    // 정렬
    switch (sortBy) {
      case 'latest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'credits':
        result.sort((a, b) => b.credits - a.credits);
        break;
      case 'urgent':
        result.sort((a, b) => {
          const aDate = a.scheduledDate ? new Date(a.scheduledDate).getTime() : Infinity;
          const bDate = b.scheduledDate ? new Date(b.scheduledDate).getTime() : Infinity;
          return aDate - bDate;
        });
        break;
    }

    return result;
  }, [searchQuery, categoryFilter, locationFilter, statusFilter, sortBy]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">봉사 서비스</h1>
          <p className="text-muted-foreground mt-1">
            도움이 필요한 이웃에게 손길을 내밀어주세요
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          봉사 요청하기
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="봉사 활동 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 카테고리</SelectItem>
                  {(Object.keys(SERVICE_CATEGORY_LABELS) as ServiceCategory[]).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {SERVICE_CATEGORY_ICONS[cat]} {SERVICE_CATEGORY_LABELS[cat]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="지역" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 상태</SelectItem>
                  <SelectItem value="pending">대기 중</SelectItem>
                  <SelectItem value="matched">매칭됨</SelectItem>
                  <SelectItem value="in_progress">진행 중</SelectItem>
                  <SelectItem value="completed">완료</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="정렬" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">최신순</SelectItem>
                  <SelectItem value="credits">크레딧순</SelectItem>
                  <SelectItem value="urgent">긴급순</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          총 <span className="font-semibold text-foreground">{filteredServices.length}</span>개의 봉사 활동
        </p>
        <div className="flex items-center gap-2 text-sm text-primary">
          <Sparkles className="h-4 w-4" />
          <span>AI 매칭 추천</span>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredServices.slice(0, 12).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More */}
      {filteredServices.length > 12 && (
        <div className="flex justify-center">
          <Button variant="outline" className="gap-2">
            더 보기
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.id}`}>
      <Card className="h-full card-hover border-2 border-transparent hover:border-primary/20 cursor-pointer">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <span className="text-3xl">
              {SERVICE_CATEGORY_ICONS[service.category]}
            </span>
            <Badge className={statusColors[service.status]}>
              {statusLabels[service.status]}
            </Badge>
          </div>

          <h3 className="font-semibold line-clamp-2 mb-2">{service.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {service.description}
          </p>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>{service.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>약 {service.estimatedHours}시간</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 flex-shrink-0" />
              <span>{service.requesterName}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t flex items-center justify-between">
            <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold">
              {service.credits} TC
            </Badge>
            {service.scheduledDate && (
              <span className="text-xs text-muted-foreground">
                {new Date(service.scheduledDate).toLocaleDateString('ko-KR', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
