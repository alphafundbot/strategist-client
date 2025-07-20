import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, query, onSnapshot, orderBy } from "firebase/firestore"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

interface EntropyRecord {
  asset: string;
  ewma?: number;
  stdDev?: number;
  risk?: number; // Add risk property after mapping from value
  timestamp: number; // Store as milliseconds
}

export const EntropyTimelineViewer = () => {
  const [type, setType] = useState("volatility")
  const [data, setData] = useState<EntropyRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);
    // setError(null);

    console.log("Query path:", `entropyMetrics/${type}/archive`); // Debug log

    const q = query(
      collection(db, "entropyMetrics", type).collection("archive"),
      orderBy("timestamp", "asc")
    );

    const unsub = onSnapshot(q,
      snap => {
        const records: EntropyRecord[] = snap.docs.map(doc => {
          const d = doc.data();
          // Map data similarly to HistoricalEntropyPanel.tsx
          return {
            asset: doc.id,
            ewma: d.ewma || 0,
            stdDev: d.stdDev || 0,
            risk: d.value || 0, // Use d.value for risk as in HistoricalEntropyPanel.tsx
            timestamp: d.timestamp?.toMillis() || 0 // Convert Firestore Timestamp to milliseconds
          };
        });
        setData(records);
        console.log("Fetched entropy archive records:", records);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching historical entropy data:', error);
        // setError(error);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [type]);

  return (
    <div className="w-full p-4">
      <div className="mb-3 flex items-center justify-between">
        <label className="text-sm font-medium">Select Entropy Stream:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="volatility">Volatility</option>
          <option value="risk">Risk</option>
          <option value="liquidity">Liquidity</option>
        </select>
      </div>

      {data.length > 0 && (
        <div className="mb-2 text-xs text-green-600">
          ✅ Loaded {data.length} entries from "{type}" archive
        </div>
      )}

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-sm text-gray-500">
          No archive data found for {type}.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <XAxis
              dataKey="timestamp"
              tickFormatter={(ts) => new Date(ts).toLocaleDateString()}
              stroke="#4A5568"
            />
            <YAxis />
            <Tooltip />
            <Line dataKey="ewma" stroke="#4299e1" dot={false} />
            <Line dataKey="stdDev" stroke="#ed8936" dot={false} />
            {type === "risk" && <Line dataKey="risk" stroke="#f56565" dot={false} />}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
