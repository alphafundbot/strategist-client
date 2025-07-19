
'use client';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ExperienceStepProps {
  formData: { experience: string };
  onUpdate: (field: 'experience', value: string) => void;
}

const options = [
  { value: 'novice', label: 'Novice Strategist' },
  { value: 'advisor', label: 'Seasoned Advisor' },
  { value: 'elite', label: 'Elite Operator' },
];

export default function ExperienceStep({ formData, onUpdate }: ExperienceStepProps) {
  return (
    <div>
      <h3 className="font-semibold text-lg text-center">What is your experience level?</h3>
      <p className="text-sm text-muted-foreground mb-4 text-center">This helps us tailor the complexity and guidance.</p>
      <RadioGroup
        value={formData.experience}
        onValueChange={(value) => onUpdate('experience', value)}
        className="gap-3"
      >
        {options.map((opt) => (
          <Label key={opt.value} className="flex items-center gap-3 font-normal p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer bg-background/30">
            <RadioGroupItem value={opt.value} id={`experience-${opt.value}`} />
            <span>{opt.label}</span>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
