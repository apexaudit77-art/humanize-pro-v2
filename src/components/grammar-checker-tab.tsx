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

interface GrammarCheckerTabProps {
  config: {
    title: string;
    description: string;
    cardTitle: string;
    cardDescription: string;
    placeholder: string;
    buttonFix: string;
    buttonCopy: string;
    buttonDownload: string;
  };
}

export function GrammarCheckerTab({ config }: GrammarCheckerTabProps) {
  return (
    <section id="grammar-checker" className="flex flex-col items-center justify-center py-8 md:py-12 w-full">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 to-foreground/50">
            {config.title}
            </h1>
            <p className="mx-auto mt-4 max-w-[800px] text-lg text-muted-foreground md:text-xl">
            {config.description}
            </p>
        </div>
        <Card className="w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-2xl border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-headline">{config.cardTitle}</CardTitle>
            <CardDescription className="text-center">
              {config.cardDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={config.placeholder}
              className="min-h-[300px] resize-y bg-background/50 rounded-xl shadow-inner border-dashed"
              disabled
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="w-full relative overflow-hidden group" size="lg" disabled>
                  <span className="absolute w-full h-full brand-mesh -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient" />
                  <Sparkles className="mr-2 h-5 w-5" />
                  {config.buttonFix}
              </Button>
              <Button variant="outline" className="w-full sm:w-auto" size="lg" disabled>
                  <Copy className="mr-2 h-5 w-5" />
                  {config.buttonCopy}
              </Button>
              <Button variant="outline" className="w-full sm:w-auto" size="lg" disabled>
                  <FileDown className="mr-2 h-5 w-5" />
                  {config.buttonDownload}
              </Button>
            </div>
          </CardContent>
        </Card>
    </section>
  );
}
