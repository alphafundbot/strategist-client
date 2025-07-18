
"use client"

import { useEffect, useState } from 'react';
import MutationDashboard from '@/components/dashboard/mutation-dashboard';
import MutationGenerator from '@/components/dashboard/mutation-generator';
import RationaleNarration from '@/components/dashboard/rationale-narration';
import CognitionGraph from '@/components/dashboard/cognition-graph';
import RoiSimulation from '@/components/dashboard/roi-simulation';
import AuditTrace from '@/components/dashboard/audit-trace';
import ReplayAnnotator from '@/components/dashboard/replay-annotator';
import GlossaryManager from '@/components/dashboard/glossary-manager';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';

const LockedFeatureCard = ({ featureName }: { featureName: string }) => (
  <Card className="shadow-lg h-full flex flex-col items-center justify-center bg-muted/50">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-muted-foreground">
        <Lock className="w-6 h-6" />
        {featureName}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">Upgrade your tier to unlock this feature.</p>
    </CardContent>
  </Card>
);


export default function DashboardPage() {
  const [userTier, setUserTier] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTier = localStorage.getItem('userTier');
      setUserTier(storedTier);
    }
  }, []);

  const hasAccess = (requiredTiers: string[]) => {
    if (!userTier) return false;
    return requiredTiers.includes(userTier);
  };

  if (userTier === null) {
    // You can render a loading state here if needed
    return null;
  }

  return (
    <div className="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
      {/* Row 1: Main Dashboard */}
      <div className="xl:col-span-3">
        <MutationDashboard />
      </div>

      {/* Row 2: Core Actions */}
      <div className="xl:col-span-2">
        {hasAccess(['Elite']) ? <CognitionGraph /> : <LockedFeatureCard featureName="Cognition Graph" />}
      </div>
      <div className="grid auto-rows-fr gap-4 md:gap-8">
        {hasAccess(['Elite', 'Gold', 'Silver', 'Free+']) ? <MutationGenerator /> : <LockedFeatureCard featureName="Mutation Generator" />}
        {hasAccess(['Elite', 'Gold', 'Silver']) ? <RationaleNarration /> : <LockedFeatureCard featureName="Rationale Narration" />}
      </div>

      {/* Row 3: Analytics and Tools */}
      <div >
        {hasAccess(['Elite', 'Gold', 'Silver']) ? <RoiSimulation /> : <LockedFeatureCard featureName="ROI Simulation" />}
      </div>
      <div>
        {hasAccess(['Elite', 'Gold']) ? <ReplayAnnotator /> : <LockedFeatureCard featureName="Replay Annotator" />}
      </div>
      <div>
        {hasAccess(['Elite']) ? <GlossaryManager /> : <LockedFeatureCard featureName="Glossary Manager" />}
      </div>

      {/* Row 4: Audit */}
      <div className="xl:col-span-3">
        <AuditTrace />
      </div>
    </div>
  );
}
