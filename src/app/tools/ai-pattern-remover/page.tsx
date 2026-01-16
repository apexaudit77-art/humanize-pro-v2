'use client';

import { useState } from 'react';
import { Globe, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { HumanizerTab } from "@/components/humanizer-tab";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { LoginModal } from '@/components/login-modal';

export default function AIPatternRemoverPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center bg-transparent text-foreground">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="flex w-full items-center justify-between py-4 md:py-6 border-b border-border/50">
            <Link href={`/`} className="flex items-center gap-3">
              <Image src="/logo-main.png" alt="Humanize AI Logo" width={180} height={45} priority />
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
                      <HumanizerTab 
                          config={{
                              placeholder: "Place your AI-generated text here, and we will work our magic to make it completely human-like.",
                              button: "Humanize Text",
                              loading: "Humanizing...",
                              outputTitle: "Humanized Output",
                              outputPlaceholder: "Your humanized text will appear here.",
                              yourText: "Your Text",
                          }} 
                          setShowLoginModal={setShowLoginModal}
                      />
                  </CardContent>
              </Card>

            </div>
          </main>
        </div>
      </div>
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}
