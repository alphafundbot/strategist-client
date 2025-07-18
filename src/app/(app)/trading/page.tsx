
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TradingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Trading</h1>
        <p className="text-muted-foreground">Access your mutation simulator, replay traces, and override terminal.</p>
      </div>

      <div className="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Mutation Simulator</CardTitle>
            <CardDescription>
                Create and test new mutation strategies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">The mutation simulator will be available here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Replay Trace Viewer</CardTitle>
             <CardDescription>
                Review historical mutation performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground">The replay trace viewer will be available here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Override Terminal</CardTitle>
             <CardDescription>
                Manually intervene in active mutations.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground">The override terminal will be available here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
