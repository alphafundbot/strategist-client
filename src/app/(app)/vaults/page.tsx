
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Landmark, Users, TrendingUp, Shield } from "lucide-react"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const vaultTypes = [
  "Personal", "Family", "Peer-to-Peer", "Business", "School", "Church", "Nonprofit", 
  "Hospital", "Union", "Online Group", "Fanbase", "Religious Org", 
  "Government", "Firm", "Club", "Bank", "Casino", "Wall Street", "Private Equity"
];

const myVaults = [
    {
        name: "Syndicate Alpha",
        category: "Firm",
        balance: 125000,
        roi: 18.2,
        members: 5,
        risk: "Low",
        memberContributions: [
            { name: 'You', value: 40000, fill: 'hsl(var(--chart-1))' },
            { name: 'Strategist B', value: 30000, fill: 'hsl(var(--chart-2))' },
            { name: 'Strategist C', value: 25000, fill: 'hsl(var(--chart-3))' },
            { name: 'Strategist D', value: 20000, fill: 'hsl(var(--chart-4))' },
            { name: 'Strategist E', value: 10000, fill: 'hsl(var(--chart-5))' },
        ]
    },
    {
        name: "P2P Momentum Fund",
        category: "Peer-to-Peer",
        balance: 22450,
        roi: 9.8,
        members: 2,
        risk: "Medium",
        memberContributions: [
            { name: 'You', value: 11225, fill: 'hsl(var(--chart-1))' },
            { name: 'Strategist X', value: 11225, fill: 'hsl(var(--chart-2))' },
        ]
    }
]

export default function VaultsPage() {

  const handleCreateVault = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logic to handle vault creation would go here
    console.log("Creating vault...");
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Landmark className="w-8 h-8" />
            Collective Vaults
        </h1>
        <p className="text-muted-foreground">
          Create, join, and manage pooled strategist vaults for shared cognition.
        </p>
      </div>

      <Tabs defaultValue="my-vaults" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="my-vaults">My Vaults</TabsTrigger>
          <TabsTrigger value="create-vault">Create Vault</TabsTrigger>
        </TabsList>
        <TabsContent value="my-vaults">
            <Card className="bg-card/70 backdrop-blur-md">
                <CardHeader>
                    <CardTitle>My Collective Vaults</CardTitle>
                    <CardDescription>
                        A list of collective vaults you are a member of.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   {myVaults.length > 0 ? (
                       myVaults.map((vault) => (
                           <Card key={vault.name} className="bg-background/50">
                               <CardHeader>
                                   <CardTitle>{vault.name}</CardTitle>
                                   <CardDescription>{vault.category}</CardDescription>
                               </CardHeader>
                               <CardContent className="grid md:grid-cols-2 gap-6 items-center">
                                   <div>
                                       <div className="text-3xl font-bold">${vault.balance.toLocaleString()}</div>
                                       <div className="text-sm text-muted-foreground">Total Vault Balance</div>
                                       <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                                           <div className="flex items-center gap-2">
                                               <TrendingUp className="w-4 h-4 text-accent"/>
                                               <div>
                                                   <div className="font-semibold">{vault.roi}%</div>
                                                   <div className="text-muted-foreground">ROI</div>
                                               </div>
                                           </div>
                                            <div className="flex items-center gap-2">
                                               <Users className="w-4 h-4 text-muted-foreground"/>
                                               <div>
                                                   <div className="font-semibold">{vault.members}</div>
                                                   <div className="text-muted-foreground">Members</div>
                                               </div>
                                           </div>
                                            <div className="flex items-center gap-2">
                                               <Shield className="w-4 h-4 text-muted-foreground"/>
                                               <div>
                                                   <div className="font-semibold">{vault.risk}</div>
                                                   <div className="text-muted-foreground">Risk Level</div>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                                   <ChartContainer config={{}} className="h-48 w-full">
                                       <ResponsiveContainer width="100%" height="100%">
                                           <PieChart>
                                               <Tooltip content={<ChartTooltipContent hideLabel />} />
                                               <Pie data={vault.memberContributions} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5}>
                                                   {vault.memberContributions.map((entry, index) => (
                                                       <Cell key={`cell-${index}`} fill={entry.fill} />
                                                   ))}
                                               </Pie>
                                           </PieChart>
                                       </ResponsiveContainer>
                                   </ChartContainer>
                               </CardContent>
                           </Card>
                       ))
                   ) : (
                    <div className="text-center text-muted-foreground py-8">
                        <p>You have not joined any collective vaults yet.</p>
                    </div>
                   )}
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="create-vault">
           <Card className="bg-card/70 backdrop-blur-md">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="w-6 h-6" />
                    Create a New Collective Vault
                </CardTitle>
                <CardDescription>
                    Define your vault's name, category, and invite members to begin pooled trading.
                </CardDescription>
            </CardHeader>
             <form onSubmit={handleCreateVault}>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="vault-name">Vault Name</Label>
                        <Input id="vault-name" placeholder="e.g., 'Syndicate Alpha'" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="vault-type">Vault Category</Label>
                        <Select required>
                            <SelectTrigger id="vault-type">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {vaultTypes.map((type) => (
                                    <SelectItem key={type} value={type.toLowerCase().replace(/ /g, '-')}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="invites">Invite Members (Optional)</Label>
                        <Input id="invites" placeholder="Enter emails, separated by commas" />
                        <p className="text-xs text-muted-foreground">
                            Invite strategists via email. You can also invite them later.
                        </p>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button type="submit" className="w-full md:w-auto">
                        Create Vault
                    </Button>
                </CardFooter>
            </form>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
