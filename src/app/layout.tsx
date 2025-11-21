import { Geist, Geist_Mono, Montserrat, Lobster } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { getDomainTypeByHost } from "@/lib/domainUtils";

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
      canonical: metadataBase,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Prevent fallback favicon flash */}
        <link rel="icon" href="data:;base64,iVBORw0KGgo=" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${lobster.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
