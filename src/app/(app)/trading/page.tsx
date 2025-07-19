
import MutationDashboard from '@/components/dashboard/mutation-dashboard';
import MutationGenerator from '@/components/dashboard/mutation-generator';
import GlossaryManager from '@/components/dashboard/glossary-manager';
import ReplayAnnotator from '@/components/dashboard/replay-annotator';

export default function TradingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Trading</h1>
        <p className="text-muted-foreground">Simulate mutations, monitor override logic, and evolve strategist cognition.</p>
      </div>
      
      <div className="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <MutationDashboard />
        </div>
        <div className="space-y-4 md:space-y-8">
            <MutationGenerator />
            <GlossaryManager />
        </div>
      </div>
      <div>
        <ReplayAnnotator />
      </div>
    </div>
  );
}
