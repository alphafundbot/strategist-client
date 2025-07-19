
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { History } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const auditLogs = [
  { event: "Override", mutationId: "MUT-002", signature: "0x..a4f2", timestamp: "2m ago", details: "Market volatility spike" },
  { event: "Glossary Drift", mutationId: "N/A", signature: "System", timestamp: "15m ago", details: "Tag 'momentum' entropy > 0.8" },
  { event: "Tier Elevation", mutationId: "N/A", signature: "System", timestamp: "1h ago", details: "Strategist S-45 to Advisor" },
  { event: "Run", mutationId: "MUT-001", signature: "0x..b3e1", timestamp: "3h ago", details: "Standard execution" },
  { event: "Proposal", mutationId: "MUT-004", signature: "0x..c1d9", timestamp: "5h ago", details: "New opportunity identified" },
]

export default function AuditTrace() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <History className="w-6 h-6" />
            Override & Audit Trace
        </CardTitle>
        <CardDescription>
          Detailed log of override decisions and system events.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Mutation ID</TableHead>
              <TableHead>Signature</TableHead>
              <TableHead className="text-right">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Badge variant={log.event === 'Override' ? 'destructive' : 'secondary'}>{log.event}</Badge>
                </TableCell>
                <TableCell className="font-medium">{log.mutationId}</TableCell>
                <TableCell className="font-mono text-xs">{log.signature}</TableCell>
                <TableCell className="text-right text-muted-foreground">{log.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
