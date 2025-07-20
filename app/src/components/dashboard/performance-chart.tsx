
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
    { name: 'Jul', value: 7000 },
];

export default function PerformanceChart() {
    return (
        <Card className="bg-card/50 backdrop-blur-sm h-full">
            <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Last 6 months ROI trajectory</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--background))",
                                    borderColor: "hsl(var(--border))",
                                    color: "hsl(var(--foreground))"
                                }}
                            />
                            <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorUv)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
