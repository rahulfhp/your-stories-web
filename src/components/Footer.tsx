"use client";

import Image from "next/image";
import YourStoriesLogo from "../../public/YourStoriesLogo.svg";
import YourStoriesLogoLight from "../../public/YourStoriesLogoLight.svg";
import MindefyLogo from "../../public/mindefy-logo.svg";
import MindefyDarkLogo from "../../public/mindefy-dark-logo.svg";
import Link from "next/link";

export default function Footer() {
  const getYear = new Date().getFullYear();

  return (
    <footer className="w-full relative overflow-hidden">
      {/* Background with blur & gradient */}
      <div className="absolute inset-0 backdrop-blur-xl border-t shadow-[0_-8px_32px_0_rgba(0,0,0,0.2)] dark:bg-black/20 dark:border-white/10 bg-white/20 border-black/10" />
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-black/80 dark:to-gray-900/80 bg-gradient-to-br from-white to-blue-50/40" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-16 xl:px-[8.83rem] py-8 sm:py-12 lg:py-[3rem] flex flex-col justify-between gap-8">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 sm:gap-12 lg:gap-[6rem] flex-1">
          {/* Logo Section */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <div className="flex flex-col gap-3 sm:gap-4 items-start">
              <h3 className="text-base sm:text-lg font-semibold">
                Handcrafted with ❤️ By
              </h3>
              {/* Main Mindefy Logo */}
              <div className="relative w-40 sm:w-48 lg:w-[15.63rem] h-10 sm:h-12 lg:h-[4.02rem] mb-3">
                <Link href="https://mindefy.tech/" target="blank">
                  <Image
                    src={MindefyDarkLogo}
                    alt="Logo"
                    fill
                    className="object-contain dark:block hidden"
                  />
                  <Image
                    src={MindefyLogo}
                    alt="Logo"
                    fill
                    className="object-contain block dark:hidden"
                  />
                </Link>
              </div>
              <div className="relative w-40 sm:w-48 lg:w-[15.63rem] h-10 sm:h-12 lg:h-[4.02rem]">
                <Image
                  src={YourStoriesLogo}
                  alt="Logo"
                  fill
                  className="object-contain dark:block hidden"
                />
                <Image
                  src={YourStoriesLogoLight}
                  alt="Logo"
                  fill
                  className="object-contain block dark:hidden"
                />
              </div>
            </div>
          </div>

          {/* Content Columns - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8 flex-1 w-full">
            {/* India Office */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-gray-800 dark:text-white">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                INDIA OFFICE
              </h3>
              <div className="text-sm sm:text-base opacity-90 space-y-1">
                <p>201, Atulya IT Park,</p>
                <p>Khandwa Road, Indore-452001</p>
                <p>(M.P.) India</p>
                <a
                  href="mailto:rahul@mindefy.tech"
                  className="mt-2 sm:mt-3 block hover:opacity-100 cursor-pointer transition-opacity"
                >
                  Email Us
                </a>
                <p>+91-731-2996160</p>
                <p>+91-90961-26060</p>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3 sm:mb-4">
                UAE OFFICE
              </h3>
              <div className="text-sm sm:text-base opacity-90 space-y-1">
                <p>Dubai Silicon Oasis, DDP, Building A1,</p>
                <p>Dubai, United Arab Emirates</p>
                <p className="mt-2 sm:mt-3">+971 52 232 4382</p>
              </div>
            </div>

            {/* Company */}
            <div className="text-gray-800 dark:text-white">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                COMPANY
              </h3>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4 text-sm sm:text-base opacity-90">
                <a
                  href="https://mindefy.tech/about-us"
                  target="_blank"
                  className="block hover:opacity-100 cursor-pointer transition-opacity"
                >
                  About
                </a>
                <a
                  href="https://mindefy.tech/testimonials"
                  target="_blank"
                  className="block hover:opacity-100 cursor-pointer transition-opacity"
                >
                  Testimonials
                </a>
              </div>
            </div>

            {/* Portfolio */}
            <div className="text-gray-800 dark:text-white">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                PORTFOLIO
              </h3>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4 text-sm sm:text-base opacity-90">
                <a
                  href="https://mindefy.tech/your-hour"
                  target="_blank"
                  className="block hover:opacity-100 cursor-pointer transition-opacity"
                >
                  YourHour
                </a>
                <a
                  href="https://mindefy.tech/spector"
                  target="_blank"
                  className="block hover:opacity-100 cursor-pointer transition-opacity"
                >
                  Spector
                </a>
                <a
                  href="https://mindefy.tech/early-foods"
                  target="_blank"
                  className="block hover:opacity-100 cursor-pointer transition-opacity"
                >
                  Early Foods
                </a>
                <a
                  href="https://mindefy.tech/jego"
                  target="_blank"
                  className="block hover:opacity-100 cursor-pointer transition-opacity"
                >
                  JEGO
                </a>
                <a
                  href="https://mindefy.tech/digi-bill"
                  target="_blank"
                  className="block hover:opacity-100 cursor-pointer transition-opacity"
                >
                  GreenBill
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="text-gray-800 dark:text-white">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                SERVICES
              </h3>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4 text-sm sm:text-base opacity-90">
                <a
                  href="https://mindefy.tech/hybrid-app-development"
                  target="_blank"
                  className="block hover:opacity-100 cursor-pointer transition-opacity"
                >
                  Hybrid App Development
                </a>
                <a
                  href="https://mindefy.tech/startup-support"
                  target="_blank"
                  className="block hover:opacity-100 cursor-pointer transition-opacity"
                >
                  Startup Support & Consulting
                </a>
                <a
                  href="https://mindefy.tech/digital-transformation"
                  target="_blank"
                  className="block hover:opacity-100 cursor-pointer transition-opacity"
                >
                  Digital Transformation
                </a>
                <a
                  href="https://mindefy.tech/mvp-development"
                  target="_blank"
                  className="block hover:opacity-100 cursor-pointer transition-opacity"
                >
                  MVP Dev. & PMF Test
                </a>
                <a
                  href="https://mindefy.tech/staff-services"
                  target="_blank"
                  className="block hover:opacity-100 cursor-pointer transition-opacity"
                >
                  Staff Augmenation Services
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-sm sm:text-base opacity-80 font-bold text-gray-800 dark:text-white">
          &copy;{" "}
          <Link href="https://mindefy.tech/" target="blank">
            Mindefy Technologies Private Limited™
          </Link>
          , {getYear}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
