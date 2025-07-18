
"use client"

import { useState, useRef } from "react"
import { generateRationaleNarration } from "@/ai/flows/rationale-narration"
import { textToSpeech } from "@/ai/flows/text-to-speech"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BrainCircuit, Loader2, Sparkles, Volume2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "../ui/skeleton"

export default function RationaleNarration() {
  const [narration, setNarration] = useState<{ rationale: string; clarityScore: number } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isNarrating, setIsNarrating] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true)
    setNarration(null)
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
    }
    try {
      const result = await generateRationaleNarration({
        mutationProposal: "New high-frequency trading algorithm.",
        roiTarget: "15% quarterly",
        entropyRisk: "Low, capped at 2% drawdown",
      })
      setNarration(result)
    } catch (error) {
      console.error("Failed to generate rationale:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNarrate = async () => {
    if (!narration || isNarrating) return;

    if (audioRef.current) {
        audioRef.current.play();
        return;
    }

    setIsNarrating(true);
    try {
      const result = await textToSpeech(narration.rationale);
      if (result.media) {
        const audio = new Audio(result.media);
        audioRef.current = audio;
        audio.play();
        audio.onended = () => {
          setIsNarrating(false);
          audioRef.current = null;
        };
      } else {
        setIsNarrating(false);
      }
    } catch (error) {
      console.error("Failed to generate narration audio:", error);
      setIsNarrating(false);
    }
  };

  return (
    <Card className="shadow-lg flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="w-6 h-6" />
            Rationale Narration
        </CardTitle>
        <CardDescription>
          AI-generated logic summary for a mutation proposal.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {isLoading && (
            <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-8 w-1/2 mt-4" />
            </div>
        )}
        {narration && (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <p className="flex-grow text-sm text-muted-foreground">{narration.rationale}</p>
              <Button size="icon" variant="ghost" onClick={handleNarrate} disabled={isNarrating || isLoading}>
                {isNarrating ? <Loader2 className="h-5 w-5 animate-spin"/> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Clarity Score</span>
                <span className="text-sm font-bold text-primary">{narration.clarityScore}%</span>
              </div>
              <Progress value={narration.clarityScore} aria-label={`Clarity Score: ${narration.clarityScore}%`} />
            </div>
          </div>
        )}
        {!isLoading && !narration && (
            <div className="text-center text-muted-foreground py-8">
                <p>Click "Generate" to see the AI rationale.</p>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate Rationale
        </Button>
      </CardFooter>
    </Card>
  )
}
