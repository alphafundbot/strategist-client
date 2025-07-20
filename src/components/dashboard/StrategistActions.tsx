import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export default function StrategistActions() {
  const [actions, setActions] = useState<string[]>([]);

  useEffect(() => {
    const db = getFirestore();
    const ref = collection(db, 'system/diagnostics/mutationVolatility/logs');

    getDocs(ref).then((snap) => {
      const latest = snap.docs
        .map(d => ({ ...d.data(), id: d.id }))
        .sort((a, b) => b.triggeredAt - a.triggeredAt)[0];

      if (!latest) return;

      const suggestions = [];

      if (latest.volatilityLevel > 10) {
        suggestions.push("Activate hedge module");
      }

      if (latest.mutationsReviewed?.includes("alert-calibration")) {
        suggestions.push("Review alert thresholds");
      }

      if (latest.mutationsReviewed?.includes("portfolio-rebalance")) {
        suggestions.push("Run asset reallocation simulation");
      }

      setActions(suggestions);
    });
  }, []);

  // Basic stub for handling action clicks
  const handleAction = (action: string) => {
    console.log(`Strategist Action Clicked: ${action}`);
    // Here you would add logic to trigger specific cockpit modules or functions
    // based on the action string.
  };

  return (
    <div className="border p-4 rounded bg-muted text-sm">
      🔧 Strategist Action Panel
      <ul className="mt-2 space-y-1 list-disc pl-5">
        {actions.length > 0 ? (
          actions.map((a, i) => (
            <li key={i}>
              <button
                onClick={() => handleAction(a)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {a}
              </button>
            </li>
          ))
        ) : (
          <li>No immediate actions suggested.</li>
        )}
      </ul>
    </div>
  );
}
