import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function MutationFeed() {
  const [mutationDetail, setMutationDetail] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<string | null>(null);

  useEffect(() => {
    const db = getFirestore();
    const ref = doc(db, 'telemetry/MutationFeed/stream/mock');

    getDoc(ref).then((snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setMutationDetail(`${data.mutationType}: ${data.mutationDetail}`);
        setConfidence(data.confidenceLevel);
      }
    });
  }, []);

  return (
    <div className="p-4 border rounded text-sm bg-muted">
      <div>🔁 MutationFeed stream:</div>
      {mutationDetail ? (
        <div className="mt-1">
          <strong>{mutationDetail}</strong>
          <div>Confidence: {confidence}</div>
        </div>
      ) : (
        <div className="mt-1">Loading mutation data...</div>
      )}
    </div>
  );
}
