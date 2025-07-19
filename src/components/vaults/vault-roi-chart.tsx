
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { VaultRoiData } from '@/lib/services/vault';
import { AreaChart as AreaChartIcon, Loader2 } from 'lucide-react';

interface VaultRoiChartProps {
    data: VaultRoiData[];
    vaultName?: string;
    isLoading?: boolean;
}

export default function VaultRoiChart({ data, vaultName, isLoading }: VaultRoiChartProps) {
    const hasData = data && data.length > 0;

    return (
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>ROI Visual Map</CardTitle>
                <CardDescription>
                    {vaultName ? `Historical ROI for ${vaultName}` : 'Select a vault to view its ROI map.'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-64">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                           <Loader2 className="h-8 w-8 animate-spin text-primary" />
                       </div>
                    ) : hasData ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="%" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "hsl(var(--background))",
                                        borderColor: "hsl(var(--border))",
                                        color: "hsl(var(--foreground))"
                                    }}
                                    formatter={(value: number) => [`${value.toFixed(1)}%`, 'ROI']}
                                />
                                <Area type="monotone" dataKey="roi" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRoi)" name="ROI" />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full p-4 bg-muted/50 rounded-lg flex items-center justify-center border border-dashed">
                             <div className="text-center">
                                <AreaChartIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {vaultName ? `No ROI data available for ${vaultName}.` : 'Select a vault to see its ROI.'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
