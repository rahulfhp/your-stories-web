import mixpanel from "mixpanel-browser";

// Only initialize in browser environment and if not already initialized
if (typeof window !== "undefined" && !mixpanel.__loaded) {
  const hostname = window.location.hostname;

  // Domains mapping
  const APP_DOMAINS = ["stories.yourhourapp.com"];
  const WEBSITE_DOMAINS = [
    "demo.yourhourapp.com",
    "yourhourapp.com",
    "www.yourhourapp.com",
  ];

  const isLocalhost =
    hostname === "localhost" || hostname.startsWith("127.0.0.1");
  const isAppDomain = APP_DOMAINS.includes(hostname);
  const isWebsiteDomain = WEBSITE_DOMAINS.includes(hostname);

  // Choose token based on domain, with sensible fallbacks
  let token = "";
  if (isAppDomain) {
    token = process.env.NEXT_PUBLIC_MIXPANEL_APP_TOKEN || "";
  } else if (isWebsiteDomain) {
    token = process.env.NEXT_PUBLIC_MIXPANEL_WEBSITE_TOKEN || "";
  } else if (isLocalhost) {
    // For localhost, default set empty
    token = "";
  }

  if (!token) {
    // If no token available, skip initialization to avoid errors
    console.warn("Mixpanel token not set for domain:", hostname);
  } else {
    mixpanel.init(token, {
      debug: process.env.NODE_ENV !== "production",
      track_pageview: false,
      persistence: "localStorage",
      api_host: "https://api.mixpanel.com",
    });
  }
}

export default mixpanel;
