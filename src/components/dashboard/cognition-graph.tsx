
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BrainCircuit } from 'lucide-react';

export default function CognitionGraph() {
    return (
        <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg flex items-center justify-center min-h-[200px] border border-dashed">
                <div className="text-center">
                    <BrainCircuit className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Cognition graph will be rendered here.</p>
                </div>
            </div>
            <div className="flex gap-2">
                <Input placeholder="Enter prompt to configure graph..." className="flex-1" />
                <Button>Render</Button>
            </div>
        </div>
    );
}
