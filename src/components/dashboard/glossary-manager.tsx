
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tags } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const glossaryTags = [
  { tag: "momentum-burst", entropy: 78, suppressed: false },
  { tag: "reversion-mean", entropy: 45, suppressed: false },
  { tag: "volatility-scalp", entropy: 91, suppressed: true },
  { tag: "arbitrage-alpha", entropy: 22, suppressed: false },
]

export default function GlossaryManager() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Tags className="w-6 h-6" />
            Glossary Manager
        </CardTitle>
        <CardDescription>
          Manage strategist tags and entropy suppression.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {glossaryTags.map((item) => (
          <div key={item.tag} className="flex items-center justify-between">
            <div className="flex-grow pr-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{item.tag}</span>
                <span className="text-xs text-muted-foreground">Entropy: {item.entropy}%</span>
              </div>
              <Progress value={item.entropy} className="h-2" />
            </div>
            <Switch id={item.tag} defaultChecked={item.suppressed} aria-label={`Suppress ${item.tag}`} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
