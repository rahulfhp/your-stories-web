/**
 * Utility functions to detect domain type
 */

// Domains that serve app pages
const APP_DOMAINS = ['stories.yourhourapp.com'];

// Domains that serve website pages
const WEBSITE_DOMAINS = ['demo.yourhourapp.com', 'yourhourapp.com', 'www.yourhourapp.com'];

export function isAppDomain(): boolean {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  return APP_DOMAINS.some(domain => hostname === domain);
}

export function isWebsiteDomain(): boolean {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  return WEBSITE_DOMAINS.some(domain => hostname === domain);
}

export function getDomainType(): 'app' | 'website' | 'localhost' {
  if (typeof window === 'undefined') return 'localhost';
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname.startsWith('localhost:') || hostname.startsWith('127.0.0.1')) {
    return 'localhost';
  }
  
  if (APP_DOMAINS.some(domain => hostname === domain)) {
    return 'app';
  }
  
  if (WEBSITE_DOMAINS.some(domain => hostname === domain)) {
    return 'website';
  }
  
  // Default to app for unknown domains
  return 'app';
}

