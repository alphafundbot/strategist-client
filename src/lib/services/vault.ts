
"use server";

export interface Vault {
    id: string;
    name: string;
    assets: number;
    roi: string;
    age: string;
}

export interface VaultRoiData {
    month: string;
    roi: number;
}

const mockVaults: Vault[] = [
    { id: 'v1', name: 'Momentum Spike', assets: 4, roi: '18.2%', age: '90d' },
    { id: 'v2', name: 'Pre-Market Volatility', assets: 12, roi: '11.5%', age: '120d' },
    { id: 'v3', name: 'Arbitrage Alpha', assets: 7, roi: '8.9%', age: '210d' },
    { id: 'v4', name: 'Long/Short Equity', assets: 25, roi: '14.1%', age: '365d' },
];

const mockRoiData: { [key: string]: VaultRoiData[] } = {
    v1: [
        { month: 'Jan', roi: 12 }, { month: 'Feb', roi: 15 }, { month: 'Mar', roi: 14 },
        { month: 'Apr', roi: 17 }, { month: 'May', roi: 20 }, { month: 'Jun', roi: 18.2 },
    ],
    v2: [
        { month: 'Jan', roi: 8 }, { month: 'Feb', roi: 9 }, { month: 'Mar', roi: 10 },
        { month: 'Apr', roi: 12 }, { month: 'May', roi: 11 }, { month: 'Jun', roi: 11.5 },
    ],
    v3: [
        { month: 'Jan', roi: 5 }, { month: 'Feb', roi: 6 }, { month: 'Mar', roi: 7.5 },
        { month: 'Apr', roi: 8 }, { month: 'May', roi: 9.2 }, { month: 'Jun', roi: 8.9 },
    ],
    v4: [
        { month: 'Jan', roi: 10 }, { month: 'Feb', roi: 11 }, { month: 'Mar', roi: 13 },
        { month: 'Apr', roi: 12.5 }, { month: 'May', roi: 15 }, { month: 'Jun', roi: 14.1 },
    ],
};

// Simulate network delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getVaults(): Promise<Vault[]> {
    await sleep(500); // Simulate fetching vaults
    return mockVaults;
}

export async function getVaultRoiData(vaultId: string): Promise<VaultRoiData[]> {
    await sleep(300); // Simulate fetching chart data
    return mockRoiData[vaultId] || [];
}
