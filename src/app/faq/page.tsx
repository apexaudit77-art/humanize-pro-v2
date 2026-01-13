
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FaqPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-transparent text-foreground">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="flex w-full items-center justify-between py-4 md:py-6 border-b border-border/50">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/assets/logo-main.png" alt="Humanize AI Logo" width={160} height={40} priority style={{ objectFit: 'contain', aspectRatio: '160 / 40' }} />
          </Link>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </header>

        <main className="flex w-full flex-grow flex-col items-center py-8 md:py-12">
            <div className="w-full max-w-3xl space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                        Frequently Asked Questions
                    </h1>
                     <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
                        Find answers to common questions about our AI humanizer.
                    </p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How does the AI to human converter work?</AccordionTrigger>
                        <AccordionContent>
                        Our tool analyzes your text and rewrites it to avoid AI patterns, making it sound natural and helping to <strong>bypass AI detectors</strong>. It focuses on varying sentence structure and vocabulary.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Is it free to humanize AI text?</AccordionTrigger>
                        <AccordionContent>
                        Yes, we offer a free version of our tool with generous limits. You can <strong>humanize AI text</strong> for free to see how effective it is.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Can this tool really bypass detectors like GPTZero?</AccordionTrigger>
                        <AccordionContent>
                        While no tool can guarantee 100% undetectability, our advanced algorithms are specifically designed to rewrite content in a way that is very difficult for current AI detectors to flag.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </main>
      </div>
    </div>
  );
}
