
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Landmark } from "lucide-react"

const vaultTypes = [
  "Personal (Me)", "Family", "Peer-to-Peer", "Business", "School", "Church", "Nonprofit", 
  "Hospital", "Union", "Online Group", "Fanbase", "Religious Org", 
  "Local Government", "State Government", "Federal Government", "Firm", 
  "Club", "Bank", "Casino", "Wall Street Entity", "Private Equity"
];


export default function VaultsPage() {

  const handleCreateVault = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logic to handle vault creation would go here
    console.log("Creating vault...");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Landmark className="w-6 h-6" />
            Collective Vaults
        </h1>
        <p className="text-muted-foreground">
          Create, join, and manage pooled strategist vaults for shared cognition.
        </p>
      </div>

      <Tabs defaultValue="my-vaults" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
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
                <CardContent className="space-y-4">
                    <div className="text-center text-muted-foreground py-8">
                        <p>You have not joined any collective vaults yet.</p>
                    </div>
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
                                    <SelectItem key={type} value={type.toLowerCase().replace(/ /g, '-').replace(/\(me\)/, 'me')}>
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
