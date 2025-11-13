"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MarketingHeader() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy", path: "/privacy" },
  ];

  return (
    <header className="fixed top-0 left-0 z-[100] w-full">
      <div className="relative">
        {/* Background with blur effect */}
        <div className="absolute inset-0 backdrop-blur-xl border-b shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] dark:bg-black/20 dark:border-white/10 bg-white/20 border-black/10" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-black/30 dark:to-gray-900/40 bg-gradient-to-br from-white/30 to-blue-50/40" />

        {/* Content */}
        <div className="relative container mx-auto flex justify-between items-center px-6 py-4">
          <Link
            href="/"
            className="text-2xl font-semibold text-gray-900 dark:text-white"
          >
            YourStories
          </Link>

          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors ${
                  pathname === link.path
                    ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-110 backdrop-blur-sm border transition-colors dark:hover:bg-white/10 dark:border-white/10 hover:bg-gray-100/20 border-gray-300/20">
            <svg className="w-6 h-6 dark:text-white/90 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

