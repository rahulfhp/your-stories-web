"use client";

import { useState, useEffect, useRef } from "react";
import useStoriesStore from "@/stores/stories";
import WebsiteStoryCard from "@/components/WebsiteStoryCard";
import {
  Activity,
  BarChart3,
  Shield,
  ArrowRight,
  Zap,
  Layout,
  FileText,
  Globe,
  Rocket,
  Lock,
  PlayCircle,
  Heart,
  MessageCircle,
  Send,
  Music2,
  MoreHorizontal,
  Sparkles,
  Smartphone,
  Clock,
  BrainCircuit,
  Users,
  Star,
  Gamepad2,
  Instagram,
  Youtube,
  Facebook,
} from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import FeaturesPage from "@/components/YourHourAppFeatures";
import {
  trackWebsiteHandpickedStoryCardClicked,
  trackWebsiteLetsReadClicked,
  trackWebsiteBlogCardClicked,
} from "@/lib/website-analytics";
import { createStorySlug, createBlogSlug } from "@/lib/utils";
import { popularPosts, blogData } from "@/lib/website-blogs";
import { useRouter } from "next/navigation";
import MindfulNestChatbot from "@/components/MindfulNestChatbot";

// --- Global Styles & Animations ---
const GlobalStyles = () => (
  <style>{`
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .glass-nav {
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255,255,255,0.05);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
    }
    .glass-card {
      background: rgba(30, 41, 59, 0.4);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .text-gradient {
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      background-image: linear-gradient(to right, #4DD0E1, #00BCD4);
    }
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-scroll {
      animation: scroll 25s linear infinite;
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    @keyframes float-heart {
      0% { transform: translateY(0) scale(1); opacity: 0; }
      20% { opacity: 1; }
      100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
    }
    .animate-heart {
      animation: float-heart 2s ease-out infinite;
    }
    .delay-500 { animation-delay: 500ms; }
    .delay-1000 { animation-delay: 1000ms; }
    
    @keyframes progress {
      0% { width: 0%; }
      100% { width: 100%; }
    }
    .animate-progress {
      animation: progress 15s linear infinite;
    }
  `}</style>
);

// --- Animation Components ---

const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- UI Components ---

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center px-6 py-3 cursor-pointer rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95";
  const variants = {
    primary:
      "bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:brightness-110 border border-transparent",
    dark: "bg-slate-800 text-slate-100 shadow-lg shadow-black/20 hover:bg-slate-700 hover:text-white",
    gradient:
      "bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4] text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 border border-transparent",
    secondary:
      "bg-slate-800/50 backdrop-blur-md text-slate-200 border border-slate-700 hover:border-[#00BCD4]/50 hover:bg-slate-800 shadow-sm",
    outline:
      "border-2 border-slate-700 text-slate-300 hover:border-[#00BCD4] hover:text-[#00BCD4] hover:bg-slate-800/50",
    ghost: "text-slate-400 hover:text-[#00BCD4] hover:bg-cyan-500/10",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 ${className}`}
  >
    {children}
  </span>
);

const SectionHeading = ({
  badge,
  title,
  subtitle,
  align = "center",
  dark = true,
}) => (
  <RevealOnScroll
    className={`mb-12 ${
      align === "center" ? "text-center" : "text-left"
    } max-w-4xl mx-auto`}
  >
    {badge && <Badge className="mb-6">{badge}</Badge>}
    <h2
      className={`text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight text-white`}
    >
      {title}
    </h2>
    <p className={`text-xl leading-relaxed font-light text-slate-400`}>
      {subtitle}
    </p>
  </RevealOnScroll>
);

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  color = "blue",
  delay,
}) => {
  const colors = {
    blue: "bg-cyan-500/10 text-cyan-400",
    indigo: "bg-cyan-500/10 text-cyan-400",
    purple: "bg-cyan-500/10 text-cyan-400",
    green: "bg-cyan-500/10 text-cyan-400",
    orange: "bg-cyan-500/10 text-cyan-400",
    pink: "bg-cyan-500/10 text-cyan-400",
    red: "bg-cyan-500/10 text-cyan-400",
  };

  return (
    <RevealOnScroll delay={delay}>
      <div
        className={`group min-h-76 p-8 rounded-3xl border transition-all duration-500 bg-slate-900/50 backdrop-blur-sm border-slate-800 hover:border-[#00BCD4]/30 shadow-sm hover:shadow-2xl hover:shadow-cyan-900/10 hover:-translate-y-2`}
      >
        <div
          className={`w-14 h-14 rounded-2xl ${colors[color]} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm ring-1 ring-white/5`}
        >
          <Icon size={28} />
        </div>
        <h3 className="text-xl font-bold text-white mb-3 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
          {description}
        </p>

        {(color === "red" || color === "orange") && (
          <div className="mt-4 inline-flex items-center text-sm font-bold text-cyan-400">
            Most Popular Feature
          </div>
        )}
      </div>
    </RevealOnScroll>
  );
};

