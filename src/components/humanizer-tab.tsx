
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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
    }
}

const GoogleIcon = () => (
    <svg className="mr-3 h-5 w-5" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.65-3.317-11.297-7.962l-6.571,4.819C9.656,39.663,16.318,44,24,44z" />
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C43.021,36.251,44,30.686,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);

export function HumanizerTab({ config }: HumanizerTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: "",
      tone: "Professional",
    },
  });

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);
    try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        toast({ title: 'Signed in with Google successfully!' });
        setShowLoginModal(false);
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Google Sign-In Failed',
            description: error.message,
        });
    } finally {
        setIsGoogleLoading(false);
    }
  }

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
       <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
            <DialogContent className="sm:max-w-md bg-card/80 backdrop-blur-lg border-border/50">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-headline text-center">Unlock Free Access</DialogTitle>
                    <DialogDescription className="text-center text-lg pt-2 text-muted-foreground">
                       Sign in to convert your AI text to human-like content instantly.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Button variant="outline" className="w-full h-12 text-lg" onClick={handleGoogleSignIn} disabled={isGoogleLoading}>
                        {isGoogleLoading ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            <GoogleIcon />
                        )}
                        Continue with Google
                    </Button>
                </div>
                <DialogClose asChild>
                    <Button type="button" variant="ghost" size="icon" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
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
