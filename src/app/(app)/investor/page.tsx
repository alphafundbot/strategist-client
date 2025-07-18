import InvestorSummary from '@/components/investor/investor-summary';
import RoiCharts from '@/components/investor/roi-charts';
import ExportOptions from '@/components/investor/export-options';

export default function InvestorPage() {
  return (
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
  );
}
