import {
  Activity,
  BarChart3,
  FileText,
  Layout,
  Lock,
  Shield,
} from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import InteractiveFeatureLab from "./InteractiveFeatureLab";

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

export default function DashboardFeatures() {
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
}
