"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, User, Eye, Crown } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (tier: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("userTier", tier)
    }
    router.push("/dashboard")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Rocket className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">Strategist Systems™ Cockpit</CardTitle>
          <CardDescription className="pt-2">Select your access tier to begin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
            <Button
                onClick={() => handleLogin("Elite")}
                className="w-full justify-start text-lg py-8 group"
                variant="outline"
            >
                <div className="flex items-center gap-4">
                    <Crown className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Elite Strategist</span>
                </div>
            </Button>
            <Button
                onClick={() => handleLogin("Advisor")}
                className="w-full justify-start text-lg py-8 group"
                variant="outline"
            >
                <div className="flex items-center gap-4">
                    <User className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Advisor</span>
                </div>
            </Button>
            <Button
                onClick={() => handleLogin("Observer")}
                className="w-full justify-start text-lg py-8 group"
                variant="outline"
            >
                <div className="flex items-center gap-4">
                    <Eye className="w-8 h-8 text-gray-400 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Observer</span>
                </div>
            </Button>
        </CardContent>
        <CardFooter>
            <p className="text-xs text-muted-foreground text-center w-full">
                © {new Date().getFullYear()} Strategist Systems™. All rights reserved.
            </p>
        </CardFooter>
      </Card>
    </div>
  )
}
