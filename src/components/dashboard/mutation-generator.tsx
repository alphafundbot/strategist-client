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
import { PlusCircle, Sparkles, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { generateMutationSuggestion } from "@/ai/flows/suggestion-engine"
import { runMutationEngine } from "@/ai/flows/mutation-engine"
import { useAuth } from "@/contexts/AuthContext"

const getFormSchema = (tier: string) => {
    let minRoi = 0;
    let minMessage = "Must be positive";
    let maxRoi = 20;
    let maxMessage = "ROI target cannot exceed 20%.";
    
    switch (tier) {
        case 'Free+':
            minRoi = 4;
            maxRoi = 8;
            minMessage = "Free+ tier mutation must have an ROI target of at least 4%.";
            maxMessage = "ROI target exceeds Free+ tier limit (8%). Elevate to Gold for higher forecasting.";
            break;
        case 'Silver':
            minRoi = 9;
            maxRoi = 12;
            minMessage = "Silver tier mutation must have an ROI target of at least 9%.";
            maxMessage = "ROI target exceeds Silver tier limit (12%). Elevate to Gold for higher forecasting.";
            break;
        case 'Gold':
            minRoi = 13;
            maxRoi = 18;
            minMessage = "Gold tier mutation must have an ROI target of at least 13%.";
            maxMessage = "ROI target exceeds Gold tier limit (18%).";
            break;
    }

    return z.object({
        roiTarget: z.coerce.number().min(minRoi, { message: minMessage }).max(maxRoi, { message: maxMessage }),
        entropyRisk: z.coerce.number().min(0, "Must be positive").max(100, "Must be 100 or less"),
    });
}


export default function MutationGenerator() {
  const { toast } = useToast()
  const { user } = useAuth();
  const [tier, setTier] = useState('Free+');
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
        const storedTier = localStorage.getItem('userTier') || 'Free+';
        setTier(storedTier);
    }
  }, []);
  
  const formSchema = getFormSchema(tier);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roiTarget: 4,
      entropyRisk: 5,
    },
    context: { tier },
  });
  
  useEffect(() => {
    form.trigger();
  }, [tier, form]);
  
  useEffect(() => {
    const defaultValues: { [key: string]: number } = {
        'Free+': 4,
        'Silver': 9,
        'Gold': 13,
    };
    form.reset({ roiTarget: defaultValues[tier] || 4, entropyRisk: 5 });
  }, [form, tier]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
        toast({ title: "Authentication Error", description: "You must be logged in to propose a mutation.", variant: "destructive"});
        return;
    }

    setIsSubmitting(true);

    try {
        const result = await runMutationEngine({
            strategistId: user.uid,
            roiDeltaThreshold: values.roiTarget,
            mutationData: {
                entropyRisk: values.entropyRisk,
                proposalTier: tier,
                suggestionRationale: suggestion || undefined,
            }
        });

        toast({
            title: "Mutation Engine Activated",
            description: `Mutation ${result.mutationId} has been successfully created.`,
        });
        form.reset();
        setSuggestion(null);

    } catch (error) {
        toast({
            title: "Mutation Failed",
            description: (error as Error).message,
            variant: "destructive"
        })
    } finally {
        setIsSubmitting(false);
    }
  }

  const handleGetSuggestion = async () => {
    setIsSuggesting(true);
    setSuggestion(null);
    try {
        const result = await generateMutationSuggestion({
            tier,
            recentPerformance: "Last 3 mutations showed high alpha in momentum-burst strategies, but failed to capture reversion-to-mean opportunities."
        });
        form.setValue("roiTarget", result.suggestedRoi);
        form.setValue("entropyRisk", result.suggestedEntropy);
        setSuggestion(result.rationale);
    } catch (error) {
        toast({
            title: "Suggestion Failed",
            description: "Could not generate an AI suggestion at this time.",
            variant: "destructive"
        })
    } finally {
        setIsSuggesting(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <PlusCircle className="w-6 h-6" />
            Propose New Mutation
        </CardTitle>
        <CardDescription>
          Set ROI targets and entropy risk or let Everest AI suggest a mutation.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
                <Button type="button" variant="outline" className="w-full" onClick={handleGetSuggestion} disabled={isSuggesting || isSubmitting}>
                    {isSuggesting ? <Loader2 className="mr-2 animate-spin" /> : <Sparkles className="mr-2" />}
                    Get AI Suggestion
                </Button>
                {suggestion && !isSuggesting && (
                    <div className="p-3 bg-muted/50 rounded-md text-sm text-muted-foreground border border-input mt-2">
                       <p><span className="font-semibold text-foreground">Everest Suggests:</span> {suggestion}</p>
                    </div>
                )}
            </div>
            <FormField
              control={form.control}
              name="roiTarget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ROI Target (%)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 15" {...field} />
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
            <Button type="submit" className="w-full" disabled={isSubmitting || isSuggesting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Proposal
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
