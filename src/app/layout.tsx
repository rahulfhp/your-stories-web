import { Geist, Geist_Mono, Montserrat, Lobster } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { getDomainTypeByHost } from "@/lib/domainUtils";
import StructuredDataSchema from "@/components/SEOSchema";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: ["400"],
});

// Dynamic Metadata for the (favicon + title) based on the domain
export async function generateMetadata(): Promise<Metadata> {
  const h = headers();
  const host = (await h).get("x-forwarded-host") || (await h).get("host") || "";

  const domainType = getDomainTypeByHost(host);
  const isWebsite = domainType === "website";

  // Decide favicon path
  const iconPath = isWebsite
    ? "/yourhour-website-img/website-favicon.png"
    : "/stories-favicon.ico";

  // Decide apple touch icon (PNG preferred)
  const appleIconPath = "/yourhour-website-img/website-favicon.png";

  // Metadata base for canonical URLs
  const metadataBase = new URL(
    isWebsite
      ? "https://www.yourhourapp.com"
      : "https://stories.yourhourapp.com"
  );

  return {
    title: {
      default: isWebsite
        ? "YourHour App: ScreenTime App | Mobile Addiction Tracker App | Digital Wellbeing App | Mindefy Labs | Mindefy Technologies | YourHour App"
        : "YourHour App: ScreenTime App | Mobile Addiction Tracker App | Digital Wellbeing App | Mindefy Labs | Mindefy Technologies | YourHour App",
      template: isWebsite ? "%s | YourHour" : "%s | YourStories",
    },

    description: isWebsite
      ? "YourHour helps you understand and reduce phone usage with daily limits, detailed reports, and mindful nudges to build healthier digital habits. Discover real student and youngster success stories on how they cut screen time, beat phone addiction, and built healthier digital habits using YourHour screen time reduction app. Read inspiring screen time reduction journeys, digital detox stories, and phone addiction recovery experiences that motivate you to take control and enjoy a balanced, distraction-free life."
      : "Discover authentic screen time recovery stories and share your own journey. Read, write, and connect with real experiences from students and youngsters overcoming phone addiction, digital detox, and excessive device usage on YourStories. Find inspiration, community support, and helpful tips to reduce screen time, beat phone addiction, build healthier digital habits, and improve digital wellbeing.",

    keywords: isWebsite
      ? [
          "YourHour ScreenTime App",
          "screen time tracker",
          "phone timer lock app",
          "mobile addiction control app",
          "phone addiction controller",
          "screentime for kids",
          "screen time control",
          "screen time app",
          "screen time app usage tracker",
          "screen time helper",
          "screen time parental control",
        ]
      : [
          "Screentime reduction success stories",
          "Overcoming screen addiction stories",
          "Digital detox student stories",
          "Screen time addiction recovery tales",
          "Youngsters screen freedom stories",
          "Inspirational screen time reduction",
          "How to beat screen addiction",
          "Student stories on reducing screen time",
          "Screen addiction recovery experiences",
          "Screen time management success",
          "Real-life screen time freedom stories",
          "Screen addiction recovery inspiration",
        ],

    // Force favicon override (stops flashing)
    icons: {
      icon: iconPath,
      apple: appleIconPath,
      other: [
        {
          rel: "icon",
          url: iconPath,
        },
      ],
    },

    metadataBase,
    alternates: {
      canonical: "./",
    },

    // Open Graph for social sharing
    openGraph: {
      type: "website",
      locale: "en_US",
      url: metadataBase.toString(),
      siteName: isWebsite ? "YourHour App" : "YourStories - YourHour",
      title: isWebsite
        ? "YourHour - Screen Time Management & Digital Wellbeing"
        : "YourStories - Real Screen Time Recovery Stories",
      description: isWebsite
        ? "Take control of your screen time with YourHour. Track usage, set limits, and build healthier digital habits."
        : "Read and share authentic stories about overcoming phone addiction and reducing screen time.",
      images: [
        {
          url: "/yourhour-website-img/website-favicon.png",
          width: 1200,
          height: 630,
          alt: isWebsite ? "YourHour App" : "YourStories",
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: isWebsite
        ? "YourHour - Screen Time Management & Digital Wellbeing"
        : "YourStories - Real Screen Time Recovery Stories",
      description: isWebsite
        ? "Take control of your screen time with YourHour."
        : "Read and share authentic screen time recovery stories.",
      images: ["/yourhour-website-img/website-favicon.png"],
    },

    // Additional metadata
    applicationName: isWebsite ? "YourHour" : "YourStories",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: isWebsite ? "YourHour" : "YourStories",
    },
    formatDetection: {
      telephone: false,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Determine domain type
  const h = headers();
  const host = (await h).get("x-forwarded-host") || (await h).get("host") || "";
  const domainType = getDomainTypeByHost(host);
  const isWebsite = domainType === "website";

  return (
    <html lang="en">
      <head>
        {/* Prevent fallback favicon flash */}
        <link rel="icon" href="data:;base64,iVBORw0KGgo=" />

        {/* Manifest for PWA and shortcuts */}
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color */}
        <meta name="theme-color" content="#ffffff" />

        {/* Add Structured Data for SEO shortcuts */}
        <StructuredDataSchema isWebsite={isWebsite} />

        {/* Preload LCP image for YourHour website */}
        {isWebsite && (
          <>
            <link
              rel="preload"
              as="image"
              href="/yourhour-website-img/hero-BG-Img.webp"
            />
            <link
              rel="preconnect"
              href="https://stories.yourhourapp.com"
              crossOrigin=""
            />
            <link
              rel="preconnect"
              href="https://chatbot.mindefy.tech"
              crossOrigin=""
            />
            <link
              rel="preconnect"
              href="https://api.producthunt.com"
              crossOrigin=""
            />
            <link rel="preconnect" href="https://play.google.com" />
            <link
              rel="preconnect"
              href="https://api.mixpanel.com"
              crossOrigin=""
            />
          </>
        )}

        {/* Preconnect for stories webapp external origins */}
        {!isWebsite && (
          <>
            <link
              rel="preconnect"
              href="https://images.unsplash.com"
              crossOrigin=""
            />
            <link
              rel="preconnect"
              href="https://api.mixpanel.com"
              crossOrigin=""
            />
          </>
        )}
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${lobster.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
