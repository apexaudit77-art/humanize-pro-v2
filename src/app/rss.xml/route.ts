import { getPosts } from '@/lib/posts';
import { NextResponse } from 'next/server';

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function GET() {
  const posts = await getPosts();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://humanize-ai.ooguy.com';
  
  const rssItems = posts
    .map(post => {
      const postUrl = `${baseUrl}/blog/${post.slug}`;
      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${postUrl}</link>
          <description>${escapeXml(post.excerpt)}</description>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <guid isPermaLink="true">${postUrl}</guid>
        </item>
      `;
    })
    .join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Humanize AI Pro Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Tips, tricks, and updates on AI content and SEO from Humanize AI Pro.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
