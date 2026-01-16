
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function TermsOfService() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-transparent text-foreground">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="flex w-full items-center justify-between py-4 md:py-6 border-b border-border/50">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-main.png" alt="Humanize AI Logo" width={180} height={45} priority />
          </Link>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </header>

        <main className="flex w-full flex-grow flex-col items-center py-8 md:py-12">
            <div className="w-full max-w-3xl space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                        Terms of Service
                    </h1>
                     <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By using HumanizeAI Pro, you agree to this <strong>User Agreement</strong>. Our service provides a powerful <strong>AI to human converter</strong> designed to help you <strong>humanize AI text</strong>. These terms govern your use of our tools to <strong>bypass AI detectors</strong>, including our policies on <strong>AI text processing</strong>. You agree not to use the service for any illegal or unauthorized purpose.
                    </p>
                    <h2>2. Use of Service</h2>
                    <p>
                        Our service is intended to assist writers in creating high-quality, authentic content. You are responsible for the final content you produce. While our tool is designed to <strong>bypass AI detection</strong>, we do not guarantee that all content will be 100% undetectable in all current or future scenarios.
                    </p>

                    <hr className="my-8" />
                    
                    <div dir="rtl" className="text-right">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                            شروط الخدمة
                        </h1>
                        <h2>1. قبول الشروط</h2>
                        <p>
                            باستخدامك لـ HumanizeAI Pro، فإنك توافق على هذه الشروط. توفر خدمتنا <strong>محول AI إلى نص بشري</strong> قوي لمساعدتك على <strong>أنسنة نص الذكاء الاصطناعي</strong>. تحكم هذه الشروط استخدامك لأدواتنا <strong>لتجاوز كواشف الذكاء الاصطناعي</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
