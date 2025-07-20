
import TaskBoard from '@/components/admin/TaskBoard';
import { motion } from 'framer-motion';

export default function AdminPage() {
  return (
    <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div>
            <h1 className="text-3xl font-bold">Execution Backlog</h1>
            <p className="text-muted-foreground">Live status of all project and societal blueprints.</p>
            </div>
      </motion.div>
      <TaskBoard />
    </div>
  )
}
