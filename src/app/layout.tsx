import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import Link from 'next/link';
import { FirebaseClientProvider } from '@/firebase';
import { BackgroundOrbs } from '@/components/background-orbs';
import Image from 'next/image';
import { PageLoader } from '@/components/page-loader';

export const metadata: Metadata = {
  title: 'Humanize AI Text Free | Bypass AI Detector & AI to Human Converter',
  description: 'The best AI to human converter to humanize AI text free and bypass AI detectors like Turnitin & GPTZero. Get undetectable AI content with our free AI humanizer. أفضل أداة تحويل نص الذكاء الاصطناعي إلى نص بشري عربي.',
  keywords: [
    "humanize ai text", "bypass ai detector", "ai to human converter", "undetectable ai",
    "ai humanizer", "bypass turnitin", "gptzero", "zerogpt", "ai writer", "stealth writer",
    "humanize ai text free", "humanize ai text free عربي", "humanize a ai text free online",
    "humanize ai text arabic", "humanize ai text عربي", "humanize ai text free online unlimited",
    "humanize ai text tool", "humanize ai text free arabic", "humanize ai text org",
    "bypass ai detector", "bypass ai detector free", "bypass ai detection tool free",
    "bypass ai detectors and humanize text", "bypass ai detector humanize",
    "bypass ai detector and humanize text free", "bypass ai detection prompt",
    "bypass ai detection chatgpt", "bypass ai detector chatgpt", "Bypass Al detection",
    "HIX Bypass", "AI to human converter", "ai to human converter.com", "ai to human converter free",
    "ai to human converter text", "ai to human converter free online", "ai to human converter tool",
    "ai to human converter pdf", "ai to human converter text free",
    "ai to human converter without changing text", "ai to human converter best",
    "SEO keyword generator", "seo keyword generator free", "seo keyword generator ai",
    "seo keyword generator for youtube", "seo keyword generator for instagram",
    "seo keyword generator tools", "seo keyword generator google", "seo keyword generator from url",
    "ai seo keyword generator free", "etsy seo keyword generator", "is AI text detectable",
    "Is Al text detectable", "is ai text detectable reddit", "is al generated text detectable",
    "is humanize ai text detectable", "how to bypass zero chatgpt",
    "how to bypass zero thickness geometry in solidworks", "how to bypass zerohedge paywall",
    "how to bypass zero trust", "how to bypass chat gpt zero",
    "how to bypass region flipper zero", "how to bypass chatgpt zero reddit",
    "how to bypass chat zero", "dogs into humans ai",
    "grubby ai humanizer", "quillbot's ai humanizer", "best free ai humanizer", "scribbr",
    "ai humanizer free", "ai writer", "stealth", "turnitin ai detector",
    "how to bypass turnitin", "is gptzero accurate", "تحويل AI إلى نص بشري"
  ],
  openGraph: {
    title: 'HumanizeAI Pro - Humanize AI Text & Bypass AI Detection',
    description: 'Convert AI text to human-like content and bypass all major AI detectors for free.',
    images: ['/assets/logo-main.png'],
  },
};

// التعديل هنا: إضافة async وتحويل params إلى Promise
export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang?: string }>;
}) {
  // انتظار استلام الـ params
  const { lang = 'en' } = await props.params;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Humanize AI Pro',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Windows, MacOS, Android, iOS',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '8864',
    },
  };

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/logo-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;700&family=Tajawal:wght@400;700&family=Space+Grotesk:wght@400;700&family=Inter:wght@400;600&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn('font-body antialiased', 'min-h-screen bg-background flex flex-col')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <PageLoader />
            <BackgroundOrbs />
            <div className="relative z-10 flex-grow">
              {props.children}
            </div>
            <footer className="w-full py-8 text-muted-foreground text-sm border-t border-border/10 mt-12 bg-background/50 backdrop-blur-sm">
              <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="space-y-4 col-span-2 md:col-span-1">
                      <Link href="/" className="flex items-center gap-2 text-foreground font-bold text-lg">
                         <Image src="/assets/logo-icon.png" alt="Humanize AI Logo" width={40} height={40} className="rounded-md"/>
                         HumanizeAI Pro
                      </Link>
                    <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} HumanizeAI Pro. All rights reserved.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Legal</h4>
                    <ul className="space-y-2">
                      <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                      <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Company</h4>
                    <ul className="space-y-2">
                      <li><Link href="/about-us" className="hover:text-primary transition-colors">About Us</Link></li>
                      <li><Link href="/contact-us" className="hover:text-primary transition-colors">Contact Us</Link></li>
                      <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Resources</h4>
                    <ul className="space-y-2">
                      <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                      <li><Link href="/tools/ai-pattern-remover" className="hover:text-primary transition-colors">AI Pattern Remover</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </footer>
            <Toaster />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
