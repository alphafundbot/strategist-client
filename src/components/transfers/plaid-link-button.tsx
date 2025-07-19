
"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Link } from "lucide-react"

export default function PlaidLinkButton() {
  const { toast } = useToast()

  const handleLinkAccount = () => {
    // This is where you would initialize Plaid Link
    toast({
      title: "Plaid Link Simulated",
      description: "In a real app, the Plaid Link modal would open here.",
    })
  }

  return (
    <Button onClick={handleLinkAccount}>
      <Link className="mr-2 h-4 w-4" />
      Link New Account
    </Button>
  )
}
