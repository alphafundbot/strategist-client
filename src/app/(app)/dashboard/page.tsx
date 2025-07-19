
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Banknote, TrendingUp, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const strategistData: { [key: string]: any } = {
    "Free+": { fingerprint: "Alpha-1", vault: 1000.00, roi: 0, nextTier: "Silver", requirement: "3 mutations with ROI ≥ 12%" },
    "Silver": { fingerprint: "Beta-3", vault: 12450.00, roi: 14.2, nextTier: "Gold", requirement: "Vault ≥ $25K & ROI ≥ 18%" },
    "Gold": { fingerprint: "Gamma-6", vault: 28900.00, roi: 19.8, nextTier: "Omega", requirement: "Manual unlock only" },
    "Omega": { fingerprint: "Omega-9", vault: 102000.00, roi: 31900, nextTier: "N/A", requirement: "ISO/IEC 27001 Sealed" },
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
            <div>
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <p className="text-muted-foreground">Monitor strategist fingerprint, vault metrics, and elevation status.</p>
            </div>

            <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-2">
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
                        <p className="text-xs text-muted-foreground">0 mutation epochs completed</p>
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
        </div>
    );
}
