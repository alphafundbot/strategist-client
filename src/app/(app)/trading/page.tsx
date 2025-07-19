
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, BrainCircuit, Dna, FileText, Bot, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

import CognitionGraph from '@/components/dashboard/cognition-graph';
import GlossaryManager from '@/components/dashboard/glossary-manager';
import ReplayAnnotator from '@/components/dashboard/replay-annotator';
import AuditTrace from '@/components/dashboard/audit-trace';


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

export default function TradingCockpitPage() {
    const [mutationId, setMutationId] = useState('MUT-2024-07-11-8B3E');
    
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Trading Cockpit</h1>
                    <p className="text-muted-foreground">Design, monitor, and evolve your trading mutations.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-mono bg-muted px-2 py-1 rounded">ID: {mutationId}</span>
                    <Button variant="outline" size="sm">New Mutation</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-6">
                    <Section title="Mutation Parameters" icon={<SlidersHorizontal className="w-5 h-5" />}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="roi-target">ROI Target (%)</Label>
                                <Input id="roi-target" type="number" defaultValue="15" />
                            </div>
                            <div>
                                <Label htmlFor="entropy-threshold">Entropy Threshold</Label>
                                <Input id="entropy-threshold" type="number" defaultValue="0.85" />
                            </div>
                            <div className="md:col-span-2">
                                <Label htmlFor="strategy-rationale">Strategy Rationale</Label>
                                <Textarea id="strategy-rationale" placeholder="e.g., 'Capitalize on pre-market volatility spikes...'" />
                            </div>
                            <div>
                                <Label htmlFor="parent-mutation">Parent Mutation</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select parent" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="mut-1">MUT-2024-07-10-A1C4</SelectItem>
                                        <SelectItem value="mut-2">MUT-2024-07-09-F8B2</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="flex items-center space-x-2 pt-6">
                                <Switch id="realtime-mode" />
                                <Label htmlFor="realtime-mode">Enable Real-time Deployment</Label>
                            </div>
                        </div>
                         <CardFooter className="pt-6 -mb-4 -mx-2">
                            <Button>Deploy Mutation</Button>
                        </CardFooter>
                    </Section>

                    <Section title="Cognition Graph" icon={<BrainCircuit className="w-5 h-5" />}>
                         <CognitionGraph />
                    </Section>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
                    <Section title="AI Diagnostics" icon={<Bot className="w-5 h-5" />}>
                       <AuditTrace />
                    </Section>

                    <Section title="Glossary Manager" icon={<FileText className="w-5 h-5" />}>
                        <GlossaryManager />
                    </Section>
                </motion.div>

                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-3">
                    <Section title="Replay & Annotator" icon={<BarChart className="w-5 h-5" />}>
                       <ReplayAnnotator />
                    </Section>
                </motion.div>
            </div>
        </div>
    );
}
