"use client"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, PieChart as PieChartIcon } from "lucide-react"

const quarterlyRoiData = [
  { quarter: "Q1", roi: 12 },
  { quarter: "Q2", roi: 19 },
  { quarter: "Q3", roi: 3 },
  { quarter: "Q4", roi: 15 },
]

const allocationData = [
    { name: 'Alpha Strategies', value: 400, fill: 'hsl(var(--chart-1))' },
    { name: 'Gamma Hedging', value: 300, fill: 'hsl(var(--chart-2))' },
    { name: 'Delta Neutral', value: 300, fill: 'hsl(var(--chart-3))' },
    { name: 'Arbitrage', value: 200, fill: 'hsl(var(--chart-4))' },
];

const barChartConfig = {
  roi: {
    label: "Quarterly ROI",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function RoiCharts() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Investor ROI Charts
        </CardTitle>
        <CardDescription>
          Visual summary of performance and allocation.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-8">
        <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><TrendingUp className="w-5 h-5" />Quarterly ROI</h3>
            <ChartContainer config={barChartConfig} className="h-64 w-full">
              <ResponsiveContainer>
                <BarChart data={quarterlyRoiData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="quarter" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis unit="%" tickLine={false} axisLine={false} tickMargin={8} />
                  <Tooltip cursor={false} content={<ChartTooltipContent />} />
                  <Bar dataKey="roi" fill="var(--color-roi)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
        </div>
         <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><PieChartIcon className="w-5 h-5" />Strategy Allocation</h3>
            <ChartContainer config={{}} className="h-64 w-full">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={allocationData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                             {allocationData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                         <Tooltip content={<ChartTooltipContent />} />
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
