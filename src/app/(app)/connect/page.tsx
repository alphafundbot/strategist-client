
"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Power, Link as LinkIcon, Zap } from "lucide-react";

const platforms = [
  { name: "Binance", status: "Connected", logo: "B" },
  { name: "Coinbase", status: "Disconnected", logo: "C" },
  { name: "Kraken", status: "Connected", logo: "K" },
  { name: "Robinhood", status: "Disconnected", logo: "R" },
  { name: "TD Ameritrade", status: "Syncing", logo: "T" },
  { name: "Interactive Brokers", status: "Disconnected", logo: "I" },
  { name: "MetaTrader", status: "Connected", logo: "M" },
  { name: "TradingView", status: "Connected", logo: "TV" },
  { name: "Alpaca", status: "Disconnected", logo: "A" },
  { name: "E*TRADE", status: "Disconnected", logo: "E" },
  { name: "Fidelity", status: "Syncing", logo: "F" },
  { name: "Webull", status: "Connected", logo: "W" },
  { name: "Gemini", status: "Disconnected", logo: "G" },
  { name: "Charles Schwab", status: "Disconnected", logo: "CS" },
  { name: "Bitstamp", status: "Disconnected", logo: "BS" },
  { name: "OANDA", status: "Connected", logo: "O" },
  { name: "FXCM", status: "Disconnected", logo: "FX" },
  { name: "IG Markets", status: "Syncing", logo: "IG" },
  { name: "Uniswap", status: "Connected", logo: "U" },
  { name: "Aave", status: "Disconnected", logo: "AAVE" },
  { name: "Custom API", status: "Connected", logo: "+" },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
        case 'connected':
            return 'default';
        case 'syncing':
            return 'secondary';
        case 'disconnected':
            return 'destructive';
        default:
            return 'outline';
    }
};

const PlatformLogo = ({ logo, status }: { logo: string, status: string }) => {
    const statusColor = status === 'Connected' ? 'border-accent' : status === 'Syncing' ? 'border-primary' : 'border-muted';
    return (
        <div className={cn("w-12 h-12 rounded-lg bg-background/50 flex items-center justify-center text-xl font-bold border-2", statusColor)}>
            {logo}
        </div>
    )
}

export default function ConnectPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Zap className="w-8 h-8" />
            Connect Platforms
        </h1>
        <p className="text-muted-foreground">
          Unify all trading platforms under one elevation-grade interface.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {platforms.map((platform) => (
          <Card key={platform.name} className="flex flex-col bg-card/70 backdrop-blur-md transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <PlatformLogo logo={platform.logo} status={platform.status} />
                <div className="flex-grow">
                    <CardTitle>{platform.name}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                       <Badge variant={getStatusBadgeVariant(platform.status) as any}>{platform.status}</Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-4 text-sm">
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Trade Delegation</span>
                    <Switch defaultChecked={platform.status === 'Connected'} />
                </div>
                 <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Signal Sync</span>
                    <Switch defaultChecked={platform.status === 'Connected'} />
                </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant={platform.status === 'Connected' ? "destructive" : "default"} 
                className="w-full"
              >
                {platform.status === 'Connected' ? <Power className="mr-2" /> : <LinkIcon className="mr-2" />}
                {platform.status === 'Connected' ? 'Disconnect' : 'Connect'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
