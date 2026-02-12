import { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import {
  BrainCircuit,
  Clock,
  Shield,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";

export default function AIDetoxCoachSection() {
  const [app, setApp] = useState("Instagram");
  const [hours, setHours] = useState("4");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultIndex, setResultIndex] = useState(0);

  const roastOptions = [
    {
      roast: ({ appName, hoursLabel }) =>
        `Spending ${hoursLabel} hours on ${appName}? That's not a hobby, that's a part-time job with zero pay. Your thumb has traveled more miles scrolling than you have walking this year.`,
      rescue: ({ appName, replaceHoursLabel }) =>
        `Set a 30-minute hard limit on ${appName} using YourHour. Replace the other ${replaceHoursLabel} hours with learning a new skill or actually talking to humans.`,
    },
    {
      roast: ({ appName, hoursLabel }) =>
        `${hoursLabel} hours on ${appName} is wild. At this point, your screen time report is basically a confession letter.`,
      rescue: ({ appName, replaceHoursLabel }) =>
        `Start with a 20-minute cap on ${appName}, then use the freed ${replaceHoursLabel} hours to build a real-world streak: gym, books, or a 10-minute walk.`,
    },
    {
      roast: ({ appName, hoursLabel }) =>
        `You gave ${appName} ${hoursLabel} hours today? That's rent-level attention. The algorithm is paying you in dopamine and you're working overtime.`,
      rescue: ({ appName, replaceHoursLabel }) =>
        `Flip ${appName} into Focus Mode with a 30-minute lock. Spend the extra ${replaceHoursLabel} hours on a single deep task and watch your brain unclog.`,
    },
    {
      roast: ({ appName, hoursLabel }) =>
        `${hoursLabel} hours scrolling ${appName}? Your battery isn't the only thing dying. Your attention span is on 1%.`,
      rescue: ({ appName, replaceHoursLabel }) =>
        `Block ${appName} after 30 minutes. Trade the saved ${replaceHoursLabel} hours for a creative outlet or a quick skill sprint.`,
    },
  ];

  const handleRoast = () => {
    setLoading(true);
    setShowResult(true);
    setResultIndex((prev) => {
      if (roastOptions.length <= 1) return 0;
      let next = Math.floor(Math.random() * roastOptions.length);
      if (next === prev) {
        next = (next + 1) % roastOptions.length;
      }
      return next;
    });
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const numericHours = Number(hours) || 0;
  const hoursLabel = hours?.toString().trim() || "0";
  const replaceHours = Math.max(0, numericHours - 0.5);
  const replaceHoursLabel =
    replaceHours % 1 === 0 ? replaceHours.toFixed(0) : replaceHours.toFixed(1);
  const appName = app?.trim() || "that app";
  const currentOption = roastOptions[resultIndex] || roastOptions[0];

  return (
    <section
      id="ai-coach"
      className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900"
    >
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <div className="text-center mb-12">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/80 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6 border border-slate-800/50 backdrop-blur-sm">
              <Sparkles size={16} />
              <span>AI DETOX COACH</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">
              The AI Habit Roast
            </h2>
            <p className="text-xl text-slate-400">
              Tell us your bad habit. We'll roast your scrolling addiction and
              provide a scientific dopamine detox plan to cut down screen time
              immediately.
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={100}>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-4 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2 ml-4">
                  Most Addictive App
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={app}
                    onChange={(e) => setApp(e.target.value)}
                    className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="e.g. TikTok..."
                  />
                  <Smartphone className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2 ml-4">
                  Daily Usage (Hours)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors appearance-none"
                    placeholder="e.g. 4"
                  />
                  <Clock className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="text-center mb-10">
              <button
                onClick={handleRoast}
                className="bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] text-white cursor-pointer shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 border border-transparent w-full md:w-auto text-lg py-4 px-6 md:px-10 rounded-2xl font-bold flex items-center justify-center gap-2 mx-auto transition-all hover:scale-105"
              >
                <BrainCircuit size={20} /> <span>Roast My Habit ✨</span>
              </button>
            </div>

            {showResult && (
              <div className="bg-slate-950 rounded-3xl p-4 md:p-8 border border-slate-800 relative">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-8 gap-4 opacity-50">
                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400">
                      Consulting with Mr. Slow...
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6 animate-fade-in">
                    <div className="flex gap-4">
                      <div className="p-3 bg-red-500/10 rounded-xl h-fit">
                        <Zap className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-red-400 text-sm uppercase tracking-wide mb-2">
                          The Roast 🔥
                        </h4>
                        <p className="text-base md:text-lg leading-relaxed text-white">
                          {currentOption.roast({ appName, hoursLabel })}
                        </p>
                      </div>
                    </div>
                    <div className="h-px bg-slate-800"></div>
                    <div className="flex gap-4">
                      <div className="p-3 bg-green-500/10 rounded-xl h-fit">
                        <Shield className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-green-400 text-sm uppercase tracking-wide mb-2">
                          The Rescue Plan 🛡️
                        </h4>
                        <p className="text-base md:text-lg leading-relaxed text-slate-300">
                          {currentOption.rescue({
                            appName,
                            replaceHoursLabel,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
