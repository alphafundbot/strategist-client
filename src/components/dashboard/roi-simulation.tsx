
"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Input } from "@/components/ui/input"
import { LineChart } from "lucide-react"

const chartData = [
  { month: "January", actual: 186, forecast: 80 },
  { month: "February", actual: 305, forecast: 200 },
  { month: "March", actual: 237, forecast: 120 },
  { month: "April", actual: 73, forecast: 190 },
  { month: "May", actual: 209, forecast: 130 },
  { month: "June", actual: 214, forecast: 140 },
]

const chartConfig = {
  actual: {
    label: "Actual ROI",
    color: "hsl(var(--accent))",
  },
  forecast: {
    label: "Forecasted ROI",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function RoiSimulation() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <LineChart className="w-6 h-6" />
            ROI Simulation
        </CardTitle>
        <CardDescription>
          Explore capital amplification across chained mutations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-actual)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-actual)" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-forecast)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-forecast)" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} unit="%" />
              <Tooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="forecast" stroke="var(--color-forecast)" fillOpacity={1} fill="url(#colorForecast)" />
              <Area type="monotone" dataKey="actual" stroke="var(--color-actual)" fillOpacity={1} fill="url(#colorActual)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <Input placeholder="Natural language prompt: 'Simulate a 2x leverage on MUT-003'" />
      </CardFooter>
    </Card>
  )
}
