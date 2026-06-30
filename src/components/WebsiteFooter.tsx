"use client";

export default function WebsiteFooter() {
  const getYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/YourHourApp/",
      background: "#1877F2",
      icon: (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="w-4 h-4"
          fill="currentColor"
        >
          <path d="M22.675 0h-21.35C.597 0 0 .6 0 1.337v21.326C0 23.4.597 24 1.325 24H12.82v-9.294H9.692V11.06h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.288h3.587l-.467 3.646h-3.12V24h5.116C23.403 24 24 23.4 24 22.663V1.337C24 .6 23.403 0 22.675 0Z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/mindefy_technologies?igsh=MThpZGRkeWNxdHhnaA==",
      background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
      icon: (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="w-5 h-5"
          fill="currentColor"
        >
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm10 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/yourhour-screen-time-control/?viewAsMember=true",
      background: "#0A66C2",
      icon: (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="w-4 h-4"
          fill="currentColor"
        >
          <path d="M22.23 0H1.77C.79 0 0 .774 0 1.726v20.548C0 23.226.79 24 1.77 24h20.46C23.2 24 24 23.226 24 22.274V1.726C24 .774 23.2 0 22.23 0ZM7.08 20.452H3.56V9.033h3.52v11.419ZM5.32 7.462c-1.124 0-2.034-.915-2.034-2.041 0-1.125.91-2.04 2.034-2.04 1.125 0 2.035.915 2.035 2.04 0 1.126-.91 2.041-2.035 2.041Zm15.132 12.99h-3.52v-5.569c0-1.328-.026-3.036-1.85-3.036-1.85 0-2.134 1.445-2.134 2.938v5.667h-3.52V9.033h3.379v1.561h.049c.47-.888 1.618-1.823 3.329-1.823 3.561 0 4.219 2.346 4.219 5.396v6.285Z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@YourHour_2018",
      background: "#FF0000",
      icon: (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="w-5 h-5"
          fill="currentColor"
        >
          <path d="M23.498 6.186a2.99 2.99 0 0 0-2.104-2.116C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.394.57A2.99 2.99 0 0 0 .502 6.186C0 8.08 0 12 0 12s0 3.92.502 5.814a2.99 2.99 0 0 0 2.104 2.116C4.482 20.5 12 20.5 12 20.5s7.518 0 9.394-.57a2.99 2.99 0 0 0 2.104-2.116C24 15.92 24 12 24 12s0-3.92-.502-5.814ZM9.75 15.568V8.432L16.02 12l-6.27 3.568Z" />
        </svg>
      ),
    },
  ];

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
              className="ml-2 h-14 mb-6 brightness-0 invert scale-125"
            />

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg shadow-black/30 ring-1 ring-white/10 hover:ring-white/40 hover:scale-110 transition-all"
                  style={{
                    background: social.background,
                    color: "#fff",
                  }}
                >
                  {social.icon}
                </a>
              ))}
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
                  className="w-fit block text-sm font-medium text-slate-400 hover:text-[#00BCD4] transition-colors mb-4 font-montserrat"
                >
                  Testimonials
                </a>
                <a
                  href="/privacy-policy"
                  className="w-fit block text-sm font-medium text-slate-400 hover:text-[#00BCD4] transition-colors font-montserrat"
                >
                  Privacy Policy
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
