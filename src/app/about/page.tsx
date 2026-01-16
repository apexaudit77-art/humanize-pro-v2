
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AboutPage() {
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
                        About HumanizeAI Pro
                    </h1>
                     <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
                        Your trusted partner to humanize AI text and bypass AI detectors.
                    </p>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    
                    <h2>Our Mission</h2>
                    <p>
                        At HumanizeAI Pro, our mission is to empower content creators, students, and professionals by providing a cutting-edge <strong>AI to human text converter</strong>. We aim to bridge the gap between AI-generated content and authentic human expression, helping you <strong>bypass AI detectors</strong> like Turnitin and GPTZero with confidence. Our goal is to make your content undetectable and genuinely engaging.
                    </p>

                    <hr className="my-8" />

                    <div dir="rtl" className="text-right">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                            عن HumanizeAI Pro
                        </h1>
                        <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
                           شريكك الموثوق لتحويل نص الذكاء الاصطناعي إلى نص بشري وتجاوز كواشف الذكاء الاصطناعي.
                        </p>
                        <h2>مهمتنا</h2>
                        <p>
                            في HumanizeAI Pro، تتمثل مهمتنا في تمكين منشئي المحتوى والطلاب والمحترفين من خلال توفير <strong>محول نص AI إلى نص بشري</strong> متطور. نهدف إلى سد الفجوة بين المحتوى الذي تم إنشاؤه بواسطة الذكاء الاصطناعي والتعبير البشري الأصيل، مما يساعدك على <strong>تجاوز كواشف الذكاء الاصطناعي</strong> مثل Turnitin و GPTZero بثقة. هدفنا هو جعل المحتوى الخاص بك غير قابل للكشف وجذابًا حقًا.
                        </p>
                    </div>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
