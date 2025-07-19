
"use client";

import StatsCards from '@/components/dashboard/stats-cards';
import PerformanceChart from '@/components/dashboard/performance-chart';
import RecentActivity from '@/components/dashboard/recent-activity';
import StrategyAllocation from '@/components/dashboard/strategy-allocation';
import { motion } from 'framer-motion';

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

    return (
        <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants}>
                <StatsCards tier={tier} />
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
                </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
                <RecentActivity />
            </motion.div>
        </motion.div>
    );
}
