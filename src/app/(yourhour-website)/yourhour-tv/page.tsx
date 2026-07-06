"use client";

import SectionHeading from "@/components/websiteHome/SectionHeading";
import { Lock, TimerIcon } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

const sections = [
  {
    step: "01. The Setup",
    title: "Set Healthy Boundaries.",
    description:
      "From your phone or directly on the TV, assign a daily limit to highly addictive apps like YouTube or Netflix. Let's say, 45 minutes.",
    image: "/yourhour-website-img/tv-usage.webp",
  },
  {
    step: "02. The Intervention",
    title: "Unbreakable Limits.",
    description:
      "When the 45 minutes are up, the app doesn't just warn them. It instantly overlays the screen. Auto-play is stopped dead in its tracks. The TV is securely locked.",
    image: "/yourhour-website-img/tv-pin.webp",
  },
  {
    step: "03. The Resolution",
    title: "Remote Parenting.",
    description:
      "Kids want to finish their episode? They can request an extension on the TV. You instantly receive a notification on your phone to approve or deny it. You hold the master key.",
    image: "/yourhour-website-img/tv-applist.webp",
  },
];

export default function TVPlatformPage() {
  useEffect(() => {
    const revealTargets = Array.from(
      document.querySelectorAll(".reveal"),
    ) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.2 },
    );

    revealTargets.forEach((target) => observer.observe(target));

    let currentIndex = 0;
    const visuals = Array.from(document.querySelectorAll(".step-visual"));
    const cycleVisuals = () => {
      visuals.forEach((visual, index) => {
        visual.classList.toggle("opacity-100", index === currentIndex);
        visual.classList.toggle("opacity-0", index !== currentIndex);
        visual.classList.toggle("scale-100", index === currentIndex);
        visual.classList.toggle("scale-95", index !== currentIndex);
      });
      currentIndex = (currentIndex + 1) % visuals.length;
    };
    cycleVisuals();
    const interval = window.setInterval(cycleVisuals, 4200);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#030305] text-white selection:bg-cyan-500/30 selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] h-[800px] w-[800px] rounded-full bg-[#00F0FF]/20 blur-[120px] opacity-40" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[#00D0FF]/10 blur-[120px] opacity-40" />
      </div>

      <section className="relative pt-28 pb-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
          <div className="mb-16 max-w-4xl">
            <h1 className="text-5xl font-extrabold leading-tight text-white sm:text-6xl">
              Modern Parenting For
              <br />
              <span className="bg-gradient-to-r from-[#00F0FF] to-[#00D0FF] bg-clip-text text-transparent">
                The Big Screen.
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 sm:text-xl">
              Protect your kids from infinite scrolling. Set unbreakable limits,
              track family viewing habits, and manage the living room directly
              from your phone.
            </p>
            <div className="mt-10 flex justify-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.mindefy.phoneaddiction.mobilepe"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#00F0FF] px-8 py-4 cursor-pointer text-lg font-semibold text-slate-950 shadow-[0_0_30px_rgba(0,85,255,0.4)] transition hover:bg-[#00d0ff]"
              >
                Download TV App
              </a>
            </div>
          </div>

          <div className="relative w-full max-w-5xl">
            <Image
              src="/yourhour-website-img/tv-hero.webp"
              alt="YourHour TV Platform"
              width={1200}
              height={675}
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050611] py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 text-center">
          <div className="mb-24 reveal opacity-0 translate-y-6 transition-all duration-700">
            <SectionHeading
              badge="See It In Action"
              title="The End Of Screen Time Arguments"
              subtitle="Watch how YourHour seamlessly intercepts infinite watching and
              puts the control back in your hands, without the yelling."
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="space-y-16">
              {sections.map((item, index) => (
                <div
                  key={item.step}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Content */}
                  <div>
                    <p className="text-cyan-400 font-semibold mb-3">
                      {item.step}
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                      {item.title}
                    </h2>

                    <p className="text-lg leading-8 text-slate-400">
                      {item.description}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="flex justify-center">
                    <div className="relative w-full max-w-[520px] aspect-square">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="parenting"
        className="py-16 bg-[#020613] border-y border-white/5"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-20 lg:grid-cols-2 items-center">
            <div className="reveal opacity-0 translate-y-6 transition-all duration-700">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs uppercase tracking-widest text-red-300">
                Unbreakable Security
              </div>
              <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-6">
                Absolute Peace Of Mind.
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-slate-400">
                The living room TV is the hardest screen to monitor. We've built
                an impenetrable Parental Control system based on a secure
                4-digit PIN, ensuring your boundaries are respected.
              </p>
              <div className="space-y-8">
                {[
                  {
                    title: "Automated App Locking",
                    description:
                      "Set daily limits for specific apps. Once the limit is hit, a full-screen lock overlay appears instantly. Only the parent's PIN can bypass it.",
                    icon: <Lock className="text-[#00F0FF]" />,
                  },
                  {
                    title: "Temporary Extensions",
                    description:
                      "Kids need 5 more minutes? Securely grant temporary unlocks for 5 mins, 15 mins, or 1 hour.",
                    icon: <TimerIcon className="text-[#00F0FF]" />,
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex items-center justify-center h-12 px-3 rounded-2xl bg-white/5 border border-white/10">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b101c] p-10 shadow-2xl shadow-cyan-900/10 reveal opacity-0 translate-y-6 transition-all duration-700">
              <div className="absolute inset-0 rounded-[2rem] bg-red-500/5 blur-3xl" />
              <div className="relative z-10 flex min-h-[24rem] flex-col items-center justify-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Limit Reached
                </h3>
                <p className="text-center text-sm leading-relaxed text-slate-400 mb-10">
                  Enter Parental PIN to extend time.
                </p>
                <div className="mb-10 flex gap-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-4 w-4 rounded-full bg-white/20 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                    />
                  ))}
                </div>
                <div className="grid w-full grid-cols-3 gap-4">
                  {["1", "2", "3", "4", "5", "6"].map((digit) => (
                    <div
                      key={digit}
                      className="flex h-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-gray-400 font-bold"
                    >
                      {digit}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="setup" className="py-16 bg-[#020613]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center reveal opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-4">
              Seamless Setup & Total Control
            </h2>
            <p className="text-lg leading-8 text-slate-400 max-w-2xl mx-auto">
              Follow our guided TV onboarding to enable essential permissions
              (Usage, Overlay, and Notifications) ensuring unbreakable
              monitoring.
            </p>
          </div>
          {/* Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-7xl aspect-[16/9]">
              <Image
                src="/yourhour-website-img/tv-setup.webp"
                alt="setup"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="ecosystem"
        className="py-16 bg-[#020613] border-t border-white/5"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16 reveal opacity-0 translate-y-6 transition-all duration-700">
            <SectionHeading
              badge="Premium Ecosystem"
              title="Control From Your Pocket"
              subtitle="Pair the TV with your YourHour mobile app via a quick QR code.
              Follow these simple steps to manage your living room remotely in
              real-time."
            />
          </div>
          <div className="reveal rounded-[2rem] border border-white/10 bg-[#0b111a] p-8 shadow-2xl shadow-cyan-900/20 transition-all duration-700">
            <h3 className="text-center text-2xl font-bold text-white mb-8">
              Connect Your Mobile App
            </h3>
            <div className="relative w-full max-w-7xl aspect-[16/9]">
              <Image
                src="/yourhour-website-img/tv-steps.webp"
                alt="setup"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .glass-nav {
          background: rgba(3, 3, 5, 0.7);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        .reveal {
          opacity: 0;
          transform: translateY(24px);
        }
        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity 0.8s ease,
            transform 0.8s ease;
        }
        .step-visual {
          opacity: 0;
          transform: scale(0.95);
        }
        .step-visual.opacity-100 {
          opacity: 1;
        }
        .step-visual.opacity-0 {
          opacity: 0;
        }
        .step-visual.scale-95 {
          transform: scale(0.95);
        }
        .step-visual.scale-100 {
          transform: scale(1);
        }
      `}</style>
    </main>
  );
}
