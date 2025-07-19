import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function InvestorPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Investor Mode</h1>
        <p className="text-muted-foreground">Narrate strategist performance and unlock pitch-ready export tools.</p>
      </div>
      <div className="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Narration Hub</CardTitle>
            <CardDescription>
              View Gemini-generated strategist narrations across mutation events.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Investor, technical, and compressed narration styles will be available here.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Voice Toggle + Markdown Export</CardTitle>
            <CardDescription>
              Enable pitch narration playback or export strategist summary.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Strategist voice logic and deck export will be available here.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conviction Metrics Dashboard</CardTitle>
            <CardDescription>
              Track mutation confidence, override immunity, and elevation clarity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Capital forecast metrics and risk stratification models will be shown here.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pitch Portal Builder</CardTitle>
            <CardDescription>
              Deploy strategist cockpit as investor preview portal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Connected vault metrics and narration history will be available here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
