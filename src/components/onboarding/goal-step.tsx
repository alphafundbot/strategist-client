
'use client';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface GoalStepProps {
  formData: { goals: string };
  onUpdate: (field: 'goals', value: string) => void;
}

const options = [
  { value: 'mutation', label: 'Design Mutations' },
  { value: 'pitch', label: 'Architect Pitches' },
  { value: 'vault', label: 'Amplify Vault Capital' },
  { value: 'syndicate', label: 'Launch a Syndicate' },
];

export default function GoalStep({ formData, onUpdate }: GoalStepProps) {
  return (
    <div>
      <h3 className="font-semibold text-lg text-center">What do you want to build?</h3>
      <p className="text-sm text-muted-foreground mb-4 text-center">Your primary focus determines your cockpit layout.</p>
      <RadioGroup
        value={formData.goals}
        onValueChange={(value) => onUpdate('goals', value)}
        className="gap-3"
      >
        {options.map((opt) => (
          <Label key={opt.value} className="flex items-center gap-3 font-normal p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer bg-background/30">
            <RadioGroupItem value={opt.value} id={`goals-${opt.value}`} />
            <span>{opt.label}</span>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
