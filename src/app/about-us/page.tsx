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
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                        About Us
                    </h2>
                     <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
                        We are passionate about making AI content feel more human.
                    </p>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p>
                        HumanizeAI Pro was founded with the mission to bridge the gap between artificial intelligence and human expression. Our tools are designed for content creators, marketers, and writers who want to produce high-quality, authentic content that resonates with their audience while leveraging the power of AI.
                    </p>
                    <p>
                        Our team consists of experts in AI, natural language processing, and user experience. We believe in the power of technology to augment human creativity, not replace it. We are committed to continuous improvement and innovation to provide you with the best tools to bypass AI detection and enhance your content.
                    </p>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
