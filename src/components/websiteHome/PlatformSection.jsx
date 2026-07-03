"use client";

import Link from "next/link";

const platformCards = [
  {
    title: "Android App",
    subtitle: "Mobile detox on the go",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M8 2h8v4H8z" />
        <path d="M9 6V4" />
        <path d="M15 6V4" />
        <rect x="5" y="6" width="14" height="14" rx="3" />
        <path d="M8 16h.01" />
        <path d="M16 16h.01" />
        <path d="M8 12h8" />
      </svg>
    ),
    features: ["AI Detox Coach", "Reels & Shorts Blocker", "Strict Focus Mode"],
    button: {
      label: "",
      href: "",
      variant: "secondary",
    },
  },
  {
    title: "Android TV",
    subtitle: "Living room control",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <rect x="3" y="5" width="18" height="12" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
    features: [
      "Family Screen Management",
      "Evening Detox Schedules",
      "Less Passive Watching",
    ],
    button: {
      label: "Explore Android TV",
      href: "/tv",
      variant: "primary",
    },
  },
  {
    title: "iOS App",
    subtitle: "Apple-ready wellness",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M16.72 7.73c-.06-.52-.3-1.05-.72-1.5-.45-.5-1.03-.8-1.66-.85-.62-.06-1.28.16-1.82.66-.55.5-1.01 1.35-.86 2.16.15.84.7 1.48 1.39 1.74.48.17 1.01.17 1.54.04.47-.12.9-.35 1.27-.67.17-.16.32-.34.45-.53" />
        <path d="M13.8 20.5c.52.06 1.07.01 1.6-.15 1.19-.36 2.32-1.31 2.93-2.71.67-1.54.57-3.06.03-4.16-.5-1.04-1.28-1.8-2.27-2.19-.63-.25-1.28-.25-1.63-.25-.58 0-1.48.12-2.34.55-.7.35-1.46.88-1.98 1.71-.5.78-.83 1.86-.7 2.96.1.87.55 1.92 1.21 2.76.6.77 1.44 1.38 2.37 1.64.45.13.85.2 1.22.22" />
      </svg>
    ),
    features: [
      "Deep iOS integration",
      "Live activities support",
      "Seamless ecosystem sync",
    ],
    button: {
      label: "",
      href: "",
      variant: "secondary",
    },
  },
];

const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 ${className}`}
  >
    {children}
  </span>
);

export default function PlatformSection() {
  return (
    <section id="platforms" className="py-18 sm:py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="mb-6 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
            One Account. Every Screen.
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            A connected ecosystem for mobile, TV, and Apple.
          </h2>
          <p className="text-slate-400 text-lg sm:text-xl leading-8">
            Choose the experience that fits your family. The Android App and iOS
            App cards jump to the right section, while TV opens the dedicated
            living room screen.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {platformCards.map((card) => (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-900/10 transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-800/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
              <div className="relative z-10 flex items-center justify-between mb-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-800/80 text-cyan-300 shadow-lg shadow-cyan-500/10">
                  {card.icon}
                </div>
                <span className="text-xs uppercase text-slate-500 tracking-[0.35em] font-semibold">
                  {card.subtitle}
                </span>
              </div>
              <div className="space-y-4 mb-10">
                <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                <ul className="space-y-3 text-sm text-slate-300">
                  {card.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative z-10">
                {card.button.label && (
                  <Link
                    href={card.button.href}
                    className={`inline-flex items-center justify-center w-full rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                      card.button.variant === "primary"
                        ? "bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] text-slate-950 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
                        : "bg-slate-800 border border-slate-700 text-slate-100 hover:bg-slate-700"
                    }`}
                  >
                    {card.button.label}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
