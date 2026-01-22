'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Service } from '@/types';
import { SERVICE_CATEGORY_ICONS, SERVICE_CATEGORY_LABELS } from '@/types';

interface RecommendedServicesProps {
  services: Service[];
}

export function RecommendedServices({ services }: RecommendedServicesProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-xl">🎯</span>
            추천 봉사
          </CardTitle>
          <Link href="/services">
            <Button variant="ghost" size="sm" className="text-primary">
              더보기 <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={`/services/${service.id}`}>
                <Card className="h-full card-hover border-2 border-transparent hover:border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">
                        {SERVICE_CATEGORY_ICONS[service.category]}
                      </span>
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary"
                      >
                        {service.credits} TC
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                      {service.title}
                    </h3>
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{service.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>약 {service.estimatedHours}시간</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs text-muted-foreground">
                        요청자: <span className="font-medium">{service.requesterName}</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
