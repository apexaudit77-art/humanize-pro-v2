
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { BackgroundOrbs } from '@/components/background-orbs';
import { PageLoader } from '@/components/page-loader';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'HumanizeAI Pro',
  description: 'Bypass AI Detection & Humanize AI Text',
  verification: {
    google: ['EwoaFJ3i8-R_j8ypafDpHst3QL1Rmk-J4xoKnh-pyYQ', 'xWQvbaslX0JKKhTCPf1bDdazgW34ObNxU11P0SqKDIc'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const firebaseConfig = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K3RHZ8XC');`,
          }}
        />
        <script async type="application/javascript"
        src="https://news.google.com/swg/js/v1/swg-basic.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (self.SWG_BASIC = self.SWG_BASIC || []).push( basicSubscriptions => {
                basicSubscriptions.init({
                  type: "NewsArticle",
                  isPartOfType: ["Product"],
                  isPartOfProductId: "CAow2IHFDA:openaccess",
                  clientOptions: { theme: "light", lang: "en" },
                });
              });
            `,
          }}
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          inter.variable,
          spaceGrotesk.variable
        )}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K3RHZ8XC"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <FirebaseClientProvider config={firebaseConfig}>
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
