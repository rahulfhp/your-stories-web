import {
  Heart,
  Instagram,
  Lock,
  MessageCircle,
  MoreHorizontal,
  Music2,
  PlayCircle,
  Send,
  Shield,
  Youtube,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import RevealOnScroll from "./RevealOnScroll";

export default function Hero() {
  const [isBlocked, setIsBlocked] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    "Losing control is.",
    "Doomscrolling is.",
    "The dopamine loop is.",
    "Mental clutter is.",
  ];

  // Typewriter effect
  useEffect(() => {
    let timeout;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      // Deleting characters
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        }, 50);
      } else {
        // Done deleting, move to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    } else {
      // Typing characters
      if (displayText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        }, 100);
      } else {
        // Done typing, wait then start deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden text-white min-h-[90vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#040915] via-[#081A2D] to-[#020617]" />

        <div className="absolute -top-[30%] -left-[20%] w-[900px] h-[900px] bg-[#00BCD4]/18 rounded-full blur-[160px]" />
        <div className="absolute top-[10%] right-[-20%] w-[800px] h-[800px] bg-[#6D5DF6]/16 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-35%] left-[15%] w-[900px] h-[900px] bg-[#4DD0E1]/12 rounded-full blur-[180px]" />

        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>
      <div className="container w-full max-w-7xl mx-auto relative z-10 px-2">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16">
          <div className="flex-1 text-center lg:text-left">
            <RevealOnScroll>
              <div className="inline-flex sm:items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-wide mb-8 shadow-lg shadow-cyan-900/10 hover:border-cyan-500/50 transition-all group">
                <Zap
                  size={14}
                  className="text-cyan-400 fill-cyan-400 group-hover:scale-110 transition-transform"
                />
                <span>The Ultimate Digital Wellbeing App Android</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                Your phone isn't the problem. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] relative">
                  {displayText}
                  <span className="animate-blink">|</span>
                </span>
                <br />
              </h1>

              <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                Reclaim 2+ hours daily. The only app that intelligently blocks{" "}
                <span className="font-bold text-[#00BCD4]">Shorts & Reels</span>{" "}
                without blocking the entire app.
              </p>

              {/* --- Interactive Demo Control --- */}
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-5 rounded-2xl mb-10 max-w-md mx-auto lg:mx-0 shadow-lg shadow-black/20">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-white text-sm">
                      Interactive Demo
                    </p>
                    <p className="text-xs text-slate-400">
                      Toggle to see blocking in action
                    </p>
                  </div>

                  <button
                    onClick={() => setIsBlocked(!isBlocked)}
                    className={`relative w-16 h-8 cursor-pointer rounded-full transition-colors duration-300 focus:outline-none ${
                      isBlocked ? "bg-[#00BCD4]" : "bg-slate-700"
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                        isBlocked ? "translate-x-8" : "translate-x-0"
                      }`}
                    >
                      {isBlocked ? (
                        <Lock size={14} className="text-[#00BCD4]" />
                      ) : (
                        <PlayCircle size={14} className="text-slate-400" />
                      )}
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <a
                  href="https://play.google.com/store/apps/details?id=com.mindefy.phoneaddiction.mobilepe&hl=en_IN&gl=US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] text-white font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 transition-all"
                >
                  Reclaim My Focus
                </a>

                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md shadow-sm">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden"
                      >
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                            i + 30
                          }`}
                          alt="user"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col text-xs text-left">
                    <span className="font-bold text-white">4.3 Rating</span>
                    <span className="text-slate-400">76.9k+ Reviews</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Animated Phone Mockup - Focusing on Blocking */}
          <div className="flex-1 relative w-full max-w-[500px] lg:max-w-none flex justify-center lg:justify-end perspective-1000">
            <RevealOnScroll delay={200} className="relative z-10 w-75 md:w-85">
              <div className="relative mx-auto w-full h-[680px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden transform rotate-y-12 hover:rotate-0 transition-transform duration-700 ease-out shadow-black/50">
                {/* Screen Content: Showing Simulated Reel OR Blocking Overlay */}
                <div className="w-full h-full bg-black relative overflow-hidden">
                  {/* --- STATE 1: REEL PLAYING SIMULATION --- */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isBlocked ? "opacity-0 scale-95" : "opacity-100 scale-100"
                    }`}
                  >
                    {/* Fake Video Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-60"></div>

                    {/* UI Elements */}
                    <div className="absolute bottom-20 left-4 right-16 text-white z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-white rounded-full"></div>
                        <span className="font-bold text-sm">viral_trends</span>
                        <span className="text-xs border border-white/50 px-1 rounded">
                          Follow
                        </span>
                      </div>
                      <p className="text-sm mb-2">
                        Can't stop scrolling? 😱 This app is a lifesaver!
                        #productivity #tech
                      </p>
                      <div className="flex items-center gap-2 text-xs opacity-80">
                        <Music2 size={12} />
                        <span>Original Audio - viral_trends</span>
                      </div>
                    </div>

                    {/* Right Sidebar Icons */}
                    <div className="absolute bottom-20 right-2 flex flex-col items-center gap-6 text-white z-10">
                      <div className="flex flex-col items-center gap-1">
                        <Heart size={28} className="fill-white" />
                        <span className="text-xs font-bold">24K</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <MessageCircle size={28} />
                        <span className="text-xs font-bold">1.2K</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Send size={28} />
                      </div>
                      <MoreHorizontal size={28} />
                    </div>

                    {/* Floating Hearts Animation */}
                    <div className="absolute bottom-40 right-10 pointer-events-none">
                      <Heart className="absolute text-red-500 fill-red-500 w-8 h-8 animate-heart" />
                      <Heart
                        className="absolute text-red-500 fill-red-500 w-6 h-6 animate-heart delay-500"
                        style={{ right: "20px" }}
                      />
                      <Heart
                        className="absolute text-red-500 fill-red-500 w-10 h-10 animate-heart delay-1000"
                        style={{ right: "-10px" }}
                      />
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-12 left-2 right-2 h-1 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-white animate-progress"></div>
                    </div>

                    {/* Tab Bar Mockup */}
                    <div className="absolute bottom-0 w-full h-12 bg-black flex justify-around items-center text-white border-t border-white/10">
                      <div className="w-6 h-6 bg-white/20 rounded"></div>
                      <div className="w-6 h-6 bg-white/20 rounded"></div>
                      <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                      <div className="w-6 h-6 bg-white/20 rounded"></div>
                      <div className="w-6 h-6 bg-white/20 rounded-full"></div>
                    </div>
                  </div>

                  {/* --- STATE 2: BLOCKED OVERLAY --- */}
                  <div
                    className={`absolute inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center z-20 transition-all duration-500 transform ${
                      isBlocked
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-full"
                    }`}
                  >
                    <div className="w-24 h-24 bg-cyan-900/20 rounded-full flex items-center justify-center mb-6 animate-pulse border border-cyan-500/20">
                      <Shield size={48} className="text-[#00BCD4]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Limit Reached!
                    </h3>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                      You've hit your 30m limit on Reels. Time to focus on your
                      goals!
                    </p>

                    <div className="w-full bg-slate-800/50 rounded-2xl p-5 mb-6 border border-slate-700">
                      <div className="flex justify-between text-sm mb-3">
                        <span className="text-slate-400 font-medium">
                          Daily Limit
                        </span>
                        <span className="text-white font-bold">30m / 30m</span>
                      </div>
                      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] w-full animate-pulse"></div>
                      </div>
                    </div>

                    <button className="w-full py-4 bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-cyan-900/20">
                      Close App
                    </button>

                    {/* Notification Popups simulation */}
                    <div className="absolute top-12 left-4 right-4 bg-slate-800/90 backdrop-blur-md border border-slate-700 p-3 rounded-xl flex items-center gap-3 animate-bounce shadow-xl shadow-black/40">
                      <div className="w-8 h-8 bg-[#00BCD4] rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm">
                        YT
                      </div>
                      <div>
                        <p className="text-xs text-white font-bold">
                          Shorts Blocked
                        </p>
                        <p className="text-xs text-slate-400">
                          You saved 15 mins today
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements hooking specific features */}
              <div
                className={`absolute top-[30%] -left-4 md:-left-12 z-20 animate-float transition-all duration-500 ${
                  isBlocked
                    ? "opacity-0 scale-95 pointer-events-none"
                    : "opacity-100 scale-100"
                }`}
                style={{ animation: "float 6s ease-in-out infinite" }}
              >
                <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700 p-4 rounded-2xl shadow-xl shadow-black/40 flex items-center gap-3 transform -rotate-6 hover:rotate-0 transition-transform">
                  <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Instagram size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Reels
                    </p>
                    <p className="font-bold text-white text-base">BLOCKED 🛑</p>
                  </div>
                </div>
              </div>

              <div
                className={`absolute bottom-[20%] -right-4 md:-right-12 z-20 animate-float transition-all duration-500 ${
                  isBlocked
                    ? "opacity-0 scale-95 pointer-events-none"
                    : "opacity-100 scale-100"
                }`}
                style={{ animation: "float 5s ease-in-out infinite 1s" }}
              >
                <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700 p-4 rounded-2xl shadow-xl shadow-black/40 flex items-center gap-3 transform rotate-6 hover:rotate-0 transition-transform">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Youtube size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Shorts
                    </p>
                    <p className="font-bold text-white text-base">
                      Time Saved ⏳
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .animate-blink {
          animation: blink 0.75s step-end infinite;
        }
      `}</style>
    </section>
  );
}
