
'use client';

import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SummaryStepProps {
  formData: {
    goals: string;
    experience: string;
    style: string;
    motivation: string;
  };
}

const labels: { [key: string]: { [key: string]: string } } = {
  goals: {
    mutation: 'Design Mutations',
    pitch: 'Architect Pitches',
    vault: 'Amplify Vault Capital',
    syndicate: 'Launch a Syndicate',
  },
  experience: {
    novice: 'Novice Strategist',
    advisor: 'Seasoned Advisor',
    elite: 'Elite Operator',
  },
  style: {
    investor: 'Investor (High-level)',
    technical: 'Technical (Detailed)',
    compressed: 'Compressed (Data-driven)',
  },
  motivation: {
    alpha: 'Generating Alpha',
    cognition: 'Evolving Cognition',
    narrative: 'Crafting Narratives',
    control: 'Precision Control',
  },
};

export default function SummaryStep({ formData }: SummaryStepProps) {
  return (
    <div className="text-center p-4">
      <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center gap-2">
        <CheckCircle2 className="w-8 h-8 text-green-500" />
        Configuration Complete
      </h2>
      <p className="text-muted-foreground mb-6">
        Your cockpit is calibrated. Review your selections below. You can change these preferences later in Settings.
      </p>
      <Card className="text-left bg-background/50">
        <CardContent className="p-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Primary Goal</p>
            <p className="font-semibold">{labels.goals[formData.goals]}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Experience</p>
            <p className="font-semibold">{labels.experience[formData.experience]}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Narration Style</p>
            <p className="font-semibold">{labels.style[formData.style]}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Motivation</p>
            <p className="font-semibold">{labels.motivation[formData.motivation]}</p>
          </div>
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground mt-6">
        Click "Deploy My Cockpit" to launch your personalized experience.
      </p>
    </div>
  );
}
