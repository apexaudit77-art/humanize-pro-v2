
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getPosts } from "@/lib/posts";
import { Separator } from "@/components/ui/separator";

export default async function SitemapPage() {
  const posts = await getPosts();

  const mainPages = [
    { href: "/", title: "Home" },
    { href: "/about", title: "About Us" },
    { href: "/contact", title: "Contact" },
    { href: "/privacy", title: "Privacy Policy" },
    { href: "/terms", title: "Terms of Service" },
    { href: "/pricing", title: "Pricing" },
    { href: "/faq", title: "FAQ" },
    { href: "/blog", title: "Blog" },
  ];
  
  const toolPages = [
    { href: "/en/humanize-ai#humanizer", title: "AI Humanizer" },
    { href: "/en/humanize-ai#article-forge", title: "Article Forge" },
    { href: "/en/humanize-ai#article-formatter", title: "Article Formatter" },
    { href: "/en/humanize-ai#social-media-expert", title: "Social Media Expert" },
    { href: "/en/humanize-ai#document-analyzer", title: "Document Analyzer" },
    { href: "/en/humanize-ai#ai-detector", title: "AI Detector" },
    { href: "/en/humanize-ai#plagiarism-checker", title: "Plagiarism Checker" },
    { href: "/en/humanize-ai#grammar-checker", title: "Grammar Checker" },
    { href: "/en/humanize-ai#seo-suite", title: "SEO Suite" },
    { href: "/en/humanize-ai#citation-generator", title: "Citation Generator" },
    { href: "/en/humanize-ai#ai-translator", title: "AI Translator" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-transparent text-foreground">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="flex w-full items-center justify-between py-4 md:py-6 border-b border-border/50">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-main.png" alt="Humanize AI Logo" width={180} height={45} priority />
          </Link>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </header>

        <main className="flex w-full flex-grow flex-col items-center py-8 md:py-12">
            <div className="w-full max-w-5xl space-y-12">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                        Sitemap
                    </h1>
                     <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
                        An overview of all pages on our website.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold font-headline mb-4">Main Pages</h2>
                        <ul className="space-y-3">
                            {mainPages.map(page => (
                                <li key={page.href}>
                                    <Link href={page.href} className="text-lg text-muted-foreground hover:text-primary transition-colors">{page.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold font-headline mb-4">Our Tools</h2>
                        <ul className="space-y-3">
                            {toolPages.map(page => (
                                <li key={page.href}>
                                    <Link href={page.href} className="text-lg text-muted-foreground hover:text-primary transition-colors">{page.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator />

                <div>
                    <h2 className="text-2xl font-bold font-headline mb-6 text-center md:text-left">Blog Posts</h2>
                    <ul className="space-y-3 columns-1 md:columns-2 lg:columns-3 gap-x-8">
                        {posts.map(post => (
                            <li key={post.slug} className="break-inside-avoid mb-3">
                                <Link href={`/blog/${post.slug}`} className="text-lg text-muted-foreground hover:text-primary transition-colors">{post.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </main>
      </div>
    </div>
  );
}
