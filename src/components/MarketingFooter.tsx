"use client";

import Link from "next/link";

export default function MarketingFooter() {
  const getYear = new Date().getFullYear();

  return (
    <footer className="w-full relative overflow-hidden mt-auto">
      {/* Background with blur & gradient */}
      <div className="absolute inset-0 backdrop-blur-xl border-t shadow-[0_-8px_32px_0_rgba(0,0,0,0.2)] dark:bg-black/20 dark:border-white/10 bg-white/20 border-black/10" />
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-black/80 dark:to-gray-900/80 bg-gradient-to-br from-white to-blue-50/40" />

      <div className="relative container mx-auto px-6 py-8 text-center">
        <p className="text-sm sm:text-base opacity-80 font-bold text-gray-800 dark:text-white">YourHour App Footer</p>
        <div className="text-sm sm:text-base opacity-80 font-bold text-gray-800 dark:text-white">
          &copy;{" "}
          <Link href="https://mindefy.tech/" target="blank" className="hover:opacity-100 transition-opacity">
            Mindefy Technologies Private Limited™
          </Link>
          , {getYear}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

