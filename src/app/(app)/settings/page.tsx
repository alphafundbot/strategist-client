
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/settings/theme-toggle';
import ExportOptions from '@/components/investor/export-options';

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

      <ExportOptions />

    </div>
  );
}
