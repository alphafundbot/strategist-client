
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe } from "lucide-react";

export default function AssetsPage() {
  const regionTabs = [
    "Global", "North America", "Europe", "Asia", "South America", "Africa", "Oceania"
  ];

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

      <Tabs defaultValue={regionTabs[0].toLowerCase().replace(" ", "-")} className="w-full">
        <div className="flex justify-center">
            <TabsList className="grid w-full max-w-4xl grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
              {regionTabs.map((tab) => (
                <TabsTrigger key={tab} value={tab.toLowerCase().replace(" ", "-")}>
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
        </div>
        {regionTabs.map((tab) => (
          <TabsContent key={tab} value={tab.toLowerCase().replace(" ", "-")}>
            <Card className="bg-card/70 backdrop-blur-md">
              <CardHeader>
                <CardTitle>{tab} Asset Feed</CardTitle>
                <CardDescription>
                  Live data and Gemini-powered trend analysis for {tab}. Data visibility is gated by strategist tier.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-64 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">Live {tab} asset data visualization will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
