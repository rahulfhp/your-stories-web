"use client";

import Link from "next/link";
import { Smartphone, MonitorSmartphone, Apple } from "lucide-react";
import SectionHeading from "./SectionHeading";

const platformCards = [
  {
    title: "Android App",
    subtitle: "The most powerful digital detox engine available on Mobile",
    badge: null,
    icon: <Smartphone className="w-7 h-7" strokeWidth={1.8} />,
    features: [
      "AI Detox Coach",
      "Reels & Shorts Blocker",
      "Unforgiving Strict Mode",
    ],
    button: {
      label: "Explore Android App",
      href: "yourhour-features",
      variant: "primary",
    },
  },
  {
    title: "Android TV",
    subtitle: "Bring mindful viewing to the center of your living room.",
    badge: "NEW",
    icon: <MonitorSmartphone className="w-7 h-7" strokeWidth={1.8} />,
    features: [
      "Family Screen Management",
      "Evening Detox Schedules",
      "Less Passive Watching",
    ],
    button: {
      label: "Explore Android TV",
      href: "/yourhour-tv",
      variant: "primary",
    },
  },
  {
    title: "iPhone App",
    subtitle: "The beautiful simplicity of YourHour, engineered for Apple.",
    badge: "COMING SOON",
    icon: <Apple className="w-7 h-7" strokeWidth={1.8} />,
    features: [
      "Deep iOS Integration",
      "Live Activities Support",
      "Seamless Ecosystem Sync",
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
    className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.24em] uppercase bg-slate-900/70 text-slate-200 border border-white/10 ${className}`}
  >
    {children}
  </span>
);

export default function PlatformSection() {
  return (
    <section id="platforms" className="py-20 sm:py-24 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionHeading
            badge="One Account Every Screen"
            title="A connected ecosystem for mobile, TV, and Apple."
            subtitle=" Pick your platform experience and stay in control across every device."
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {platformCards.map((card) => (
            <article
              key={card.title}
              id={
                card.title === "Android App"
                  ? "android-app"
                  : card.title === "iPhone App"
                    ? "ios-app"
                    : undefined
              }
              className="group relative overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-7 shadow-2xl shadow-cyan-900/10 transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-800/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
              <div className="relative z-10 flex items-start justify-between gap-4 mb-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-800/90 text-cyan-300 shadow-lg shadow-cyan-500/10">
                  {card.icon}
                </div>
                {card.badge ? (
                  <span className="bg-white/5 transition-all duration-300 animate-vote-pop animate-pulse-glow text-cyan-500 px-4 py-1.5 rounded-4xl border border-cyan-500">
                    {card.badge}
                  </span>
                ) : null}
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">
                {card.title}
              </h3>
              <p className="text-slate-400 mb-6 text-base leading-7">
                {card.subtitle}
              </p>

              <div className="space-y-3 mb-6 text-sm text-slate-300">
                {card.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-cyan-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="relative z-10">
                {card.button.label ? (
                  <Link
                    href={card.button.href}
                    className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                      card.button.variant === "primary"
                        ? "bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] text-slate-950 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
                        : "bg-slate-800 border border-slate-700 text-slate-100 hover:bg-slate-700"
                    }`}
                  >
                    {card.button.label}
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
