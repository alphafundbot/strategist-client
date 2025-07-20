
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { seedFirebaseStudioTasks } from '@/ai/flows/seed-tasks-flow';

export default function SettingsPage() {
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();

  const handleSeedTasks = async () => {
    setIsSeeding(true);
    try {
      const result = await seedFirebaseStudioTasks();
      toast({
        title: "Blueprint Seeded",
        description: `${result.seeded} tasks have been added to the 'firebaseStudioTasks' collection in Firestore.`,
      });
    } catch (error) {
      console.error("Error seeding tasks:", error);
      toast({
        variant: "destructive",
        title: "Seeding Failed",
        description: "There was an error seeding the Firebase Studio blueprint.",
      });
    } finally {
      setIsSeeding(false);
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
                        Seed the project blueprints into Firestore to track completion.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-4">
                        <Button onClick={handleSeedTasks} disabled={isSeeding}>
                            {isSeeding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Seed Firebase Studio Tasks (500)
                        </Button>
                         <p className="text-sm text-muted-foreground">
                           Injects the master checklist into the `firebaseStudioTasks` collection.
                        </p>
                    </div>
                </CardContent>
            </Card>
       </motion.div>
    </div>
  );
}
