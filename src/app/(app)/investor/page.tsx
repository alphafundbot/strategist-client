
import InvestorSummary from '@/components/investor/investor-summary';
import RoiCharts from '@/components/investor/roi-charts';
import ExportOptions from '@/components/investor/export-options';

export default function InvestorPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Investor Mode</h1>
        <p className="text-muted-foreground">Narrate strategist performance and unlock pitch-ready export tools.</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <RoiCharts />
          <ExportOptions />
        </div>
        <div className="lg:col-span-1">
          <InvestorSummary />
        </div>
      </div>
    </div>
  );
}
