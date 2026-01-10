import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ContactUs() {
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
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                        Contact Us
                    </h2>
                     <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
                        We'd love to hear from you.
                    </p>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
                    <p>
                        If you have any questions, feedback, or inquiries, please feel free to reach out to us. Our team is here to help.
                    </p>
                    <p>
                        You can email us at: <a href="mailto:support@humanizeaipro.com" className="text-primary hover:underline">support@humanizeaipro.com</a>
                    </p>
                     <p>
                        We strive to respond to all inquiries within 24-48 hours.
                    </p>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
