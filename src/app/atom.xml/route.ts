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
  const feedUrl = `${baseUrl}/atom.xml`;
  const blogUrl = `${baseUrl}/blog`;
  const lastUpdated = new Date().toISOString();

  const atomItems = posts
    .map(post => {
      const postUrl = `${baseUrl}/blog/${post.slug}`;
      return `
        <entry>
          <title>${escapeXml(post.title)}</title>
          <link href="${postUrl}" />
          <id>${postUrl}</id>
          <updated>${lastUpdated}</updated>
          <summary>${escapeXml(post.excerpt)}</summary>
          <author>
            <name>HumanizeAI Pro</name>
          </author>
        </entry>
      `;
    })
    .join('');

  const atomFeed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Humanize AI Pro Blog</title>
  <subtitle>Tips, tricks, and updates on AI content and SEO from Humanize AI Pro.</subtitle>
  <link href="${feedUrl}" rel="self" />
  <link href="${blogUrl}" />
  <id>${feedUrl}</id>
  <updated>${lastUpdated}</updated>
  <author>
    <name>HumanizeAI Pro</name>
  </author>
  ${atomItems}
</feed>`;

  return new NextResponse(atomFeed, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
