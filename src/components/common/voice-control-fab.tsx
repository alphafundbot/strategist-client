
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Loader2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const VoiceVisualizer = ({ isListening }: { isListening: boolean }) => (
    <div className="relative w-8 h-8 flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
            <div
                key={i}
                className={cn(
                    "absolute w-full h-full rounded-full bg-primary/30",
                    isListening ? "animate-pulse" : ""
                )}
                style={{
                    animationDelay: isListening ? `${i * 200}ms` : '0ms',
                    animationDuration: isListening ? '1.5s' : '0s'
                }}
            />
        ))}
        <Mic className={cn("h-6 w-6 text-primary z-10 transition-transform", isListening && "scale-110")} />
    </div>
);


export default function VoiceControlFab() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMicClick = () => {
    // In a real app, you would integrate Web Speech API or a similar service.
    if (isListening) {
        setIsListening(false);
        setIsProcessing(true);
        // Simulate processing a command
        setTimeout(() => setIsProcessing(false), 2000);
    } else {
        setIsListening(true);
    }
  };

  const getTooltipText = () => {
    if (isProcessing) return "Processing command...";
    if (isListening) return "Listening... Tap to stop.";
    return "Tap to narrate command";
  }

  return (
    <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-50">
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
            <Button
                size="icon"
                onClick={handleMicClick}
                disabled={isProcessing}
                className={cn(
                    "h-16 w-16 rounded-full shadow-2xl z-10",
                    "bg-background border-2 border-primary/50 text-primary-foreground",
                    "hover:bg-accent/10 hover:border-primary transition-all",
                    isListening && "ring-4 ring-primary/50 ring-offset-2 ring-offset-background"
                )}
            >
                {isProcessing ? (
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                ) : (
                    <VoiceVisualizer isListening={isListening} />
                )}
            </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-card backdrop-blur-sm border-primary/30">
            <p>{getTooltipText()}</p>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>
    </div>
  );
}
