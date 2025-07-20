import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export default function CognitionGraph() {
  const [clusters, setClusters] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const db = getFirestore();
    const ref = collection(db, 'telemetry/MutationFeed/stream');

    getDocs(ref).then((snap) => {
      const counts: { [key: string]: number } = {};
      snap.forEach((doc) => {
        const c = doc.data().confidenceLevel || 'unknown';
        counts[c] = (counts[c] || 0) + 1;
      });
      setClusters(counts);
    });
  }, []);

  return (
    <div className="p-4 border rounded bg-muted text-sm">
      <div>🧠 Cognition Graph – Confidence Clusters</div>
      <ul className="mt-2 space-y-1">
        {Object.entries(clusters).map(([level, count]) => (
          <li key={level}>
            <strong>{level}</strong>: {count} mutation{count > 1 ? 's' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
