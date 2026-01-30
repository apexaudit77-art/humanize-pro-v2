
import { getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-transparent text-foreground">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <header className="flex w-full items-center justify-between py-4 md:py-6 border-b border-border/50">
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/logo-main.png" alt="Humanize AI Logo" width={180} height={45} priority />
                </Link>
                <Button asChild variant="outline">
                    <Link href="/blog">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Blog
                    </Link>
                </Button>
            </header>
            <main className="w-full max-w-4xl mx-auto py-8 md:py-12">
                <article>
                    <header className="mb-8">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-center">
                            {post.title}
                        </h1>
                        <p className="mt-4 text-center text-muted-foreground text-lg">
                            Published on {new Date(post.date).toLocaleDateString()}
                        </p>
                    </header>
                    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                </article>
            </main>
        </div>
    </div>
  );
}
