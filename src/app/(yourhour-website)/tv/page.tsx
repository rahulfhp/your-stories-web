"use client";

import Link from "next/link";
import { useEffect } from "react";

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
            {/* <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-300">
              <svg className="h-4 w-4 text-[#00F0FF]" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              Designed for Android TV
            </div> */}
            <h1 className="text-5xl font-extrabold leading-tight text-white sm:text-6xl md:text-7xl">
              Modern Parenting for
              <br />
              <span className="bg-gradient-to-r from-[#00F0FF] to-[#00D0FF] bg-clip-text text-transparent">
                the Big Screen.
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 sm:text-xl">
              Protect your kids from infinite scrolling. Set unbreakable limits,
              track family viewing habits, and manage the living room directly
              from your phone.
            </p>
            <div className="mt-10 flex justify-center">
              <button className="rounded-full bg-[#00F0FF] px-8 py-4 cursor-pointer text-lg font-semibold text-slate-950 shadow-[0_0_30px_rgba(0,85,255,0.4)] transition hover:bg-[#00d0ff]">
                Download TV App
              </button>
            </div>
          </div>

          <div className="relative w-full max-w-5xl">
            <div className="animate-float relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#11131B] p-2 shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[1.25rem] bg-[#070b14] shadow-inner shadow-black/60">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.1),transparent)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/0 opacity-30" />
                <div className="absolute inset-y-0 left-0 w-20 bg-[#090c14] border-r border-white/10 p-5 text-white">
                  <div className="mb-10 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#00F0FF]/15 text-[#00F0FF]">
                      YH
                    </div>
                    <span className="hidden text-sm font-semibold md:block">
                      YourHour
                    </span>
                  </div>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="rounded-2xl bg-white/10 px-4 py-3 font-semibold text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
                      Dashboard
                    </div>
                    <div className="rounded-2xl px-4 py-3 text-slate-400">
                      Goals & Limits
                    </div>
                    <div className="rounded-2xl px-4 py-3 text-slate-400">
                      Parental Control
                    </div>
                  </div>
                </div>
                <div className="ml-20 h-full p-8 md:p-12 relative text-white">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.1),transparent)]" />
                  <div className="relative z-10 flex flex-col gap-10">
                    <div className="flex items-end justify-between">
                      <div>
                        <h2 className="text-4xl font-bold">Today's Usage</h2>
                        <p className="text-slate-400">Family Living Room</p>
                      </div>
                      <div className="text-right">
                        <div className="text-5xl font-semibold text-[#00F0FF]">
                          2h 15m
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-900">
                          <div className="h-full w-[75%] rounded-full bg-[#00F0FF]" />
                        </div>
                        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-400">
                          75% of Daily Limit
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                      <div className="rounded-3xl bg-white/5 p-5 border border-white/10 shadow-lg">
                        <div className="mb-6 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-red-600/20 text-red-500">
                              N
                            </div>
                            <span className="font-semibold">Netflix</span>
                          </div>
                          <span className="text-lg font-bold text-white">
                            1h 30m
                          </span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-[#02050e]">
                          <div className="h-full w-3/4 rounded-full bg-red-500" />
                        </div>
                      </div>
                      <div className="group relative overflow-hidden rounded-3xl bg-[#00d0ff]/10 p-5 border border-[#00d0ff]/20 shadow-lg">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        <div className="relative z-10 opacity-60">
                          <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white text-black">
                                YT
                              </div>
                              <span className="font-semibold">45m</span>
                            </div>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-[#02050e]">
                            <div className="h-full w-full rounded-full bg-white" />
                          </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                          <div className="rounded-full border border-red-400 bg-red-500/90 px-3 py-1 text-sm font-bold text-white shadow-lg">
                            LOCKED
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute left-1/2 top-full h-12 w-64 -translate-x-1/2 rounded-b-[2rem] bg-gradient-to-b from-slate-800 to-black blur-[2px]" />
            <div className="absolute left-1/2 top-[calc(100%+1.5rem)] h-6 w-3/4 -translate-x-1/2 rounded-full bg-[#00F0FF]/20 blur-2xl" />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050611] py-32">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="mb-24 reveal opacity-0 translate-y-6 transition-all duration-700">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0f172a]/50 bg-[#0f172a]/80 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-300">
              See It In Action
            </div>
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              The end of
              <br />
              screen time arguments.
            </h2>
            <p className="mt-6 text-lg text-slate-400 max-w-3xl mx-auto leading-8">
              Watch how YourHour seamlessly intercepts infinite watching and
              puts the control back in your hands, without the yelling.
            </p>
          </div>

          <div className="grid gap-16 lg:grid-cols-2">
            <div className="space-y-[30vh] py-[20vh] relative z-10">
              {[
                {
                  step: "01. The Setup",
                  title: "Set healthy boundaries.",
                  description:
                    "From your phone or directly on the TV, assign a daily limit to highly addictive apps like YouTube or Netflix. Let's say, 45 minutes.",
                },
                {
                  step: "02. The Intervention",
                  title: "Unbreakable limits.",
                  description:
                    "When the 45 minutes are up, the app doesn't just warn them. It instantly overlays the screen. Auto-play is stopped dead in its tracks. The TV is securely locked.",
                },
                {
                  step: "03. The Resolution",
                  title: "Remote Parenting.",
                  description:
                    "Kids want to finish their episode? They can request an extension on the TV. You instantly receive a notification on your phone to approve or deny it. You hold the master key.",
                },
              ].map((block) => (
                <div
                  key={block.step}
                  className="reveal opacity-0 translate-y-6 transition-all duration-700"
                >
                  <div className="text-[#00F0FF] font-bold text-xl mb-2">
                    {block.step}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {block.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-slate-400">
                    {block.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="hidden lg:block h-screen sticky top-0 pt-32">
              <div className="relative aspect-[4/3] perspective-1000">
                <div className="step-visual absolute inset-0 rounded-3xl border border-white/10 bg-[#080b14] p-4 transition-all duration-700">
                  <div className="h-full rounded-3xl bg-[#080b14] p-8 shadow-[inset_0_0_60px_rgba(0,0,0,0.35)]">
                    <div className="mb-8 text-white text-2xl font-bold border-b border-white/10 pb-4">
                      Set App Limits
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-3xl bg-white/5 border border-white/10 p-4 shadow-lg">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                            YT
                          </div>
                          <span className="font-semibold text-lg">YouTube</span>
                        </div>
                        <div className="rounded-2xl bg-[#00F0FF]/10 px-3 py-1 text-brand-cyan font-mono font-bold">
                          45 min
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded-3xl bg-white/5 border border-white/10 opacity-70 p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#000000] border border-red-600 text-red-600">
                            N
                          </div>
                          <span className="font-semibold text-lg">Netflix</span>
                        </div>
                        <div className="text-slate-400">1h 30m</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="step-visual absolute inset-0 opacity-0 scale-95 rounded-3xl border border-red-500/30 bg-[#080b14] p-4 transition-all duration-700">
                  <div className="flex h-full flex-col items-center justify-center rounded-3xl bg-gradient-to-b from-[#080b14] to-[#09111d] p-8 text-center shadow-[inset_0_0_100px_rgba(239,68,68,0.15)]">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 border border-red-500/30 text-red-500 shadow-[0_0_50px_rgba(239,68,68,0.4)] animate-pulse">
                      <svg
                        className="h-10 w-10"
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
                    <h3 className="text-3xl font-bold text-white mb-2">
                      Limit Reached
                    </h3>
                    <p className="mb-10 text-lg leading-relaxed text-slate-400">
                      YouTube daily limit of 45 minutes is over.
                    </p>
                    <button className="rounded-full bg-white px-8 py-3 text-black font-bold shadow-lg transition hover:bg-slate-200">
                      Request Extension
                    </button>
                  </div>
                </div>
                <div className="step-visual absolute inset-0 opacity-0 translate-y-10 rounded-3xl border border-white/10 bg-[#080b14] p-4 transition-all duration-700 flex items-center justify-center">
                  <div className="relative w-72 h-[450px] rounded-[2.5rem] border-[6px] border-[#1f2937] bg-[#090b14] p-4 shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
                    <div className="absolute left-1/2 top-0 h-5 w-1/3 -translate-x-1/2 rounded-b-xl bg-[#111827]" />
                    <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[#00F0FF]/20 blur-2xl" />
                    <div className="relative z-20 h-full rounded-3xl bg-gradient-to-br from-[#02040d] to-[#061221] p-5 shadow-[0_15px_40px_rgba(0,85,255,0.3)] transition-transform duration-300 hover:scale-[1.02]">
                      <div className="mb-3 flex items-center gap-2 text-sm text-slate-300">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-[#00F0FF] text-black">
                          !
                        </div>
                        <span>YourHour Mobile Sync</span>
                      </div>
                      <div className="mb-1 text-lg font-bold text-white">
                        Time Request: YouTube
                      </div>
                      <div className="mb-5 text-xs leading-relaxed text-slate-400">
                        Living Room TV is requesting 15 more minutes. Current
                        usage: 45m.
                      </div>
                      <div className="flex gap-3">
                        <button className="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10">
                          Deny
                        </button>
                        <button className="flex-1 rounded-xl bg-[#00F0FF] px-3 py-2 text-xs font-bold text-slate-950 transition hover:bg-[#00d4ff]">
                          Approve 15m
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="parenting"
        className="py-32 bg-[#020613] border-y border-white/5"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-20 lg:grid-cols-2 items-center">
            <div className="reveal opacity-0 translate-y-6 transition-all duration-700">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-red-300">
                Unbreakable Security
              </div>
              <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-6">
                Absolute peace of mind.
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
                    icon: (
                      <svg
                        className="h-6 w-6 text-[#00F0FF]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Temporary Extensions",
                    description:
                      "Kids need 5 more minutes? Securely grant temporary unlocks for 5 mins, 15 mins, or 1 hour.",
                    icon: (
                      <svg
                        className="h-6 w-6 text-[#00F0FF]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ),
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
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

      <section id="setup" className="py-32 bg-[#020613]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center reveal opacity-0 translate-y-6 transition-all duration-700">
            <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-4">
              Seamless Setup. Total Control.
            </h2>
            <p className="text-lg leading-8 text-slate-400 max-w-2xl mx-auto">
              Follow our guided TV onboarding to enable essential permissions
              (Usage, Overlay, and Notifications) ensuring unbreakable
              monitoring.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Usage Access",
                description:
                  "Required to see personalized insights and build healthier screen-time habits for the family.",
                button: "Enable Usage Access",
                icon: (
                  <svg
                    className="h-16 w-16 text-[#00F0FF]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                ),
              },
              {
                title: "Overlay Permission",
                description:
                  "Required to enforce parental controls and draw the unbreakable block screens over usage limits.",
                button: "Enable Overlay Permission",
                icon: (
                  <div className="flex h-16 w-24 items-center justify-center rounded-3xl bg-[#0b1724] border border-white/10 shadow-[0_15px_40px_rgba(0,85,255,0.3)]">
                    <svg
                      className="h-10 w-10 text-[#00F0FF]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                  </div>
                ),
              },
              {
                title: "Notifications",
                description:
                  "Receive screen-time limit reminders, healthy usage insights, and goal updates right on the TV.",
                button: "Allow Permissions",
                icon: (
                  <svg
                    className="h-16 w-16 text-[#00F0FF]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="reveal rounded-[1.5rem] border border-white/10 bg-[#0b111a] p-6 transition-all duration-700"
              >
                <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-xs uppercase tracking-[0.35em] text-slate-500 font-semibold">
                    Step
                  </span>
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00F0FF]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00F0FF]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                  </div>
                </div>
                <div className="mb-6">{card.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400 mb-8">
                  {card.description}
                </p>
                <button className="w-full rounded-xl bg-[#00F0FF] px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#00d4ff]">
                  {card.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="ecosystem"
        className="py-32 bg-[#020613] border-t border-white/5"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16 reveal opacity-0 translate-y-6 transition-all duration-700">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00F0FF]/20 bg-[#00F0FF]/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-[#00F0FF]">
              Premium Ecosystem
            </div>
            <h2 className="text-4xl font-extrabold text-white md:text-5xl mb-6">
              Control from your pocket.
            </h2>
            <p className="mx-auto max-w-3xl text-xl leading-8 text-slate-400">
              Pair the TV with your YourHour mobile app via a quick QR code.
              Follow these simple steps to manage your living room remotely in
              real-time.
            </p>
          </div>
          <div className="reveal rounded-[2rem] border border-white/10 bg-[#0b111a] p-8 shadow-2xl shadow-cyan-900/20 transition-all duration-700">
            <h3 className="text-center text-2xl font-bold text-white mb-8">
              Connect Your Mobile App
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-6">
              {[
                { label: "Get App", icon: "M" },
                { label: "Install", icon: "I" },
                { label: "Open", icon: "O" },
                { label: "Pair", icon: "P" },
                { label: "Approve", icon: "A" },
                { label: "Done", icon: "D" },
              ].map((step, index) => (
                <div
                  key={step.label}
                  className="rounded-2xl border border-white/10 bg-[#080b14] p-4 text-center text-sm text-slate-300"
                >
                  <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#00F0FF]/10 text-[#00F0FF] font-bold">
                    {index + 1}
                  </div>
                  <div className="mb-3 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00F0FF]">
                    {step.icon}
                  </div>
                  <p>{step.label}</p>
                </div>
              ))}
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
