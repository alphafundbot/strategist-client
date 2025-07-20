'use client';
import { useState } from 'react';
import { useUser } from '@/hooks/useUser';

export default function Epoch26Synthesizer() {
  const { id: userId, tier } = useUser();
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  if (tier === 'Observer') return null;

  const run = async () => {
    setLoading(true);
    const resp = await fetch('/api/epoch26', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, input: 'Run Epoch 26 Synthesis' }),
    });
    
    if (!resp.ok) {
        const errorText = await resp.text();
        console.error('Epoch-26 API error:', resp.status, errorText);
        setOutput(`Error: ${resp.status} - ${errorText}`);
    } else {
        const data = await resp.json();
        setOutput(data.result);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded mt-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <h3 className="font-semibold mb-2">🧬 Epoch-26 Synthesis</h3>
      <button
        onClick={run}
        disabled={loading}
        className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? 'Running…' : 'Run Epoch-26'}
      </button>
      {output && <pre className="mt-4 bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm overflow-auto">{output}</pre>}
    </div>
  );
}
