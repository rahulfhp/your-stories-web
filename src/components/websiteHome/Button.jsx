export default function Button({
  children,
  variant = "primary",
  as = "button",
  className = "",
  ...props
}) {
  const Comp = as;
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
    <Comp
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}
