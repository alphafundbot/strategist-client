
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, ShieldCheck } from 'lucide-react';

interface MutationCardProps {
    id: string;
    fillAccuracy: number | null;
    roiArc: number | null;
    signalAncestry: string;
    status: 'active' | 'override' | 'pending';
}

const statusStyles = {
    active: 'bg-green-500/20 text-green-700 border-green-500/30',
    override: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
    pending: 'bg-gray-500/20 text-gray-700 border-gray-500/30',
}

export default function MutationCard({ id, fillAccuracy, roiArc, signalAncestry, status }: MutationCardProps) {
    const roiColor = roiArc === null || roiArc >= 0 ? 'text-accent' : 'text-destructive';

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{id}</CardTitle>
                <Badge variant="outline" className={statusStyles[status]}>{status}</Badge>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold font-headline ">{signalAncestry}</div>
                <div className="flex justify-between items-end mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                         <Target className="w-4 h-4" />
                        <span>Fill Acc.</span>
                        <span className="font-semibold text-foreground">{fillAccuracy !== null ? `${fillAccuracy}%` : 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <TrendingUp className={`w-4 h-4 ${roiColor}`} />
                        <span>ROI Arc</span>
                        <span className={`font-semibold ${roiColor}`}>
                            {roiArc !== null ? `${roiArc > 0 ? '+' : ''}${roiArc}%` : 'Pending'}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
