import MutationDashboard from '@/components/dashboard/mutation-dashboard';
import MutationGenerator from '@/components/dashboard/mutation-generator';
import RationaleNarration from '@/components/dashboard/rationale-narration';
import CognitionGraph from '@/components/dashboard/cognition-graph';
import RoiSimulation from '@/components/dashboard/roi-simulation';
import AuditTrace from '@/components/dashboard/audit-trace';
import ReplayAnnotator from '@/components/dashboard/replay-annotator';
import GlossaryManager from '@/components/dashboard/glossary-manager';

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
      {/* Row 1: Main Dashboard */}
      <div className="xl:col-span-3">
        <MutationDashboard />
      </div>

      {/* Row 2: Core Actions */}
      <div className="xl:col-span-2">
        <CognitionGraph />
      </div>
      <div className="grid auto-rows-fr gap-4 md:gap-8">
        <MutationGenerator />
        <RationaleNarration />
      </div>

      {/* Row 3: Analytics and Tools */}
      <div >
        <RoiSimulation />
      </div>
      <div>
        <ReplayAnnotator />
      </div>
      <div>
        <GlossaryManager />
      </div>

      {/* Row 4: Audit */}
      <div className="xl:col-span-3">
        <AuditTrace />
      </div>
    </div>
  );
}
