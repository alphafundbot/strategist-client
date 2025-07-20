import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function StrategistEscalation() {
  const [tierSuggestion, setTierSuggestion] = useState<string>('Advisor');

  useEffect(() => {
    const db = getFirestore();
    const ref = doc(db, 'system/diagnostics/mutationVolatility/current');

    getDoc(ref).then((snap) => {
      if (snap.exists()) {
        const { volatility, windowMs } = snap.data();

        if (volatility > 10) {
          setTierSuggestion('Elite');
        } else if (volatility > 3) {
          setTierSuggestion('Advisor');
        }
         else {
          setTierSuggestion('Observer');
        }
      }
    });
  }, []);

  return (
    <div className="border p-4 rounded text-sm bg-muted">
      🔍 Strategist Escalation Suggestion:<br />
      <strong>Recommended Tier:</strong> {tierSuggestion}
    </div>
  );
}
