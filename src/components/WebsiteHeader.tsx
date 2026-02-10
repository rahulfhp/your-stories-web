"use client";
import Link from "next/link";
import { trackWebsiteHeaderStoriesLogoClicked } from "@/lib/website-analytics";
import { useState } from "react";

export default function WebsiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="relative pt-3">
        <nav className="relative container w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 rounded-2xl">
          <div className="absolute inset-0 bg-slate-500/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl shadow-xl shadow-black/40"></div>

          {/* Desktop Layout */}
          <div className="relative hidden lg:grid lg:grid-cols-3 items-center gap-4">
            {/* Left: YourHour Logo */}
            <div className="flex items-center justify-start">
              <Link
                href="/"
                rel="noopener noreferrer"
                className="flex-shrink-0 hover:opacity-80 transition-opacity"
              >
                <img
                  src="/yourhour-website-img/YourHourApp-logo.svg"
                  alt="YourHour"
                  className="h-15 w-auto"
                />
              </Link>
            </div>

            {/* Center: Navigation Links */}
            <div className="flex items-center justify-center gap-6 text-base font-semibold text-slate-300">
              <Link href="/" className="hover:text-[#00BCD4] transition-colors">
                Home
              </Link>
              <Link
                href="/blogs"
                className="hover:text-[#00BCD4] transition-colors"
              >
                Blogs
              </Link>
              <Link
                href="/faqs"
                className="hover:text-[#00BCD4] transition-colors"
              >
                FAQs
              </Link>
            </div>

            {/* Right: YourStories Logo & Get App Button */}
            <div className="flex items-center justify-end gap-6">
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
                  className="h-13 w-auto brightness-0 invert"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.mindefy.phoneaddiction.mobilepe&hl=en_IN&gl=US"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] text-white font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                Free Download
              </a>
            </div>
          </div>

          {/* Tablet Layout (md to lg) */}
          <div className="relative hidden md:flex lg:hidden items-center justify-between">
            {/* Left: YourHour Logo */}
            <Link
              href="/"
              rel="noopener noreferrer"
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <img
                src="/yourhour-website-img/YourHourApp-logo.svg"
                alt="YourHour"
                className="h-10 w-auto scale-110"
              />
            </Link>

            {/* Center: Navigation */}
            <div className="flex items-center gap-4 text-sm font-semibold text-slate-300">
              <Link href="/" className="hover:text-[#00BCD4] transition-colors">
                Home
              </Link>
              <Link
                href="/blogs"
                className="hover:text-[#00BCD4] transition-colors"
              >
                Blogs
              </Link>
              <Link
                href="/faqs"
                className="hover:text-[#00BCD4] transition-colors"
              >
                FAQs
              </Link>
            </div>

            {/* Right: YourStories & Get App */}
            <div className="flex items-center gap-3">
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
                  className="h-10 w-auto scale-105 brightness-0 invert"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.mindefy.phoneaddiction.mobilepe&hl=en_IN&gl=US"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                Free Download
              </a>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="relative flex md:hidden items-center justify-between">
            {/* YourHour Logo */}
            <Link
              href="/"
              rel="noopener noreferrer"
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <img
                src="/yourhour-website-img/YourHourApp-logo.svg"
                alt="YourHour"
                className="h-10 w-auto scale-110 ml-2"
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-[#00BCD4] transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="relative md:hidden mt-2 border-t border-slate-700">
              <div className="flex flex-col gap-4">
                {/* Navigation Links */}
                <div className="flex flex-col gap-3 text-sm font-semibold text-slate-300">
                  <Link
                    href="/"
                    className="hover:text-[#00BCD4] transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/blogs"
                    className="hover:text-[#00BCD4] transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Blogs
                  </Link>
                  <Link
                    href="/faqs"
                    className="hover:text-[#00BCD4] transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    FAQs
                  </Link>
                </div>

                {/* YourStories Logo & Get App Button */}
                <div className="flex flex-col gap-4 pt-3 border-t border-slate-700">
                  <a
                    href="https://stories.yourhourapp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    onClick={() => {
                      trackWebsiteHeaderStoriesLogoClicked();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <img
                      src="/yourhour-website-img/stories-logo.svg"
                      alt="YourStories"
                      className="h-10 w-auto scale-110 brightness-0 invert"
                    />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.mindefy.phoneaddiction.mobilepe&hl=en_IN&gl=US"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] text-white font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Free Download
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
