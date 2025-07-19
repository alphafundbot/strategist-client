
"use client";

import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

const glossaryItems = [
    { tag: 'VOL-SPIKE', entropy: 0.89, suppressed: false },
    { tag: 'PRE-MKT-LIQ', entropy: 0.72, suppressed: false },
    { tag: 'RSI-DIVERGE', entropy: 0.65, suppressed: true },
    { tag: 'MACD-XOVER', entropy: 0.51, suppressed: false },
    { tag: 'FED-SPEECH', entropy: 0.95, suppressed: false },
];

export default function GlossaryManager() {
    return (
        <TooltipProvider>
            <ScrollArea className="h-48">
                <div className="space-y-4">
                    {glossaryItems.map((item) => (
                        <div key={item.tag} className="flex items-center justify-between pr-4">
                            <div className="flex items-center gap-2">
                                <Switch id={`switch-${item.tag}`} checked={!item.suppressed} aria-label={`Toggle ${item.tag}`} />
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Badge variant="secondary">{item.tag}</Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Toggle suppression for this tag</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <span className="text-xs font-mono text-muted-foreground">
                                Entropy: {item.entropy.toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </TooltipProvider>
    );
}
