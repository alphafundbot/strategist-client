
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

export async function getVaults(): Promise<Vault[]> {
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
}

export async function getVaultRoiData(vaultId: string): Promise<VaultRoiData[]> {
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
}
