
'use client';

import { Button } from "@/components/ui/button";

interface WelcomeStepProps {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <div className="text-center p-4">
      <h2 className="text-2xl font-semibold mb-4">Welcome, Strategist</h2>
      <p className="text-muted-foreground mb-6">
        This short personalization wizard will calibrate your Strategist Systems™ Cockpit.
        Your answers will tailor the UI, module priority, and AI narration to your unique needs.
      </p>
      <p className="text-muted-foreground mb-8">
        Let's begin.
      </p>
      <Button onClick={onNext}>
        Start Personalization
      </Button>
    </div>
  );
}
