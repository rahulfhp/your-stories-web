"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import WebsiteHeader from "@/components/WebsiteHeader";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "@/stores/theme";
import Footer from "./Footer";
import WebsiteFooter from "./WebsiteFooter";
import { getDomainType } from "@/lib/domainUtils";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const { theme } = useThemeStore();
  const [domainType, setDomainType] = useState<"app" | "website" | "localhost">(
    "localhost"
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setDomainType(getDomainType());
  }, []);

  useEffect(() => {
    // Initialize theme on mount
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Determine which header and footer to use
  // On localhost, default to app header/footer, but allow override via domain detection
  const useWebsiteLayout =
    isClient &&
    (domainType === "website" ||
      (domainType === "localhost" &&
        typeof window !== "undefined" &&
        window.location.pathname.startsWith("/home")));

  return (
    <>
      {useWebsiteLayout ? <WebsiteHeader /> : <Header />}
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          className: "glassmorphism-toast",
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
          loading: {
            iconTheme: {
              primary: "#3b82f6",
              secondary: "#ffffff",
            },
          },
        }}
      />
      {useWebsiteLayout ? <WebsiteFooter /> : <Footer />}
    </>
  );
}
