
"use server";

import { db } from '@/lib/firebase/server';
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

// NOTE: In a real application, you would implement seeding or a creation UI.
// For now, we assume the data has been seeded in Firestore.
// Example structure:
// /vaults/{vaultId} (document)
//   - name: "Momentum Spike"
//   - assets: 4
//   - roi: "18.2%"
//   - age: "90d"
//   /vaults/{vaultId}/roiData/{monthDoc} (sub-collection)
//     - month: "Jan"
//     - roi: 12
//     - order: 1

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
        // Order by a field to ensure chronological data
        const roiQuery = query(roiCollection, orderBy('order', 'asc'));
        const roiSnapshot = await getDocs(roiQuery);
        const roiData = roiSnapshot.docs.map(doc => doc.data() as VaultRoiData);
        return roiData;
    } catch (error) {
        console.error(`Error fetching ROI data for vault ${vaultId}: `, error);
        return [];
    }
}
