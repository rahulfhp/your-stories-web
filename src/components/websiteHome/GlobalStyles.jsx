export default function GlobalStyles() {
  return (
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
}
