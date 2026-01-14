import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Currently, the app is fully public. 
  // This file is set up to easily add protected routes in the future.
  // For now, we just proceed with the request.
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - assets (our own asset files in /public)
     * - favicon.ico (favicon file)
     * - sitemap.xml, robots.txt, rss.xml, atom.xml (SEO files)
     * - blog/ (blog posts are public)
     * - login, signup (auth pages)
     * - about, contact, privacy, terms, pricing, faq (static info pages)
     */
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sitemap.xml|robots.txt|rss.xml|atom.xml|blog|login|signup|about|contact|privacy|terms|terms-of-service|pricing|faq|tools).*)',
  ],
}
