import InvestorSummary from '@/components/investor/investor-summary';
import RoiCharts from '@/components/investor/roi-charts';
import ExportOptions from '@/components/investor/export-options';

export default function InvestorPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Investor Mode</h1>
        <p className="text-muted-foreground">View summaries, charts, and export options tailored for investors.</p>
      </div>
      <div className="grid auto-rows-fr gap-4 md:gap-8 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <InvestorSummary />
        </div>
        <div className="lg:col-span-2">
          <RoiCharts />
        </div>
        <div className="lg:col-span-2">
          <ExportOptions />
        </div>
      </div>
    </div>
  );
}
