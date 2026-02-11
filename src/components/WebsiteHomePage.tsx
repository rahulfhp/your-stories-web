"use client";

import { useEffect, useState } from "react";
import GlobalStyles from "./websiteHome/GlobalStyles";
import Hero from "./websiteHome/Hero";
import LogoTicker from "./websiteHome/LogoTicker";
import TrustedBySection from "./websiteHome/Globe3D";
import DashboardFeatures from "./websiteHome/DashboardFeatures";
import AIDetoxCoachSection from "./websiteHome/AIDetoxCoachSection";
import AddictionScale from "./websiteHome/AddictionScale";
import Challenges from "./websiteHome/Challenges";
import TestimonialsSection from "./websiteHome/TestimonialsSection";
import Stories from "./websiteHome/Stories";
import MindefyPromo from "./websiteHome/MindefyPromo";
import FAQsSection from "./websiteHome/FAQsSection";
import MindfulNestChatbot from "./MindfulNestChatbot";
import BlogSection from "./websiteHome/BlogSection";

export default function WebsiteHomePage() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#mindefy") {
      const target = document.getElementById("mindefy");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
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
