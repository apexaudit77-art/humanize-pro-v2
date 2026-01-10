
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { generateMeta, generateHeaders, integrateKeywords } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Code, Heading, Loader2, Tags } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { Label } from "./ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const textSchema = z.object({
  text: z.string().min(20, "Please enter at least 20 characters."),
});

const lsiSchema = textSchema.extend({
  keywords: z.string().min(3, "Please enter at least one keyword."),
});

interface SeoToolsTabConfig {
    mainTitle: string;
    mainDescription: string;
    metaGeneratorTitle: string;
    metaGeneratorDescription: string;
    metaGeneratorContentLabel: string;
    metaGeneratorContentPlaceholder: string;
    metaGeneratorButton: string;
    metaGeneratorResultTitle: string;
    metaGeneratorResultDescription: string;
    headerGeneratorTitle: string;
    headerGeneratorDescription: string;
    headerGeneratorContentLabel: string;
    headerGeneratorContentPlaceholder: string;
    headerGeneratorButton: string;
    headerGeneratorResultLabel: string;
    lsiIntegratorTitle: string;
    lsiIntegratorDescription: string;
    lsiIntegratorContentLabel: string;
    lsiIntegratorContentPlaceholder: string;
    lsiIntegratorKeywordsLabel: string;
    lsiIntegratorKeywordsPlaceholder: string;
    lsiIntegratorButton: string;
    lsiIntegratorResultLabel: string;
}

interface ToolProps {
    config: SeoToolsTabConfig;
}

const MetaTagGenerator = ({ config }: ToolProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ metaTitle: string, metaDescription: string } | null>(null);

  const form = useForm<z.infer<typeof textSchema>>({
    resolver: zodResolver(textSchema),
    defaultValues: { text: "" }
  });

  async function onSubmit(data: z.infer<typeof textSchema>) {
    setIsLoading(true);
    setResult(null);
    const response = await generateMeta(data.text);
    setIsLoading(false);
    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({ variant: "destructive", title: "Error", description: response.error });
    }
  }

  return (
    <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{config.metaGeneratorContentLabel}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={config.metaGeneratorContentPlaceholder} {...field} className="min-h-[120px]" disabled={isLoading}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {config.metaGeneratorButton}
            </Button>
          </form>
        </Form>
        {isLoading && (
            <div className="space-y-4 pt-4">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-24 w-full" />
                </div>
            </div>
        )}
        {result && (
          <div className="space-y-4 pt-4 border-t mt-6">
            <div className="space-y-2">
              <Label>{config.metaGeneratorResultTitle}</Label>
              <Input readOnly value={result.metaTitle} />
            </div>
            <div className="space-y-2">
              <Label>{config.metaGeneratorResultDescription}</Label>
              <Textarea readOnly value={result.metaDescription} className="h-24" />
            </div>
          </div>
        )}
      </div>
  );
};

const HeaderTagGenerator = ({ config }: ToolProps) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string>("");
  
    const form = useForm<z.infer<typeof textSchema>>({
      resolver: zodResolver(textSchema),
      defaultValues: { text: "" }
    });
  
    async function onSubmit(data: z.infer<typeof textSchema>) {
      setIsLoading(true);
      setResult("");
      const response = await generateHeaders(data.text);
      setIsLoading(false);
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        toast({ variant: "destructive", title: "Error", description: response.error });
      }
    }
  
    return (
      <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{config.headerGeneratorContentLabel}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={config.headerGeneratorContentPlaceholder} {...field} className="min-h-[120px]" disabled={isLoading}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {config.headerGeneratorButton}
              </Button>
            </form>
          </Form>
          {(isLoading || result) &&
            <div className="space-y-2 pt-4 border-t mt-6">
                <Label>{config.headerGeneratorResultLabel}</Label>
                {isLoading ? <Skeleton className="h-32 w-full" /> : <Textarea readOnly value={result} className="h-32" />}
            </div>
          }
      </div>
    );
};

const LsiKeywordIntegrator = ({ config }: ToolProps) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string>("");

    const form = useForm<z.infer<typeof lsiSchema>>({
        resolver: zodResolver(lsiSchema),
        defaultValues: { text: "", keywords: "" }
    });

    async function onSubmit(data: z.infer<typeof lsiSchema>) {
        setIsLoading(true);
        setResult("");
        const response = await integrateKeywords(data.text, data.keywords);
        setIsLoading(false);
        if (response.success && response.data) {
        setResult(response.data);
        } else {
        toast({ variant: "destructive", title: "Error", description: response.error });
        }
    }
    
    return (
      <div className="space-y-4">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{config.lsiIntegratorContentLabel}</FormLabel>
                            <FormControl>
                                <Textarea placeholder={config.lsiIntegratorContentPlaceholder} {...field} className="min-h-[120px]" disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="keywords"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{config.lsiIntegratorKeywordsLabel}</FormLabel>
                            <FormControl>
                                <Input placeholder={config.lsiIntegratorKeywordsPlaceholder} {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {config.lsiIntegratorButton}
                </Button>
            </form>
        </Form>
        {(isLoading || result) &&
            <div className="space-y-2 pt-4 border-t mt-6">
                <Label>{config.lsiIntegratorResultLabel}</Label>
                {isLoading ? <Skeleton className="h-32 w-full" /> : <Textarea readOnly value={result} className="h-32" />}
            </div>
        }
      </div>
    );
}


export function SeoToolsTab({ config }: { config: SeoToolsTabConfig }) {
  return (
    <div>
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        <AccordionItem value="item-1">
            <AccordionTrigger>
                <div className="flex items-center gap-3">
                    <Code className="h-6 w-6 text-primary" />
                    <div className="text-left">
                        <h4 className="font-semibold text-base">{config.metaGeneratorTitle}</h4>
                        <p className="text-sm text-muted-foreground">{config.metaGeneratorDescription}</p>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <MetaTagGenerator config={config} />
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
            <AccordionTrigger>
                <div className="flex items-center gap-3">
                    <Heading className="h-6 w-6 text-primary" />
                    <div className="text-left">
                        <h4 className="font-semibold text-base">{config.headerGeneratorTitle}</h4>
                        <p className="text-sm text-muted-foreground">{config.headerGeneratorDescription}</p>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <HeaderTagGenerator config={config} />
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
            <AccordionTrigger>
                <div className="flex items-center gap-3">
                    <Tags className="h-6 w-6 text-primary" />
                    <div className="text-left">
                        <h4 className="font-semibold text-base">{config.lsiIntegratorTitle}</h4>
                        <p className="text-sm text-muted-foreground">{config.lsiIntegratorDescription}</p>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <LsiKeywordIntegrator config={config} />
            </AccordionContent>
        </AccordionItem>
        </Accordion>
    </div>
  );
}

    