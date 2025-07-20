
'use client';

import { useEffect, useState, useRef } from 'react';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  DocumentData
} from 'firebase/firestore';
import { useUser } from '@/hooks/useUser'; // Assuming this hook provides user tier

interface ReplayModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string | null; // ID of the replay session to stream
}

interface ReplayEvent {
  id: string;
  timestamp: number;
  data: any; // Structure of your replay event data
}

function ExportControls({ content }: { content: string }) {
  const [loading, setLoading] = useState(false);

  const handleExport = async (format: 'pdf'|'md') => {
    setLoading(true);
    const res = await fetch('/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Added Content-Type header
      body: JSON.stringify({
        format: format === 'md' ? 'markdown' : 'pdf',
        content,
        fileName: `replay-${format}-${Date.now()}`,
      }),
    });

    // Handle potential errors from the API route
    if (!res.ok) {
      console.error('Export failed:', res.status, await res.text());
      setLoading(false);
      // Optionally show an error message to the user
      return;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `replay.${format}`;
    document.body.appendChild(a); // Append to body before clicking
    a.click();
    document.body.removeChild(a); // Clean up
    URL.revokeObjectURL(url); // Free up memory
    setLoading(false);
  };

  return (
    <div className="flex space-x-2 mt-4">
      <button
        onClick={() => handleExport('md')}
        disabled={loading}
        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
      >
        {loading ? 'Exporting...' : 'Export MD'}
      </button>
      <button
        onClick={() => handleExport('pdf')}
        disabled={loading}
        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? 'Exporting...' : 'Export PDF'}
      </button>
    </div>
  );
}

export default function ReplayModal({ isOpen, onClose, sessionId }: ReplayModalProps) {
  const [events, setEvents] = useState<ReplayEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { tier } = useUser(); // Get user tier

  useEffect(() => {
    if (!isOpen || !sessionId) {
      setEvents([]);
      setLoading(false);
      return;
    }

    const db = getFirestore();
    const eventsCollectionRef = collection(db, `replaySessions/${sessionId}/events`);
    const q = query(eventsCollectionRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snap) => {
      const fetchedEvents: ReplayEvent[] = snap.docs.map(doc => ({
        id: doc.id,
        timestamp: doc.data().timestamp,
        data: doc.data().data, // Adjust according to your data structure
      }));
      setEvents(fetchedEvents);
      setLoading(false);
    }, (err) => {
      console.error('Replay stream listener error:', err);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isOpen, sessionId]);

  // Playback logic
  useEffect(() => {
    if (isPlaying && events.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prevTime => {
          const nextTime = prevTime + 1000; // Increment by 1 second (adjust as needed)
          // Stop playback if we reach the end of events
          if (nextTime > events[events.length - 1].timestamp) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return events[events.length - 1].timestamp; // Stay at the last event time
          }
          return nextTime;
        });
      }, 1000); // Update every 1 second (adjust as needed)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, events]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const handleScrub = (event: React.ChangeEvent<HTMLInputElement>) => {
    const scrubTime = parseInt(event.target.value, 10);
    setCurrentTime(scrubTime);
    // Optional: Jump to the closest event at scrubTime
    // const closestEventIndex = events.findIndex(event => event.timestamp >= scrubTime);
    // if (closestEventIndex !== -1) {
    //   // You might want to display events up to this point
    // }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  // Filter and potentially modify events based on tier
  const displayedEvents = events.filter(event => event.timestamp <= currentTime);

  // Concatenate displayed events into a text string for export
  const allEventsText = displayedEvents.map(event => {
    const time = formatTime(event.timestamp);
    let content = '';
    if (tier === 'Elite') {
      content = `Elite Detail: ${JSON.stringify(event.data, null, 2)}`;
    } else if (tier === 'Advisor') {
      content = `Advisor Summary: ${event.data?.summary || 'No summary available'}`;
    } else if (tier === 'Observer') {
      content = 'Observer view limited. Upgrade for details.';
    }
    return `${time} - ${content}`;
  }).join('
');


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-3xl w-full h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">📽️ Mutation Replay</h2>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">&times;</button>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center text-gray-600 dark:text-gray-400">Loading replay…</div>
        ) : events.length === 0 ? (
           <div className="flex-1 flex items-center justify-center text-gray-600 dark:text-gray-400">No replay data available for this session.</div>
        ) : (
          <>
            <div className="flex items-center space-x-4 mb-4">
              <button 
                onClick={togglePlayback} 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={events.length === 0}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
               <input
                type="range"
                min={events.length > 0 ? events[0].timestamp : 0}
                max={events.length > 0 ? events[events.length - 1].timestamp : 0}
                value={currentTime}
                onChange={handleScrub}
                className="flex-1"
                step={1000} // Scrub by seconds
              />
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {formatTime(currentTime)} / {events.length > 0 ? formatTime(events[events.length - 1].timestamp) : '--:--:--'}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 text-sm text-gray-900 dark:text-gray-100">
              {displayedEvents.map((event, i) => (
                <div key={event.id || i} className="border-b border-gray-200 dark:border-gray-700 pb-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400">{formatTime(event.timestamp)}</div>
                  {/* Render event data based on tier */}
                  {tier === 'Elite' && (
                     <div className="mt-1"><strong>Elite Detail:</strong> {JSON.stringify(event.data, null, 2)}</div>
                  )}
                   {tier === 'Advisor' && tier !== 'Elite' && (
                     <div className="mt-1"><strong>Advisor Summary:</strong> {event.data?.summary || 'No summary available'}</div>
                   )}
                   {tier === 'Observer' && tier !== 'Advisor' && tier !== 'Elite' && (
                     <div className="mt-1 text-gray-600 dark:text-gray-400">Observer view limited. Upgrade for details.</div>
                   )}
                </div>
              ))}
            </div>

            {/* Add Export Controls */}
            <ExportControls content={allEventsText} />
          </>
        )}
      </div>
    </div>
  );
}
