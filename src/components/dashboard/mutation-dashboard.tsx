import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MutationCard from "./mutation-card";

const mutations = [
  {
    id: "MUT-001",
    fillAccuracy: 98.7,
    roiArc: 15.2,
    signalAncestry: "Alpha-7",
    status: "active",
  },
  {
    id: "MUT-002",
    fillAccuracy: 95.1,
    roiArc: -2.1,
    signalAncestry: "Gamma-3",
    status: "override",
  },
  {
    id: "MUT-003",
    fillAccuracy: 99.2,
    roiArc: 22.8,
    signalAncestry: "Delta-5",
    status: "active",
  },
  {
    id: "MUT-004",
    fillAccuracy: 97.5,
    roiArc: 8.5,
    signalAncestry: "Alpha-9",
    status: "pending",
  },
];


export default function MutationDashboard() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Live Mutation Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
            {mutations.map((mutation) => (
                <MutationCard key={mutation.id} {...mutation} />
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
