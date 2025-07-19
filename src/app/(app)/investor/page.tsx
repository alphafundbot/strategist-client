
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, FileDown, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Section = ({ title, icon, children, className }: { title: string, icon: React.ReactNode, children: React.ReactNode, className?: string }) => (
    <Card className={`bg-card/50 backdrop-blur-sm ${className}`}>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                {icon}
                <span>{title}</span>
            </CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);

export default function InvestorModePage() {
    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Investor Mode</h1>
                        <p className="text-muted-foreground">Curated performance reports and exportable pitch decks.</p>
                    </div>
                    <div className="flex items-center gap-2">
                         <Button variant="outline">
                            <Share2 className="mr-2 h-4 w-4" />
                            Share Link
                        </Button>
                        <Button>
                            <FileDown className="mr-2 h-4 w-4" />
                            Export Pitch Deck
                        </Button>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Section title="Strategist Self-Assessment" icon={<BarChart className="w-5 h-5" />}>
                     <div className="p-4 bg-muted/50 rounded-lg flex items-center justify-center min-h-[200px] border border-dashed">
                        <div className="text-center">
                            <BarChart className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">Self-assessment report will be displayed here.</p>
                        </div>
                    </div>
                </Section>
                <Section title="Curated ROI Charts" icon={<BarChart className="w-5 h-5" />}>
                     <div className="p-4 bg-muted/50 rounded-lg flex items-center justify-center min-h-[200px] border border-dashed">
                        <div className="text-center">
                            <BarChart className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">Investor-ready ROI charts will be displayed here.</p>
                        </div>
                    </div>
                </Section>
            </motion.div>
        </div>
    );
}
