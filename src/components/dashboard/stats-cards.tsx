
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AreaChart, Bot, Dna, Wallet } from 'lucide-react';

interface StatsCardsProps {
    tier: string;
}

const getTierColor = (tier: string) => {
    switch(tier.toLowerCase()) {
        case 'elite': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
        case 'advisor': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
        case 'observer': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        default: return 'bg-muted';
    }
}

export default function StatsCards({ tier }: StatsCardsProps) {
    const stats = [
        { title: 'Total AUM', value: '$1.2M', icon: <Wallet className="h-5 w-5 text-muted-foreground" /> },
        { title: 'Active Mutations', value: '42', icon: <Dna className="h-5 w-5 text-muted-foreground" /> },
        { title: 'Avg. ROI', value: '+12.5%', icon: <AreaChart className="h-5 w-5 text-muted-foreground" /> },
        { title: 'Everest Status', value: 'Online', icon: <Bot className="h-5 w-5 text-muted-foreground" />, badge: tier },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        {stat.icon}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        {stat.badge && (
                            <Badge className={`mt-1 text-xs font-semibold ${getTierColor(stat.badge)}`}>
                                {stat.badge}
                            </Badge>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
