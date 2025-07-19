
"use client"

import { useState } from "react"
import Image from "next/image"
import { configureCognitionGraph } from "@/ai/flows/cognition-graph-config"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { GitFork, Loader2, Wand2 } from "lucide-react"

export default function CognitionGraph() {
  const [prompt, setPrompt] = useState(
    "Scaffold cognition graph for strategist onboarding. Nodes include: Mutation Epochs, ROI Arc, Override Suppression, Entropy Trends, Fingerprint Evolution."
  )
  const [graphConfig, setGraphConfig] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    setIsLoading(true)
    setGraphConfig(null)
    try {
      const result = await configureCognitionGraph({ prompt })
      setGraphConfig(result.graphConfiguration)
    } catch (error) {
      console.error("Failed to configure graph:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="shadow-lg flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <GitFork className="w-6 h-6" />
            Cognition Graph
        </CardTitle>
        <CardDescription>
          Visualize decision paths and override forks. Configure with natural language.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
            <Image 
                src="https://images.unsplash.com/photo-1678846375533-8a37f48d35f4?q=80&w=600"
                width={600}
                height={400}
                alt="Cognition graph"
                className="rounded-md object-cover"
                data-ai-hint="data visualization network"
            />
        </div>
        <div>
          <Textarea
            placeholder="Describe the graph you want to see..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="text-sm"
          />
        </div>
        {graphConfig && (
            <div className="p-2 bg-muted rounded-md text-xs text-muted-foreground overflow-auto max-h-24">
                <pre><code>{graphConfig}</code></pre>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Render Graph
        </Button>
      </CardFooter>
    </Card>
  )
}
