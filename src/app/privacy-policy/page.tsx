
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function PrivacyPolicy() {
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
                        Privacy Policy
                    </h1>
                    <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h2>Our Commitment to Your Privacy</h2>
                    <p>
                        Welcome to HumanizeAI Pro. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service to <strong>humanize AI text</strong> and <strong>bypass AI detectors</strong>. Your trust is essential to us, and we are committed to being transparent about our data practices.
                    </p>
                    
                    <h2>Information We Collect</h2>
                    <p>
                        When you use our <strong>AI to human converter</strong>, we may collect personal information such as your name and email address when you register. We do not store the text you process. All submitted text is processed in memory and immediately discarded after the humanization process is complete.
                    </p>
                    
                    <h2>How We Use Your Information</h2>
                    <p>
                        The information we collect is used solely to provide and improve our services, process your requests, and communicate with you about our tools. We are constantly working to enhance our ability to <strong>bypass AI detection</strong> and provide you with the best results.
                    </p>

                    <hr className="my-8" />
                    
                    <div dir="rtl" className="text-right">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                            سياسة الخصوصية
                        </h1>
                        <h2>التزامنا بخصوصيتك</h2>
                        <p>
                            مرحبًا بك في HumanizeAI Pro. نحن ملتزمون بحماية خصوصيتك. تشرح سياسة الخصوصية هذه كيف نجمع ونستخدم ونكشف عن معلوماتك عند استخدام خدمتنا <strong>لأنسنة نص الذكاء الاصطناعي</strong> و<strong>تجاوز كواشف الذكاء الاصطناعي</strong>. ثقتك ضرورية لنا، ونحن ملتزمون بالشفافية بشأن ممارسات البيانات لدينا.
                        </p>
                        
                        <h2>المعلومات التي نجمعها</h2>
                        <p>
                            عندما تستخدم <strong>محول AI إلى نص بشري</strong> الخاص بنا، قد نجمع معلومات شخصية مثل اسمك وعنوان بريدك الإلكتروني عند التسجيل. نحن لا نخزن النص الذي تقوم بمعالجته. تتم معالجة جميع النصوص المقدمة في الذاكرة ويتم التخلص منها فورًا بعد اكتمال عملية الأنسنة.
                        </p>
                        
                        <h2>كيف نستخدم معلوماتك</h2>
                        <p>
                             المعلومات التي نجمعها تستخدم فقط لتوفير وتحسين خدماتنا، ومعالجة طلباتك، والتواصل معك بشأن أدواتنا. نعمل باستمرار على تعزيز قدرتنا على <strong>تجاوز كشف الذكاء الاصطناعي</strong> وتقديم أفضل النتائج لك.
                        </p>
                    </div>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
