import SidebarClient from '@/components/ui/sidebar-client';
import ar from '@/lib/i18n/ar.json';
import en from '@/lib/i18n/en.json';
import es from '@/lib/i18n/es.json';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import type { Metadata } from 'next';

const locales: Record<string, any> = { ar, en, es };

type Props = { 
  params: { lang: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> { 
    const lang = params.lang;
    const config = locales[lang] || en;
    
    return {
        title: config.metadata?.title || 'Humanize AI Tools',
        description: config.metadata?.description || 'A suite of AI tools to humanize text.',
    };
}

export default function Page({ params }: Props) { 
  const lang = params.lang;
  
  const config = locales[lang];

  if (!config) { 
    notFound(); 
  }

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return ( 
    <> 
      <SidebarClient lang={lang} dir={dir} config={config} />
      <Script
        id="reader-revenue-manager-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
            __html: `
            (self.SWG_BASIC = self.SWG_BASIC || []).push(basicSubscriptions => {
                basicSubscriptions.init({
                  type: "NewsArticle",
                  isAccessibleForFree: true,
                  isPartOfType: ["Product"],
                  isPartOfProductId: "CAowqaUKEwiS04n3p5WGAxXZ37QBHQoMDqg:openaccess",
                  autoPromptType: "contribution",
                  clientOptions: {
                    lang: "${lang}",
                  },
                });
              });
            `,
        }}
       />
       <Script src="https://news.google.com/swg/js/v1/swg-basic.js" strategy="afterInteractive" async />
    </>
  );
}

export async function generateStaticParams() { 
  return [{ lang: 'en' }, { lang: 'ar' }, { lang: 'es' }]; 
}
