"use client";

import Link from "next/link";

export default function WebsiteHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-white shadow-md transition-all duration-300">
      <div className="relative">
        {/* Navbar */}
        <nav className="relative container w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          {/* Logos */}
          <div className="flex items-center justify-between">
            {/* Left Logo */}
            <Link href="/" rel="noopener noreferrer" className="flex-shrink-0">
              <img
                src="/yourhour-website-img/YourHourApp-logo.svg"
                alt="YourHour"
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto"
              />
            </Link>

            {/* Right Logo */}
            <a
              href="https://stories.yourhourapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <img
                src="/yourhour-website-img/stories-logo.svg"
                alt="YourStories"
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto"
              />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
