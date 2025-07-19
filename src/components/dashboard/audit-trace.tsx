
"use client";

import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const auditLogs = [
    { id: 1, action: 'OVERRIDE', target: 'RSI-DIVERGE', time: '2m ago', strategist: 'S-ALPHA' },
    { id: 2, action: 'SIGNATURE', target: 'MUT-2024-07-11-8B3E', time: '5m ago', strategist: 'S-OMEGA' },
    { id: 3, action: 'TRIGGER', target: 'ENTROPY > 0.9', time: '12m ago', strategist: 'SYSTEM' },
    { id: 4, action: 'OVERRIDE', target: 'VOL-SPIKE', time: '28m ago', strategist: 'S-ALPHA' },
];

export default function AuditTrace() {
    return (
        <ScrollArea className="h-48">
            <div className="space-y-3">
                {auditLogs.map(log => (
                    <div key={log.id} className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                             <Badge 
                                variant={log.action === 'OVERRIDE' ? 'destructive' : log.action === 'TRIGGER' ? 'secondary' : 'default'}
                                className="w-20 text-center justify-center"
                            >
                                {log.action}
                            </Badge>
                            <span className="font-mono">{log.target}</span>
                        </div>
                        <span className="text-muted-foreground">{log.time}</span>
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
}
