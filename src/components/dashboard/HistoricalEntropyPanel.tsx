
'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface EntropyRecord {
  asset: string
  ewma?: number
  stdDev?: number
  risk?: number
  timestamp: number
}

export default function HistoricalEntropyPanel({ type = 'volatility' }: { type?: string }) {
  const [data, setData] = useState<EntropyRecord[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Query path:", `entropyMetrics/${type}/archive`); // Debug log
    const q = query(
      collection(db, 'entropyMetrics', type).collection('archive'), // Corrected path
      orderBy('timestamp', 'asc')
    )
    const unsub = onSnapshot(q, snap => {
      const records: EntropyRecord[] = snap.docs.map(doc => {
        const d = doc.data()
        return {
          asset: doc.id,
          ewma: d.ewma || 0,
          stdDev: d.stdDev || 0,
          risk: d.value || 0,
          timestamp: d.timestamp?.toMillis() || 0 // Convert Firestore Timestamp to milliseconds
        }
      })
      setData(records)
      console.log("Fetched entropy archive records:", records); // Debug log
      setLoading(false);
    },
     (error) => {
        console.error('Error fetching historical entropy data:', error);
        setLoading(false);
      }
    )
    return () => unsub()
  }, [type])

   if (loading) {
    return <div className="p-4 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Loading Historical Entropy Data...</div>;
  }

  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mt-4">
      <h3 className="text-lg font-semibold mb-2">Historical Entropy - {type}</h3>
       {data.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">No historical data available for this type.</div>
       ) : (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <XAxis dataKey="timestamp" tickFormatter={(ts) => new Date(ts).toLocaleDateString()} />
            <YAxis />
            <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString()} />
            <Line type="monotone" dataKey="ewma" stroke="#63b3ed" />
            <Line type="monotone" dataKey="stdDev" stroke="#f6ad55" />
            <Line type="monotone" dataKey="risk" stroke="#fc8181" />
          </LineChart>
        </ResponsiveContainer>
       )}
    </div>
  )
}
