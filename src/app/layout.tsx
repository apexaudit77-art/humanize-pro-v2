import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { BackgroundOrbs } from '@/components/background-orbs';
import { PageLoader } from '@/components/page-loader';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://humanize-ai.ooguy.com'),
  title: {
    default: 'Humanize AI Pro | محول نص الذكاء الاصطناعي إلى نص بشري 100%',
    template: '%s | Humanize AI Pro'
  },
  description: 'أفضل أداة لـ Humanize AI وتخطّي كواشف المحتوى مثل GPTZero و Originality. حوّل نصوص ChatGPT إلى نصوص بشرية غير قابلة للكشف مجاناً.',
  keywords: [
    'Humanize AI', 'Bypass AI Detection', 'AI to Human Converter', 
    'Undetectable AI', 'تحويل نص الذكاء الاصطناعي', 'تخطي كاشف AI', 
    'إعادة صياغة النصوص بشرياً', 'ChatGPT to Human Text'
  ],
  authors: [{ name: 'Humanize AI Pro' }],
  creator: 'Humanize AI Pro',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://humanize-ai.ooguy.com',
  },
  openGraph: {
    title: 'Humanize AI | منصتك الشاملة لأدوات الذكاء الاصطناعي',
    description: '11 أداة احترافية لتحويل النصوص، كتابة المقالات، وفحص الانتحال في مكان واحد.',
    url: 'https://humanize-ai.ooguy.com',
    siteName: 'Humanize AI Pro',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Humanize AI Pro Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
   twitter: {
    card: 'summary_large_image',
    title: 'Humanize AI - 11 Professional AI Tools',
    description: 'The ultimate AI suite for writers: Humanizer, SEO tools, Detectors, and more.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'fY3wxYACZTx5QkIdxdtu91H32nLFmCVeqwFWc0-jwBc',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <Script 
          src='https://www.googletagmanager.com/gtag/js?id=G-FR6P8X409N' 
          strategy='beforeInteractive' 
        />
        <Script id='google-analytics' strategy='beforeInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FR6P8X409N');
          `}
        </Script>
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          inter.variable,
          spaceGrotesk.variable
        )}
      >
        <FirebaseClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <BackgroundOrbs />
            <PageLoader />
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
