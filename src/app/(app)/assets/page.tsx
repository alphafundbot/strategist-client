
"use client"

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Globe, TrendingUp, ShieldAlert, BrainCircuit, Users } from "lucide-react";

const regionTabs = [
  "Global", "North America", "Europe", "Asia", "South America", "Africa", "Oceania"
];

const chartData = [
  { date: "Jan", roi: Math.random() * 10 + 5 },
  { date: "Feb", roi: Math.random() * 10 + 6 },
  { date: "Mar", roi: Math.random() * 10 + 7 },
  { date: "Apr", roi: Math.random() * 10 + 8 },
  { date: "May", roi: Math.random() * 10 + 9 },
  { date: "Jun", roi: Math.random() * 10 + 10 },
];

const RegionContent = ({ region }: { region: string }) => {
  const [stats, setStats] = React.useState({ volatility: '0.00', sentiment: '0.0', strategists: 0 });

  React.useEffect(() => {
    // This ensures that the random data is generated only on the client side, avoiding hydration mismatches.
    setStats({
      volatility: (Math.random() * 0.5 + 0.1).toFixed(2),
      sentiment: (Math.random() * 50 + 50).toFixed(1),
      strategists: Math.floor(Math.random() * 500 + 50)
    });
  }, [region]);

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-xl">
      <CardHeader>
        <CardTitle>{region} Asset Feed</CardTitle>
        <CardDescription>
          Live data and Gemini-powered trend analysis for {region}. Data visibility is gated by strategist tier.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="lg:col-span-2 bg-background/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Regional ROI Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="h-60">
              <ChartContainer config={{ roi: { label: "ROI", color: "hsl(var(--primary))" } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id={`color-roi-${region}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-roi)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-roi)" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                    <YAxis unit="%" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                    <Tooltip content={<ChartTooltipContent indicator="line" />} />
                    <Area type="monotone" dataKey="roi" stroke="var(--color-roi)" fillOpacity={1} fill={`url(#color-roi-${region})`} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <div className="space-y-6 lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Card className="bg-background/30">
                    <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-muted-foreground" />
                            Volatility
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">{stats.volatility}</div>
                    </CardContent>
                </Card>
                 <Card className="bg-background/30">
                    <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <BrainCircuit className="w-4 h-4 text-muted-foreground" />
                             Sentiment
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">{stats.sentiment}%</div>
                    </CardContent>
                </Card>
                 <Card className="bg-background/30">
                    <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            Strategists
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">{stats.strategists}</div>
                    </CardContent>
                </Card>
            </div>
            <Card className="bg-background/30">
                <CardHeader>
                    <CardTitle className="text-lg">Asset Saturation Heat Map</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-28 bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground text-sm">Live {region} heat map will be displayed here.</p>
                </CardContent>
            </Card>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}

export default function AssetsPage() {
  const [activeTab, setActiveTab] = React.useState(regionTabs[0].toLowerCase().replace(/\s+/g, "-"));

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Globe className="w-8 h-8" />
          Global Asset Monitoring
        </h1>
        <p className="text-muted-foreground">
          Live global telemetry and strategist-grade overlays from Vertex AI.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center pb-4">
            <TabsList className="grid w-full max-w-4xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 h-auto">
              {regionTabs.map((tab) => (
                <TabsTrigger key={tab} value={tab.toLowerCase().replace(/\s+/g, "-")} className="py-2">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
        </div>
        {regionTabs.map((tab) => (
          <TabsContent key={tab} value={tab.toLowerCase().replace(/\s+/g, "-")}>
            {activeTab === tab.toLowerCase().replace(/\s+/g, "-") && <RegionContent region={tab} />}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
