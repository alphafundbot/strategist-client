
"use client";

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

const WELCOME_MODAL_KEY = 'strategistWelcomeModalDismissed_v1';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // This effect runs only on the client
    const hasBeenDismissed = localStorage.getItem(WELCOME_MODAL_KEY);
    if (!hasBeenDismissed) {
      setIsOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(WELCOME_MODAL_KEY, 'true');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">Welcome to the Cockpit</DialogTitle>
          <DialogDescription className="text-center">
            You are now entering the Strategist Systems™ command center. Monitor, evolve, and deploy your strategies with precision.
          </DialogDescription>
        </DialogHeader>
        <div className="text-center text-sm text-muted-foreground pt-4">
          <p>All systems are online. Everest is ready for your command.</p>
        </div>
        <DialogFooter>
          <Button onClick={handleDismiss} className="w-full">
            Engage
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
