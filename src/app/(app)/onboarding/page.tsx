
"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Sparkles } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();

  const handleSubmit = () => {
    // In a real app, you would save the questionnaire answers here.
    // For now, just redirect to the dashboard.
    router.push('/dashboard');
  };

  const questions = [
    {
      id: 'goals',
      title: 'What do you want to build?',
      description: 'Your primary focus determines your cockpit layout.',
      options: [
        { value: 'mutation', label: 'Design Mutations' },
        { value: 'pitch', label: 'Architect Pitches' },
        { value: 'vault', label: 'Amplify Vault Capital' },
        { value: 'syndicate', label: 'Launch a Syndicate' },
      ],
    },
    {
      id: 'experience',
      title: 'What is your experience level?',
      description: 'This helps us tailor the complexity and guidance.',
      options: [
        { value: 'novice', label: 'Novice Strategist' },
        { value: 'advisor', label: 'Seasoned Advisor' },
        { value: 'elite', label: 'Elite Operator' },
      ],
    },
    {
      id: 'style',
      title: 'Select your preferred narration style',
      description: 'AI narration can adapt to your needs.',
      options: [
        { value: 'investor', label: 'Investor (High-level, persuasive)' },
        { value: 'technical', label: 'Technical (Detailed, precise)' },
        { value: 'compressed', label: 'Compressed (Concise, data-driven)' },
      ],
    },
    {
        id: 'motivation',
        title: 'What excites you most about this cockpit?',
        description: 'Understanding your motivation helps us resonate.',
        options: [
            { value: 'alpha', label: 'Generating Alpha' },
            { value: 'cognition', label: 'Evolving Strategist Cognition' },
            { value: 'narrative', label: 'Crafting Powerful Narratives' },
            { value: 'control', label: 'Precision Control & Overrides' },
        ],
    }
  ];

  return (
    <div className="flex justify-center items-start py-8 md:py-12 bg-transparent">
      <Card className="w-full max-w-2xl shadow-xl backdrop-blur-md bg-card">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl">Cockpit Personalization</CardTitle>
          </div>
          <CardDescription>
            Answer a few optional questions to tailor your strategist experience. This will adapt your UI, narration, and module priority.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {questions.map((q) => (
            <div key={q.id}>
              <h3 className="font-semibold">{q.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{q.description}</p>
              <RadioGroup defaultValue={q.options[0].value} className="gap-3">
                {q.options.map((opt) => (
                  <Label key={opt.value} className="flex items-center gap-3 font-normal p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer bg-background/30">
                    <RadioGroupItem value={opt.value} id={`${q.id}-${opt.value}`} />
                    <span>{opt.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={handleSubmit}>Skip for now</Button>
          <Button onClick={handleSubmit}>
            Deploy My Cockpit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
