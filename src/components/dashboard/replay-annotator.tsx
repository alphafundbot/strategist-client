
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

export default function ReplayAnnotator() {
    return (
        <div className="p-4 bg-muted/50 rounded-lg flex items-center justify-center min-h-[150px] border border-dashed">
            <div className="text-center">
                <PlayCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Performance replay and annotation timeline.</p>
                <Button variant="outline" size="sm" className="mt-4">Load Replay</Button>
            </div>
        </div>
    );
}
