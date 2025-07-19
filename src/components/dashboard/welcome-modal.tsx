
"use client";

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Rocket, BrainCircuit, Loader2 } from 'lucide-react';
import { generateStrategistBriefing } from '@/ai/flows/strategist-briefing-generator';
import { Skeleton } from '../ui/skeleton';

const WELCOME_MODAL_SEEN_KEY = 'welcomeModalSeen';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [briefing, setBriefing] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [tier, setTier] = useState('');

  useEffect(() => {
    const hasSeenModal = localStorage.getItem(WELCOME_MODAL_SEEN_KEY);
    const userTier = localStorage.getItem('userTier') || 'Free+';
    setTier(userTier);

    if (!hasSeenModal) {
      setIsOpen(true);
      fetchBriefing(userTier);
    }
  }, []);

  const fetchBriefing = async (currentTier: string) => {
    setIsLoading(true);
    try {
      const mockMutations = [
        { id: 'MUT-001', roi: 15.2, status: 'active' },
        { id: 'MUT-003', roi: 22.8, status: 'active' },
      ];
      const result = await generateStrategistBriefing({ tier: currentTier, recentMutations: mockMutations });
      setBriefing(result.briefing);
    } catch (error) {
      console.error("Failed to generate strategist briefing:", error);
      setBriefing("Could not load briefing. The market awaits your command.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    localStorage.setItem(WELCOME_MODAL_SEEN_KEY, 'true');
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Rocket className="w-6 h-6 text-primary" />
            Cockpit Deployed
          </DialogTitle>
          <DialogDescription>
            Welcome, {tier} Tier Strategist. Your personalized cockpit is online and ready for action.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2"><BrainCircuit className="w-5 h-5" /> Everest Briefing</h4>
            <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md min-h-[60px]">
                {isLoading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                ) : (
                    <p>{briefing}</p>
                )}
            </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClose} className="w-full">
            Begin Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
