
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, Clipboard, Copy, Loader2, Sparkles, Trash2, X } from "lucide-react";
import { humanizeText } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "./ui/skeleton";
import { useUser } from "@/firebase";

const tones = ["Professional", "Academic", "Casual", "Creative", "Friendly", "Formal"];

const FormSchema = z.object({
  text: z.string().min(20, {
    message: "Please enter at least 20 characters to humanize.",
  }),
  tone: z.string({
    required_error: "Please select a tone.",
  }),
});

interface HumanizerTabProps {
    config: {
        placeholder: string;
        button: string;
        loading: string;
        outputTitle: string;
        outputPlaceholder: string;
        yourText: string;
    };
    setShowLoginModal: (show: boolean) => void;
}

export function HumanizerTab({ config, setShowLoginModal }: HumanizerTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: "",
      tone: "Professional",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!user) {
        setShowLoginModal(true);
        return;
    }
    setIsLoading(true);
    setResult("");
    const response = await humanizeText(data.text, data.tone);
    setIsLoading(false);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: response.error || "Something went wrong.",
      });
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      form.setValue("text", text);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to paste",
        description: "Could not read from clipboard. Please paste manually.",
      });
    }
  };

  const handleClear = () => {
    form.setValue("text", "");
    setResult("");
  };

  return (
    <div className="flex justify-center w-full py-6">
      <div className="w-full max-w-5xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Input Card */}
              <div className="w-full bg-card/60 backdrop-blur-xl border border-border/50 shadow-lg p-1 rounded-xl relative transition-all duration-300 hover:backdrop-blur-md">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-headline text-lg text-foreground/80">{config.yourText}</h3>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" type="button" onClick={handlePaste} disabled={isLoading}>
                            <Copy className="h-5 w-5" />
                        </Button>
                         <Button variant="ghost" size="icon" type="button" onClick={handleClear} disabled={isLoading}>
                            <Trash2 className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem className="p-1">
                      <FormControl>
                        <Textarea
                          placeholder={config.placeholder}
                          className="min-h-[350px] resize-y bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base p-3"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Output Card */}
               <div className="w-full bg-card/60 backdrop-blur-xl border border-border/50 shadow-lg p-1 rounded-xl relative transition-all duration-300 hover:backdrop-blur-md">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="font-headline text-lg text-foreground/80 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        {config.outputTitle}
                    </h3>
                    {result && !isLoading && (
                        <Button variant="ghost" size="icon" onClick={handleCopy}>
                            {copied ? <Clipboard className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                        </Button>
                    )}
                </div>
                <div className="p-4">
                  {isLoading ? (
                    <div className="space-y-3 pt-4 min-h-[350px]">
                      <Skeleton className="h-5 w-4/5" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-5/6" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-2/4" />
                    </div>
                  ) : (
                    <div className="prose prose-lg dark:prose-invert max-w-none text-foreground min-h-[350px] rounded-md">
                      {result || config.outputPlaceholder}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Controls and Submit */}
            <div className="w-full max-w-md mx-auto bg-card/60 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg p-4 flex flex-col md:flex-row items-center gap-4 transition-all duration-300">
               <div className="w-full">
                    <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="sr-only">Tone of Voice</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                            <FormControl>
                            <SelectTrigger className="w-full bg-transparent border-white/20">
                                <SelectValue placeholder="Select a tone" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {tones.map((tone) => (
                                <SelectItem key={tone} value={tone}>
                                {tone}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        </FormItem>
                    )}
                    />
               </div>
                <Button type="submit" disabled={isLoading} className="w-full text-lg h-12 relative overflow-hidden group brand-mesh text-primary-foreground shadow-glow hover:animate-pulse-glow hover:scale-105 transition-transform duration-300">
                     <span className="absolute inset-0 brand-mesh opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient"></span>
                     <span className="relative flex items-center">
                        {isLoading ? (
                            <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            {config.loading}
                            </>
                        ) : (
                            <>
                            {config.button}
                            <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                        )}
                     </span>
                </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
