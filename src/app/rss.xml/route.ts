import { getPosts } from '@/lib/posts';

const URL = 'https://humanize-ai.ooguy.com';

// Function to escape XML special characters
function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
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
  const lastBuildDate = new Date().toUTCString();

  const rssItems = posts
    .map((post) => {
      // Use a valid, consistent date format to avoid "Invalid time value" errors.
      const postDate = new Date(post.date).toUTCString();
      
      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${URL}/blog/${post.slug}</link>
          <guid>${URL}/blog/${post.slug}</guid>
          <pubDate>${postDate}</pubDate>
          <description>${escapeXml(post.excerpt)}</description>
        </item>
      `;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HumanizeAI Pro Blog</title>
    <link>${URL}</link>
    <description>Tips, tricks, and updates on AI content and SEO.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
