const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 ${className}`}
  >
    {children}
  </span>
);
