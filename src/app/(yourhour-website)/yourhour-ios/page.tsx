"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Gauge,
  MoonStar,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

const APP_STORE_URL =
  "https://apps.apple.com/in/app/yourhour-screen-time-control/id6784166547";

const featureScreens = [
  {
    id: "dashboard",
    title: "The Dashboard",
    subtitle: "Your Daily Usage Summary",
    description:
      "Track usage time, unlock count, top apps, and daily trends in one live screen so you can make better decisions instantly.",
    image: "/yourhour-website-img/ios-landing-dashboard.webp",
    icon: Gauge,
  },
  {
    id: "reports",
    title: "Multiple Reports",
    subtitle: "Daily, Weekly, Monthly",
    description:
      "Get visual usage reports with clear comparisons across days and weeks.",
    image: "/yourhour-website-img/ios-report-frame.webp",
    icon: BarChart3,
  },
  {
    id: "goal-spots",
    title: "Addiction Level Meter",
    subtitle: "From Champion to Addicted",
    description:
      "Understand your addiction level and improve digital wellbeing.",
    image: "/yourhour-website-img/ios-addiction-level-frame.webp",
    icon: Target,
  },
  {
    id: "challenges",
    title: "Curated Challenges",
    subtitle: "Break Habit Loops Faster",
    description: "Follow guided app fasting and no-phone sessions.",
    image: "/yourhour-website-img/ios-challenges-frame.webp",
    icon: Trophy,
  },
  {
    id: "mindful-pause",
    title: "Mindful Pause",
    subtitle: "Pause Before You Open Distracting Apps",
    description:
      "Interrupt impulsive app usage with customizable mindful pause screens. Track how many times you try to open apps like WhatsApp and choose whether to continue or stay focused.",
    image: "/yourhour-website-img/ios-mindful-pause-frame.webp",
    icon: ShieldCheck,
  },
  {
    id: "dark-mode",
    title: "Dark & Light Mode",
    subtitle: "Comfort Across Contexts",
    description: "Use the app comfortably day and night.",
    image: "/yourhour-website-img/ios-dark-light.webp",
    icon: MoonStar,
  },
];

export default function YourHourIOSFeaturesPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = featureScreens[activeIndex];

  const tabsRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    const tabs = tabsRef.current;
    if (!tabs) return;

    isDown.current = true;
    startX.current = event.pageX - tabs.offsetLeft;
    scrollLeft.current = tabs.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const tabs = tabsRef.current;
    if (!isDown.current || !tabs) return;

    event.preventDefault();
    const x = event.pageX - tabs.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    tabs.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* HERO SECTION */}
      <section className="container mx-auto max-w-7xl px-4 pb-24 pt-24 md:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00BCD4] px-4 py-2 font-semibold text-[#00BCD4]">
              <Sparkles className="h-4 w-4" /> YourHour iOS Features
            </div>

            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Take control of your
              <span className="text-[#00BCD4]"> screen time</span>
              <br /> with YourHour
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Monitor usage, track addiction levels, generate reports, and build
              healthy digital habits using powerful and simple tools designed
              for everyday users.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#00BCD4] px-4 py-2 font-semibold transition-all hover:scale-105 hover:shadow-cyan-500/40"
              >
                Download for iOS
              </Link>

              <Link
                href="https://stories.yourhourapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#00BCD4] px-4 py-2 font-semibold text-[#00BCD4] transition-all hover:scale-105 hover:shadow-cyan-500/40"
              >
                Success Stories
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <motion.img
              src="/yourhour-website-img/ios-dashboard-frame.webp"
              alt="YourHour app dashboard"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-80 max-w-full shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* TABS FEATURE SECTION */}
      <section className="container mx-auto max-w-7xl px-4 pb-24">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Explore YourHour Features
          </h2>
          <p className="mt-3 text-slate-400">
            Drag tabs left or right to explore all features
          </p>
        </div>

        {/* DRAG SCROLL TABS */}
        <div
          ref={tabsRef}
          className="scrollbar-hide flex cursor-grab gap-4 overflow-x-auto pb-4 active:cursor-grabbing"
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
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 font-semibold transition-all ${
                  isActive
                    ? "border-[#00BCD4] bg-[#00BCD4] text-white"
                    : "border-[#00BCD4] text-[#00BCD4] hover:border-[#00BCD4]"
                }`}
              >
                <Icon className="h-5 w-5" />
                {feature.title}
              </button>
            );
          })}
        </div>

        {/* CONTENT BELOW TABS */}
        <div className="mx-auto mt-8 grid max-w-7xl items-center gap-6 lg:grid-cols-2">
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
                alt={activeFeature.title}
                className="w-80 max-w-full shadow-2xl"
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
              className="rounded-3xl border border-slate-700 bg-slate-900 p-6"
            >
              <h3 className="text-2xl font-bold">{activeFeature.title}</h3>

              <p className="mt-2 text-cyan-400">{activeFeature.subtitle}</p>

              <p className="mt-4 text-slate-300">{activeFeature.description}</p>

              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-full bg-[#00BCD4] px-5 py-3 font-semibold transition-all hover:scale-105 hover:shadow-cyan-500/40"
              >
                Try This Feature
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* BENTO GRID */}
      <section className="container mx-auto max-w-7xl px-4 pb-24">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Feature Overview
        </h2>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">
          {featureScreens.map((feature) => (
            <motion.div
              key={feature.id}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl border border-slate-700 bg-slate-900 px-2 py-4 text-center"
            >
              <feature.icon className="mx-auto mb-3 text-cyan-400" />
              <p className="font-semibold">{feature.title}</p>
              <p className="mt-2 text-xs text-slate-400">{feature.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto max-w-4xl px-4 pb-8 text-center">
        <h3 className="text-3xl font-bold">
          Start Your Digital Wellbeing Journey Today
        </h3>

        <p className="mt-4 text-slate-300">
          Download YourHour and take control of your screen time.
        </p>

        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-full bg-[#00BCD4] px-5 py-3 font-semibold transition-all hover:scale-105 hover:shadow-cyan-500/40"
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
