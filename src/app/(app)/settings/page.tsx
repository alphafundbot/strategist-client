
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/settings/theme-toggle';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Code2 } from 'lucide-react';

const CodeSnippet = ({ children }: { children: React.ReactNode }) => (
    <pre className="p-4 bg-muted/50 rounded-md text-sm overflow-x-auto">
        <code className="font-code text-primary">{children}</code>
    </pre>
);

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your cockpit preferences and platform connections.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Authentication & Identity</CardTitle>
          <CardDescription>View your strategist profile and tier information.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Identity settings will be displayed here.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Narration & Voice Controls</CardTitle>
          <CardDescription>Customize your AI narration experience.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Narration controls will be available here.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>UI & Theme Customization</CardTitle>
          <CardDescription>Personalize the look and feel of your cockpit.</CardDescription>
        </CardHeader>
        <CardContent>
          <ThemeToggle />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Code2 className="w-6 h-6" />
                Developer Corner
            </CardTitle>
          <CardDescription>Access code snippets for common SDK and API interactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Connect to Cockpit API</AccordionTrigger>
              <AccordionContent>
                <CodeSnippet>
{`const { Cockpit } = require('strategist-systems-sdk');

const cockpit = new Cockpit({
  apiKey: 'YOUR_API_KEY',
  strategistId: 'YOUR_STRATEGIST_ID',
});

async function getTelemetry() {
  const telemetry = await cockpit.getGlobalFeed();
  console.log(telemetry);
}

getTelemetry();`}
                </CodeSnippet>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Delegate a Trade</AccordionTrigger>
              <AccordionContent>
                <CodeSnippet>
{`async function delegateTrade() {
  const result = await cockpit.delegateTrade({
    asset: 'BTC/USD',
    amount: 1.5,
    strategy: 'volatility-scalp',
    tier: 'Gold',
  });
  console.log(result);
}`}
                </CodeSnippet>
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-3">
              <AccordionTrigger>Listen for Fatigue Events</AccordionTrigger>
              <AccordionContent>
                <CodeSnippet>
{`cockpit.on('fatigueEvent', (event) => {
  console.log('Fatigue detected:', event.details);
  // Trigger automated risk mitigation
});`}
                </CodeSnippet>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

    </div>
  );
}