// --- Sections ---

const Hero = () => {
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-wide mb-8 shadow-lg shadow-cyan-900/10 hover:border-cyan-500/50 transition-all group">
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
                Stop the unconscious scroll with{" "}
                <span className="font-bold text-[#00BCD4]">YourHour,</span> the
                ultimate{" "}
                <span className="font-bold text-[#00BCD4]">
                  dopamine detox app.
                </span>{" "}
                Reclaim 2+ hours of your life daily. <br />
                Built for{" "}
                <span className="font-bold text-[#00BCD4]">ADHD brains, </span>
                minds, and anyone fighting a{" "}
                <span className="font-bold text-[#00BCD4]">
                  scrolling addiction.
                </span>
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
                className="absolute top-[30%] -left-4 md:-left-12 z-20 animate-float"
                style={{ animation: "float 6s ease-in-out infinite" }}
              >
                <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700 p-4 rounded-2xl shadow-xl shadow-black/40 flex items-center gap-3 transform -rotate-6 hover:rotate-0 transition-transform">
                  <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <span className="font-bold text-sm">IG</span>
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
                className="absolute bottom-[20%] -right-4 md:-right-12 z-20 animate-float"
                style={{ animation: "float 5s ease-in-out infinite 1s" }}
              >
                <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700 p-4 rounded-2xl shadow-xl shadow-black/40 flex items-center gap-3 transform rotate-6 hover:rotate-0 transition-transform">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <span className="font-bold text-sm">YT</span>
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
};

