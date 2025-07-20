import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function ROIWidget() {
  const [roi, setRoi] = useState<number | null>(null);
  const [signal, setSignal] = useState<string | null>(null);

  useEffect(() => {
    const db = getFirestore();
    const ref = doc(db, 'telemetry/ROIWidget/feed/mock');

    getDoc(ref).then((snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setRoi(data.roiValue);
        setSignal(data.signalStrength);
      }
    });
  }, []);

  return (
    <div className="p-4 border rounded text-sm bg-muted">
      <div>📊 ROIWidget feed:</div>
      <div className="mt-1">
        {roi !== null ? (
          <>
            <strong>{roi}%</strong> <span>Signal: {signal}</span>
          </>
        ) : (
          "Loading telemetry..."
        )}
      </div>
    </div>
  );
}
