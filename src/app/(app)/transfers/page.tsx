
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PlaidLinkButton from '@/components/transfers/plaid-link-button';
import AccountList from '@/components/transfers/account-list';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const deposits = [
  { date: "2025-07-18", institution: "JPMorgan Chase", account: "Checking (...4321)", amount: 10200.00, status: "Settled" },
  { date: "2025-07-17", institution: "Wells Fargo", account: "Investment (...5678)", amount: 25000.00, status: "Pending" },
  { date: "2025-07-15", institution: "Bank of America", account: "Savings (...8765)", amount: 78901.23, status: "Settled" },
];

const withdrawals = [
    { date: "2025-07-18", destination: "Chase", account: "Checking (...4321)", amount: 5000.00, status: "Completed" },
    { date: "2025-07-16", destination: "Fidelity", account: "Brokerage (...9988)", amount: 12500.00, status: "Completed" },
    { date: "2025-07-14", destination: "PayPal", account: "Wallet (...1122)", amount: 1200.00, status: "Failed" },
];

const history = [
    { type: "Deposit", date: "2025-07-18", institution: "JPMorgan Chase", amount: 10200.00, status: "Settled" },
    { type: "Withdrawal", date: "2025-07-18", institution: "Chase", amount: 5000.00, status: "Completed" },
    { type: "Withdrawal", date: "2025-07-16", institution: "Fidelity", amount: 12500.00, status: "Completed" },
    { type: "Deposit", date: "2025-07-15", institution: "Bank of America", amount: 78901.23, status: "Settled" },
    { type: "Withdrawal", date: "2025-07-14", institution: "PayPal", amount: 1200.00, status: "Failed" },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
        case 'settled':
        case 'completed':
            return 'default';
        case 'pending':
            return 'secondary';
        case 'failed':
            return 'destructive';
        default:
            return 'outline';
    }
}

export default function TransfersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Transfers</h1>
        <p className="text-muted-foreground">Manage your connected accounts and vault transfers.</p>
      </div>

      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>
                Link and manage your external financial accounts.
              </CardDescription>
            </div>
            <PlaidLinkButton />
          </div>
        </CardHeader>
        <CardContent>
          <AccountList />
        </CardContent>
      </Card>
      <div className="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vault Deposit</CardTitle>
            <CardDescription>
              Securely transfer funds to your vault.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Institution</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {deposits.map((d, i) => (
                        <TableRow key={i}>
                            <TableCell className="font-medium">{d.institution}</TableCell>
                            <TableCell>${d.amount.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                                <Badge variant={getStatusBadgeVariant(d.status) as any}>{d.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
             </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Withdraw Funds</CardTitle>
            <CardDescription>
              Transfer funds from your vault to a primary account.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Destination</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {withdrawals.map((w, i) => (
                        <TableRow key={i}>
                            <TableCell className="font-medium">{w.destination}</TableCell>
                            <TableCell>${w.amount.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                               <Badge variant={getStatusBadgeVariant(w.status) as any}>{w.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
             </Table>
          </CardContent>
        </Card>
      </div>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Transfer History</CardTitle>
          <CardDescription>
            Review your past vault deposits and withdrawals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {history.map((t, i) => (
                    <TableRow key={i}>
                        <TableCell>
                           <Badge variant={t.type === 'Deposit' ? 'outline' : 'secondary'}>{t.type}</Badge>
                        </TableCell>
                        <TableCell>{t.date}</TableCell>
                        <TableCell className="font-medium">{t.institution}</TableCell>
                        <TableCell>${t.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                            <Badge variant={getStatusBadgeVariant(t.status) as any}>{t.status}</Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
