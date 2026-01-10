import { Globe, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { HumanizerTab } from "@/components/humanizer-tab";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "AI Pattern Remover & AI to Human Converter | Bypass AI Detection",
    description: "Use our AI Pattern Remover to make AI text undetectable. This AI to human converter tool helps you bypass AI detectors for free. Humanize AI text online with ease, bypass turnitin, and bypass gptzero.",
    keywords: [
      "ai pattern remover", "ai to human converter", "bypass ai detection", "humanize ai text", "undetectable ai", "ai content detector",
      "humanize ai text free", "humanize ai text free عربي", "humanize a ai text free online",
      "humanize ai text arabic", "humanize ai text عربي", "humanize ai text free online unlimited",
      "humanize ai text tool", "humanize ai text free arabic", "humanize ai text org"
    ],
};


export default function AIPatternRemoverPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-transparent text-foreground">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="flex w-full items-center justify-between py-4 md:py-6 border-b border-border/50">
          <Link href={`/`} className="flex items-center gap-3">
            <Image src="/assets/logo-main.png" alt="Humanize AI Logo" width={160} height={40} priority style={{ objectFit: 'contain', aspectRatio: '160 / 40' }} />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex w-full flex-grow flex-col items-center justify-center py-8 md:py-12">
          <div className="w-full max-w-5xl space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-foreground/90 to-foreground/50">
                AI Pattern Remover
              </h1>
              <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
                This specialized tool focuses on removing the repetitive patterns and predictable phrasing that AI detectors look for. Humanize your text to perfection.
              </p>
            </div>
            
            <Card className="w-full bg-card/60 backdrop-blur-xl border-border/50 shadow-lg mt-6 transition-all duration-300 hover:backdrop-blur-md">
                <CardContent className="p-4 md:p-6">
                    <HumanizerTab config={{
                        placeholder: "Place your AI-generated text here, and we will work our magic to make it completely human-like.",
                        button: "Humanize Text",
                        loading: "Humanizing...",
                        outputTitle: "Humanized Output",
                        outputPlaceholder: "Your humanized text will appear here.",
                        yourText: "Your Text",
                    }} />
                </CardContent>
            </Card>

          </div>
        </main>
      </div>
    </div>
  );
}
