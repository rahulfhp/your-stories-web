"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import GlobalStyles from "./websiteHome/GlobalStyles";
import Hero from "./websiteHome/Hero";
import LogoTicker from "./websiteHome/LogoTicker";

const TrustedBySection = dynamic(() => import("./websiteHome/Globe3D"), {
  ssr: false,
  loading: () => <div className="min-h-[420px]" />,
});
const DashboardFeatures = dynamic(
  () => import("./websiteHome/DashboardFeatures"),
  { loading: () => <div className="min-h-[420px]" /> }
);
const AIDetoxCoachSection = dynamic(
  () => import("./websiteHome/AIDetoxCoachSection"),
  { loading: () => <div className="min-h-[420px]" /> }
);
const AddictionScale = dynamic(() => import("./websiteHome/AddictionScale"), {
  loading: () => <div className="min-h-[320px]" />,
});
const Challenges = dynamic(() => import("./websiteHome/Challenges"), {
  loading: () => <div className="min-h-[320px]" />,
});
const TestimonialsSection = dynamic(
  () => import("./websiteHome/TestimonialsSection"),
  { loading: () => <div className="min-h-[320px]" /> }
);
const Stories = dynamic(() => import("./websiteHome/Stories"), {
  loading: () => <div className="min-h-[320px]" />,
});
const MindefyPromo = dynamic(() => import("./websiteHome/MindefyPromo"), {
  loading: () => <div className="min-h-[320px]" />,
});
const BlogSection = dynamic(() => import("./websiteHome/BlogSection"), {
  loading: () => <div className="min-h-[320px]" />,
});
const FAQsSection = dynamic(() => import("./websiteHome/FAQsSection"), {
  loading: () => <div className="min-h-[320px]" />,
});
const MindfulNestChatbot = dynamic(() => import("./MindfulNestChatbot"), {
  ssr: false,
});

export default function WebsiteHomePage() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.replace("#", "");
    if (!id) return;

    let attempts = 0;
    const maxAttempts = 10;
    const tryScroll = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (attempts < maxAttempts) {
        attempts += 1;
        requestAnimationFrame(tryScroll);
      }
    };

    tryScroll();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 scroll-smooth mx-auto">
      <GlobalStyles />
      <Hero />
      <LogoTicker />
      <TrustedBySection />
      <DashboardFeatures />
      <AIDetoxCoachSection />
      <AddictionScale />
      <Challenges />
      <TestimonialsSection />
      <Stories />
      <MindefyPromo />
      <BlogSection />
      <FAQsSection />
      <MindfulNestChatbot />
      {/* Scroll to Top Button */}
      {isSticky && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-2 right-2 w-10 h-10 cursor-pointer bg-slate-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#00BCD4] transition-all z-[99] text-4xl border border-slate-700"
        >
          <span className="text-2xl">↑</span>
        </button>
      )}
    </div>
  );
}
