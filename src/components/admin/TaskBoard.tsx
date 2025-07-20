
'use client'

import React, { useEffect, useState } from 'react'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc
} from 'firebase/firestore'
import { db } from '@/lib/firebase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


type Task = {
  id: string
  description: string
  status: 'pending' | 'in-progress' | 'done';
  createdAt: any
}

function useTasks(collectionName: string) {
  const [tasks, setTasks] = useState<Task[]>([])
  useEffect(() => {
    // A query that does nothing if the collection name is invalid.
    if (!collectionName) return;
    const q = query(
      collection(db, collectionName),
      orderBy('id', 'asc')
    )
    const unsubscribe = onSnapshot(q, snap => {
      const list: Task[] = []
      snap.forEach(d => list.push({ id: d.id, ...(d.data() as any) }))
      setTasks(list)
    }, (error) => {
      console.error(`Error fetching tasks from ${collectionName}:`, error);
      setTasks([]);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [collectionName])
  return tasks
}

const statusStyles = {
    pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20',
    'in-progress': 'bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20',
    done: 'bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20',
};


export default function TaskBoard() {
  const studioTasks = useTasks('firebaseStudioTasks');
  const societalTasks = useTasks('societalSingularityTasks');
  const adjustmentTasks = useTasks('adjustmentTasks');

  async function toggleStatus(col: string, task: Task) {
    const nextStatus =
      task.status === 'pending'
        ? 'in-progress'
        : task.status === 'in-progress'
        ? 'done'
        : 'pending';
    const ref = doc(db, col, task.id);
    await updateDoc(ref, { status: nextStatus });
  }

  const TaskList = ({ tasks, collectionName, title }: { tasks: Task[], collectionName: string, title: string}) => (
    <Card className="bg-card/50 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
              {tasks.map((task, index) => (
                  <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="flex justify-between items-center p-2 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                  <span className="text-sm flex-1 pr-4">{task.id}. {task.description}</span>
                  <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleStatus(collectionName, task)}
                      className={`px-3 py-1 text-xs font-semibold rounded-full capitalize w-28 justify-center ${statusStyles[task.status]}`}
                  >
                      {task.status}
                  </Button>
                  </motion.div>
              ))}
              </div>
          </ScrollArea>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <p className="text-muted-foreground">No tasks seeded for this blueprint yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Tabs defaultValue="studio" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="studio">Firebase Studio</TabsTrigger>
        <TabsTrigger value="societal">Societal Singularity</TabsTrigger>
        <TabsTrigger value="adjustment">Adjustments</TabsTrigger>
      </TabsList>
      <TabsContent value="studio">
         <TaskList tasks={studioTasks} collectionName="firebaseStudioTasks" title="Firebase Studio Blueprint" />
      </TabsContent>
      <TabsContent value="societal">
        <TaskList tasks={societalTasks} collectionName="societalSingularityTasks" title="Societal Singularity Blueprint" />
      </TabsContent>
      <TabsContent value="adjustment">
        <TaskList tasks={adjustmentTasks} collectionName="adjustmentTasks" title="Adjustment & Improvement Blueprint" />
      </TabsContent>
    </Tabs>
  )
}
