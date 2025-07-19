
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Banknote, TrendingUp, Zap, Gauge, ShieldAlert, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';

const strategistData: { [key: string]: any } = {
    "Free+": { fingerprint: "Alpha-1", vault: 1000.00, roi: 8, nextTier: "Silver", requirement: "3 mutations with ROI ≥ 12%", growth: 0, volatility: 0.89, entropy: 0.12 },
    "Silver": { fingerprint: "Beta-3", vault: 12450.00, roi: 12, nextTier: "Gold", requirement: "Vault ≥ $25K & ROI ≥ 18%", growth: 2.1, volatility: 0.45, entropy: 0.09 },
    "Gold": { fingerprint: "Gamma-6", vault: 28900.00, roi: 18, nextTier: "Omega", requirement: "Manual unlock only", growth: 4.8, volatility: 0.21, entropy: 0.05 },
}

export default function DashboardPage() {
    const [tier, setTier] = useState('Free+');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (typeof window !== 'undefined') {
            const storedTier = localStorage.getItem('userTier') || 'Free+';
            setTier(storedTier);
        }
    }, []);

    const currentData = strategistData[tier] || strategistData['Free+'];

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Monitor strategist fingerprint, vault metrics, and evolution protocol.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Strategist Identity</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{currentData.fingerprint}</div>
                        <p className="text-xs text-muted-foreground">Current Tier: {tier}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Vault Balance</CardTitle>
                        <Banknote className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${currentData.vault.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                        <p className="text-xs text-muted-foreground">Current funding capacity</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ROI Arc</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{currentData.roi > 0 ? '+' : ''}{currentData.roi}%</div>
                        <p className="text-xs text-muted-foreground">Tier-gated returns</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Elevation Forecast</CardTitle>
                        <Zap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-semibold">Next Tier: {currentData.nextTier}</div>
                        <p className="text-xs text-muted-foreground">{currentData.requirement}</p>
                    </CardContent>
                </Card>
            </div>
            
            <div>
                <h2 className="text-xl font-semibold mt-8 mb-2 text-center md:text-left">Evolution Protocol Metrics</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{currentData.growth > 0 ? '+' : ''}{currentData.growth}%</div>
                            <p className="text-xs text-muted-foreground">Fingerprint progression rate</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Volatility Index</CardTitle>
                            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{currentData.volatility}</div>
                            <p className="text-xs text-muted-foreground">Conviction score alignment</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Signal Entropy</CardTitle>
                            <Gauge className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{currentData.entropy}</div>
                            <p className="text-xs text-muted-foreground">Cognitive noise suppression</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    );
}
