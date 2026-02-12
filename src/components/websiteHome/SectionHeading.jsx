import RevealOnScroll from "./RevealOnScroll";

const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 ${className}`}
  >
    {children}
  </span>
);

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  dark = true,
}) {
  return (
    <RevealOnScroll
      className={`mb-12 ${
        align === "center" ? "text-center" : "text-center lg:text-left"
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
}
