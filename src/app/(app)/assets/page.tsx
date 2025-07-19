
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CandlestickChart } from "lucide-react";

export default function AssetsPage() {
  const assetTabs = [
    "Crypto", "Equities", "Commodities", "Forex", "Indices", "Bonds", "Derivatives", "Custom Feeds"
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <CandlestickChart className="w-8 h-8" />
          Live Asset Intelligence
        </h1>
        <p className="text-muted-foreground">
          Real-time telemetry and strategist-grade overlays from Vertex AI.
        </p>
      </div>

      <Tabs defaultValue="crypto" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          {assetTabs.map((tab) => (
            <TabsTrigger key={tab} value={tab.toLowerCase().replace(" ", "-")}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        {assetTabs.map((tab) => (
          <TabsContent key={tab} value={tab.toLowerCase().replace(" ", "-")}>
            <Card>
              <CardHeader>
                <CardTitle>{tab} Feed</CardTitle>
                <CardDescription>
                  Live data and Gemini-powered trend analysis for {tab}.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-48">
                <p className="text-muted-foreground">Live {tab} data will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
