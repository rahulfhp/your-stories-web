"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PrivacyPage() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy", path: "/privacy" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-900 dark:to-black">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md dark:bg-gray-900 fixed top-25 left-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <Link
            href="/home"
            className="text-2xl font-semibold text-gray-900 dark:text-white"
          >
            YourStories
          </Link>

          <div className="flex space-x-6">
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
          </div>
        </div>
      </nav>

      {/* Add top padding so content doesn’t hide behind navbar */}
      <div className="flex items-center justify-center text-center px-4 pt-45">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white/90 mb-4">
            Welcome to Your Stories
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-white/60">
            Main Domain Privacy Page
          </p>
          <p className="text-sm text-gray-500 dark:text-white/40 mt-4">
            This page will be designed later
          </p>
        </div>
      </div>
    </div>
  );
}
