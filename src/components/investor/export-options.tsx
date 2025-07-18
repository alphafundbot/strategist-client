import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Download, FileType, FileBarChart2 } from "lucide-react"

export default function ExportOptions() {
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
        <Button size="lg">
          <FileType className="mr-2 h-4 w-4" />
          Export Pitch Deck (PDF)
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
