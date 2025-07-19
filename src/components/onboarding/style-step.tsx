
'use client';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface StyleStepProps {
  formData: { style: string };
  onUpdate: (field: 'style', value: string) => void;
}

const options = [
  { value: 'investor', label: 'Investor (High-level, persuasive)' },
  { value: 'technical', label: 'Technical (Detailed, precise)' },
  { value: 'compressed', label: 'Compressed (Data-driven)' },
];

export default function StyleStep({ formData, onUpdate }: StyleStepProps) {
  return (
    <div>
      <h3 className="font-semibold text-lg text-center">Select your preferred narration style</h3>
      <p className="text-sm text-muted-foreground mb-4 text-center">AI narration can adapt to your needs.</p>
      <RadioGroup
        value={formData.style}
        onValueChange={(value) => onUpdate('style', value)}
        className="gap-3"
      >
        {options.map((opt) => (
          <Label key={opt.value} className="flex items-center gap-3 font-normal p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer bg-background/30">
            <RadioGroupItem value={opt.value} id={`style-${opt.value}`} />
            <span>{opt.label}</span>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
