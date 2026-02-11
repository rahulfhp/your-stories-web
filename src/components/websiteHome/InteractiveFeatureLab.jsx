import { useState } from "react";
import {
  Activity,
  BarChart3,
  Facebook,
  FileText,
  Gamepad2,
  Instagram,
  Layout,
  Lock,
  Smartphone,
  Youtube,
} from "lucide-react";

const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 ${className}`}
  >
    {children}
  </span>
);

export default function InteractiveFeatureLab() {
  const [meterHours, setMeterHours] = useState(2.5);
  const [isStrict, setIsStrict] = useState(false);
  const [unlockCount, setUnlockCount] = useState(12);

  // Derived state for Meter
  const getMeterStatus = (hours) => {
    if (hours < 2)
      return {
        label: "Champion",
        icon: "🏆",
        color: "text-green-400",
        bg: "bg-green-500",
      };
    if (hours < 4)
      return {
        label: "Achiever",
        icon: "🥇",
        color: "text-blue-400",
        bg: "bg-blue-500",
      };
    if (hours < 6)
      return {
        label: "Habitual",
        icon: "😐",
        color: "text-yellow-400",
        bg: "bg-yellow-500",
      };
    return {
      label: "Addicted",
      icon: "😱",
      color: "text-red-400",
      bg: "bg-red-500",
    };
  };

  const meterStatus = getMeterStatus(meterHours);

  // Derived state for Unlock
  const getUnlockStatus = (count) => {
    if (count < 20)
      return {
        label: "Safe Zone",
        color: "text-green-400",
        bg: "bg-green-400/10",
      };
    if (count < 50)
      return {
        label: "Warning",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
      };
    return {
      label: "Danger Zone",
      color: "text-red-400",
      bg: "bg-red-400/10",
    };
  };

  const unlockStatus = getUnlockStatus(unlockCount);

  return (
    <div className="mt-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge className="mb-6">Interactive Feature Lab</Badge>
        <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white">
          Play with the Tools
        </h3>
        <p className="text-xl text-slate-400 font-light">
          Experience how YourHour helps you change your habits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {/* Addiction Meter */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-[2rem] p-8 shadow-xl h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-5 h-5 text-[#00BCD4]" />
                  <span className="text-xs font-bold text-[#00BCD4] uppercase tracking-wide">
                    Interactive Meter
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  What's Your Level?
                </h3>
              </div>
              <div className="text-right">
                <span className="text-4xl font-black text-white tabular-nums">
                  {meterHours}
                </span>
                <span className="text-sm font-medium text-slate-500 ml-1">
                  hrs
                </span>
              </div>
            </div>

            {/* Meter UI */}
            <div className="flex-1 flex flex-col justify-center mb-8">
              <div className="relative pt-8 pb-4">
                <div className="h-6 bg-slate-800 rounded-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 opacity-20"></div>
                  <div
                    className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-600 transition-all duration-300 ease-out"
                    style={{ width: `${(meterHours / 10) * 100}%` }}
                  ></div>
                </div>
                {/* Floating Label */}
                <div
                  className="absolute top-0 transform -translate-x-1/2 transition-all duration-300"
                  style={{ left: `${(meterHours / 10) * 100}%` }}
                >
                  <div className="px-4 py-2 bg-slate-800 text-white text-sm font-bold rounded-xl shadow-lg flex items-center gap-2 whitespace-nowrap border border-slate-700">
                    <span>{meterStatus.icon}</span>
                    <span>{meterStatus.label}</span>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 border-r border-b border-slate-700"></div>
                  </div>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={meterHours}
                onChange={(e) => setMeterHours(parseFloat(e.target.value))}
                className="w-full mt-6 accent-[#00BCD4]"
              />
              <div className="flex justify-between text-xs font-bold text-slate-500 mt-2 uppercase tracking-wide px-1">
                <span>Safe</span>
                <span>Warning</span>
                <span>Danger</span>
              </div>
            </div>
          </div>
        </div>

        {/* Export Reports */}
        <div className="lg:col-span-1">
          <div className="group h-full p-8 rounded-[2rem] bg-slate-900/50 backdrop-blur-md border border-slate-800 shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-cyan-500/10 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-[#00BCD4] flex items-center justify-center mb-6 transition-colors duration-300 relative z-10 shadow-inner group-hover:bg-[#00BCD4] group-hover:text-white">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 relative z-10">
              Export Reports
            </h3>
            <p className="text-slate-400 leading-relaxed relative z-10">
              Get detailed PDF reports to share your progress.
            </p>
          </div>
        </div>

        {/* Strict Mode */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden h-full flex flex-col hover:-translate-y-1 transition-transform duration-300 border border-slate-700">
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <div
                  className={`p-3 bg-white/5 rounded-xl border
                                      ${
                                        isStrict
                                          ? "border-[#00BCD4]"
                                          : "border-white/10"
                                      }`}
                >
                  <Lock
                    className={`w-6 h-6 ${
                      isStrict ? "text-[#00BCD4]" : "text-slate-400"
                    }`}
                  />
                </div>
                <button
                  onClick={() => setIsStrict(!isStrict)}
                  className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-full border text-xs font-bold uppercase tracking-wider transition-all ${
                    isStrict
                      ? "border-[#00BCD4]/50 bg-[#00BCD4]/10 text-[#00BCD4]"
                      : "border-white/10 text-slate-400 bg-white/5"
                  }`}
                >
                  <span>{isStrict ? "Active" : "Inactive"}</span>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isStrict ? "bg-[#00BCD4] animate-pulse" : "bg-slate-600"
                    }`}
                  ></div>
                </button>
              </div>
              <h3 className="text-xl font-bold mb-2">Strict App Limits</h3>
              <p className="text-slate-400 text-sm mb-20">
                Lock down distractions instantly.
              </p>
              <div className="grid grid-cols-4 gap-4">
                {[Gamepad2, Instagram, Youtube, Facebook].map((Icon, idx) => (
                  <div
                    key={idx}
                    className={`aspect-square lg:w-20 rounded-2xl flex items-center justify-center relative transition-all duration-300 ${
                      isStrict
                        ? "bg-slate-700 grayscale opacity-50"
                        : "bg-slate-700/50"
                    }`}
                  >
                    <Icon className="w-8 h-8 text-[#00BCD4]" />
                    {isStrict && (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 rounded-2xl">
                        <Lock className="w-4 h-4 text-white/80" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Unlock Frequency */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-[2rem] p-8 shadow-xl h-full flex flex-col justify-between hover:shadow-cyan-500/10 transition-all duration-300 relative overflow-hidden">
            <div>
              <div className="flex items-center gap-2 mb-4 text-[#00BCD4]">
                <Layout className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wide">
                  Tracker
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Unlock Frequency
              </h3>
              <p className="text-slate-400 text-sm">
                Every unlock interrupts focus.
              </p>
            </div>
            <div className="text-center relative py-8">
              <div className="text-6xl font-black text-white mb-2 tabular-nums tracking-tighter">
                {unlockCount}
              </div>
              <span
                className={`text-xs font-bold uppercase tracking-wide inline-block px-3 py-1 rounded-full ${unlockStatus.color} ${unlockStatus.bg}`}
              >
                {unlockStatus.label}
              </span>
            </div>
            <button
              onClick={() => setUnlockCount((prev) => prev + 1)}
              className="w-full py-4 cursor-pointer bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] hover:brightness-110 text-white font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Smartphone className="w-4 h-4" /> Check Phone
            </button>
          </div>
        </div>

        {/* Floating Timer */}
        <div className="lg:col-span-1">
          <div className="group h-full p-8 rounded-[2rem] bg-slate-900/50 backdrop-blur-md border border-slate-800 shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-cyan-500/10 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-[#00BCD4] flex items-center justify-center mb-6 transition-colors duration-300 relative z-10 shadow-inner group-hover:bg-[#00BCD4] group-hover:text-white">
              <BarChart3 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 relative z-10">
              Floating Timer
            </h3>
            <p className="text-slate-400 leading-relaxed relative z-10">
              Experience the stay focused app tool that follows you into the
              "danger zone" apps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
