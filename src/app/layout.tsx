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
        ? "YourHour App: Screen Time & Digital Wellbeing"
        : "YourStories: Screen Time Recovery Stories",
      template: isWebsite ? "%s | YourHour" : "%s | YourStories",
    },

    description: isWebsite
      ? "YourHour helps you cut screen time with usage tracking, app limits, focus tools, and mindful nudges. Build healthier digital habits with clear reports and gentle guidance from Mindefy."
      : "Read and share real screen time recovery stories from students and young adults. Get inspiration, tips, and community support to reduce phone addiction and build healthier digital habits.",

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
      capable: false,
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
        {/* Explicit favicons for SEO tools and browsers */}
        <link
          rel="icon"
          type={isWebsite ? "image/png" : "image/x-icon"}
          sizes="16x16"
          href={
            isWebsite
              ? "/yourhour-website-img/website-favicon-16x16.png"
              : "/stories-favicon.ico"
          }
        />
        {/* Google Search Console verification */}
        <meta
          name="google-site-verification"
          content="d7wxqNf7N5syZIKKGLIN8uJtbicO3hn1kmZOpWnZhmk"
        />
        <link
          rel="icon"
          type={isWebsite ? "image/png" : "image/x-icon"}
          sizes="32x32"
          href={
            isWebsite
              ? "/yourhour-website-img/website-favicon.png"
              : "/stories-favicon.ico"
          }
        />

        {/* Theme color */}
        <meta name="theme-color" content="#ffffff" />

        {/* Add Structured Data for SEO shortcuts */}
        <StructuredDataSchema isWebsite={isWebsite} />

        {/* Preconnect for YourHour website */}
        {isWebsite && (
          <>
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
