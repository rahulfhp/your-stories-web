import { AppWindow, Focus, Smartphone, Timer } from "lucide-react";
import SectionHeading from "./SectionHeading";
import RevealOnScroll from "./RevealOnScroll";

export default function Challenges() {
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
              icon: AppWindow,
              desc: "Limit specific apps for a set duration.",
              color: "from-green-400 to-emerald-600",
            },
            {
              title: "Phone Fasting",
              icon: Timer,
              desc: "No phone usage for X hours straight.",
              color: "from-blue-400 to-blue-600",
            },
            {
              title: "No Phone",
              icon: Smartphone,
              desc: "Leave your phone in another room.",
              color: "from-purple-400 to-purple-600",
            },
            {
              title: "Mindful Pause",
              icon: Focus,
              desc: "2-minute breathing before apps.",
              color: "from-orange-400 to-red-600",
            },
          ].map((card, i) => (
            <RevealOnScroll key={i} delay={i * 100}>
              <div className="group relative h-full bg-slate-800 border border-slate-700 p-8 rounded-[2rem] hover:bg-slate-700 shadow-sm hover:shadow-xl hover:shadow-cyan-900/10 transition-all duration-300 overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <card.icon className="w-12 h-12 text-white" />
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
}
