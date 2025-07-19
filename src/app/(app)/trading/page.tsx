
import AuditTrace from '@/components/dashboard/audit-trace';
import CognitionGraph from '@/components/dashboard/cognition-graph';
import GlossaryManager from '@/components/dashboard/glossary-manager';
import MutationDashboard from '@/components/dashboard/mutation-dashboard';
import MutationGenerator from '@/components/dashboard/mutation-generator';
import RationaleNarration from '@/components/dashboard/rationale-narration';
import ReplayAnnotator from '@/components/dashboard/replay-annotator';
import RoiSimulation from '@/components/dashboard/roi-simulation';

export default function TradingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Trading</h1>
        <p className="text-muted-foreground">
          Simulate mutations, monitor override logic, and evolve strategist
          cognition.
        </p>
      </div>

      <div className="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 grid grid-cols-1 gap-4 md:gap-8">
            <MutationDashboard />
            <RoiSimulation />
            <AuditTrace />
        </div>
        <div className="space-y-4 md:space-y-8">
          <MutationGenerator />
          <RationaleNarration />
          <GlossaryManager />
        </div>
      </div>
      <div className="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2">
        <CognitionGraph />
        <ReplayAnnotator />
      </div>
    </div>
  );
}
