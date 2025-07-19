
"use client"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { PlayCircle, MessageSquarePlus } from "lucide-react"

const timelineData = [
  { time: '0s', accuracy: 95 },
  { time: '1s', accuracy: 96 },
  { time: '2s', accuracy: 94 },
  { time: '3s', accuracy: 97 },
  { time: '4s', accuracy: 98 },
  { time: '5s', accuracy: 99 },
  { time: '6s', accuracy: 98.5 },
]

const chartConfig = {
  accuracy: {
    label: "Fill Accuracy",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function ReplayAnnotator() {
  const [annotation, setAnnotation] = useState("");
  const { toast } = useToast();

  const handleAddAnnotation = () => {
    if (annotation.trim()) {
      toast({
        title: "Annotation Added",
        description: `"${annotation}"`,
      });
      setAnnotation("");
    }
  }

  return (
    <Card className="shadow-lg flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <PlayCircle className="w-6 h-6" />
            Replay Annotator
        </CardTitle>
        <CardDescription>
          Review fill accuracy timeline and annotate performance.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-6">
        <div className="h-48 w-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer>
                <AreaChart data={timelineData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-accuracy)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-accuracy)" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} fontSize={12}/>
                  <YAxis domain={[90, 100]} unit="%" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                  <Tooltip content={<ChartTooltipContent indicator="line" />} />
                  <Area type="monotone" dataKey="accuracy" stroke="var(--color-accuracy)" fillOpacity={1} fill="url(#colorAccuracy)" />
                </AreaChart>
            </ResponsiveContainer>
            </ChartContainer>
        </div>
        <div className="flex flex-col gap-4">
            <Textarea 
            placeholder="Add annotation for mutation BRST-9019..." 
            className="text-sm" 
            rows={3}
            value={annotation}
            onChange={(e) => setAnnotation(e.target.value)}
            />
            <Button onClick={handleAddAnnotation} disabled={!annotation.trim()}>
                <MessageSquarePlus className="w-4 h-4 mr-2" />
                Add Annotation
            </Button>
        </div>
      </CardContent>
    </Card>
  )
}
