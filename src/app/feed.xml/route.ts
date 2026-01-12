import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://humanize-ai.ooguy.com';
  
  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Humanize AI Pro</title>
      <link>${baseUrl}</link>
      <description>The best AI to human converter</description>
      <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
      <item>
        <title>Welcome to Humanize AI Pro</title>
        <link>${baseUrl}</link>
        <description>Start humanizing your AI content today.</description>
        <pubDate>${new Date().toUTCString()}</pubDate>
      </item>
    </channel>
  </rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
