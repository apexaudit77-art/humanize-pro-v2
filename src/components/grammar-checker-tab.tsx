'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileDown, Copy, Sparkles } from "lucide-react";

export function GrammarCheckerTab() {
  return (
    <section id="grammar-checker" className="flex flex-col items-center justify-center py-8 md:py-12 w-full">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 to-foreground/50">
            مدقق لغوي ونحوي ذكي
            </h1>
            <p className="mx-auto mt-4 max-w-[800px] text-lg text-muted-foreground md:text-xl">
            تصحيح الأخطاء الإملائية والنحوية بدون تغيير المعنى.
            </p>
        </div>
        <Card className="w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-2xl border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-headline">Smart Grammar Checker</CardTitle>
            <CardDescription className="text-center">
              Correct grammar & spelling without changing meaning. Feature coming soon!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste your text here to check it..."
              className="min-h-[300px] resize-y bg-background/50 rounded-xl shadow-inner border-dashed"
              disabled
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="w-full relative overflow-hidden group" size="lg" disabled>
                  <span className="absolute w-full h-full brand-mesh -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient" />
                  <Sparkles className="mr-2 h-5 w-5" />
                  Fix All Errors (Soon)
              </Button>
              <Button variant="outline" className="w-full sm:w-auto" size="lg" disabled>
                  <Copy className="mr-2 h-5 w-5" />
                  Copy (Soon)
              </Button>
              <Button variant="outline" className="w-full sm:w-auto" size="lg" disabled>
                  <FileDown className="mr-2 h-5 w-5" />
                  Download (Soon)
              </Button>
            </div>
          </CardContent>
        </Card>
    </section>
  );
}
