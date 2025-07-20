import { useEffect, useState } from 'react';

interface ReplayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReplayModal({ isOpen, onClose }: ReplayModalProps) {
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    // In practice, fetch from Firestore or exec script output
    import('../../studio/narration/replayNarration.js').then(module => {
      // Assume it exposes an array of strings as `replayLines`
      const lines = module.replayLines || [];
      setLog(lines);
    });
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <button onClick={onClose} className="float-right text-gray-500">&times;</button>
        <h2 className="text-xl mb-4">📽️ Mutation Replay</h2>
        <div className="space-y-2 text-sm max-h-64 overflow-y-auto">
          {log.map((line, i) => <div key={i}>{line}</div>)}
        </div>
      </div>
    </div>
  );
}
