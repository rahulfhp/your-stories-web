import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Domain-based Routing Middleware
 * 
 * This middleware routes users based on the domain they're accessing:
 * - stories.yourhourapp.com: Shows app pages (/, /bookmarked, /profile, /read, /search, /write)
 * - demo.yourhourapp.com: Shows marketing/info pages (/home, /about, /contact, /privacy, /terms)
 * - yourhourapp.com (future): Shows marketing/info pages
 * 
 * Current setup for testing:
 * - demo.yourhourapp.com → marketing pages
 * - stories.yourhourapp.com → app pages
 */

// Define which pages should be accessible on subdomain vs main domain
const SUBDOMAIN_PAGES = [
  '/',
  '/bookmarked',
  '/profile',
  '/read',
  '/search',
  '/write',
];

const MAIN_DOMAIN_PAGES = [
  '/home',
  '/about',
  '/contact',
  '/privacy',
];

// Domains that serve app pages (subdomain)
const APP_DOMAINS = ['stories.yourhourapp.com'];

// Domains that serve marketing pages (main domain equivalent)
const MARKETING_DOMAINS = ['demo.yourhourapp.com', 'yourhourapp.com', 'www.yourhourapp.com'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  
  // Extract the domain (remove port if present)
  const domain = hostname.split(':')[0];
  
  // For localhost, allow both (for development)
  const isLocalhost = domain === 'localhost' || domain.startsWith('localhost:') || domain.startsWith('127.0.0.1');
  
  // Check if it's an app domain (stories subdomain)
  const isAppDomain = !isLocalhost && APP_DOMAINS.some(appDomain => domain === appDomain);
  
  // Check if it's a marketing domain (demo subdomain or main domain)
  const isMarketingDomain = !isLocalhost && MARKETING_DOMAINS.some(marketingDomain => domain === marketingDomain);

  // Handle root path "/" - redirect marketing domain to /home
  if (isMarketingDomain && pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // If accessing app pages on marketing domain, redirect
  if (isMarketingDomain) {
    const isAppPage = SUBDOMAIN_PAGES.some(page => 
      pathname === page || pathname.startsWith(page + '/')
    );
    
    if (isAppPage && pathname !== '/') {
      // Redirect to marketing home page
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }

  // If accessing marketing pages on app domain, redirect
  if (isAppDomain) {
    const isMarketingPage = MAIN_DOMAIN_PAGES.some(page => 
      pathname === page || pathname.startsWith(page + '/')
    );
    
    if (isMarketingPage) {
      // Redirect to app home
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes should be processed by middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

