
"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { textToSpeech } from "@/ai/flows/text-to-speech"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, User, Shield, Gem, Star, Crown, Volume2, Loader2, VolumeX } from "lucide-react"

const walkthroughText = `
Welcome to the Strategist Systems Cockpit. Select your access tier to begin.
Elite tier provides full access to all mutation tools and override terminals.
Gold and Silver tiers offer access to advanced simulation and replay tools.
The Free+ tier provides access to core mutation monitoring.
The Free tier allows you to observe live mutation data.
Choose your tier to enter the cockpit.
`;

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopNarration = () => {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
    setIsLoading(false);
  }

  const handleLogin = (tier: string) => {
    stopNarration();
    if (typeof window !== 'undefined') {
      localStorage.setItem("userTier", tier)
    }
    router.push("/dashboard")
  }

  const handleWalkthrough = async () => {
    if (isLoading) {
      stopNarration();
      return;
    };

    if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsLoading(false);
        return;
    }

    if (audioRef.current) {
        audioRef.current.play();
        setIsLoading(true);
        return;
    }

    setIsLoading(true);
    try {
      const result = await textToSpeech(walkthroughText);
      if (result.media) {
        const audio = new Audio(result.media);
        audioRef.current = audio;
        audio.play();
        audio.onended = () => {
          setIsLoading(false);
        };
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to generate narration audio:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    }
  }, []);

  const tiers = [
    { name: "Elite", icon: <Crown className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform" /> },
    { name: "Gold", icon: <Star className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform" /> },
    { name: "Silver", icon: <Gem className="w-8 h-8 text-slate-400 group-hover:scale-110 transition-transform" /> },
    { name: "Free+", icon: <Shield className="w-8 h-8 text-orange-600 group-hover:scale-110 transition-transform" /> },
    { name: "Free", icon: <User className="w-8 h-8 text-gray-400 group-hover:scale-110 transition-transform" /> },
  ]

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
          {tiers.map((tier) => (
            <Button
              key={tier.name}
              onClick={() => handleLogin(tier.name)}
              className="w-full justify-start text-lg py-8 group"
              variant="outline"
            >
              <div className="flex items-center gap-4">
                {tier.icon}
                <span className="font-semibold">{tier.name}{tier.name !== 'Free' ? '' : ' Tier'}</span>
              </div>
            </Button>
          ))}
        </CardContent>
        <CardFooter className="flex-col gap-4">
             <Button onClick={handleWalkthrough} disabled={isLoading && !audioRef.current?.paused} variant="ghost" className="w-full">
              {isLoading && !audioRef.current?.paused ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (audioRef.current && !audioRef.current.paused) ? (
                <VolumeX className="mr-2 h-4 w-4" />
              ) : (
                <Volume2 className="mr-2 h-4 w-4" />
              )}
              {isLoading && !audioRef.current?.paused ? 'Loading...' : (audioRef.current && !audioRef.current.paused) ? 'Stop Walkthrough' : 'Play Walkthrough'}
            </Button>
            <p className="text-xs text-muted-foreground text-center w-full">
                © {new Date().getFullYear()} Strategist Systems™. All rights reserved.
            </p>
        </CardFooter>
      </Card>
    </div>
  )
}
