"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  BarChart3,
  Download,
  Gauge,
  MoonStar,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

const PLAYSTORE_URL =
  "https://play.google.com/store/apps/details?id=com.mindefy.phoneaddiction.mobilepe&hl=en_IN&gl=US";

const featureScreens = [
  {
    id: "dashboard",
    title: "The Dashboard",
    subtitle: "Your Daily Usage Summary",
    description:
      "Track usage time, unlock count, top apps, and daily trends in one live screen so you can make better decisions instantly.",
    image: "/yourhour-website-img/phoneaddiction_dashboard.webp",
    icon: Gauge,
  },
  {
    id: "reports",
    title: "Multiple Reports",
    subtitle: "Daily, Weekly, Monthly",
    description:
      "Get visual usage reports with clear comparisons across days and weeks.",
    image: "/yourhour-website-img/phoneaddiction_multiple_reports.webp",
    icon: BarChart3,
  },
  {
    id: "goal-spots",
    title: "Addiction Level Meter",
    subtitle: "From Champion to Addicted",
    description:
      "Understand your addiction level and improve digital wellbeing.",
    image: "/yourhour-website-img/phoneaddiction_level.webp",
    icon: Target,
  },
  {
    id: "challenges",
    title: "Curated Challenges",
    subtitle: "Break Habit Loops Faster",
    description: "Follow guided app fasting and no-phone sessions.",
    image: "/yourhour-website-img/phoneaddiction_challenges.webp",
    icon: Trophy,
  },
  {
    id: "analytics",
    title: "Detailed Analytics",
    subtitle: "PDF Ready Insights",
    description: "Deep reports for categories and peak usage behavior.",
    image: "/yourhour-website-img/phoneaddiction_detailed_reports.webp",
    icon: Activity,
  },
  {
    id: "data-export",
    title: "Data Export",
    subtitle: "Keep Everything Portable",
    description: "Export reports in Excel and PDF anytime.",
    image: "/yourhour-website-img/phoneaddiction_reports.webp",
    icon: Download,
  },
  {
    id: "mindful-pause",
    title: "Mindful Pause",
    subtitle: "Intervene at the Right Time",
    description: "Pause prompts to reduce unconscious scrolling.",
    image: "/yourhour-website-img/mindful-pause.webp",
    icon: ShieldCheck,
  },
  {
    id: "dark-mode",
    title: "Dark & Light Mode",
    subtitle: "Comfort Across Contexts",
    description: "Use the app comfortably day and night.",
    image: "/yourhour-website-img/dark-light.webp",
    icon: MoonStar,
  },
];

export default function YourHourFeaturesModernPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = featureScreens[activeIndex];

  const tabsRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - tabsRef.current.offsetLeft;
    scrollLeft.current = tabsRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - tabsRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    tabsRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="container mx-auto max-w-7xl px-4 pt-24 md:pt-28 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 font-semibold border border-[#00BCD4] px-2 py-2 rounded-full text-[#00BCD4] mb-6">
              <Sparkles className="w-4 h-4" /> YourHour Mobile Features
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Take control of your
              <span className="text-[#00BCD4]"> screen time</span>
              <br /> with YourHour
            </h1>

            <p className="text-slate-300 mt-6 text-lg max-w-xl">
              Monitor usage, track addiction levels, generate reports, and build
              healthy digital habits using powerful and simple tools designed
              for everyday users.
            </p>

            <div className="flex gap-4 mt-8 flex-wrap">
              <a
                href={PLAYSTORE_URL}
                target="_blank"
                className="bg-[#00BCD4] px-4 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:shadow-cyan-500/40 hover:scale-105 transition-all"
              >
                Download App
              </a>

              <Link
                href="/blogs"
                className="border border-[#00BCD4] text-[#00BCD4] font-semibold px-4 py-2.5 rounded-full hover:shadow-cyan-500/40 hover:scale-105 transition-all"
              >
                Success Stories
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <motion.img
              src="/yourhour-website-img/phoneaddiction_dashboard.webp"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-95 rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* TABS FEATURE SECTION */}
      <section className="container mx-auto max-w-7xl px-4 pb-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Explore YourHour Features
          </h2>
          <p className="text-slate-400 mt-3">
            Drag tabs left or right to explore all features
          </p>
        </div>

        {/* DRAG SCROLL TABS */}
        <div
          ref={tabsRef}
          className="flex gap-4 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing scrollbar-hide"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {featureScreens.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = index === activeIndex;

            return (
              <button
                key={feature.id}
                onClick={() => setActiveIndex(index)}
                className={`flex items-center gap-2 px-4 py-2.5 font-semibold rounded-full cursor-pointer border whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#00BCD4] text-white border-[#00BCD4]"
                    : "text-[#00BCD4] border-[#00BCD4] hover:border-[#00BCD4]"
                }`}
              >
                <Icon className="w-5 h-5" />
                {feature.title}
              </button>
            );
          })}
        </div>

        {/* CONTENT BELOW TABS */}
        <div className="mt-8 grid lg:grid-cols-2 gap-10 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.image}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <img
                src={activeFeature.image}
                className="w-90 rounded-3xl shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.title}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl p-6"
            >
              <h3 className="text-2xl font-bold">{activeFeature.title}</h3>

              <p className="text-cyan-400 mt-2">{activeFeature.subtitle}</p>

              <p className="text-slate-300 mt-4">{activeFeature.description}</p>

              <a
                href={PLAYSTORE_URL}
                target="_blank"
                className="inline-flex mt-6 bg-[#00BCD4] font-semibold px-5 py-3 rounded-full hover:shadow-cyan-500/40 hover:scale-105 transition-all"
              >
                Try This Feature
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* BENTO GRID */}
      <section className="container mx-auto max-w-7xl px-4 pb-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Feature Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureScreens.map((feature) => (
            <motion.div
              key={feature.id}
              whileHover={{ scale: 1.05 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center"
            >
              <feature.icon className="mx-auto text-cyan-400 mb-4" />
              <p className="font-semibold">{feature.title}</p>
              <p className="text-xs text-slate-400 mt-2">{feature.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-4xl px-4 pb-8 text-center">
        <h3 className="text-3xl font-bold">
          Start your digital wellbeing journey today
        </h3>

        <p className="text-slate-300 mt-4">
          Download YourHour and take control of your screen time.
        </p>

        <a
          href={PLAYSTORE_URL}
          target="_blank"
          className="inline-flex mt-6 bg-[#00BCD4] px-5 py-3 font-semibold rounded-full hover:shadow-cyan-500/40 hover:scale-105 transition-all"
        >
          Get YourHour Free
        </a>
      </section>

      {/* HIDE SCROLLBAR */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}