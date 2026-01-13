
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AboutUs() {
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
                        About HumanizeAI Pro
                    </h1>
                     <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
                        Your trusted partner to humanize AI text and bypass AI detectors.
                    </p>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    
                    <h2>Our Mission</h2>
                    <p>
                        At HumanizeAI Pro, we are dedicated to bridging the gap between artificial intelligence and authentic human expression. In a world saturated with AI-generated content, our mission is to empower writers, students, and marketers to produce content that is not only undetectable but also genuinely engaging. We provide a leading <strong>AI to human converter</strong> that helps you <strong>bypass AI detectors</strong> like Turnitin, GPTZero, and others with confidence.
                    </p>

                    <h2>Why We Created This Tool</h2>
                    <p>
                        We noticed a growing need for a reliable way to <strong>humanize AI text</strong>. Many tools simply spin content, but our advanced algorithms analyze and rewrite text to introduce natural "perplexity" and "burstiness," making it indistinguishable from human writing. Whether you need to <strong>bypass AI detection</strong> for academic submissions or improve your SEO content, our tool is the perfect solution.
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
                            في HumanizeAI Pro، نكرس جهودنا لسد الفجوة بين الذكاء الاصطناعي والتعبير البشري الأصيل. في عالم مشبع بالمحتوى الذي تم إنشاؤه بواسطة الذكاء الاصطناعي، تتمثل مهمتنا في تمكين الكتاب والطلاب والمسوقين من إنتاج محتوى لا يمكن اكتشافه فحسب، بل يكون جذابًا أيضًا. نحن نقدم <strong>محول AI إلى نص بشري</strong> رائد يساعدك على <strong>تجاوز كواشف الذكاء الاصطناعي</strong> مثل Turnitin و GPTZero وغيرها بثقة.
                        </p>

                        <h2>لماذا أنشأنا هذه الأداة</h2>
                        <p>
                           لاحظنا حاجة متزايدة إلى طريقة موثوقة <strong>لأنسنة نص الذكاء الاصطناعي</strong>. العديد من الأدوات تقوم فقط بإعادة صياغة المحتوى، لكن خوارزمياتنا المتقدمة تحلل النص وتعيد كتابته لإضفاء "الحيرة" و "التدفق" الطبيعي، مما يجعله لا يمكن تمييزه عن الكتابة البشرية. سواء كنت بحاجة إلى <strong>تجاوز كشف الذكاء الاصطناعي</strong> للأعمال الأكاديمية أو تحسين محتوى SEO الخاص بك، فإن أداتنا هي الحل الأمثل.
                        </p>
                    </div>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
