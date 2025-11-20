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

  return {
    title: isWebsite
      ? "YourHour App: Smartphone Addiction Tracker and Controller | Digital Wellness App | Digital Wellbeing App | Mobile Addiction Tracker App | Mindefy Labs | Mindefy Solutions | Mind-e-fy | Your Hour App | YourHour | Mobile Addiction Tracker App | Mind-e-fy Solutions"
      : "YourStories – Where Stories Find You!",

    // Force favicon override (stops flashing)
    icons: {
      icon: iconPath,
      other: [
        {
          rel: "icon",
          url: iconPath,
        },
      ],
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
