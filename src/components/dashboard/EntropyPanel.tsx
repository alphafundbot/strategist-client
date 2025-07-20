
'use client';

import { useEffect, useState } from 'react';
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  DocumentData
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';

// Define interfaces for data
interface RiskMetric {
  asset: string;
  value: number;
}

interface VolatilityMetric {
  asset: string;
  ewma: number;
  stdDev: number;
}

interface LiquidityMetric {
  pair: string;
  spread: number;
  volume: number;
}

// Component for rendering the Risk Dashboard content
function RiskDashboardContent({ data, loading }: { data: RiskMetric[], loading: boolean }) {
  if (loading) {
    return <div className="text-center text-gray-500 dark:text-gray-400">Loading Risk Data...</div>;
  }
  if (data.length === 0) {
    return <div className="text-center text-gray-500 dark:text-gray-400">No risk data available.</div>;
  }
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
        <XAxis dataKey="asset" />
        <YAxis />
        <Tooltip formatter={(val: number) => val.toFixed(2)} labelFormatter={(label) => `Asset: ${label}`} />
        <Bar dataKey="value" fill="#e53e3e" />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Component for rendering the Volatility Dashboard content
function VolatilityDashboardContent({ data, loading }: { data: VolatilityMetric[], loading: boolean }) {
   if (loading) {
    return <div className="text-center text-gray-500 dark:text-gray-400">Loading Volatility Data...</div>;
  }
   if (data.length === 0) {
    return <div className="text-center text-gray-500 dark:text-gray-400">No volatility data available.</div>;
  }
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <XAxis dataKey="asset" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ewma" stroke="#4299e1" />
        <Line type="monotone" dataKey="stdDev" stroke="#f6ad55" />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Component for rendering the Liquidity Dashboard content
function LiquidityDashboardContent({ data, loading }: { data: LiquidityMetric[], loading: boolean }) {
   if (loading) {
    return <div className="text-center text-gray-500 dark:text-gray-400">Loading Liquidity Data...</div>;
  }
   if (data.length === 0) {
    return <div className="text-center text-gray-500 dark:text-gray-400">No liquidity data available.</div>;
  }
  return (
    <ul className="space-y-1">
      {data.map(({ pair, spread, volume }) => (
        <li key={pair} className="flex justify-between text-sm">
          <span>{pair}</span>
          <span className="text-gray-500 dark:text-gray-400">
            Spread: {spread.toFixed(4)} | Volume: {volume.toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function EntropyPanel() {
  const [riskData, setRiskData] = useState<RiskMetric[]>([]);
  const [volatilityData, setVolatilityData] = useState<VolatilityMetric[]>([]);
  const [liquidityData, setLiquidityData] = useState<LiquidityMetric[]>([]);
  const [loading, setLoading] = useState(true); // Single loading state
  const [activeTab, setActiveTab] = useState('risk'); // State for tabs

  // Fetch all data in a single effect or separate effects if preferred
   useEffect(() => {
    const unsubs = [];

    // Risk Data Listener
    unsubs.push(onSnapshot(
      collection(db, 'entropyMetrics', 'risk', 'latest'),
      snapshot => {
        const metrics: RiskMetric[] = snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            asset: doc.id,
            value: d?.value as number || 0,
          };
        });
        setRiskData(metrics);
        setLoading(false); // Update loading based on all data sources
      },
      error => {
        console.error('Error fetching risk metrics:', error);
        setLoading(false);
      }
    ));

    // Volatility Data Listener
    unsubs.push(onSnapshot(
      collection(db, 'entropyMetrics', 'volatility', 'latest'),
      snapshot => {
        const metrics: VolatilityMetric[] = snapshot.docs.map(doc => {
           const d = doc.data();
          return {
            asset: doc.id,
            ewma: d?.ewma as number || 0,
            stdDev: d?.stdDev as number || 0,
          };
        });
        setVolatilityData(metrics);
         setLoading(false);
      },
      error => {
        console.error('Error fetching volatility metrics:', error);
         setLoading(false);
      }
    ));

    // Liquidity Data Listener
    unsubs.push(onSnapshot(
      collection(db, 'entropyMetrics', 'liquidity', 'latest'),
      snapshot => {
        const metrics: LiquidityMetric[] = snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            pair: doc.id,
            spread: d?.spread as number || 0,
            volume: d?.volume as number || 0,
          };
        });
        setLiquidityData(metrics);
         setLoading(false);
      },
      error => {
        console.error('Error fetching liquidity metrics:', error);
         setLoading(false);
      }
    ));

    return () => unsubs.forEach(unsub => unsub());
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="p-4 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <h2 className="text-xl font-semibold mb-4">Mutation Entropy</h2>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-4 border-b border-gray-200 dark:border-gray-700">
        <button
          className={`pb-2 ${activeTab === 'risk' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
          onClick={() => setActiveTab('risk')}
        >
          Risk
        </button>
        <button
          className={`pb-2 ${activeTab === 'volatility' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
          onClick={() => setActiveTab('volatility')}
        >
          Volatility
        </button>
        <button
          className={`pb-2 ${activeTab === 'liquidity' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
          onClick={() => setActiveTab('liquidity')}
        >
          Liquidity
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400">Loading Entropy Data...</div>
      ) : (
        <div>
          {/* Render active tab content */}
          {activeTab === 'risk' && <RiskDashboardContent data={riskData} loading={false} />}
          {activeTab === 'volatility' && <VolatilityDashboardContent data={volatilityData} loading={false} />}
          {activeTab === 'liquidity' && <LiquidityDashboardContent data={liquidityData} loading={false} />}
        </div>
      )}
    </div>
  );
}
