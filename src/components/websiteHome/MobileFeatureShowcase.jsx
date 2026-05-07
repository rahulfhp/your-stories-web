"use client";

import { Shield, Layout } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import Link from "next/link";

const features = [
  {
    id: "dashboard",
    title: "Realtime Dashboard",
    description:
      "Live usage, unlock counts, and strict mode toggles on one screen so you can intervene instantly and control your phone usage in real time.",
    image: "/yourhour-website-img/phoneaddiction_dashboard.webp",
    icon: Layout,
    tags: ["Live usage", "Strict mode", "Floating timer"],
  },
  {
    id: "focus-mode",
    title: "Block Reels & Shorts",
    description:
      "Silence endless scrolling by blocking YouTube Shorts, Instagram Reels, and Facebook Reels. YourHour detects short-video sections and instantly shows a focus overlay to help users stay mindful and avoid distractions.",
    image: "/yourhour-website-img/focus.webp",
    icon: Shield,
    tags: ["Reels blocker", "Focus overlay", "Accessibility detection"],
  },
];

export default function MobileAppFeatures() {
  return (
    <div className="max-w-7xl mx-auto mt-16 lg:mt-24 space-y-24">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const isReverse = index % 2 !== 0;

        return (
          <section key={feature.id}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* Image */}
              <RevealOnScroll className={`${isReverse ? "lg:order-2" : ""}`}>
                <div className="relative rounded-3xl bg-slate-900 shadow-xl">
                  <div className="aspect-[1/1.2] py-6 rounded-2xl overflow-hidden bg-slate-950">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </RevealOnScroll>

              {/* Content */}
              <RevealOnScroll
                delay={100}
                className={`${isReverse ? "lg:order-1" : ""}`}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-slate-400 text-lg leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </section>
        );
      })}

      {/* button */}
      <div className="text-center">
        <Link
          href="/yourhour-features"
          className="text-center font-semibold font-montserrat text-lg text-[#21ABE1] border border-[#21ABE1] px-8 py-3 rounded-xl hover:bg-[#21ABE1]/10 hover:scale-105 transition-all inline-block"
        >
          See All Features
        </Link>
      </div>
    </div>
  );
}