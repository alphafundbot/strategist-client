
"use client"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
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
      <CardContent className="flex-grow space-y-4">
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <ResponsiveContainer>
            <LineChart data={timelineData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} fontSize={12}/>
              <YAxis domain={[90, 100]} unit="%" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
              <Tooltip content={<ChartTooltipContent indicator="line" />} />
              <Line type="monotone" dataKey="accuracy" stroke="var(--color-accuracy)" strokeWidth={2} dot={true} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <Textarea 
          placeholder="Add annotation for mutation BRST-9019..." 
          className="mt-4 text-sm" 
          rows={2}
          value={annotation}
          onChange={(e) => setAnnotation(e.target.value)}
        />
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleAddAnnotation} disabled={!annotation.trim()}>
            <MessageSquarePlus className="w-4 h-4 mr-2" />
            Add Annotation
        </Button>
      </CardFooter>
    </Card>
  )
}
