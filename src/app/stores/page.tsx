'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Store,
  MapPin,
  Phone,
  Clock,
  Percent,
  QrCode,
  Search,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { allStores } from '@/lib/mock-data';
import type { Store as StoreType, StoreCategory } from '@/types';
import { STORE_CATEGORY_LABELS } from '@/types';

const categoryEmojis: Record<StoreCategory, string> = {
  pcroom: '🎮',
  cafe: '☕',
  restaurant: '🍽️',
  convenience: '🏪',
  pharmacy: '💊',
  other: '🏬',
};

const categoryColors: Record<StoreCategory, string> = {
  pcroom: 'bg-purple-100 text-purple-800',
  cafe: 'bg-amber-100 text-amber-800',
  restaurant: 'bg-red-100 text-red-800',
  convenience: 'bg-green-100 text-green-800',
  pharmacy: 'bg-blue-100 text-blue-800',
  other: 'bg-gray-100 text-gray-800',
};

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredStores = allStores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || store.category === selectedCategory;
    return matchesSearch && matchesCategory && store.isActive;
  });

  const categoryCounts = (Object.keys(STORE_CATEGORY_LABELS) as StoreCategory[]).reduce(
    (acc, cat) => {
      acc[cat] = allStores.filter((s) => s.category === cat && s.isActive).length;
      return acc;
    },
    {} as Record<StoreCategory, number>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">가맹점</h1>
        <p className="text-muted-foreground mt-1">
          타임크레딧을 사용할 수 있는 연천군 가맹점을 찾아보세요
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="가맹점명 또는 주소로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
        >
          전체 ({allStores.filter((s) => s.isActive).length})
        </Button>
        {(Object.keys(STORE_CATEGORY_LABELS) as StoreCategory[]).map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className="gap-1"
          >
            {categoryEmojis[cat]} {STORE_CATEGORY_LABELS[cat]} ({categoryCounts[cat]})
          </Button>
        ))}
      </div>

      {/* Stores Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStores.map((store, index) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <StoreCard store={store} />
          </motion.div>
        ))}
      </div>

      {filteredStores.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Store className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>검색 결과가 없습니다</p>
        </div>
      )}

      {/* Info Banner */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="p-3 bg-white rounded-xl">
            <QrCode className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-semibold">QR 코드로 간편 결제</h3>
            <p className="text-sm text-muted-foreground">
              가맹점에서 QR 코드를 스캔하면 타임크레딧으로 바로 결제할 수 있어요
            </p>
          </div>
          <Button>결제하기</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function StoreCard({ store }: { store: StoreType }) {
  return (
    <Card className="card-hover h-full">
      <CardContent className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <div
            className={`p-3 rounded-xl ${categoryColors[store.category]}`}
          >
            <span className="text-2xl">{categoryEmojis[store.category]}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{store.name}</h3>
            <Badge variant="secondary" className="mt-1">
              {STORE_CATEGORY_LABELS[store.category]}
            </Badge>
          </div>
        </div>

        {store.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {store.description}
          </p>
        )}

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{store.address}</span>
          </div>
          {store.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span>{store.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>{store.operatingHours}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <div className="text-sm">
            <span className="text-muted-foreground">크레딧: </span>
            <span className="font-semibold text-primary">{store.creditPolicy}</span>
          </div>
          {store.discountRate && (
            <Badge className="bg-green-100 text-green-800 gap-1">
              <Percent className="h-3 w-3" />
              {store.discountRate}% 할인
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
