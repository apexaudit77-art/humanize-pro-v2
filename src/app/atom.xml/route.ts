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
  const lastBuildDate = new Date().toISOString();

  const atomItems = posts
    .map((post) => {
      // Use a valid, consistent date format to avoid "Invalid time value" errors.
      const postDate = new Date(post.date).toISOString();
      
      return `
        <entry>
          <title>${escapeXml(post.title)}</title>
          <link href="${URL}/blog/${post.slug}"/>
          <id>${URL}/blog/${post.slug}</id>
          <updated>${postDate}</updated>
          <summary>${escapeXml(post.excerpt)}</summary>
        </entry>
      `;
    })
    .join('');

  const atom = `<?xml version="1.0" encoding="UTF-8" ?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>HumanizeAI Pro Blog</title>
  <link href="${URL}/atom.xml" rel="self"/>
  <link href="${URL}"/>
  <updated>${lastBuildDate}</updated>
  <id>${URL}/</id>
  <author>
    <name>HumanizeAI Pro</name>
  </author>
  ${atomItems}
</feed>`;

  return new Response(atom, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
