
import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { NewsletterForm } from "@/components/newsletter-form";

export default async function Blog() {
  const posts = await getPosts();

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
        <main className="w-full max-w-4xl mx-auto py-8 md:py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              Our Blog
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Tips, tricks, and updates on AI content and SEO.
            </p>
          </div>
          <div className="grid gap-12">
            {posts.map((post, index) => (
              <article key={post.slug} className="group relative grid md:grid-cols-3 gap-6 items-center">
                 <div className="md:col-span-1">
                    <Link href={`/blog/${post.slug}`}>
                        <Image 
                            src={`https://source.unsplash.com/800x600/?artificial-intelligence,technology&sig=${index}`}
                            alt={post.title}
                            width={800}
                            height={600}
                            className="object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                        />
                    </Link>
                 </div>
                 <div className="md:col-span-2">
                    <div className="mb-2">
                      <p className="text-sm text-muted-foreground">
                        {new Date(post.date).toLocaleDateString()}
                      </p>
                    </div>
                    <h3 className="text-2xl font-bold font-headline mb-2">
                       <Link href={`/blog/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground">{post.excerpt}</p>
                 </div>
              </article>
            ))}
          </div>
           <div className="mt-16">
            <NewsletterForm />
          </div>
        </main>
      </div>
    </div>
  );
}
