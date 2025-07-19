
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Sparkles, Check } from 'lucide-react';

import WelcomeStep from '@/components/onboarding/welcome-step';
import GoalStep from '@/components/onboarding/goal-step';
import ExperienceStep from '@/components/onboarding/experience-step';
import StyleStep from '@/components/onboarding/style-step';
import MotivationStep from '@/components/onboarding/motivation-step';
import SummaryStep from '@/components/onboarding/summary-step';

const steps = [
  { id: 'welcome', component: WelcomeStep, title: 'Welcome' },
  { id: 'goals', component: GoalStep, title: 'Primary Goals' },
  { id: 'experience', component: ExperienceStep, title: 'Experience Level' },
  { id: 'style', component: StyleStep, title: 'Narration Style' },
  { id: 'motivation', component: MotivationStep, title: 'Key Motivations' },
  { id: 'summary', component: SummaryStep, title: 'Summary' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    goals: 'mutation',
    experience: 'novice',
    style: 'investor',
    motivation: 'alpha',
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDeploy = () => {
    // In a real app, save formData to Firestore under `/users/{uid}/onboarding`
    console.log("Onboarding data:", formData);
    router.push('/dashboard');
  };
  
  const handleUpdate = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep) / (steps.length - 1)) * 100;

  return (
    <div className="flex justify-center items-start py-8 md:py-12 bg-transparent">
      <Card className="w-full max-w-2xl shadow-xl bg-card/80 backdrop-blur-md overflow-hidden">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl font-bold">Cockpit Personalization</CardTitle>
          </div>
          <CardDescription>
            Calibrate your cockpit by answering these questions to adapt the UI to your unique strategist fingerprint.
          </CardDescription>
        </CardHeader>

        <div className="px-6 pb-4">
          <Progress value={progress} className="w-full" />
          <p className="text-xs text-muted-foreground text-center mt-2">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
          </p>
        </div>

        <CardContent className="min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent formData={formData} onUpdate={handleUpdate} onNext={handleNext}/>
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0}>
            <ArrowLeft className="mr-2" /> Back
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>
              Next <ArrowRight className="ml-2" />
            </Button>
          ) : (
            <Button onClick={handleDeploy} className="bg-green-600 hover:bg-green-700">
              Deploy My Cockpit <Check className="ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
