'use client';

import { useState } from 'react';
import { runMutation } from '@/lib/fetcher'; // Assuming you have a fetch wrapper
// import { useTheme } from '@/context/ThemeContext'; // Not used in this component
import { useUser } from '@/hooks/useUser'; // Assuming this hook provides user id and tier

export default function EpochSynthesizer() {
  const { id: userId, tier } = useUser();
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  if (tier === 'Observer') return null;

  const handleRun = async () => {
    setLoading(true);
    // Assuming runMutation is a helper that posts to your API route
    const resp = await runMutation('/api/epoch', { userId, input: 'Run Epoch 25 Synthesis' });
    setOutput(resp.result || resp.error);
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <h3 className="font-semibold mb-2">🚀 Epoch-25 Synthesis</h3>
      <button
        onClick={handleRun}
        disabled={loading}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Running…' : 'Run Distributed Omnistrategy'}
      </button>
      {output && <pre className="mt-4 bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm overflow-auto">{output}</pre>}
    </div>
  );
}
