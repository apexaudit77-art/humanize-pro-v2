// This forces the page to be statically generated at build time.
export const dynamic = 'force-static';

// This component returns a plain text response that mimics an RSS feed structure.
// NOTE: This is NOT a valid XML file, but a plain text representation for debugging purposes.
// For a real feed, a Route Handler (e.g., /app/rss.xml/route.ts) is the correct approach.
export default function FeedPage() {
  const rssString = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Humanize AI Pro Blog</title>
  <link>https://humanize-ai.ooguy.com</link>
  <description>This is a static feed for discovery purposes.</description>
  <item>
    <title>Welcome to Our Blog</title>
    <link>https://humanize-ai.ooguy.com/blog/first-post</link>
    <description>This is the first post on our brand new blog.</description>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <guid>https://humanize-ai.ooguy.com/blog/first-post</guid>
  </item>
</channel>
</rss>`;

  return (
    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontFamily: 'monospace' }}>
      {rssString}
    </pre>
  );
}
