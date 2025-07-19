import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PlaidLinkButton from '@/components/transfers/plaid-link-button';
import AccountList from '@/components/transfers/account-list';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Banknote, History, LinkIcon } from 'lucide-react';

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
};

const deposits = [
  { date: "2025-07-18", institution: "JPMorgan Chase", account: "Checking (...4321)", amount: 10200.00, status: "Settled" },
  { date: "2025-07-17", institution: "Wells Fargo", account: "Investment (...5678)", amount: 25000.00, status: "Pending" },
  { date: "2025-07-15", institution: "Bank of America", account: "Savings (...8765)", amount: 78901.23, status: "Settled" },
];

const history = [
    { type: "Deposit", date: "2025-07-18", institution: "JPMorgan Chase", amount: 10200.00, status: "Settled" },
    { type: "Deposit", date: "2025-07-17", institution: "Wells Fargo", amount: 25000.00, status: "Pending" },
    { type: "Deposit", date: "2025-07-15", institution: "Bank of America", amount: 78901.23, status: "Settled" },
];


export default function TransfersPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Banknote className="w-8 h-8" />
          Vault Funding
        </h1>
        <p className="text-muted-foreground">Manage your connected accounts and secure vault deposits.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="w-6 h-6" />
                Connected Accounts
              </CardTitle>
              <CardDescription>
                Link your external financial accounts to fund your vault.
              </CardDescription>
            </div>
            <PlaidLinkButton />
          </div>
        </CardHeader>
        <CardContent>
          <AccountList />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Vault Deposit</CardTitle>
          <CardDescription>
            Securely transfer funds to your vault. Outbound transfers are not permitted.
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
          <CardTitle className="flex items-center gap-2">
            <History className="w-6 h-6" />
            Transfer History
          </CardTitle>
          <CardDescription>
            Review your past vault deposits.
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