const LogoTicker = () => {
  const logos = [
    { key: "inc42", label: "inc42", countryFlag: "🇮🇳" },
    { key: "dainik_bhasker", label: "dainik_bhasker", countryFlag: "🇮🇳" },
    { key: "sakal", label: "sakal", countryFlag: "🇮🇳" },
    { key: "dailyStar", label: "dailyStar", countryFlag: "🇧🇩" },
    { key: "independent", label: "independent", countryFlag: "🇬🇧" },
    { key: "dailyhunt", label: "dailyhunt", countryFlag: "🇮🇳" },
    { key: "lifehack", label: "lifehack", countryFlag: "🇺🇸" },
    { key: "witty_spark", label: "witty_spark", countryFlag: "🇮🇳" },
    { key: "tracxn", label: "tracxn", countryFlag: "🇮🇳" },
    { key: "nerdschalk", label: "nerdschalk", countryFlag: "🇮🇳" },
    { key: "techarival", label: "techarival", countryFlag: "🇮🇳" },
    { key: "techConnecto", label: "techConnecto", countryFlag: "🇮🇳" },
    { key: "techdator", label: "techdator", countryFlag: "🇳🇱" },
    { key: "newsBytes", label: "newsBytes", countryFlag: "🇮🇳" },
    { key: "tech_comuters", label: "tech_comuters", countryFlag: "🇮🇳" },
    { key: "Elcome", label: "Elcome", countryFlag: "🇪🇬" },
    { key: "android4all", label: "android4all", countryFlag: "🇪🇸" },
    { key: "cosmo", label: "cosmo", countryFlag: "🇩🇪" },
    { key: "h2s", label: "h2s", countryFlag: "🇮🇳" },
    { key: "gt", label: "gt", countryFlag: "🇺🇸" },
    { key: "geochild", label: "geochild", countryFlag: "🇮🇳" },
    { key: "rochamama", label: "rochamama", countryFlag: "🇮🇳" },
    { key: "steemit", label: "steemit", countryFlag: "🇺🇸" },
    { key: "topbest", label: "topbest", countryFlag: "🇺🇸" },
  ];

  return (
    <section className="py-10 bg-slate-950 border-y border-slate-800 overflow-hidden">
      <div className="container mx-auto px-4 mb-6 text-center">
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
          Featured In Global Media
        </p>
      </div>
      <div className="relative flex group">
        <div className="flex animate-scroll whitespace-nowrap group-hover:pause">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.key}-${index}`}
              className="mx-8 relative flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300"
            >
              <div className="relative p-2 border border-white rounded-xl">
                <img
                  src={`yourhour-website-img/yourhour_${logo.label}.${
                    logo.label === "techdator" ? "png" : "webp"
                  }`}
                  alt={logo.label}
                  className="h-16 md:h-20 max-w-fit object-contain brightness-0 invert"
                  loading="lazy"
                />
              </div>
              <span className="absolute text-4xl -bottom-2 -right-4 shadow-sm rounded-full flex items-center justify-center">
                {logo.countryFlag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InteractiveFeatureLab = () => {
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
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
          Play with the Tools
        </h2>
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
};

const DashboardFeatures = () => {
  return (
    <section
      id="features"
      className="py-24 bg-slate-950 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#00BCD4 1px, transparent 1px), linear-gradient(90deg, #00BCD4 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          badge="Powerful Features"
          title="THE AWARENESS LAB"
          subtitle='Encourage high "time on page" through interactive demos.'
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            icon={Shield}
            title="Interactive Addiction Meter"
            description="Where do you stand? Our digital detox app identifies your level from Champion to Addicted."
            color="blue"
            delay={0}
          />
          <FeatureCard
            icon={Lock}
            title="Strict Mode Simulator"
            description="Experience the ultimate social media detox. Lock distracting apps (Games, Social, Video) with zero bypasses."
            color="orange"
            delay={100}
          />
          <FeatureCard
            icon={BarChart3}
            title="The Floating Timer"
            description='Experience the stay focused app tool that follows you into the "danger zone" apps.'
            color="blue"
            delay={200}
          />
          <FeatureCard
            icon={Layout}
            title="Unlock Frequency Tracker"
            description='Every unlock is an interruption. Real-time feedback on your "Compulsive Check" count.'
            color="indigo"
            delay={300}
          />
          <FeatureCard
            icon={Activity}
            title="Addiction Level Meter"
            description="We categorize your usage into 6 distinct levels, guiding you from 'Addicted' to 'Champion' status."
            color="orange"
            delay={400}
          />
          <FeatureCard
            icon={FileText}
            title="Data Export"
            description="Transparency is key. Export your detailed usage reports to PDF or XLSX anytime for personal archiving."
            color="orange"
            delay={500}
          />
        </div>

        <InteractiveFeatureLab />
      </div>
    </section>
  );
};

const MindefyPromo = () => {
  return (
    <section
      id="mindefy"
      className="py-24 bg-slate-900 relative overflow-hidden"
    >
      {/* Abstract Tech Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-900/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-900/20 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-[2.5rem] p-6 md:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 shadow-xl shadow-black/20">
          <div className="flex-1 text-center lg:text-left">
            <Badge className="mb-6 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
              Developed by Mindefy Technologies
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Want to build an app with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4]">
                Millions of Users?
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Your Hour is a testament to our engineering excellence. At{" "}
              <span className="font-bold text-white">Mindefy Technologies</span>
              , we turn ambitious ideas into scalable products.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700 shadow-sm">
                <Rocket className="text-cyan-400 mb-2" />
                <h4 className="font-bold text-lg text-white">Scalable Tech</h4>
                <p className="text-sm text-slate-500">Built for millions</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700 shadow-sm">
                <Globe className="text-blue-400 mb-2" />
                <h4 className="font-bold text-lg text-white">Global Reach</h4>
                <p className="text-sm text-slate-500">25+ Languages Support</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-white text-slate-900 hover:bg-slate-200 px-4 md:px-8 shadow-lg shadow-white/10">
                Partner with Mindefy
              </Button>
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 hover:border-white hover:text-white"
              >
                View Our Portfolio
              </Button>
            </div>
          </div>

          <div className="flex-1 w-full relative flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
              {/* 🔵 Animated Background Glow (PRESERVED) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00BCD4] to-[#4DD0E1] rounded-full opacity-10 animate-pulse scale-110" />

              {/* 🟦 Card Container */}
              <div className="relative bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-4 sm:p-8 md:p-10 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <img
                    src="yourhour-website-img/brain-logo.svg"
                    alt="logo"
                    className="h-12 sm:h-16 md:h-20"
                    loading="lazy"
                  />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
                  Mindefy Technologies
                </h3>

                <p className="text-slate-500 text-sm sm:text-base">
                  Where Innovation Meets Execution
                </p>

                {/* 🧩 Feature List */}
                <div className="mt-6 sm:mt-8 space-y-3 text-left bg-slate-800/50 p-4 sm:p-6 rounded-xl border border-slate-700">
                  {[
                    "Mobile App Development",
                    "AI/ML Development",
                    "UI/UX Design Strategy",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-sm font-mono text-slate-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AddictionScale = () => {
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
      range: "3.5-5.5h",
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
                        className={`px-4 py-2 rounded-xl ${level.color} text-white font-bold text-sm shadow-sm`}
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
};

const Challenges = () => {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #00BCD4 2px, transparent 2px)",
            backgroundSize: "48px 48px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          badge="Take Control"
          title="Smart & Curated Challenges"
          subtitle="Break the habit loop with personalized challenges designed to reduce screen time gradually."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {[
            {
              title: "App Diet",
              icon: "🥗",
              desc: "Limit specific apps for a set duration.",
              color: "from-green-400 to-emerald-600",
            },
            {
              title: "Phone Fasting",
              icon: "🤐",
              desc: "No phone usage for X hours straight.",
              color: "from-blue-400 to-blue-600",
            },
            {
              title: "No Phone",
              icon: "📵",
              desc: "Leave your phone in another room.",
              color: "from-purple-400 to-purple-600",
            },
            {
              title: "Mindful Pause",
              icon: "🧘",
              desc: "2-minute breathing before apps.",
              color: "from-orange-400 to-red-600",
            },
          ].map((card, i) => (
            <RevealOnScroll key={i} delay={i * 100}>
              <div className="group relative h-full bg-slate-800 border border-slate-700 p-8 rounded-[2rem] hover:bg-slate-700 shadow-sm hover:shadow-xl hover:shadow-cyan-900/10 transition-all duration-300 overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">
                  {card.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stories = () => {
  const { handpickedStories, fetchHandpickedStories } = useStoriesStore();

  useEffect(() => {
    fetchHandpickedStories();
  }, [fetchHandpickedStories]);

  const handleStoryClick = (storyId, storyTitle) => {
    trackWebsiteHandpickedStoryCardClicked(storyId, storyTitle);
    const slug = createStorySlug(storyTitle, storyId);
    window.open(`https://stories.yourhourapp.com/screentime/${slug}`, "_blank");
  };

  return (
    <section id="stories" className="py-24 bg-slate-950 relative">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          badge="Inspiration"
          title="Where Stories Find You"
          subtitle="Join thousands of users who have transformed their digital habits with Your Hour by Mindefy."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {handpickedStories.slice(0, 3).map((story) => (
            <RevealOnScroll key={story._id}>
              <WebsiteStoryCard
                storyData={story}
                onClick={() => handleStoryClick(story._id, story.storyTitle)}
              />
            </RevealOnScroll>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://stories.yourhourapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center font-semibold font-montserrat text-lg text-[#21ABE1] border border-[#21ABE1] px-8 py-3 rounded-xl hover:bg-[#21ABE1]/10 hover:scale-105 transition-all inline-block"
            onClick={() => trackWebsiteLetsReadClicked()}
          >
            Let's Read
          </a>
        </div>
      </div>
    </section>
  );
};

const BlogSection = () => {
  const router = useRouter();

  const handlePostClick = (id) => {
    const post = popularPosts.find((p) => p.id === id);
    if (post) {
      trackWebsiteBlogCardClicked(post.id, post.title, "popular");
    }

    const actualBlog = blogData[id];
    if (actualBlog) {
      const slug = createBlogSlug(actualBlog.title, id);
      router.push(`/blog/${slug}`);
    }
  };

  return (
    <section className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          badge="Blog"
          title="Insights From Our Experts"
          subtitle="Read popular posts on mindfulness, productivity, and reducing screen time."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularPosts.slice(0, 3).map((post, index) => (
            <RevealOnScroll key={post.id} delay={index * 100}>
              <div
                onClick={() => handlePostClick(post.id)}
                className="cursor-pointer group rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-cyan-500/30 transition-all shadow-lg shadow-black/20 hover:shadow-2xl hover:shadow-cyan-900/10"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-3">
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl min-h-15 font-bold text-white mb-3 group-hover:text-[#00BCD4] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="inline-flex items-center text-sm font-bold text-[#00BCD4] hover:text-[#00B0C0]">
                    Read Article <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQsSection = () => {
  const items = [
    {
      q: "Why floating timer suddenly stops?",
      a: "Some devices like Redmi, Oppo, Vivo, Realme etc kill the background service when you close the app by removing it from recent apps. Features like floating timer, auto lock, app usage alerts, etc does not work without the service. To use them make sure the sticky notifications always stay in the notification tray. If you can see the sticky notification then app's background service is running.",
    },
    {
      q: "How can I use floating timer in devices like Redmi, Oppo, Vivo, Realme etc?",
      a: "Try to lock YourHour app in the recent apps to avoid killing it accidentally. You can also remove it from the list of battery optimized apps in your phone settings.",
    },
    {
      q: "Where is my data stored?",
      a: "We are not storing your data on any cloud platform. Your data is safely stored in your device only.",
    },
    {
      q: "Why Auto Lock suddenly stops?",
      a: "Some devices like Redmi, Oppo, Vivo, Realme etc kill the background service when you close the app by removing it from recent apps. Features like floating timer, auto lock, app usage alerts, etc does not work without the service.",
    },
    {
      q: "How can I use Auto Lock in devices like Redmi, Oppo, Vivo, Realme etc?",
      a: "Try to lock YourHour app in the recent apps to avoid killing it accidentally. You can also remove it from the list of battery optimized apps in your phone settings.",
    },
    {
      q: "What will happen to my premium subscription when I will change my phone?",
      a: "Your purchase is linked with your play store account. Reinstalling, changing phone etc won't affect your purchase.",
    },
    {
      q: "My money has been deducted but premium features are still locked, what can I do?",
      a: "Sometimes depending on the mode of the payment, it takes around 1-2 days of time to confirm the purchase. Try to restore the purchase after some time.",
    },
    {
      q: "How to initiate the refund process?",
      a: "Reach out to us with your order id and we will revert to you.",
    },
  ];

  const [open, setOpen] = useState(null);

  // Split FAQs into 2 columns
  const mid = Math.ceil(items.length / 2);
  const col1 = items.slice(0, mid);
  const col2 = items.slice(mid);

  const renderItem = (it, idx) => (
    <li key={idx} className="border-b border-slate-800">
      <button
        className="w-full text-left py-4 px-4 flex items-center justify-between hover:bg-slate-900 rounded-lg transition-colors"
        onClick={() => setOpen(open === idx ? null : idx)}
      >
        <span className="text-white font-semibold text-lg">{it.q}</span>
        <span
          className={`text-[#00BCD4] transition-transform duration-300 ${
            open === idx ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open === idx
            ? "grid-rows-[1fr] opacity-100 pb-4"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden px-4 text-slate-400 leading-relaxed">
          {it.a}
        </div>
      </div>
    </li>
  );

  return (
    <section className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          badge="FAQs"
          title="Frequently Asked Questions"
          subtitle="Find quick answers to common questions."
        />

        <div className="max-w-6xl mx-auto">
          {/* Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <ul className="space-y-4">
              {col1.map((it, idx) => renderItem(it, idx))}
            </ul>

            <ul className="space-y-4">
              {col2.map((it, idx) => renderItem(it, idx + mid))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Praneeth",
      rating: 5,
      review:
        "Cut my screen time by half. The blocker works flawlessly and the reports keep me aware.",
    },
    {
      name: "Sarah K.",
      rating: 4,
      review:
        "Mindful Pause makes me think before scrolling. Loving the clear analytics.",
    },
    {
      name: "Rahul M.",
      rating: 5,
      review:
        "Unlock count insights were an eye-opener. The app helped me gain control.",
    },
    {
      name: "John",
      rating: 5,
      review:
        "Cut my screen time by half. The blocker works flawlessly and the reports keep me aware.",
    },
    {
      name: "Sara",
      rating: 4,
      review:
        "Mindful Pause makes me think before scrolling. Loving the clear analytics.",
    },
    {
      name: "Rohan",
      rating: 5,
      review:
        "Unlock count insights were an eye-opener. The app helped me gain control.",
    },
  ];
  return (
    <section className="py-24 bg-slate-950 relative border-t border-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          badge="Testimonials"
          title="Rated By Our Users"
          subtitle="Real reviews from people improving their digital habits."
        />
        <div className="animate-scroll flex flex-row gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-8 min-w-md max-w-lg rounded-3xl border bg-slate-900 shadow-lg shadow-black/20 border-slate-800 hover:border-cyan-500/30 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`text-yellow-400 text-lg ${
                      idx < t.rating ? "" : "opacity-30"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed italic">
                "{t.review}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4DD0E1] to-[#00BCD4] flex items-center justify-center text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div className="text-white font-bold">{t.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Globe3D = () => {
  const containerRef = useRef(null);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;

    // Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Globe Core (Dark Sphere)
    const coreGeometry = new THREE.SphereGeometry(1, 64, 64);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x020617, // Slate-950
      transparent: true,
      opacity: 0.95,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(core);

    // 2. Globe Dots (Points)
    const dotGeometry = new THREE.SphereGeometry(1.01, 64, 64);
    const dotMaterial = new THREE.PointsMaterial({
      color: 0x4dd0e1, // Cyan theme color
      size: 0.012,
      transparent: true,
      opacity: 0.6,
    });
    const globeDots = new THREE.Points(dotGeometry, dotMaterial);
    globeGroup.add(globeDots);

    // 3. Locations Data & Pins
    const locations = [
      { lat: 20.6, lon: 79.0, country: "India", users: "2.1M+", rating: "4.7" },
      { lat: 37.1, lon: -95.7, country: "USA", users: "1.2M+", rating: "4.3" },
      { lat: 51.5, lon: -0.1, country: "UK", users: "500K+", rating: "4.5" },
      {
        lat: -14.2,
        lon: -51.9,
        country: "Brazil",
        users: "400K+",
        rating: "4.8",
      },
      {
        lat: 51.2,
        lon: 10.4,
        country: "Germany",
        users: "300K+",
        rating: "4.3",
      },
      {
        lat: 36.2,
        lon: 138.3,
        country: "Japan",
        users: "250K+",
        rating: "4.7",
      },
      {
        lat: 55.7,
        lon: 37.6,
        country: "Russia",
        users: "200K+",
        rating: "4.5",
      },
      {
        lat: -25.3,
        lon: 133.8,
        country: "Australia",
        users: "150K+",
        rating: "4.3",
      },
      {
        lat: 56.1,
        lon: -106.3,
        country: "Canada",
        users: "180K+",
        rating: "4.7",
      },
      { lat: 46.2, lon: 2.2, country: "France", users: "220K+", rating: "4.5" },
      { lat: 41.9, lon: 12.6, country: "Italy", users: "190K+", rating: "4.3" },
      {
        lat: -30.6,
        lon: 22.9,
        country: "South Africa",
        users: "120K+",
        rating: "4.8",
      },
      {
        lat: 23.6,
        lon: -102.5,
        country: "Mexico",
        users: "160K+",
        rating: "4.7",
      },
      {
        lat: 35.9,
        lon: 127.8,
        country: "South Korea",
        users: "140K+",
        rating: "4.3",
      },
      { lat: 23.4, lon: 53.8, country: "UAE", users: "90K+", rating: "4.9" },
    ];

    const pinMeshes = [];

    const latLonToVector3 = (lat, lon, radius) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    const pinMaterial = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const pinGeometry = new THREE.SphereGeometry(0.025, 16, 16);
    const ringGeo = new THREE.RingGeometry(0.03, 0.035, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });

    locations.forEach((loc) => {
      const pin = new THREE.Mesh(pinGeometry, pinMaterial);
      const pos = latLonToVector3(loc.lat, loc.lon, 1.02);
      pin.position.copy(pos);
      pin.userData = loc;
      globeGroup.add(pin);
      pinMeshes.push(pin);

      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos.clone().multiplyScalar(1.005));
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(ring);
    });

    // Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      setTooltipPos({ x: event.clientX, y: event.clientY });
    };

    container.addEventListener("mousemove", onMouseMove);

    // Animation Loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();

      // Raycast check
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(pinMeshes);

      if (intersects.length > 0) {
        const intersectedPin = intersects[0].object;
        setTooltipData(intersectedPin.userData);
        container.style.cursor = "pointer";
        // Reset all scales first
        pinMeshes.forEach((pin) => pin.scale.set(1, 1, 1));
        intersectedPin.scale.set(1.5, 1.5, 1.5);
        controls.autoRotate = false; // Pause rotation on hover
      } else {
        setTooltipData(null);
        container.style.cursor = "grab";
        pinMeshes.forEach((pin) => pin.scale.set(1, 1, 1));
        controls.autoRotate = true;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      dotGeometry.dispose();
      dotMaterial.dispose();
      pinGeometry.dispose();
      pinMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="w-full lg:h-[85vh] absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
      />
      {tooltipData && (
        <div
          className="fixed z-50 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-2.5 animate-fade-in"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <h3 className="font-bold text-white text-lg mb-1">
            {tooltipData.country}
          </h3>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <div className="flex items-center gap-1">
              <Users size={14} className="text-cyan-400" />
              <span>{tooltipData.users}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span>{tooltipData.rating}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const TrustedBySection = () => {
  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-slate-950 rounded-[3rem] text-white relative overflow-hidden text-center shadow-2xl shadow-cyan-900/10 h-[600px] md:h-[800px] border border-slate-900">
          {/* 3D Globe Container */}
          <Globe3D />

          {/* Overlay Content */}
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center gap-28 md:gap-48 z-10 py-12">
            <div className="relative max-w-4xl mx-auto px-6">
              <RevealOnScroll>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/80 rounded-full text-cyan-400 font-bold uppercase text-xs tracking-wider mb-8 border border-slate-800/50 backdrop-blur-sm">
                  <Globe size={14} />
                  <span>Reclaiming Digital Lives Globally</span>
                </div>
                <h2 className="text-4xl md:text-7xl font-black mb-6 leading-tight drop-shadow-xl text-white">
                  Trusted by{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DD0E1] to-[#00BCD4]">
                    5 Million+
                  </span>{" "}
                  Users
                </h2>
                <p className="text-slate-400 text-xl mb-4 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                  Spin the globe to explore our impact.
                </p>
              </RevealOnScroll>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pointer-events-auto max-w-2xl mx-auto px-6 w-full">
              {[
                { val: "5M+", label: "Downloads" },
                { val: "4.3", label: "Rating" },
                { val: "180+", label: "Countries" },
                { val: "25+", label: "Languages" },
              ].map((stat, i) => (
                <RevealOnScroll key={i} delay={i * 100}>
                  <div className="p-2 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800/50 hover:bg-slate-800/80 transition-colors text-center">
                    <div className="text-2xl md:text-3xl font-black text-white mb-1">
                      {stat.val}
                    </div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {stat.label}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AIDetoxCoachSection = () => {
  const [app, setApp] = useState("Instagram");
  const [hours, setHours] = useState("4");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleRoast = () => {
    setLoading(true);
    setShowResult(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

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
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
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
              <div className="bg-slate-950 rounded-3xl p-8 border border-slate-800 relative">
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
                        <p className="text-lg leading-relaxed text-white">
                          Spending {hours} hours on {app}? That's not a hobby,
                          that's a part-time job with zero pay. Your thumb has
                          traveled more miles scrolling than you have walking
                          this year.
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
                        <p className="text-lg leading-relaxed text-slate-300">
                          Set a 30-minute hard limit on {app} using YourHour.
                          Replace the other {parseInt(hours || 0) - 0.5} hours
                          with learning a new skill or actually talking to
                          humans.
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
};

const Home = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 scroll-smooth mx-auto">
      <GlobalStyles />
      <Hero />
      <LogoTicker />
      <TrustedBySection />
      <DashboardFeatures />
      <AIDetoxCoachSection />
      <AddictionScale />
      <Challenges />
      <TestimonialsSection />
      <Stories />
      <MindefyPromo />
      <BlogSection />
      <FAQsSection />
      {/* <FeaturesPage /> */}
      <MindfulNestChatbot />

      {/* Scroll to Top Button */}
      {isSticky && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-2 right-2 w-10 h-10 cursor-pointer bg-slate-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#00BCD4] transition-all z-[99] text-4xl border border-slate-700"
        >
          <span className="text-2xl">↑</span>
        </button>
      )}
    </div>
  );
};

export default Home;
