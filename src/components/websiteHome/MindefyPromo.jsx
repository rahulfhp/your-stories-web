import { Globe, Rocket } from "lucide-react";
import Button from "./Button";

const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 ${className}`}
  >
    {children}
  </span>
);

export default function MindefyPromo() {
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
              <Button
                as="a"
                href="https://mindefy.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-slate-900 hover:bg-slate-200 px-4 md:px-8 shadow-lg shadow-white/10"
              >
                Partner with Mindefy
              </Button>
              <Button
                variant="outline"
                as="a"
                href="https://mindefy.tech/mindful-ux-design-user-experience"
                target="_blank"
                rel="noopener noreferrer"
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
}
