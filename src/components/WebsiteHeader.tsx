"use client";

import Link from "next/link";
import { trackWebsiteHeaderStoriesLogoClicked } from "@/lib/website-analytics";

export default function WebsiteHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="relative pt-2">
        <nav className="relative container w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 rounded-2xl">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/20"></div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logos */}
            <div className="flex items-center gap-6">
              <Link href="/" rel="noopener noreferrer" className="flex-shrink-0 hover:opacity-80 transition-opacity">
                <img
                  src="/yourhour-website-img/YourHourApp-logo.svg"
                  alt="YourHour"
                  className="h-10 w-auto brightness-0 invert"
                />
              </Link>
              <div className="h-8 w-px bg-white/20"></div>
              <a
                href="https://stories.yourhourapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 hover:opacity-80 transition-opacity"
                onClick={() => trackWebsiteHeaderStoriesLogoClicked()}
              >
                <img
                  src="/yourhour-website-img/stories-logo.svg"
                  alt="YourStories"
                  className="h-10 w-auto brightness-0 invert"
                />
              </a>
            </div>

            {/* Navigation & CTA */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-6 text-sm font-semibold text-white/90">
                <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                <Link href="/blogs" className="hover:text-cyan-400 transition-colors">Blogs</Link>
                <Link href="/faqs" className="hover:text-cyan-400 transition-colors">FAQs</Link>
              </div>
              <a
                href="https://play.google.com/store/apps/details?id=com.mindefy.phoneaddiction.mobilepe&hl=en_IN&gl=US"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] text-white font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all"
              >
                Get the App
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
