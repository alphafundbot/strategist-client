
"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { generateWelcomeNarration } from "@/ai/flows/welcome-narration"
import { textToSpeech } from "@/ai/flows/text-to-speech"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Shield, Gem, Star, Crown, Volume2, Loader2, VolumeX } from "lucide-react"
import { StrategistLogo } from "@/components/common/strategist-logo"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingText, setIsGeneratingText] = useState(false);
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
    router.push("/onboarding")
  }

  const handleWalkthrough = async () => {
    if (isLoading || isGeneratingText) {
      stopNarration();
      return;
    };

    if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsLoading(false);
        return;
    }

    if (audioRef.current) {
        audioRef.current.play();
        setIsLoading(true);
        return;
    }

    setIsGeneratingText(true);
    setIsLoading(true);
    try {
      const narrationResult = await generateWelcomeNarration();
      const walkthroughText = narrationResult.narration;
      
      const result = await textToSpeech(walkthroughText);
      setIsGeneratingText(false);

      if (result.media) {
        const audio = new Audio(result.media);
        audioRef.current = audio;
        audio.play();
        audio.onended = () => {
          setIsLoading(false);
        };
        audio.onpause = () => {
            if (audio.currentTime !== audio.duration) {
                setIsLoading(false);
            }
        };
        audio.onplaying = () => {
            setIsLoading(true);
        }
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to generate narration audio:", error);
      setIsLoading(false);
      setIsGeneratingText(false);
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
    { name: "Omega", icon: <Crown className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform" /> },
    { name: "Gold", icon: <Star className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform" /> },
    { name: "Silver", icon: <Gem className="w-8 h-8 text-slate-400 group-hover:scale-110 transition-transform" /> },
    { name: "Free+", icon: <Shield className="w-8 h-8 text-orange-600 group-hover:scale-110 transition-transform" /> },
  ]

  const getButtonText = () => {
    if (isGeneratingText) return "Generating Narration...";
    if (isLoading) {
      if (audioRef.current && !audioRef.current.paused) return "Stop Introduction";
      return "Loading Audio...";
    }
    return "Play Introduction";
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <StrategistLogo className="w-10 h-10 text-primary" />
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
                <span className="font-semibold">{tier.name} Tier</span>
              </div>
            </Button>
          ))}
        </CardContent>
        <CardFooter className="flex-col gap-4">
             <Button onClick={handleWalkthrough} disabled={isLoading} variant="ghost" className="w-full">
              {isLoading && !(audioRef.current && !audioRef.current.paused) ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (audioRef.current && !audioRef.current.paused) ? (
                <VolumeX className="mr-2 h-4 w-4" />
              ) : (
                <Volume2 className="mr-2 h-4 w-4" />
              )}
              {getButtonText()}
            </Button>
            <p className="text-xs text-muted-foreground text-center w-full">
                © {new Date().getFullYear()} Strategist Systems™. All rights reserved.
            </p>
        </CardFooter>
      </Card>
    </div>
  )
}
