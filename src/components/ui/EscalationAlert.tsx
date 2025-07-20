import { useEffect, useState } from 'react';

interface EscalationAlertProps {
  tier: string;
}

export default function EscalationAlert({ tier }: EscalationAlertProps) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (tier === "Elite") {
      setShowAlert(true);
      const timeout = setTimeout(() => setShowAlert(false), 6000);
      return () => clearTimeout(timeout);
    }
  }, [tier]);

  if (!showAlert) return null;

  return (
    <div className="fixed top-4 right-4 z-50 px-4 py-2 bg-red-700 text-white rounded shadow-lg">
      ⚠️ Strategist tier escalation detected: <strong>Elite</strong>
    </div>
  );
}
