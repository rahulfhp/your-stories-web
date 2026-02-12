import { Zap } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";

export default function AddictionScale() {
  const levels = [
    {
      label: "Champion",
      color: "bg-green-500",
      range: "< 1h",
      desc: "Total control.",
    },
    {
      label: "Achiever",
      color: "bg-emerald-500",
      range: "1-2h",
      desc: "Disciplined focus.",
    },
    {
      label: "Habitual",
      color: "bg-yellow-500",
      range: "2-3.5h",
      desc: "Usage is becoming unconscious.",
    },
    {
      label: "Dependent",
      color: "bg-orange-500",
      range: "3.5-5h",
      desc: "Struggling to function without checks.",
    },
    {
      label: "Obsessed",
      color: "bg-red-500",
      range: "5.5-8h",
      desc: "High distraction and mental clutter.",
    },
    {
      label: "Addicted",
      color: "bg-rose-600",
      range: "> 8h",
      desc: "Immediate detox required.",
    },
  ];

  return (
    <section id="impact" className="py-24 bg-slate-950 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 order-2 lg:order-1 w-full">
            <RevealOnScroll>
              <div className="relative pl-8 border-l-2 border-dashed border-slate-800 space-y-8">
                {levels.map((level, index) => (
                  <div key={level.label} className="relative group">
                    <div
                      className={`absolute -left-10 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 border-slate-900 ${level.color} shadow-md transition-all duration-300 group-hover:scale-150`}
                    ></div>
                    <div className="bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-800 flex items-center justify-between group-hover:shadow-lg group-hover:border-slate-700 group-hover:-translate-x-2 transition-all duration-300 cursor-default">
                      <div>
                        <h4
                          className={`font-bold text-lg ${
                            index > 3 ? "text-rose-500" : "text-white"
                          }`}
                        >
                          {level.label}
                        </h4>
                        <p className="text-sm text-slate-400">{level.desc}</p>
                      </div>
                      <div
                        className={`px-4 py-2 rounded-xl ${level.color} text-white font-bold text-nowrap text-sm shadow-sm`}
                      >
                        {level.range}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          <div className="flex-1 order-1 lg:order-2">
            <SectionHeading
              align="left"
              badge="Know Your Level"
              title="Identify & Overcome Digital Addiction"
              subtitle={
                <>
                  Using data from the past 7 days,{" "}
                  <span className="font-bold text-[#00BCD4]">Your Hour</span>{" "}
                  defines your Phone Addict Category. We help you move from{" "}
                  <span className="text-rose-500 font-bold bg-rose-500/10 px-2 py-1 rounded">
                    Addicted
                  </span>{" "}
                  to{" "}
                  <span className="text-green-500 font-bold bg-green-500/10 px-2 py-1 rounded">
                    Champion
                  </span>{" "}
                  through actionable insights.
                </>
              }
            />

            <RevealOnScroll delay={200}>
              <div className="bg-cyan-400/50 border border-slate-800 p-4 md:p-8 rounded-[2rem] shadow-2xl text-white relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500 shadow-cyan-900/50">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-700"></div>

                <div className="flex items-start gap-5 relative z-10">
                  <div className="p-4 bg-white/20 backdrop-blur-lg rounded-2xl shadow-inner">
                    <Zap size={32} className="text-yellow-300 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl mb-3">
                      Mindefy Smart Analysis
                    </h4>
                    <p className="text-cyan-50 leading-relaxed text-lg">
                      Our proprietary algorithm developed at Mindefy
                      Technologies analyzes your peak usage times, frequency of
                      unlocks, and app categories to give you a precise
                      diagnosis and action plan.
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
