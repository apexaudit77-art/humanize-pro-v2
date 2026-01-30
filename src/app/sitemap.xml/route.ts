import { getPosts } from '@/lib/posts';
import type { MetadataRoute } from 'next';

async function generateSitemapItems(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://humanize-ai.ooguy.com';

  const posts = await getPosts();
  const postUrls = posts.map((post) => {
    const date = post.date ? new Date(post.date) : new Date();
    return {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: !isNaN(date.getTime()) ? date : new Date(),
    }
  });

  const staticRoutes = [
    '', // Home
    '/about',
    '/blog',
    '/contact',
    '/faq',
    '/login',
    '/pricing',
    '/privacy',
    '/signup',
    '/sitemap-overview', // HTML sitemap page
    '/terms',
    '/tools/ai-pattern-remover',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const langRoutes = ['en', 'ar', 'es'].map((lang) => ({
    url: `${baseUrl}/${lang}/humanize-ai`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...langRoutes, ...postUrls];
}

export async function GET() {
  const items = await generateSitemapItems();

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${items
      .map((item) => {
        const lastModString = (item.lastModified ?? new Date()).toISOString();
        return `
    <url>
        <loc>${item.url}</loc>
        <lastmod>${lastModString}</lastmod>
    </url>
    `;
      })
      .join('')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
