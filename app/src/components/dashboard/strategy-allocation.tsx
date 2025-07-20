
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Momentum', value: 400 },
  { name: 'Mean Reversion', value: 300 },
  { name: 'Arbitrage', value: 300 },
  { name: 'Long/Short', value: 200 },
];

const COLORS = ['#673AB7', '#009688', '#FFC107', '#03A9F4']; // Primary, Accent, Yellow, Blue

export default function StrategyAllocation() {
    return (
        <Card className="bg-card/50 backdrop-blur-sm h-full">
            <CardHeader>
                <CardTitle>Strategy Allocation</CardTitle>
                <CardDescription>Distribution of capital across active strategies.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                stroke="hsl(var(--background))"
                                >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                             <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--background))",
                                    borderColor: "hsl(var(--border))",
                                    color: "hsl(var(--foreground))"
                                }}
                            />
                            <Legend iconSize={10} wrapperStyle={{fontSize: "12px"}}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
