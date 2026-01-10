import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function PrivacyPolicy() {
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
                        Privacy Policy
                    </h2>
                    <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p>
                        Welcome to HumanizeAI Pro. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                    </p>
                    <h3>Information We Collect</h3>
                    <p>
                        We may collect personal information from you such as your name, email address, and payment information when you register for our services or make a purchase. We also collect non-personal information, such as browser type, operating system, and website usage data.
                    </p>
                    <h3>How We Use Your Information</h3>
                    <p>
                        We use the information we collect to provide, maintain, and improve our services, to process transactions, to send you technical notices, updates, security alerts, and support and administrative messages, and to communicate with you about products, services, offers, promotions, and events.
                    </p>
                     <h3>Third-Party Advertisers</h3>
                    <p>
                        We may use third-party advertising companies to serve ads when you visit the website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you. If you would like more information about this practice and to know your choices about not having this information used by these companies, see the Network Advertising Initiative's consumer website.
                    </p>
                    <p>
                        Specifically, Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our sites and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy.
                    </p>
                    <h3>Sharing Your Information</h3>
                    <p>
                        We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
                    </p>
                    <h3>Security of Your Information</h3>
                    <p>
                        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                    </p>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
