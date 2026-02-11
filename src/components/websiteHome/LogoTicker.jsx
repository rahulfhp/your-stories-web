export default function LogoTicker() {
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
              <div className="relative p-4 border border-white rounded-xl">
                <img
                  src={`yourhour-website-img/yourhour_${logo.label}.${
                    logo.label === "techdator" ? "png" : "webp"
                  }`}
                  alt={logo.label}
                  className="h-20 md:h-32 max-w-fit object-contain brightness-0 invert"
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
}
