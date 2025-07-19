
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AreaChart, Archive, FlaskConical, Search } from 'lucide-react';
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

const vaultData = [
    { name: 'Momentum Spike', assets: 4, roi: '18.2%', age: '90d' },
    { name: 'Pre-Market Volatility', assets: 12, roi: '11.5%', age: '120d' },
    { name: 'Arbitrage Alpha', assets: 7, roi: '8.9%', age: '210d' },
    { name: 'Long/Short Equity', assets: 25, roi: '14.1%', age: '365d' },
];

export default function VaultsPage() {
    return (
        <div className="space-y-6">
            <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Strategy Vaults</h1>
                        <p className="text-muted-foreground">Archive, analyze, and simulate your historical trading strategies.</p>
                    </div>
                    <Button>Create New Vault</Button>
                </div>
            </motion.div>

            <motion.div 
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="lg:col-span-2 space-y-6">
                    <Section title="Vault Explorer" icon={<Search className="w-5 h-5" />}>
                        <div className="mb-4">
                            <Input placeholder="Search vaults by name or asset..." />
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Vault Name</TableHead>
                                    <TableHead>Assets</TableHead>
                                    <TableHead>Avg. ROI</TableHead>
                                    <TableHead>Age</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {vaultData.map((vault) => (
                                    <TableRow key={vault.name}>
                                        <TableCell className="font-medium">{vault.name}</TableCell>
                                        <TableCell>{vault.assets}</TableCell>
                                        <TableCell className="text-green-400">{vault.roi}</TableCell>
                                        <TableCell>{vault.age}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Section>
                    <Section title="ROI Visual Map" icon={<AreaChart className="w-5 h-5" />}>
                        <div className="h-64 p-4 bg-muted/50 rounded-lg flex items-center justify-center border border-dashed">
                             <div className="text-center">
                                <AreaChart className="mx-auto h-12 w-12 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">Historical ROI map will be rendered here.</p>
                            </div>
                        </div>
                    </Section>
                </div>

                <div className="space-y-6">
                    <Section title="Mutation Archive" icon={<Archive className="w-5 h-5" />}>
                         <div className="h-48 p-4 bg-muted/50 rounded-lg flex items-center justify-center border border-dashed">
                             <div className="text-center">
                                <Archive className="mx-auto h-12 w-12 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">Select a vault to view archived mutations.</p>
                            </div>
                        </div>
                    </Section>
                    <Section title="Simulation Panel" icon={<FlaskConical className="w-5 h-5" />}>
                         <div className="h-48 p-4 bg-muted/50 rounded-lg flex items-center justify-center border border-dashed">
                             <div className="text-center">
                                <FlaskConical className="mx-auto h-12 w-12 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">Load a strategy to run new simulations.</p>
                                <Button variant="secondary" size="sm" className="mt-4">Load Strategy</Button>
                            </div>
                        </div>
                    </Section>
                </div>
            </motion.div>
        </div>
    );
}
