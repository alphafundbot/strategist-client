
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { Download, FileLock2, FileJson } from "lucide-react"

export default function ExportOptions() {
  const { toast } = useToast()
  const [tier, setTier] = useState("Free+")

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const storedTier = localStorage.getItem('userTier') || 'Free+';
        setTier(storedTier);
    }
  }, []);

  const isFreeTier = tier === "Free+";

  const handleDownload = (reportType: string, format: 'PDF' | 'JSON') => {
    toast({
        title: "Secure Report Generated",
        description: `${reportType} (${format}) downloaded. PII suppressed, download logged.`,
    })
  }

  const reportTypes = [
    "Mutation Epoch Report",
    "ROI Forecast Summary",
    "Vault Growth Chart",
    "Tier Elevation Log",
    "Override Suppression Audit",
    "Collective Vault Risk Report",
    "Full Strategist Telemetry"
  ];

  const downloadButton = (format: 'PDF' | 'JSON') => (
    <Button size="lg" variant="secondary" disabled={isFreeTier}>
        {format === 'PDF' ? <FileLock2 className="mr-2 h-4 w-4" /> : <FileJson className="mr-2 h-4 w-4" />}
        Download as {format}
    </Button>
  )

  const downloadDropdown = (format: 'PDF' | 'JSON') => (
     <DropdownMenu>
        {isFreeTier ? (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {/* The button is nested in a span to allow the tooltip to work on disabled buttons */}
                        <span>{downloadButton(format)}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Upgrade to unlock data exports.</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        ) : (
            <DropdownMenuTrigger asChild>{downloadButton(format)}</DropdownMenuTrigger>
        )}
        <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Secure {format} Reports</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {reportTypes.map((type) => (
                <DropdownMenuItem key={type} onClick={() => handleDownload(type, format)}>
                    {type}
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Download className="w-6 h-6" />
            Data & Export Center
        </CardTitle>
        <CardDescription>
          Generate and download your strategist data and performance reports.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        {downloadDropdown('PDF')}
        {downloadDropdown('JSON')}
      </CardContent>
    </Card>
  )
}
