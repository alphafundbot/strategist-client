
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
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
          <p className="text-sm text-muted-foreground">Theme options will be available here.</p>
        </CardContent>
      </Card>

    </div>
  );
}
