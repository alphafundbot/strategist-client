
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Archive, FlaskConical, Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import VaultRoiChart from '@/components/vaults/vault-roi-chart';
import { getVaults, getVaultRoiData, Vault, VaultRoiData } from '@/lib/services/vault';

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

export default function VaultsPage() {
    const [vaults, setVaults] = useState<Vault[]>([]);
    const [selectedVault, setSelectedVault] = useState<Vault | null>(null);
    const [chartData, setChartData] = useState<VaultRoiData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const vaultsData = await getVaults();
            setVaults(vaultsData);
            if (vaultsData.length > 0) {
                // Automatically select the first vault on initial load
                handleSelectVault(vaultsData[0]);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSelectVault = async (vault: Vault) => {
        setSelectedVault(vault);
        const roiData = await getVaultRoiData(vault.id);
        setChartData(roiData);
    };

    const filteredVaults = useMemo(() => {
        return vaults.filter(vault => 
            vault.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [vaults, searchTerm]);

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
                            <Input 
                                placeholder="Search vaults by name..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        {loading ? (
                             <div className="flex justify-center items-center h-48">
                                <Loader2 className="h-8 w-8 animate-spin" />
                            </div>
                        ) : (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Vault Name</TableHead>
                                            <TableHead className="hidden sm:table-cell">Assets</TableHead>
                                            <TableHead className="hidden md:table-cell">Avg. ROI</TableHead>
                                            <TableHead className="text-right">Age</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredVaults.map((vault) => (
                                            <TableRow 
                                                key={vault.id} 
                                                onClick={() => handleSelectVault(vault)}
                                                className={`cursor-pointer ${selectedVault?.id === vault.id ? 'bg-muted/50' : ''}`}
                                            >
                                                <TableCell className="font-medium">{vault.name}</TableCell>
                                                <TableCell className="hidden sm:table-cell">{vault.assets}</TableCell>
                                                <TableCell className="hidden md:table-cell text-green-400">{vault.roi}</TableCell>
                                                <TableCell className="text-right">{vault.age}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </Section>
                    <VaultRoiChart data={chartData} vaultName={selectedVault?.name} isLoading={!selectedVault && loading} />
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
