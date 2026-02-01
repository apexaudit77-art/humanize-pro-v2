// استيراد المكونات اللازمة
import Script from 'next/script';

// تعريف النوع ليتوافق 100% مع Next.js 15
interface PageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page(props: PageProps) {
  // انتظار الـ params والـ searchParams (إلزامي في Next.js 15)
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  const lang = params.lang;

  return (
    <>
      {/* كود صفحتك هنا */}
      <h1>Humanize AI - {lang}</h1>
      
      {/* تأكد من استخدام مكون Script الصحيح لمزامنة جوجل */}
      <Script id="google-sync" strategy="afterInteractive">
        {`console.log('Google Sync Active');`}
      </Script>
    </>
  );
}
