
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, FlaskConical } from 'lucide-react';
import { simulateRoi, SimulateRoiOutput } from '@/ai/flows/simulate-roi-flow';
import { ComposedChart, Area, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { useToast } from "@/components/ui/use-toast";

export default function SimulationPanel() {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [simulationData, setSimulationData] = useState<SimulateRoiOutput | null>(null);
    const { toast } = useToast();

    const handleRunSimulation = async () => {
        if (!prompt) return;
        setIsLoading(true);
        setSimulationData(null);
        try {
            const result = await simulateRoi({ prompt });
            setSimulationData(result);
        } catch (error) {
            console.error("Error running simulation:", error);
            toast({
                variant: "destructive",
                title: "Simulation Failed",
                description: "There was an error generating the simulation. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <Input 
                    placeholder="Describe simulation..." 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isLoading}
                />
                <Button onClick={handleRunSimulation} disabled={isLoading || !prompt}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Run'}
                </Button>
            </div>
            <div className="h-64 mt-4">
                 {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : simulationData ? (
                    <ResponsiveContainer width="100%" height="100%">
                         <ComposedChart data={simulationData.data} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} unit="%" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "hsl(var(--background))",
                                    borderColor: "hsl(var(--border))",
                                    color: "hsl(var(--foreground))"
                                }}
                                formatter={(value: number, name: string) => [`${value.toFixed(1)}%`, name.replace('Roi', ' ROI')]}
                            />
                            <Legend wrapperStyle={{fontSize: "12px"}}/>
                            <defs>
                                <linearGradient id="colorOptimistic" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="optimisticRoi" stroke="hsl(var(--chart-2))" fill="url(#colorOptimistic)" name="Optimistic"  />
                            <Line type="monotone" dataKey="projectedRoi" stroke="hsl(var(--primary))" strokeWidth={2} name="Projected" />
                             <Line type="monotone" dataKey="pessimisticRoi" stroke="hsl(var(--destructive))" strokeDasharray="5 5" name="Pessimistic" />
                        </ComposedChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full p-4 bg-muted/50 rounded-lg flex items-center justify-center border border-dashed">
                        <div className="text-center">
                            <FlaskConical className="mx-auto h-12 w-12 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">Enter a prompt to run a new simulation.</p>
                        </div>
                    </div>
                )}
            </div>
             {simulationData && (
                <p className="text-xs text-center text-muted-foreground pt-2">
                    Simulation: <span className="font-semibold">{simulationData.simulationName}</span>
                </p>
            )}
        </div>
    );
}
