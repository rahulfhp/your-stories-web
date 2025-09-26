"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "@/stores/theme";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Initialize theme on mount
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      <Header />
      {children}
      <Toaster
        position="top-right"
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
    </>
  );
}