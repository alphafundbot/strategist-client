
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/settings/theme-toggle';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Code2, UserCircle, Bot } from 'lucide-react';
import { ClientOnly } from '@/components/common/ClientOnly';

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
          <CardTitle className="flex items-center gap-2">
            <UserCircle className="w-6 h-6" />
            Authentication & Identity
          </CardTitle>
          <CardDescription>View and manage your strategist profile information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="strategist-name">Strategist Name</Label>
                    <Input id="strategist-name" defaultValue="Gamma-6" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="strategist-tier">Current Tier</Label>
                    <Input id="strategist-tier" defaultValue="Gold" disabled />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="strategist-bio">Bio</Label>
                <Textarea id="strategist-bio" placeholder="Describe your strategy and focus..." defaultValue="Specializing in high-frequency arbitrage and volatility scalping across digital asset pairs." />
            </div>
             <Button>Save Profile</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
           <CardTitle className="flex items-center gap-2">
                <Bot className="w-6 h-6" />
                Narration & Voice Controls
            </CardTitle>
          <CardDescription>Customize your Everest AI narration experience.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
                <Label htmlFor="audio-narration">Enable Audio Narration</Label>
                <Switch id="audio-narration" defaultChecked />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="narration-voice">Narration Voice</Label>
                    <Select defaultValue="everest">
                        <SelectTrigger id="narration-voice">
                            <SelectValue placeholder="Select a voice" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="everest">Everest (Default)</SelectItem>
                            <SelectItem value="sentinel">Sentinel</SelectItem>
                            <SelectItem value="oracle">Oracle</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="narration-speed">Narration Speed</Label>
                    <Select defaultValue="1">
                        <SelectTrigger id="narration-speed">
                            <SelectValue placeholder="Select speed" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0.75">0.75x</SelectItem>
                            <SelectItem value="1">1.0x (Normal)</SelectItem>
                            <SelectItem value="1.25">1.25x</SelectItem>
                            <SelectItem value="1.5">1.5x</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>UI & Theme Customization</CardTitle>
          <CardDescription>Personalize the look and feel of your cockpit.</CardDescription>
        </CardHeader>
        <CardContent>
          <ClientOnly>
            <ThemeToggle />
          </ClientOnly>
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
