
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export default function VoiceControlFab() {
  const [isListening, setIsListening] = useState(false);

  const handleMicClick = () => {
    setIsListening(prev => !prev);
    // In a real app, you would start/stop voice recognition here.
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            onClick={handleMicClick}
            className={cn(
              "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-30 bg-background/30 backdrop-blur-sm border border-primary/20 hover:bg-primary/20",
              "transition-all duration-300",
              isListening && "ring-4 ring-primary/50 ring-offset-2 ring-offset-background animate-pulse"
            )}
          >
            <Mic className="h-7 w-7 text-primary" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-background/80 backdrop-blur-sm border-primary/30">
          <p>Voice Commands</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
