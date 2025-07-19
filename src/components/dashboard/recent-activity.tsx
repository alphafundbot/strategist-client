
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ArrowDownRight, ArrowUpRight, Bot } from 'lucide-react';

const activities = [
    { type: 'BUY', asset: 'ETH/USD', amount: '+0.5 ETH', time: '2m ago', icon: <ArrowUpRight className="h-4 w-4 text-green-500" /> },
    { type: 'SELL', asset: 'BTC/USD', amount: '-0.1 BTC', time: '15m ago', icon: <ArrowDownRight className="h-4 w-4 text-red-500" /> },
    { type: 'AI_ACTION', asset: 'Everest Override', amount: 'RSI-DIVERGE', time: '28m ago', icon: <Bot className="h-4 w-4 text-purple-400" /> },
    { type: 'BUY', asset: 'SOL/USD', amount: '+12._SOL', time: '1h ago', icon: <ArrowUpRight className="h-4 w-4 text-green-500" /> },
    { type: 'SELL', asset: 'ETH/USD', amount: '-1.2 ETH', time: '3h ago', icon: <ArrowDownRight className="h-4 w-4 text-red-500" /> },
];

export default function RecentActivity() {
    return (
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Live feed of trades and system events.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ScrollArea className="h-48">
                    <div className="space-y-4">
                        {activities.map((activity, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-muted/50 rounded-full">
                                        {activity.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{activity.asset}</p>
                                        <p className="text-xs text-muted-foreground">{activity.amount}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-muted-foreground">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
