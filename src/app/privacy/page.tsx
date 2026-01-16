
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function PrivacyPage() {
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
                        Privacy Policy
                    </h1>
                    <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h2>Our Commitment to Privacy</h2>
                    <p>
                       This policy explains how we handle your information when you use our <strong>AI to human converter</strong>. We do not store or sell your data. Your privacy is our priority as you <strong>humanize AI text</strong> and <strong>bypass AI detectors</strong>. Our commitment to <strong>data protection</strong> means we do not retain any text submitted for <strong>AI text processing</strong>.
                    </p>
                    
                    <hr className="my-8" />
                    
                    <div dir="rtl" className="text-right">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                            سياسة الخصوصية
                        </h1>
                        <h2>التزامنا بالخصوصية</h2>
                        <p>
                            تشرح هذه السياسة كيف نتعامل مع معلوماتك عند استخدام <strong>محول AI إلى نص بشري</strong> الخاص بنا. نحن لا نخزن أو نبيع بياناتك. خصوصيتك هي أولويتنا أثناء <strong>أنسنة نص الذكاء الاصطناعي</strong> و<strong>تجاوز كواشف الذكاء الاصطناعي</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
