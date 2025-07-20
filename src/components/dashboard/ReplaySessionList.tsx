'use client'

import { useState, useEffect } from 'react'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import ReplayModal from '@/components/ui/ReplayModal'

interface Session {
  id: string
  name: string
  createdAt: { seconds: number }
}

export default function ReplaySessionList() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Subscribe to your replaySessions collection
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'replaySessions'),
      snapshot => {
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Session[]
        setSessions(docs)
      }
    )
    return () => unsub()
  }, [])

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Replay Sessions</h2>
      <ul className="space-y-2">
        {sessions.map(s => (
          <li
            key={s.id}
            className="flex items-center justify-between p-3 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <span>{s.name}</span>
            <button
              onClick={() => setSelectedId(s.id)}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Replay
            </button>
          </li>
        ))}
      </ul>

      {/* Render the modal when a session is selected */}
      {selectedId && (
        <ReplayModal
          sessionId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  )
}
