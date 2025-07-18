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
    <div className="grid auto-rows-fr gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="xl:col-span-2 grid auto-rows-fr gap-4">
        <MutationDashboard />
      </div>
      <div className="row-span-1 grid auto-rows-fr gap-4 lg:row-span-2">
        <MutationGenerator />
        <RationaleNarration />
      </div>
      <div className="grid auto-rows-fr gap-4">
        <RoiSimulation />
      </div>
      <div className="xl:col-span-2 grid auto-rows-fr gap-4">
         <CognitionGraph />
      </div>
       <div className="grid auto-rows-fr gap-4">
        <ReplayAnnotator />
      </div>
      <div className="grid auto-rows-fr gap-4">
         <GlossaryManager />
      </div>
      <div className="grid auto-rows-fr gap-4">
        <AuditTrace />
      </div>
    </div>
  );
}
