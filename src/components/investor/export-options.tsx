"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Download, FileType, FileBarChart2, Loader2, Wand2 } from "lucide-react"
import { generatePitchDeck } from "@/ai/flows/pitch-deck-generator"

const mockReports = [
    { mutationId: "MUT-001", assessmentReport: "Strong performance, exceeded ROI targets with minimal drawdown." },
    { mutationId: "MUT-002", assessmentReport: "Override triggered due to unexpected market event, preventing major loss. Strategist intervention was timely and effective." },
    { mutationId: "MUT-003", assessmentReport: "Consistent high-alpha generation in volatile conditions. Model shows robustness." },
]

export default function ExportOptions() {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGeneratePitchDeck = async () => {
    setIsGenerating(true)
    try {
      await generatePitchDeck({
        strategistName: "Sentinel Prime",
        mutationReports: mockReports,
      })
      toast({
        title: "Pitch Deck Generated",
        description: "The investor brief has been successfully bundled and is ready for download.",
      })
    } catch (error) {
      console.error("Failed to generate pitch deck:", error)
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not generate the pitch deck. Please try again.",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Download className="w-6 h-6" />
            Export Center
        </CardTitle>
        <CardDescription>
          Generate and download reports for investor presentations.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Button size="lg" onClick={handleGeneratePitchDeck} disabled={isGenerating}>
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          {isGenerating ? "Generating..." : "Generate Pitch Deck"}
        </Button>
        <Button size="lg" variant="secondary">
          <FileBarChart2 className="mr-2 h-4 w-4" />
          Full ROI Data (CSV)
        </Button>
        <Button size="lg" variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Audit Trail Bundle (ZIP)
        </Button>
      </CardContent>
    </Card>
  )
}
