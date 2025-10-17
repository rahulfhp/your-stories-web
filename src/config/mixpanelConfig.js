import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel with your project token
// Replace 'YOUR_MIXPANEL_TOKEN' with your actual Mixpanel token
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

// Only initialize in browser environment and if not already initialized
if (typeof window !== 'undefined' && !mixpanel.__loaded) {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV !== 'production',
    track_pageview: false,
    persistence: 'localStorage',
    api_host: 'https://api.mixpanel.com',
  });
}

export default mixpanel;