
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
import { cn } from "@/lib/utils"

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
    router.push("/dashboard")
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
    {
      name: "Gold",
      icon: <Star className="w-8 h-8" />,
      description: "Mutation replay lab, fingerprint evolution, full strategist telemetry, and highest ROI potential (13-18%).",
      style: "bg-[#FFD700] text-black hover:bg-[#FFDF33] focus-visible:ring-[#FFD700]"
    },
    {
      name: "Silver",
      icon: <Gem className="w-8 h-8" />,
      description: "Dynamic allocation between 9% and 12% based on conviction, volatility, and asset rating.",
      style: "bg-[#C0C0C0] text-black hover:bg-[#D3D3D3] focus-visible:ring-[#C0C0C0]"
    },
    {
      name: "Free+",
      icon: <Shield className="w-8 h-8" />,
      description: "Basic vault access, Everest onboarding, and capped forecasting with a foundational ROI arc (4-8%).",
      style: "bg-[#CD7F32] text-white hover:bg-[#D48940] focus-visible:ring-[#CD7F32]"
    },
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
    <div className="flex items-center justify-center min-h-screen bg-[#0F1115] p-4">
      <Card className="w-full max-w-md shadow-2xl backdrop-blur-md bg-[#1C1F26]/95 border-[rgba(237,242,244,0.15)] text-[#EDF2F4]">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <StrategistLogo className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">Strategist Systems™ Cockpit</CardTitle>
          <CardDescription className="pt-2 text-[rgba(237,242,244,0.85)]">Select your access tier to begin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {tiers.map((tier) => (
            <Button
              key={tier.name}
              aria-label={`Select ${tier.name} Tier`}
              onClick={() => handleLogin(tier.name)}
              className={cn(
                "w-full justify-start h-auto text-left py-4 group transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1115]",
                tier.style
              )}
              variant="default"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 shrink-0 group-hover:scale-110 transition-transform flex items-center justify-center">
                    {tier.icon}
                </div>
                <div>
                    <p className="font-semibold text-lg">{tier.name} Tier</p>
                    <p className="text-xs font-normal whitespace-normal opacity-90">{tier.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </CardContent>
        <CardFooter className="flex-col gap-4">
             <Button onClick={handleWalkthrough} disabled={isLoading} variant="ghost" className="w-full text-[#A8B2BC] hover:bg-[#2A9D8F]/20 hover:text-white">
              {isLoading && !(audioRef.current && !audioRef.current.paused) ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (audioRef.current && !audioRef.current.paused) ? (
                <VolumeX className="mr-2 h-4 w-4" />
              ) : (
                <Volume2 className="mr-2 h-4 w-4" />
              )}
              {getButtonText()}
            </Button>
            <p className="text-xs text-[#A8B2BC] text-center w-full">
                © {new Date().getFullYear()} Strategist Systems™. All rights reserved.
            </p>
        </CardFooter>
      </Card>
    </div>
  )
}
