
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const accounts = [
  {
    institution: "Chase",
    accountName: "Checking (...4321)",
    balance: 15234.89,
    isDefault: true,
  },
  {
    institution: "Bank of America",
    accountName: "Savings (...8765)",
    balance: 78901.23,
    isDefault: false,
  },
  {
    institution: "Wells Fargo",
    accountName: "Investment (...5678)",
    balance: 250150.0,
    isDefault: false,
  },
]

export default function AccountList() {
  return (
    <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Institution</TableHead>
              <TableHead>Account</TableHead>
              <TableHead className="text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.accountName}>
                <TableCell className="font-medium">{account.institution}</TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <span>{account.accountName}</span>
                        {account.isDefault && <Badge variant="secondary">Default</Badge>}
                    </div>
                </TableCell>
                <TableCell className="text-right font-mono">
                  ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  )
}
