
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Sparkles, TrendingUp, Radar, ShieldCheck } from 'lucide-react';

type Props = {
  totalAUM: number
  activeMutations: number
  averageROI: number
  strategistTier: 'Observer' | 'Advisor' | 'Elite'
}

const tierColors = {
  Observer: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  Advisor: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  Elite: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
}

export default function StatsCards({
  totalAUM,
  activeMutations,
  averageROI,
  strategistTier
}: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="shadow-sm border bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 text-sm font-semibold text-muted-foreground">
          <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
          <TrendingUp className="w-4 h-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${totalAUM.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 text-sm font-semibold text-muted-foreground">
          <CardTitle className="text-sm font-medium">Active Mutations</CardTitle>
          <Radar className="w-4 h-4" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">
                {activeMutations}
            </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 text-sm font-semibold text-muted-foreground">
          <CardTitle className="text-sm font-medium">Avg. ROI</CardTitle>
          <Sparkles className="w-4 h-4" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">
                +{averageROI.toFixed(2)}%
            </div>
        </CardContent>
      </Card>

      <Card className={cn('shadow-sm border bg-card/80 backdrop-blur-sm', tierColors[strategistTier])}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 text-sm font-semibold">
           <CardTitle className="text-sm font-medium">Everest Status</CardTitle>
          <ShieldCheck className="w-4 h-4" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">
                {strategistTier}
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
