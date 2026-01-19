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
    default: 'Humanize AI Pro | تحويل نص الذكاء الاصطناعي إلى نص بشري',
    template: '%s | Humanize AI Pro'
  },
  description: 'أفضل أداة مجانية لتحويل نصوص الذكاء الاصطناعي (ChatGPT, Gemini) إلى نصوص بشرية بنسبة 100% لتجاوز أدوات كشف المحتوى وتحسين ترتيبك في جوجل.',
  keywords: [
    'Humanize AI',
    'تحويل نص الذكاء الاصطناعي',
    'تخطي كاشف الذكاء الاصطناعي',
    'AI to Human Text Converter',
    'Bypass AI Detection',
    'إعادة صياغة النصوص'
  ],
  authors: [{ name: 'Humanize AI Pro' }],
  creator: 'Humanize AI Pro',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Humanize AI Pro - اجعل نصوصك تبدو كأنها كُتبت بواسطة بشر',
    description: 'حوّل نصوص AI إلى محتوى إبداعي بشري بضغطة زر واحدة.',
    url: 'https://humanize-ai.ooguy.com',
    siteName: 'Humanize AI Pro',
    locale: 'ar_SA',
    type: 'website',
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
