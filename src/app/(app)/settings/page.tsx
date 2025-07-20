
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { seedFirebaseStudioTasks } from '@/ai/flows/seed-tasks-flow';
import { seedSocietalSingularityTasks } from '@/ai/flows/seed-societal-tasks-flow';

export default function SettingsPage() {
  const [isSeedingStudio, setIsSeedingStudio] = useState(false);
  const [isSeedingSocietal, setIsSeedingSocietal] = useState(false);
  const { toast } = useToast();

  const handleSeedStudioTasks = async () => {
    setIsSeedingStudio(true);
    try {
      const result = await seedFirebaseStudioTasks();
      toast({
        title: "Blueprint Seeded",
        description: `${result.seeded} tasks have been added to the 'firebaseStudioTasks' collection in Firestore.`,
      });
    } catch (error) {
      console.error("Error seeding Studio tasks:", error);
      toast({
        variant: "destructive",
        title: "Seeding Failed",
        description: "There was an error seeding the Firebase Studio blueprint.",
      });
    } finally {
      setIsSeedingStudio(false);
    }
  };
  
  const handleSeedSocietalTasks = async () => {
    setIsSeedingSocietal(true);
    try {
      const result = await seedSocietalSingularityTasks();
      toast({
        title: "Blueprint Seeded",
        description: `${result.seeded} tasks have been added to the 'societalSingularityTasks' collection in Firestore.`,
      });
    } catch (error) {
      console.error("Error seeding Societal tasks:", error);
      toast({
        variant: "destructive",
        title: "Seeding Failed",
        description: "There was an error seeding the Societal Singularity blueprint.",
      });
    } finally {
      setIsSeedingSocietal(false);
    }
  };


  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your strategist profile and cockpit preferences.</p>
        </div>
      </motion.div>

       <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>System Blueprints</CardTitle>
                    <CardDescription>
                        Seed the project blueprints into Firestore to track completion. This is a one-time operation.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 border rounded-lg bg-background">
                        <div className="flex-1">
                            <h3 className="font-semibold">Firebase Studio Blueprint (500 Tasks)</h3>
                            <p className="text-sm text-muted-foreground">
                                Injects the master checklist for the cockpit buildout.
                            </p>
                        </div>
                        <Button onClick={handleSeedStudioTasks} disabled={isSeedingStudio || isSeedingSocietal}>
                            {isSeedingStudio ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Seed Cockpit Tasks
                        </Button>
                    </div>
                     <div className="flex items-center space-x-4 p-4 border rounded-lg bg-background">
                         <div className="flex-1">
                            <h3 className="font-semibold">Societal Singularity Blueprint (20 Tasks)</h3>
                            <p className="text-sm text-muted-foreground">
                            Injects the governance blueprint for societal evolution.
                            </p>
                        </div>
                        <Button onClick={handleSeedSocietalTasks} disabled={isSeedingStudio || isSeedingSocietal} variant="secondary">
                            {isSeedingSocietal ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Seed Governance Tasks
                        </Button>
                    </div>
                </CardContent>
            </Card>
       </motion.div>
    </div>
  );
}
