"use client";

export default function WebsiteFooter() {
  const getYear = new Date().getFullYear();

  return (
    <footer className="pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Top Section */}
        <div className="relative rounded-3xl p-6 lg:p-10 bg-slate-800/60 backdrop-blur-xl border border-slate-800/50 shadow-xl shadow-black/40 flex flex-col lg:flex-row justify-between gap-20">
          {/* Logo and Social */}
          <div className="flex flex-col items-start">
            <div className="mb-4">
              <h4 className="w-fit text-lg font-semibold text-white font-montserrat">
                Handcrafted with ❤️ By
              </h4>
            </div>
            <a
              href="https://mind-e-fy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 hover:opacity-80 transition-opacity"
            >
              <img
                src="/yourhour-website-img/Mindefy-logo.svg"
                alt="Mindefy Logo"
                className="h-12 brightness-0 invert"
              />
            </a>

            <img
              src="/yourhour-website-img/Footer-logo.webp"
              alt="Make in India Badge"
              className="h-14 mb-6"
            />

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/YourHourApp/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:scale-110 transition-transform"
              >
                <img
                  src="/yourhour-website-img/facebook.svg"
                  alt="icon"
                  className="opacity-80 hover:opacity-100"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/mindefytechnologies/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:scale-110 transition-transform"
              >
                <img
                  src="/yourhour-website-img/linkedin.svg"
                  alt="icon"
                  className="opacity-80 hover:opacity-100"
                />
              </a>
              <a
                href="https://www.instagram.com/mindefy_technologies?igsh=MThpZGRkeWNxdHhnaA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:scale-110 transition-transform"
              >
                <img
                  src="/yourhour-website-img/insta.svg"
                  alt="icon"
                  className="opacity-80 hover:opacity-100"
                />
              </a>
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=com.mindefy.phoneaddiction.mobilepe&hl=en_IN&gl=US"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] text-white font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all"
            >
              Download the App
            </a>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 flex-1">
            {/* India & UAE Office */}
            <div>
              <h4 className="font-semibold text-base text-white mb-4 font-montserrat">
                INDIA OFFICE
              </h4>
              <p className="text-sm font-medium text-slate-400 leading-loose font-montserrat">
                201, Atulya IT Park,
                <br />
                <span className="text-sm font-medium text-slate-400 leading-normal font-montserrat">
                  Khandwa Road, Indore-
                  <br />
                  452001
                </span>
                (M.P.) India
              </p>
              <a
                href="mailto:rahul@mindefy.tech"
                className="text-sm w-fit font-medium text-slate-400 hover:text-[#00BCD4] leading-loose block mt-1 font-montserrat"
              >
                Email Us
              </a>
              <p className="text-sm font-medium text-slate-400 leading-loose font-montserrat">
                +91-731-2996160
              </p>
              <p className="text-sm font-medium text-slate-400 leading-loose mb-4 font-montserrat">
                +91-90961-26060
              </p>

              <div>
                <h4 className="font-semibold text-base text-white leading-loose mb-2 font-montserrat">
                  UAE OFFICE
                </h4>
                <p className="text-sm font-medium text-slate-400 leading-normal font-montserrat">
                  Dubai Silicon Oasis, DDP,
                  <br />
                  Building A1,
                </p>
                <p className="text-sm font-medium text-slate-400 leading-loose font-montserrat">
                  Dubai, United Arab Emirates
                  <br />
                  +971 52 232 4382
                </p>
              </div>
            </div>

            {/* Company */}
            <div>
              <div className="mb-8">
                <h4 className="font-semibold text-base text-white mb-4 font-montserrat">
                  COMPANY
                </h4>
                <a
                  href="https://mindefy.tech/about-us-technology-innovators"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit block text-sm font-medium text-slate-400 hover:text-[#00BCD4] transition-colors mb-4 font-montserrat"
                >
                  About
                </a>
                <a
                  href="https://mindefy.tech/customer-testimonials-reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit block text-sm font-medium text-slate-400 hover:text-[#00BCD4] transition-colors font-montserrat"
                >
                  Testimonials
                </a>
              </div>
            </div>

            {/* Portfolio */}
            <div>
              <h4 className="font-semibold text-base text-white mb-4 font-montserrat">
                PORTFOLIO
              </h4>
              <a
                href="https://mindefy.tech/yourhour-screentime-app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit block text-sm font-medium text-slate-400 hover:text-[#00BCD4] mb-4 font-montserrat"
              >
                YourHour
              </a>
              <a
                href="https://mindefy.tech/spector-analytics-software"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit block text-sm font-medium text-slate-400 hover:text-[#00BCD4] mb-4 font-montserrat"
              >
                Spector
              </a>
              <a
                href="https://mindefy.tech/early-foods-e-commerce"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit block text-sm font-medium text-slate-400 hover:text-[#00BCD4] mb-4 font-montserrat"
              >
                EarlyFoods
              </a>
              <a
                href="https://mindefy.tech/jego-ott-platform"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit block text-sm font-medium text-slate-400 hover:text-[#00BCD4] mb-4 font-montserrat"
              >
                JEGO
              </a>
              <a
                href="https://mindefy.tech/greenbill-paperless-billing-software"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit block text-sm font-medium text-slate-400 hover:text-[#00BCD4] font-montserrat"
              >
                GreenBill
              </a>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-base text-white mb-4 font-montserrat">
                SERVICES
              </h4>
              <a
                href="https://mindefy.tech/hybrid-app-development-services"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit block text-sm font-medium text-slate-400 hover:text-[#23aae2] mb-4 font-montserrat"
              >
                Hybrid App Development
              </a>
              <a
                href="https://mindefy.tech/startup-support-consulting"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit block text-sm font-medium text-slate-400 hover:text-[#23aae2] mb-4 font-montserrat"
              >
                Startup Support & Consulting
              </a>
              <a
                href="https://mindefy.tech/digital-transformation-consulting"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit block text-sm font-medium text-slate-400 hover:text-[#23aae2] mb-4 font-montserrat"
              >
                Digital Transformation
              </a>
              <a
                href="https://mindefy.tech/mvp-development-startup-support"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit block text-sm font-medium text-slate-400 hover:text-[#23aae2] mb-4 font-montserrat"
              >
                MVP Development
              </a>
              <a
                href="https://mindefy.tech/staff-augmentation-services"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit block text-sm font-medium text-slate-400 hover:text-[#23aae2] font-montserrat"
              >
                Staff Augmentation Services
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-10 pt-4 text-center">
          <p className="text-sm font-medium text-slate-400">
            ©{" "}
            <a
              href="https://mindefy.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#23aae2] font-semibold font-montserrat"
            >
              Mindefy Technologies Private Limited™
            </a>
            , 2015-{getYear}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
