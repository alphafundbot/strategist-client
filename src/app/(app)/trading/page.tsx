
'use client';

import MutationDashboard from '@/components/dashboard/mutation-dashboard';
import MutationGenerator from '@/components/dashboard/mutation-generator';
import RationaleNarration from '@/components/dashboard/rationale-narration';
import CognitionGraph from '@/components/dashboard/cognition-graph';
import RoiSimulation from '@/components/dashboard/roi-simulation';
import AuditTrace from '@/components/dashboard/audit-trace';
import ReplayAnnotator from '@/components/dashboard/replay-annotator';
import GlossaryManager from '@/components/dashboard/glossary-manager';
import VoiceControlFab from '@/components/common/voice-control-fab';

export default function TradingCockpitPage() {
  return (
    <>
      <div className="space-y-8">
          <div className="text-center">
              <h1 className="text-3xl font-bold">Trading Cockpit</h1>
              <p className="text-muted-foreground">High-frequency mutation engine and strategist oversight.</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-8">
                  <MutationDashboard />
                  <RoiSimulation />
                  <AuditTrace />
              </div>
              <div className="lg:col-span-1 space-y-8">
                  <MutationGenerator />
                  <RationaleNarration />
              </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <CognitionGraph />
              <ReplayAnnotator />
              <GlossaryManager />
          </div>
      </div>
      <VoiceControlFab />
    </>
  );
}
