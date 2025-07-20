'use client'

import { useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useUser } from '@/hooks/useUser'

interface CognitionLog {
  epoch: string
  prompt: string
  response: string
  mutations: string[]
  braidId: string
  timestamp: number
}

export default function GeminiLogVisualizer() {
  const { id: userId } = useUser()
  const [logs, setLogs] = useState<CognitionLog[]>([])
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
       setLogs([]);
       setLoading(false);
       return;
    }
    const q = query(
      collection(db, 'geminiLogs', userId, 'entries'),
      orderBy('timestamp', 'desc')
    )
    const unsub = onSnapshot(q, snapshot => {
      const entries = snapshot.docs.map(doc => doc.data() as CognitionLog)
      setLogs(entries)
      setLoading(false);
    },
     (error) => {
        console.error('Error fetching cognition logs:', error);
        setLoading(false);
      }
    )
    return () => unsub()
  }, [userId])

   if (loading) {
    return <div className="p-4 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Loading Cognition Logs...</div>;
  }

  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mt-4">
      <h3 className="text-lg font-semibold mb-2">Cognition Log</h3>
       {logs.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">No cognition logs available for this user.</div>
       ) : (
        <ul className="space-y-2 text-sm">
          {logs.map((log, idx) => (
            <li key={idx} className="border rounded p-2 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Epoch {log.epoch} | Braid: {log.braidId} | {new Date(log.timestamp).toLocaleString()}
              </div>
              <div className="font-semibold mt-1">Prompt: {log.prompt}</div>
              <div className="mt-1 text-gray-700 dark:text-gray-300">Response: {log.response}</div>
              {log.mutations && log.mutations.length > 0 && (
                <div className="mt-1 italic text-gray-600 dark:text-gray-500">
                  Mutations: {log.mutations.join(', ')}
                </div>
              )}
            </li>
          ))}
        </ul>
       )}
    </div>
  )
}
