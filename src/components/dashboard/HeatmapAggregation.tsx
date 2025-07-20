'use client';
import { useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
// @ts-ignore
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface HeatmapAggregationProps {
  windowMinutes?: number;
}

export default function HeatmapAggregation({ windowMinutes: initialWindowMinutes = 60 }: HeatmapAggregationProps) {
  const [windowMinutes, setWindowMinutes] = useState(initialWindowMinutes);
  const [counts, setCounts] = useState<number[]>(Array(windowMinutes).fill(0));

  useEffect(() => {
    const db = getFirestore();
    const now = Date.now();
    const cutoff = now - windowMinutes * 60 * 1000;

    const q = query(
      collection(db, 'telemetry/MutationFeed/stream'),
      where('timestamp', '>=', cutoff),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const buckets = Array(windowMinutes).fill(0);
      snap.docs.forEach((doc) => {
        const data = doc.data() as { timestamp: number };
        const minuteIdx = Math.floor((data.timestamp - cutoff) / 60000);
        if (minuteIdx >= 0 && minuteIdx < windowMinutes) {
          buckets[minuteIdx] += 1;
        }
      });
      setCounts(buckets);
    });

    return () => unsubscribe();
  }, [windowMinutes]); // Re-run effect when windowMinutes changes

  const maxCount = Math.max(...counts, 1);

  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <h3 className="font-semibold mb-2">Mutation Heatmap (Last {windowMinutes} Minutes)</h3>
       <input
        type="range"
        min={15}
        max={120}
        step={5}
        value={windowMinutes}
        onChange={(e) => setWindowMinutes(parseInt(e.target.value, 10))}
        className="w-full mb-4"
      />

      <div
        className="grid grid-cols-12 gap-1"
        style={{ gridAutoRows: '1fr' }}
      >
        {counts.map((c, i) => {
          const intensity = Math.round((c / maxCount) * 100);
          const time = new Date(Date.now() - (windowMinutes - i) * 60000)
            .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <Tippy
              key={i}
              content={`${time} — ${c} mutation${c !== 1 ? 's' : ''}`}
            >
              <div
                className="w-full aspect-square"
                style={{
                  backgroundColor: `hsl(210, 100%, ${100 - intensity * 0.6}%)`,
                  transition: 'background-color 0.3s'
                }}
              />
            </Tippy>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-between text-xs mt-2">
        <span>Low ({Math.floor(maxCount * 0.2)})</span>
        <span>High ({maxCount})</span>
      </div>
    </div>
  );
}
