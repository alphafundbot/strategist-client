"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { PlusCircle } from "lucide-react"

const formSchema = z.object({
  roiTarget: z.coerce.number().min(0, "Must be positive").max(100, "Must be 100 or less"),
  entropyRisk: z.coerce.number().min(0, "Must be positive").max(100, "Must be 100 or less"),
})

export default function MutationGenerator() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roiTarget: 10,
      entropyRisk: 5,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Mutation Proposed",
      description: `ROI Target: ${values.roiTarget}%, Entropy Risk: ${values.entropyRisk}%.`,
    })
    form.reset()
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <PlusCircle className="w-6 h-6" />
            Propose New Mutation
        </CardTitle>
        <CardDescription>
          Set ROI targets and entropy risk to generate a new mutation.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="roiTarget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ROI Target (%)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 25" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="entropyRisk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entropy Risk (%)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Submit Proposal
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
