"use client";

import { Activity, FileText, Layout } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const features = [
  {
    id: "dashboard",
    title: "Realtime Dashboard",
    description:
      "Live usage, unlock counts, and strict mode toggles on one screen so you can intervene instantly and control your phone usage in real time.",
    image: "/yourhour-website-img/phoneaddiction_dashboard.webp",
    icon: Layout,
    tags: ["Live usage", "Strict mode", "Floating timer"],
    stat: "2.1h avg time reclaimed",
  },
  {
    id: "levels",
    title: "Addiction Level Meter",
    description:
      "6-level radar from Champion to Addicted with weekly trends and unlock frequency to help users understand their phone addiction level and improve daily habits.",
    image: "/yourhour-website-img/phoneaddiction_level.webp",
    icon: Activity,
    tags: ["Trendlines", "Unlock heatmap", "Weekly analysis"],
    stat: "6 addiction levels",
  },
  {
    id: "reports",
    title: "Deep Reports & Exports",
    description:
      "Download PDF and XLS reports with category breakdowns, peak usage hours, and weekly progress to track improvement and share insights easily.",
    image: "/yourhour-website-img/phoneaddiction_detailed_reports.webp",
    icon: FileText,
    tags: ["PDF export", "Peak hours", "Usage breakdown"],
    stat: "PDF & XLS Reports",
  },
];

export default function MobileAppFeatures() {
  return (
    <div className="mt-16 lg:mt-24 space-y-24">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        const isReverse = index % 2 !== 0;

        return (
          <section key={feature.id}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <RevealOnScroll className={`${isReverse ? "lg:order-2" : ""}`}>
                <div className="relative rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
                  <div className="aspect-square py-6 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  <div className="absolute top-2 left-2 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full text-xs text-cyan-300">
                    Mobile UI
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

                  <div className="inline-block px-5 py-3 rounded-xl bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] text-slate-900 font-bold">
                    {feature.stat}
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </section>
        );
      })}
    </div>
  );
}
