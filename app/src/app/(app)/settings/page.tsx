
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function SettingsPage() {
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
                    <CardTitle>Strategist Diagnostics</CardTitle>
                    <CardDescription>
                        Run self-tests and view cognitive performance metrics.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-8 bg-muted/50 rounded-lg flex items-center justify-center min-h-[200px] border border-dashed">
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Diagnostics Panel will be rendered here.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
       </motion.div>
    </div>
  );
}
