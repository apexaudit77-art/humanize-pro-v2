
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ContactPage() {
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
            <div className="w-full max-w-3xl space-y-8 text-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                        Contact Us
                    </h1>
                     <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
                        Have questions about our AI to human converter? We'd love to hear from you.
                    </p>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
                    <p>
                        For any questions, feedback, or inquiries about how to <strong>humanize AI text</strong> or <strong>bypass AI detectors</strong>, please feel free to reach out. Our team is here to help you get the most out of our <strong>AI to human converter</strong>.
                    </p>
                    <p>
                        Email us at: <a href="mailto:support@humanizeaipro.com" className="text-primary hover:underline">support@humanizeaipro.com</a>
                    </p>

                    <hr className="my-8" />
                    
                    <div dir="rtl" className="text-right">
                         <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                            اتصل بنا
                        </h1>
                        <p>
                           لديك أي أسئلة أو ملاحظات حول كيفية <strong>أنسنة نص الذكاء الاصطناعي</strong> أو <strong>تجاوز كواشف الذكاء الاصطناعي</strong>، لا تتردد في التواصل معنا.
                        </p>
                        <p>
                           راسلنا عبر البريد الإلكتروني: <a href="mailto:support@humanizeaipro.com" className="text-primary hover:underline">support@humanizeaipro.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
