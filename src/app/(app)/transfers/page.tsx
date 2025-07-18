
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TransfersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Transfers</h1>
        <p className="text-muted-foreground">Manage your connected accounts and vault transfers.</p>
      </div>

      <div className="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
            <CardDescription>
                Link and manage your external financial accounts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Plaid or MX integration will be available here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Vault Deposit</CardTitle>
             <CardDescription>
                Securely transfer funds to your vault.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground">The vault deposit flow will be available here.</p>
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
             <p className="text-sm text-muted-foreground">The withdrawal flow will be available here.</p>
          </CardContent>
        </Card>
         <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Transfer History</CardTitle>
            <CardDescription>
                Review your past vault deposits and withdrawals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">A detailed transfer history log will be available here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
