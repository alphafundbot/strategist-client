
"use server";

import { db } from '@/lib/firebase/client';
import { collection, getDocs, doc, getDoc, query, orderBy } from 'firebase/firestore';

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

// Note: This is a placeholder implementation. In a real-world scenario,
// you would have more robust error handling and potentially pagination.
const MOCK_VAULTS: Vault[] = [
    { id: 'v1', name: 'Alpha Momentum', assets: 500000, roi: '+15.2%', age: '6m' },
    { id: 'v2', name: 'Beta Reversion', assets: 250000, roi: '+8.1%', age: '1y' },
    { id: 'v3', name: 'Gamma Arbitrage', assets: 750000, roi: '+11.8%', age: '2m' },
    { id: 'v4', name: 'Delta Long/Short', assets: 150000, roi: '-2.5%', age: '3w' },
];

const MOCK_ROI_DATA: { [key: string]: VaultRoiData[] } = {
    v1: [
        { month: 'Jan', roi: 5 }, { month: 'Feb', roi: 6 }, { month: 'Mar', roi: 8 }, 
        { month: 'Apr', roi: 7 }, { month: 'May', roi: 9 }, { month: 'Jun', roi: 11 }
    ],
    v2: [
        { month: 'Jan', roi: 2 }, { month: 'Feb', roi: 3 }, { month: 'Mar', roi: 2.5 }, 
        { month: 'Apr', roi: 4 }, { month: 'May', roi: 3.5 }, { month: 'Jun', roi: 5 }
    ],
    v3: [
        { month: 'Jan', roi: 10 }, { month: 'Feb', roi: 12 }, { month: 'Mar', roi: 11 }, 
        { month: 'Apr', roi: 13 }, { month: 'May', roi: 14 }, { month: 'Jun', roi: 15 }
    ],
    v4: [
        { month: 'Jan', roi: 1 }, { month: 'Feb', roi: -2 }, { month: 'Mar', roi: 0 }, 
        { month: 'Apr', roi: -1 }, { month: 'May', roi: -3 }, { month: 'Jun', roi: -2 }
    ],
};

// Simulate network delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getVaults(): Promise<Vault[]> {
    console.log("Fetching vaults...");
    await sleep(500); // Simulate network latency
    // In a real app, you would fetch from Firestore like this:
    /*
    try {
        const vaultsCollection = collection(db, 'vaults');
        const vaultSnapshot = await getDocs(vaultsCollection);
        const vaultsList = vaultSnapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<Vault, 'id'>)
        }));
        return vaultsList;
    } catch (error) {
        console.error("Error fetching vaults: ", error);
        return [];
    }
    */
    return MOCK_VAULTS;
}

export async function getVaultRoiData(vaultId: string): Promise<VaultRoiData[]> {
    console.log(`Fetching ROI data for vault ${vaultId}...`);
    await sleep(700); // Simulate network latency
    /*
    try {
        const roiCollection = collection(db, 'vaults', vaultId, 'roiData');
        const roiQuery = query(roiCollection, orderBy('order', 'asc'));
        const roiSnapshot = await getDocs(roiQuery);
        if (roiSnapshot.empty) {
            console.log(`No ROI data found for vault ${vaultId}`);
            return [];
        }
        const roiData = roiSnapshot.docs.map(doc => doc.data() as VaultRoiData);
        return roiData;
    } catch (error) {
        console.error(`Error fetching ROI data for vault ${vaultId}: `, error);
        return [];
    }
    */
    return MOCK_ROI_DATA[vaultId] || [];
}
