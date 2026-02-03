import React, { useState, useEffect, useRef } from "react";
import {
  Smartphone,
  Clock,
  Activity,
  Trophy,
  BarChart3,
  Shield,
  Users,
  Star,
  Menu,
  X,
  ArrowRight,
  Download,
  Moon,
  Sun,
  Quote,
  Zap,
  Layout,
  FileText,
  Share2,
  Code2,
  Globe,
  Rocket,
  MessageSquare,
  Lock,
  AlertTriangle,
  PlayCircle,
  Heart,
  MessageCircle,
  Send,
  Music2,
  MoreHorizontal,
} from "lucide-react";

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
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
    .glass-nav {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0,0,0,0.05);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    .glass-card {
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    .text-gradient {
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      background-image: linear-gradient(to right, #2563eb, #4f46e5);
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
    "inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95";
  const variants = {
    primary:
      "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:bg-blue-500 border border-transparent",
    dark: "bg-slate-900 text-white shadow-lg shadow-slate-900/30 hover:shadow-slate-900/50 hover:bg-slate-800",
    gradient:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-indigo-500/50 border border-transparent",
    secondary:
      "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:border-white/50 hover:bg-white/20 shadow-sm",
    outline:
      "border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm",
    ghost: "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50",
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
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-blue-50 text-blue-600 border border-blue-100 ${className}`}
  >
    {children}
  </span>
);

const SectionHeading = ({
  badge,
  title,
  subtitle,
  align = "center",
  dark = false,
}) => (
  <RevealOnScroll
    className={`mb-12 ${
      align === "center" ? "text-center" : "text-left"
    } max-w-4xl mx-auto`}
  >
    {badge && <Badge className="mb-6">{badge}</Badge>}
    <h2
      className={`text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight ${
        dark ? "text-white" : "text-slate-900"
      }`}
    >
      {title}
    </h2>
    <p
      className={`text-xl leading-relaxed font-light ${
        dark ? "text-slate-300" : "text-slate-600"
      }`}
    >
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
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    pink: "bg-pink-50 text-pink-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <RevealOnScroll delay={delay}>
      <div
        className={`group h-full p-8 rounded-3xl border transition-all duration-500 ${
          color === "red" || color === "orange"
            ? "bg-white border-orange-100 shadow-xl shadow-orange-100/50 hover:border-orange-200"
            : "bg-white/60 backdrop-blur-xl border-white/50 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5"
        } hover:-translate-y-2`}
      >
        <div
          className={`w-14 h-14 rounded-2xl ${colors[color]} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm`}
        >
          <Icon size={28} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>

        {(color === "red" || color === "orange") && (
          <div className="mt-4 inline-flex items-center text-sm font-bold text-orange-600">
            Most Popular Feature <ArrowRight size={14} className="ml-1" />
          </div>
        )}
      </div>
    </RevealOnScroll>
  );
};

// --- Sections ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Text color logic: White on dark background (top), Dark on white background (scrolled)
  const textColor = scrolled ? "text-slate-600" : "text-slate-200";
  const logoText = scrolled ? "text-slate-900" : "text-white";
  const logoSub = scrolled ? "text-blue-600" : "text-blue-400";
  const hoverColor = scrolled ? "hover:text-blue-600" : "hover:text-white";

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? "glass-nav py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
                scrolled
                  ? "bg-gradient-to-tr from-blue-600 to-indigo-600"
                  : "bg-white/10 backdrop-blur-md border border-white/20"
              }`}
            >
              <Clock
                size={24}
                strokeWidth={2.5}
                className="group-hover:rotate-12 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-xl font-bold leading-none transition-colors ${logoText}`}
              >
                YourHour
              </span>
              <span
                className={`text-[10px] font-bold tracking-wider uppercase mt-0.5 transition-colors ${logoSub}`}
              >
                by Mindefy
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Features", "Impact", "Stories", "Mindefy"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className={`${textColor} font-medium ${hoverColor} transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all hover:after:w-full`}
              >
                {item}
              </a>
            ))}
            <Button
              variant={scrolled ? "primary" : "secondary"}
              className="py-2.5 px-6 text-sm"
            >
              Download App
            </Button>
          </div>

          <button
            className={`md:hidden p-2 ${
              scrolled ? "text-slate-800" : "text-white"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 p-6 flex flex-col gap-4 shadow-xl md:hidden animate-in slide-in-from-top-5">
          {["Features", "Impact", "Stories", "Mindefy"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-lg font-medium text-slate-800 py-2 border-b border-gray-50"
            >
              {item}
            </a>
          ))}
          <Button className="w-full mt-4" variant="primary">
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const [isBlocked, setIsBlocked] = useState(false); // Default to Playing state

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-900 text-white min-h-[90vh] flex items-center">
      {/* Dynamic Dark Background for High Contrast/Hook */}
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 backdrop-blur-md border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wide mb-8 shadow-lg shadow-blue-900/20 cursor-pointer hover:bg-blue-500/20 transition-all group">
                <Zap
                  size={14}
                  className="text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform"
                />
                <span>New: Reels & Shorts Blocker</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                Stop{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  Doomscrolling.
                </span>{" "}
                <br />
                Start Living.
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                The only app that effectively blocks{" "}
                <span className="font-bold text-white border-b border-red-500/50">
                  YouTube Shorts
                </span>
                ,{" "}
                <span className="font-bold text-white border-b border-purple-500/50">
                  Instagram Reels
                </span>
                , and addictive games. Reclaim 2+ hours every day.
              </p>

              {/* --- Interactive Demo Control --- */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl mb-10 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-white text-sm">
                      Interactive Demo
                    </p>
                    <p className="text-xs text-slate-300">
                      Toggle to see blocking in action
                    </p>
                  </div>

                  <button
                    onClick={() => setIsBlocked(!isBlocked)}
                    className={`relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none ${
                      isBlocked ? "bg-red-500" : "bg-slate-600"
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                        isBlocked ? "translate-x-8" : "translate-x-0"
                      }`}
                    >
                      {isBlocked ? (
                        <Lock size={14} className="text-red-500" />
                      ) : (
                        <PlayCircle size={14} className="text-slate-600" />
                      )}
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 text-lg shadow-blue-900/50 shadow-xl rounded-2xl">
                  Install Now - It's Free
                </Button>

                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-slate-900 bg-gray-200 overflow-hidden"
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
                    <span className="font-bold text-white">4.6/5 Rating</span>
                    <span className="text-slate-400">76k+ Reviews</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Animated Phone Mockup - Focusing on Blocking */}
          <div className="flex-1 relative w-full max-w-[500px] lg:max-w-none flex justify-center perspective-1000">
            <RevealOnScroll
              delay={200}
              className="relative z-10 w-[300px] md:w-[340px]"
            >
              <div className="relative mx-auto w-full h-[680px] bg-slate-950 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden transform rotate-y-12 hover:rotate-0 transition-transform duration-700 ease-out shadow-blue-900/50">
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
                    <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse border border-red-500/20">
                      <Shield size={48} className="text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Limit Reached!
                    </h3>
                    <p className="text-slate-300 mb-8 leading-relaxed">
                      You've hit your 30m limit on Reels. Time to focus on your
                      goals!
                    </p>

                    <div className="w-full bg-slate-800 rounded-2xl p-5 mb-6 border border-slate-700">
                      <div className="flex justify-between text-sm mb-3">
                        <span className="text-slate-400 font-medium">
                          Daily Limit
                        </span>
                        <span className="text-white font-bold">30m / 30m</span>
                      </div>
                      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 w-full animate-pulse"></div>
                      </div>
                    </div>

                    <button className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors shadow-lg shadow-white/10">
                      Close App
                    </button>

                    {/* Notification Popups simulation */}
                    <div className="absolute top-12 left-4 right-4 bg-slate-800/90 backdrop-blur-md border border-slate-600/50 p-3 rounded-xl flex items-center gap-3 animate-bounce shadow-xl">
                      <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm">
                        YT
                      </div>
                      <div>
                        <p className="text-xs text-white font-bold">
                          Shorts Blocked
                        </p>
                        <p className="text-[10px] text-slate-300">
                          You saved 15 mins today
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements hooking specific features - Conditionally hide when blocked to clean up UI? Or keep them? Keeping them looks cooler. */}
              <div
                className="absolute top-[30%] -left-4 md:-left-12 z-20 animate-float"
                style={{ animation: "float 6s ease-in-out infinite" }}
              >
                <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700 p-4 rounded-2xl shadow-2xl flex items-center gap-3 transform -rotate-6 hover:rotate-0 transition-transform">
                  <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <span className="font-bold text-sm">IG</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
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
                <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700 p-4 rounded-2xl shadow-2xl flex items-center gap-3 transform rotate-6 hover:rotate-0 transition-transform">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <span className="font-bold text-sm">YT</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
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
    </section>
  );
};

const LogoTicker = () => {
  const logos = [
    "Product Hunt",
    "TechCrunch",
    "BBC News",
    "The Daily Star",
    "Lifehack",
    "WittySparks",
    "Tracxn",
    "Nerds Chalk",
    "Dailyhunt",
    "TechArrival",
    "Cosmo Germany",
    "Independent",
  ];

  return (
    <section className="py-10 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-6 text-center">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Featured In Global Media
        </p>
      </div>
      <div className="relative flex overflow-x-hidden group">
        <div className="flex animate-scroll whitespace-nowrap group-hover:pause">
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="mx-8 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              <span className="text-2xl font-black text-slate-800 font-serif italic tracking-tighter">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DashboardFeatures = () => {
  return (
    <section id="features" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          badge="Powerful Features"
          title="Everything You Need to Beat Addiction"
          subtitle="Don't just track your time. Control it. Our advanced blocking tools are designed to stop compulsive scrolling in its tracks."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            icon={Shield}
            title="Shorts & Reels Blocker"
            description="The only app that specifically targets and blocks short-form video feeds on YouTube and Instagram without blocking the entire app."
            color="red" // Highlighting this
            delay={0}
          />
          <FeatureCard
            icon={Lock}
            title="Strict App Limits"
            description="Set unbreakable daily limits for games and social media. Once the time is up, the app locks down. No cheats, no bypasses."
            color="orange"
            delay={100}
          />
          <FeatureCard
            icon={BarChart3}
            title="Precision Tracking"
            description="See exactly where your time goes with our floating timer and detailed daily/weekly usage reports."
            color="blue"
            delay={200}
          />
          <FeatureCard
            icon={Layout}
            title="Unlock Frequency"
            description="Track how often you check your phone. High unlock counts are a key indicator of compulsive behavior."
            color="indigo"
            delay={300}
          />
          <FeatureCard
            icon={Activity}
            title="Addiction Level Meter"
            description="We categorize your usage into 6 distinct levels, guiding you from 'Addicted' to 'Champion' status."
            color="green"
            delay={400}
          />
          <FeatureCard
            icon={FileText}
            title="Data Export"
            description="Transparency is key. Export your detailed usage reports to PDF or XLSX anytime for personal archiving."
            color="pink"
            delay={500}
          />
        </div>
      </div>
    </section>
  );
};

const MindefyPromo = () => {
  return (
    <section
      id="mindefy"
      className="py-24 bg-slate-900 text-white relative overflow-hidden"
    >
      {/* Abstract Tech Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2.5rem] p-10 md:p-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
              Developed by Mindefy Technologies
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Want to build an app with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Millions of Users?
              </span>
            </h2>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Your Hour is a testament to our engineering excellence. At{" "}
              <span className="font-bold text-white">Mindefy Technologies</span>
              , we are a premier IT services provider specializing in turning
              ambitious ideas into scalable, market-leading digital products.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <Rocket className="text-blue-400 mb-2" />
                <h4 className="font-bold text-lg">Scalable Tech</h4>
                <p className="text-sm text-slate-400">Built for millions</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <Globe className="text-indigo-400 mb-2" />
                <h4 className="font-bold text-lg">Global Reach</h4>
                <p className="text-sm text-slate-400">25+ Languages Support</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-white text-slate-900 hover:bg-blue-50 px-8">
                Partner with Mindefy
              </Button>
              <Button
                variant="outline"
                className="border-slate-700 hover:bg-slate-800"
              >
                View Our Portfolio
              </Button>
            </div>
          </div>

          <div className="flex-1 w-full relative">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 bg-slate-800 rounded-3xl border border-slate-700 flex items-center justify-center shadow-2xl overflow-hidden">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                    <Code2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Mindefy Labs</h3>
                  <p className="text-slate-400">
                    Where Innovation Meets Execution
                  </p>

                  <div className="mt-8 space-y-3 text-left bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span className="text-sm font-mono">
                        Mobile App Development
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span className="text-sm font-mono">
                        Enterprise Solutions
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span className="text-sm font-mono">
                        UI/UX Design Strategy
                      </span>
                    </div>
                  </div>
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
      desc: "You are the master of your time.",
    },
    {
      label: "Achiever",
      color: "bg-emerald-500",
      range: "1-2h",
      desc: "Great balance of life and tech.",
    },
    {
      label: "Habitual",
      color: "bg-yellow-500",
      range: "2-3.5h",
      desc: "Starting to slip, be careful.",
    },
    {
      label: "Dependent",
      color: "bg-orange-500",
      range: "3.5-5.5h",
      desc: "You rely heavily on your device.",
    },
    {
      label: "Obsessed",
      color: "bg-red-500",
      range: "5.5-8h",
      desc: "Your phone controls your day.",
    },
    {
      label: "Addicted",
      color: "bg-rose-900",
      range: "> 8h",
      desc: "Immediate digital detox required.",
    },
  ];

  return (
    <section id="impact" className="py-32 bg-slate-50 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 order-2 lg:order-1 w-full">
            <RevealOnScroll>
              <div className="relative pl-8 border-l-2 border-dashed border-slate-200 space-y-8">
                {levels.map((level, index) => (
                  <div key={level.label} className="relative group">
                    <div
                      className={`absolute -left-[41px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 border-white ${level.color} shadow-md transition-all duration-300 group-hover:scale-150`}
                    ></div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group-hover:shadow-lg group-hover:-translate-x-2 transition-all duration-300 cursor-default">
                      <div>
                        <h4
                          className={`font-bold text-lg ${
                            index > 3 ? "text-rose-600" : "text-slate-800"
                          }`}
                        >
                          {level.label}
                        </h4>
                        <p className="text-sm text-slate-500">{level.desc}</p>
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
                  <span className="font-bold text-blue-600">Your Hour</span>{" "}
                  defines your Phone Addict Category. We help you move from{" "}
                  <span className="text-rose-600 font-bold bg-rose-50 px-2 py-1 rounded">
                    Addicted
                  </span>{" "}
                  to{" "}
                  <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded">
                    Champion
                  </span>{" "}
                  through actionable insights.
                </>
              }
            />

            <RevealOnScroll delay={200}>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2rem] shadow-2xl text-white relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-700"></div>

                <div className="flex items-start gap-5 relative z-10">
                  <div className="p-4 bg-white/20 backdrop-blur-lg rounded-2xl shadow-inner">
                    <Zap size={32} className="text-yellow-300 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl mb-3">
                      Mindefy Smart Analysis
                    </h4>
                    <p className="text-blue-100 leading-relaxed text-lg">
                      Our proprietary algorithm developed at Mindefy Labs
                      analyzes your peak usage times, frequency of unlocks, and
                      app categories to give you a precise diagnosis and action
                      plan.
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
    <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 opacity-80"></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #4f46e5 2px, transparent 2px)",
            backgroundSize: "48px 48px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          badge="Take Control"
          title="Smart & Curated Challenges"
          subtitle="Break the habit loop with personalized challenges designed to reduce screen time gradually."
          dark={true}
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
              <div className="group relative h-full bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200">
                  {card.desc}
                </p>

                <div className="mt-6 flex items-center text-sm font-bold text-white/60 group-hover:text-white transition-colors">
                  Start Challenge{" "}
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stories = () => {
  const stories = [
    {
      name: "Praneeth",
      role: "Student",
      text: "I was addicted to my phone for 8.5 hrs/day. YourHour helped me realize this and cut it down to 4 hours.",
      change: "-50%",
    },
    {
      name: "Sarah K.",
      role: "Designer",
      text: "The 'Mindful Pause' feature is a game changer. It makes me think twice before scrolling Instagram.",
      change: "Focused",
    },
    {
      name: "Rahul M.",
      role: "Developer",
      text: "Detailed reports showed me I spent 2 hours just on unlocking my phone. Eye opener!",
      change: "Aware",
    },
    {
      name: "Kajal",
      role: "Aspirant",
      text: "Preparing for civil services, I needed to block distractions. This app is my digital disciplined partner.",
      change: "Productive",
    },
  ];

  return (
    <section id="stories" className="py-32 bg-white relative">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          badge="Community"
          title="Where Stories Find You"
          subtitle="Join thousands of users who have transformed their digital habits with Your Hour by Mindefy."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story, i) => (
            <RevealOnScroll key={i} delay={i * 100}>
              <div className="h-full bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                <Quote
                  className="text-blue-300 mb-6 fill-current opacity-50"
                  size={40}
                />
                <p className="text-slate-700 mb-8 text-base leading-relaxed italic">
                  "{story.text}"
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-200/50">
                  <div>
                    <h4 className="font-bold text-slate-900">{story.name}</h4>
                    <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">
                      {story.role}
                    </span>
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold border border-green-200">
                    {story.change}
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

const Footer = () => {
  return (
    <footer className="bg-slate-50 pt-24 pb-12 border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="col-span-1 md:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Clock size={22} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-900">
                  YourHour
                </span>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                  by Mindefy
                </span>
              </div>
            </div>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed max-w-xs">
              The best screen time control app to help you stay focused and
              boost productivity. Built with engineering excellence at{" "}
              <span className="font-bold text-slate-900">
                Mindefy Technologies
              </span>
              .
            </p>
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all cursor-pointer shadow-sm"
                >
                  <Share2 size={16} />
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 md:col-start-6">
            <h4 className="font-bold text-slate-900 mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              {["Features", "Pricing", "FAQ", "Download", "Changelog"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-blue-600 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold text-slate-900 mb-6">Mindefy Tech</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              {[
                "About Mindefy",
                "Services",
                "Portfolio",
                "Contact Us",
                "Careers",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3">
            <h4 className="font-bold text-slate-900 mb-6">Get the App</h4>
            <p className="text-xs text-slate-500 mb-4">
              Start your digital detox journey today.
            </p>
            <button className="bg-black text-white px-6 py-3.5 rounded-xl flex items-center gap-3 hover:bg-gray-800 transition-all hover:shadow-lg w-full sm:w-auto">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Play Store"
                className="h-6"
              />
              <span className="text-sm font-medium">
                Download on Play Store
              </span>
            </button>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; 2026 Mindefy Technologies. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="font-sans text-slate-900 bg-white selection:bg-blue-100 selection:text-blue-900 scroll-smooth">
      <GlobalStyles />
      <Navbar />
      <Hero />
      <LogoTicker />
      <DashboardFeatures />
      <AddictionScale />
      <Challenges />
      <Stories />
      <MindefyPromo />
      <Footer />
    </div>
  );
};

export default App;
