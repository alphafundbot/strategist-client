
'use client';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface MotivationStepProps {
  formData: { motivation: string };
  onUpdate: (field: 'motivation', value: string) => void;
}

const options = [
  { value: 'alpha', label: 'Generating Alpha' },
  { value: 'cognition', label: 'Evolving Strategist Cognition' },
  { value: 'narrative', label: 'Crafting Powerful Narratives' },
  { value: 'control', label: 'Precision Control & Overrides' },
];

export default function MotivationStep({ formData, onUpdate }: MotivationStepProps) {
  return (
    <div>
      <h3 className="font-semibold text-lg text-center">What excites you most about this cockpit?</h3>
      <p className="text-sm text-muted-foreground mb-4 text-center">Understanding your motivation helps us resonate.</p>
      <RadioGroup
        value={formData.motivation}
        onValueChange={(value) => onUpdate('motivation', value)}
        className="gap-3"
      >
        {options.map((opt) => (
          <Label key={opt.value} className="flex items-center gap-3 font-normal p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer bg-background/30">
            <RadioGroupItem value={opt.value} id={`motivation-${opt.value}`} />
            <span>{opt.label}</span>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
