
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

      <Tabs defaultValue={assetTabs[0].toLowerCase().replace(" ", "-")} className="w-full">
        <div className="flex justify-center">
            <TabsList className="grid w-full max-w-4xl grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
              {assetTabs.map((tab) => (
                <TabsTrigger key={tab} value={tab.toLowerCase().replace(" ", "-")}>
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
        </div>
        {assetTabs.map((tab) => (
          <TabsContent key={tab} value={tab.toLowerCase().replace(" ", "-")}>
            <Card className="bg-card/70 backdrop-blur-md">
              <CardHeader>
                <CardTitle>{tab} Feed</CardTitle>
                <CardDescription>
                  Live data and Gemini-powered trend analysis for {tab}. Data visibility is gated by strategist tier.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-64 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">Live {tab} data visualization will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
