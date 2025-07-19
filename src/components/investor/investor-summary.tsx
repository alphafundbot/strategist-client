"use client"

import { useState } from "react"
import { generateInvestorSummary } from "@/ai/flows/investor-summary-generator"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FileText, Loader2, Sparkles } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const mockReports = [
    { mutationId: "MUT-001", assessmentReport: "Strong performance, exceeded ROI targets with minimal drawdown." },
    { mutationId: "MUT-002", assessmentReport: "Override triggered due to unexpected market event, preventing major loss. Strategist intervention was timely and effective." },
    { mutationId: "MUT-003", assessmentReport: "Consistent high-alpha generation in volatile conditions. Model shows robustness." },
]

export default function InvestorSummary() {
  const [summary, setSummary] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    setSummary(null)
    try {
      const result = await generateInvestorSummary({
        strategistName: "Sentinel Prime",
        mutationReports: mockReports,
      })
      setSummary(result.narratedSummary)
    } catch (error) {
      console.error("Failed to generate summary:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Narrated Strategist Summary
        </CardTitle>
        <CardDescription>
          AI-generated assessment summary for investor review.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
            <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        )}
        {summary && (
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{summary}</p>
        )}
        {!isLoading && !summary && (
            <div className="text-center text-muted-foreground py-8">
                <p>Click "Generate Summary" to view the report.</p>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate Summary
        </Button>
      </CardFooter>
    </Card>
  )
}
