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
  metadataBase: new URL('https://www.humanize-ai.ooguy.com'),
  title: {
    default: 'Humanize AI Pro | محول نص الذكاء الاصطناعي إلى بشري وتخطي الكواشف',
    template: '%s | Humanize AI Pro'
  },
  description: 'أفضل أداة مجانية لتحويل نصوص AI إلى محتوى بشري 100% وتجاوز GPTZero و Turnitin.',
  keywords: ['Humanize AI', 'Bypass AI Detection', 'AI to Human Converter', 'تحويل نص AI'],
  authors: [{ name: 'Humanize AI Pro' }],
  creator: 'Humanize AI Pro',
  icons: {
    icon: '/favicon.ico?v=1',
  },
  alternates: {
    canonical: 'https://www.humanize-ai.ooguy.com/',
  },
  openGraph: {
    title: 'Humanize AI Pro - اجعل نصوصك بشرية وتخطى الكواشف',
    description: 'الأداة رقم #1 لتحويل محتوى AI إلى محتوى بشري إبداعي.',
    url: 'https://www.humanize-ai.ooguy.com',
    siteName: 'Humanize AI Pro',
    locale: 'ar_SA',
    type: 'website',
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
