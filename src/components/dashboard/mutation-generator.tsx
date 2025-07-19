
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { PlusCircle } from "lucide-react"
import { useEffect, useState } from "react"

const getFormSchema = (tier: string) => {
    let minRoi = 0;
    let minMessage = "Must be positive";
    let maxRoi = 100;
    let maxMessage = "Must be 100 or less";

    if (tier === 'Free+') {
        minRoi = 4;
        minMessage = "Free+ tier mutation must have an ROI target of at least 4%.";
        maxRoi = 8;
        maxMessage = "ROI target exceeds Free+ tier limit (8%). Elevate to Gold for 12-24% forecasting and override suppression.";
    } else if (tier === 'Silver') {
        maxRoi = 18;
        maxMessage = "ROI target exceeds Silver tier limit (18%). Elevate to Gold for unlimited forecasting.";
    }

    return z.object({
        roiTarget: z.coerce.number().min(minRoi, minMessage).max(maxRoi, { message: maxMessage }),
        entropyRisk: z.coerce.number().min(0, "Must be positive").max(100, "Must be 100 or less"),
    });
}


export default function MutationGenerator() {
  const { toast } = useToast()
  const [tier, setTier] = useState('Free+');
  const [formSchema, setFormSchema] = useState(getFormSchema('Free+'));

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const storedTier = localStorage.getItem('userTier') || 'Free+';
        setTier(storedTier);
        setFormSchema(getFormSchema(storedTier));
    }
  }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roiTarget: 4,
      entropyRisk: 5,
    },
    // re-validate when schema changes
    context: { tier },
  });
  
  useEffect(() => {
    setFormSchema(getFormSchema(tier));
  }, [tier]);
  
  useEffect(() => {
    form.trigger();
    form.reset({ roiTarget: tier === 'Free+' ? 4 : 10, entropyRisk: 5 });
  }, [form, formSchema, tier]);


  function onSubmit(values: z.infer<typeof formSchema>) {
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
