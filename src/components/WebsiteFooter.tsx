"use client";

import { Facebook, Linkedin, Instagram } from "lucide-react";

export default function WebsiteFooter() {
  const getYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white to-[#a0e9f0] pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Logo and Social */}
          <div className="flex flex-col items-start">
            <div className="mb-4">
              <h4 className="w-fit text-lg font-semibold text-[#13151A] font-montserrat">
                Handcrafted with ❤️ By
              </h4>
            </div>
            <a
              href="https://mind-e-fy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4"
            >
              <img
                src="/yourhour-website-img/Mindefy-logo.svg"
                alt="Mindefy Logo"
                className="h-10"
              />
            </a>

            <img
              src="/yourhour-website-img/Footer-logo.webp"
              alt="Make in India Badge"
              className="h-14 mb-5"
            />

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/YourHourApp/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full bg-[#f5f5f5] hover:bg-[#23aae2] transition"
              >
                <Facebook className="h-5 w-5 text-[#333]" />
              </a>
              <a
                href="https://www.linkedin.com/company/mindefytechnologies/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-full bg-[#f5f5f5] hover:bg-[#23aae2] transition"
              >
                <Linkedin className="h-5 w-5 text-[#333]" />
              </a>
              <a
                href="https://www.instagram.com/mindefy_technologies?igsh=MThpZGRkeWNxdHhnaA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-[#f5f5f5] hover:bg-[#23aae2] transition"
              >
                <Instagram className="h-5 w-5 text-[#333]" />
              </a>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 flex-1">
            {/* India & UAE Office */}
            <div>
              <h4 className="font-semibold text-base text-[#13151A] mb-4 font-montserrat">
                INDIA OFFICE
              </h4>
              <p className="text-sm text-[#13151A] leading-relaxed font-montserrat">
                201, Atulya IT Park,
                <br />
                Khandwa Road,
                <br />
                Indore-452001
                <br />
                (M.P.) India
              </p>
              <a
                href="mailto:rahul@mindefy.tech"
                className="text-sm text-[#13151A] hover:text-[#23aae2] block mt-1 font-montserrat"
              >
                Email Us
              </a>
              <p className="text-sm text-[#13151A] font-montserrat">
                +91-731-2996160
              </p>
              <p className="text-sm text-[#13151A] mb-4 font-montserrat">
                +91-90961-26060
              </p>

              <div>
                <h4 className="font-semibold text-base text-[#13151A] mb-2 font-montserrat">
                  UAE OFFICE
                </h4>
                <p className="text-sm text-[#13151A] leading-relaxed font-montserrat">
                  Dubai Silicon Oasis,
                  <br />
                  DDP, Building A1,
                  <br />
                  Dubai, United Arab Emirates
                  <br />
                  +971 52 232 4382
                </p>
              </div>
            </div>

            {/* Company & Explore */}
            <div>
              <div className="mb-8">
                <h4 className="font-semibold text-base text-[#13151A] mb-4 font-montserrat">
                  COMPANY
                </h4>
                <a
                  href="https://mindefy.tech/about-us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-[#13151A] hover:text-[#23aae2] transition-colors mb-3 font-montserrat"
                >
                  About
                </a>
                <a
                  href="https://mindefy.tech/testimonials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-[#13151A] hover:text-[#23aae2] transition-colors font-montserrat"
                >
                  Testimonials
                </a>
              </div>

              <div>
                <h4 className="font-semibold text-base text-[#13151A] mb-4">
                  EXPLORE
                </h4>
                <a
                  href="/faqs"
                  className="block text-sm text-[#13151A] hover:text-[#23aae2] transition-colors mb-3 font-montserrat"
                >
                  FAQs
                </a>
                <a
                  href="/blogs"
                  className="block text-sm text-[#13151A] hover:text-[#23aae2] transition-colors mb-3 font-montserrat"
                >
                  Blogs
                </a>
                <a
                  href="/privacy-policy"
                  className="block text-sm text-[#13151A] hover:text-[#23aae2] transition-colors font-montserrat"
                >
                  Privacy Policy
                </a>
              </div>
            </div>

            {/* Portfolio */}
            <div>
              <h4 className="font-semibold text-base text-[#13151A] mb-4 font-montserrat">
                PORTFOLIO
              </h4>
              <a
                href="https://mindefy.tech/your-hour"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#13151A] hover:text-[#23aae2] mb-3 font-montserrat"
              >
                YourHour
              </a>
              <a
                href="https://mindefy.tech/spector"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#13151A] hover:text-[#23aae2] mb-3 font-montserrat"
              >
                Spector
              </a>
              <a
                href="https://mindefy.tech/early-foods"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#13151A] hover:text-[#23aae2] mb-3 font-montserrat"
              >
                Early Foods
              </a>
              <a
                href="https://mindefy.tech/jego"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#13151A] hover:text-[#23aae2] mb-3 font-montserrat"
              >
                JEGO
              </a>
              <a
                href="https://mindefy.tech/digi-bill"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#13151A] hover:text-[#23aae2] font-montserrat"
              >
                GreenBill
              </a>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-base text-[#13151A] mb-4 font-montserrat">
                SERVICES
              </h4>
              <a
                href="https://mindefy.tech/hybrid-app-development"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#13151A] hover:text-[#23aae2] mb-3 font-montserrat"
              >
                Hybrid App Development
              </a>
              <a
                href="https://mindefy.tech/startup-support"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#13151A] hover:text-[#23aae2] mb-3 font-montserrat"
              >
                Startup Support & Consulting
              </a>
              <a
                href="https://mindefy.tech/digital-transformation"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#13151A] hover:text-[#23aae2] mb-3 font-montserrat"
              >
                Digital Transformation
              </a>
              <a
                href="https://mindefy.tech/mvp-development"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#13151A] hover:text-[#23aae2] mb-3 font-montserrat"
              >
                MVP Dev. & PMF Test
              </a>
              <a
                href="https://mindefy.tech/staff-services"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-[#13151A] hover:text-[#23aae2] font-montserrat"
              >
                Staff Augmentation Services
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#c5e7eb] mt-10 pt-4 text-center">
          <p className="text-sm text-[#13151A]">
            ©{" "}
            <a
              href="https://mindefy.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#333333] hover:text-[#23aae2] font-semibold font-montserrat"
            >
              Mindefy Technologies Private Limited™
            </a>
            , {getYear}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
