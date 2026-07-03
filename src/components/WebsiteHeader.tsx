"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WebsiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleScrollToMindefy = () => {
    const target = document.getElementById("mindefy");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
      return;
    }
    setIsMobileMenuOpen(false);
    router.push("/#mindefy");
  };

  const handleScrollToAIDetoxCoach = () => {
    const target = document.getElementById("ai-coach");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
      return;
    }
    setIsMobileMenuOpen(false);
    router.push("/#ai-coach");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="relative pt-2">
        <nav className="relative container w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-3 rounded-2xl">
          <div className="absolute inset-0 bg-slate-500/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl shadow-xl shadow-black/40"></div>

          {/* Desktop Layout */}
          <div className="relative hidden lg:flex items-center justify-between gap-2">
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
                  loading="lazy"
                />
              </Link>
            </div>

            {/* Center: Navigation Links */}
            <div className="flex items-center justify-center gap-6 text-base font-semibold text-slate-300">
              <button
                type="button"
                onClick={handleScrollToMindefy}
                className="hover:text-[#00BCD4] transition-colors cursor-pointer"
              >
                About Us
              </button>

              <Link
                href="/yourhour-features"
                className="hover:text-[#00BCD4] transition-colors"
              >
                Android App
              </Link>
              <Link
                href="/#platforms"
                className="hover:text-[#00BCD4] transition-colors"
              >
                iPhone App
              </Link>
              <Link
                href="/yourhour-tv"
                className="hover:text-[#00BCD4] transition-colors"
              >
                Android TV
              </Link>
              <Link
                href="/blogs"
                className="hover:text-[#00BCD4] transition-colors"
              >
                Blogs
              </Link>
            </div>

            {/* Right: YourStories Logo & Get App Button */}
            <div className="flex items-center justify-end gap-5">
              <a
                href="https://play.google.com/store/apps/details?id=com.mindefy.phoneaddiction.mobilepe"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/yourhour-website-img/play-store.png"
                  alt="YourStories"
                  loading="lazy"
                  width={120}
                  height={40}
                  className="h-15 w-auto scale-110"
                />
              </a>
              <a
                href="https://apps.apple.com/in/app/yourhour/id6784166547"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/yourhour-website-img/app-store.png"
                  alt="YourStories"
                  loading="lazy"
                  width={120}
                  height={40}
                  className="h-10 w-auto scale-110"
                />
              </a>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="relative flex lg:hidden items-center justify-between">
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
              className="p-2 text-slate-300 cursor-pointer hover:text-[#00BCD4] transition-colors"
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
            <div className="relative lg:hidden mt-2 border-t border-slate-700">
              <div className="flex flex-col gap-4">
                {/* Navigation Links */}
                <div className="flex flex-col gap-3 text-sm font-semibold text-slate-300">
                  <button
                    type="button"
                    onClick={handleScrollToMindefy}
                    className="hover:text-[#00BCD4] transition-colors py-2 text-left cursor-pointer"
                  >
                    About Us
                  </button>
                  <Link
                    href="/yourhour-features"
                    className="hover:text-[#00BCD4] transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Android App
                  </Link>
                  <Link
                    href="/#platforms"
                    className="hover:text-[#00BCD4] transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    iPhone App
                  </Link>
                  <Link
                    href="/yourhour-tv"
                    className="hover:text-[#00BCD4] transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Android TV
                  </Link>
                  <Link
                    href="/blogs"
                    className="hover:text-[#00BCD4] transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Blogs
                  </Link>
                </div>

                {/* YourStories Logo & Get App Button */}
                <div className="flex flex-col gap-4 pt-3 border-t border-slate-700">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.mindefy.phoneaddiction.mobilepe"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/yourhour-website-img/play-store.png"
                      alt="YourStories"
                      loading="lazy"
                      width={120}
                      height={40}
                      className="h-14 w-auto scale-110"
                    />
                  </a>
                  <a
                    href="https://apps.apple.com/in/app/yourhour/id6784166547"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/yourhour-website-img/app-store.png"
                      alt="YourStories"
                      loading="lazy"
                      width={120}
                      height={40}
                      className="ml-2 h-11 w-auto scale-110"
                    />
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
