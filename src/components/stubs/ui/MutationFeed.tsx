'use client';

import { useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  DocumentData
} from 'firebase/firestore';

interface Mutation {
  id: string;
  mutationType: string;
  mutationDetail: string;
  confidenceLevel: string;
  timestamp: number;
}

export default function MutationFeed() {
  const [mutations, setMutations] = useState<Mutation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    // Listen to the 20 most recent mutations
    const q = query(
      collection(db, 'telemetry/MutationFeed/stream'),
      orderBy('timestamp', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const docs: Mutation[] = snap.docs.map(doc => {
        const data = doc.data() as DocumentData;
        return {
          id: doc.id,
          mutationType: data.mutationType,
          mutationDetail: data.mutationDetail,
          confidenceLevel: data.confidenceLevel,
          timestamp: data.timestamp
        };
      });
      setMutations(docs);
      setLoading(false);
    }, (err) => {
      console.error('MutationFeed listener error:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="p-4 text-sm">Loading mutations…</div>;
  }

  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <h3 className="font-semibold mb-2">Live Mutation Stream</h3>
      <ul className="space-y-1 text-sm max-h-64 overflow-auto">
        {mutations.map(m => (
          <li key={m.id} className="flex justify-between">
            <div>
              <span className="font-medium">{m.mutationType}</span> – {m.mutationDetail}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(m.timestamp).toLocaleTimeString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}