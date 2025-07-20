
"use client";

import StatsCards from '@/components/dashboard/stats-cards';
import PerformanceChart from '@/components/dashboard/performance-chart';
import RecentActivity from '@/components/dashboard/recent-activity';
import StrategyAllocation from '@/components/dashboard/strategy-allocation';
import { motion } from 'framer-motion';
import ROIWidget from '@/components/stubs/ui/ROIWidget'; // Added import
import MutationFeed from '@/components/stubs/ui/MutationFeed'; // Added import
import StrategistEscalation from '@/components/dashboard/strategistEscalation'; // Added import
import StrategistActions from '@/components/dashboard/StrategistActions'; // Added import
import EpochSynthesizer from '@/components/dashboard/EpochSynthesizer';
import ReplaySessionList from '@/components/dashboard/ReplaySessionList';
import Epoch26Synthesizer from '@/components/dashboard/Epoch26Synthesizer';
// Removed individual dashboard imports
// import RiskDashboard from '@/components/dashboard/RiskDashboard';
// import VolatilityDashboard from '@/components/dashboard/VolatilityDashboard';
// import LiquidityDashboard from '@/components/dashboard/LiquidityDashboard';
import GeminiLogVisualizer from '@/components/dashboard/GeminiLogVisualizer';

// Import new components
import EntropyPanel from '@/components/dashboard/EntropyPanel';
import HistoricalEntropyPanel from '@/components/dashboard/HistoricalEntropyPanel';
import ActionControlDeck from '@/components/dashboard/ActionControlDeck';

interface DashboardClientProps {
    tier: string;
}

export default function DashboardClient({ tier }: DashboardClientProps) {
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    // Mock data for the stats cards
    const statsData = {
        totalAUM: 1250000,
        activeMutations: 42,
        averageROI: 12.5,
        strategistTier: tier as 'Observer' | 'Advisor' | 'Elite'
    };


    return (
        <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants}>
                <StatsCards {...statsData} />
            </motion.div>
            
            <motion.div 
                className="grid grid-cols-1 lg:grid-cols-5 gap-6"
                variants={itemVariants}
            >
                <div className="lg:col-span-3">
                    <PerformanceChart />
                </div>
                <div className="lg:col-span-2">
                    <StrategyAllocation />
                }
            </motion.div>
            
            <motion.div variants={itemVariants}>
                <RecentActivity />
            </motion.div>

            {/* Added stub components */}
            <motion.div variants={itemVariants}>
                <ROIWidget />
            </motion.div>
            <motion.div variants={itemVariants}>
                <MutationFeed />
            </motion.div>

            {/* Added StrategistEscalation component */}
            <motion.div variants={itemVariants}>
                <StrategistEscalation />
            </motion.div>

            {/* Added StrategistActions component */}
            <motion.div variants={itemVariants}>
                <StrategistActions />
            </motion.div>

            {/* Epoch-25 Synthesis (Advisor & Elite only) */}
            <motion.div variants={itemVariants}>
                <EpochSynthesizer />
            </motion.div>

            {/* Epoch-26 Synthesis (Advisor & Elite only) */}
             <motion.div variants={itemVariants}>
                <Epoch26Synthesizer />
            </motion.div>

            {/* Replay Session List and Modal */}
            <motion.div variants={itemVariants} className="mt-6">
              <ReplaySessionList />
            </motion.div>

            {/* Mutation Entropy Panel */}
            <motion.div variants={itemVariants} className="mt-6">
              <EntropyPanel />
            </motion.div>

             {/* Historical Entropy Panel */}
             <motion.div variants={itemVariants} className="mt-6">
                <HistoricalEntropyPanel />
             </motion.div>

             {/* Strategist Control Deck */}
             <motion.div variants={itemVariants} className="mt-6">
                 <ActionControlDeck asset="BTC" braidId="braid_alpha" /> {/* Example usage */} 
             </motion.div>

             {/* Gemini Cognition Log */}
            <motion.div variants={itemVariants} className="mt-6">
               <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Cognition Log</h2>
               <GeminiLogVisualizer />
            </motion.div>

        </motion.div>
    );
}
