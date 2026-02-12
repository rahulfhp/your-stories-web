export default function LogoTicker() {
  // Use ISO country codes and fetch flag PNGs to avoid OS-dependent emoji rendering
  const logos = [
    { key: "inc42", label: "inc42", countryCode: "IN" },
    { key: "dainik_bhasker", label: "dainik_bhasker", countryCode: "IN" },
    { key: "sakal", label: "sakal", countryCode: "IN" },
    { key: "dailyStar", label: "dailyStar", countryCode: "BD" },
    { key: "independent", label: "independent", countryCode: "GB" },
    { key: "dailyhunt", label: "dailyhunt", countryCode: "IN" },
    { key: "lifehack", label: "lifehack", countryCode: "US" },
    { key: "witty_spark", label: "witty_spark", countryCode: "IN" },
    { key: "tracxn", label: "tracxn", countryCode: "IN" },
    { key: "nerdschalk", label: "nerdschalk", countryCode: "IN" },
    { key: "techarival", label: "techarival", countryCode: "IN" },
    { key: "techConnecto", label: "techConnecto", countryCode: "IN" },
    { key: "techdator", label: "techdator", countryCode: "NL" },
    { key: "newsBytes", label: "newsBytes", countryCode: "IN" },
    { key: "tech_comuters", label: "tech_comuters", countryCode: "IN" },
    { key: "Elcome", label: "Elcome", countryCode: "EG" },
    { key: "android4all", label: "android4all", countryCode: "ES" },
    { key: "cosmo", label: "cosmo", countryCode: "DE" },
    { key: "h2s", label: "h2s", countryCode: "IN" },
    { key: "gt", label: "gt", countryCode: "US" },
    { key: "geochild", label: "geochild", countryCode: "IN" },
    { key: "rochamama", label: "rochamama", countryCode: "IN" },
    { key: "steemit", label: "steemit", countryCode: "US" },
    { key: "topbest", label: "topbest", countryCode: "US" },
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
                  src={`yourhour-website-img/yourhour_${logo.label}.${"webp"}`}
                  alt={logo.label}
                  className="h-20 md:h-32 max-w-fit object-contain brightness-0 invert"
                  loading="lazy"
                />
              </div>
              <span className="absolute bottom-1 -right-4.5 shadow-sm rounded-full flex items-center justify-center p-1">
                <img
                  src={`https://flagcdn.com/w40/${logo.countryCode.toLowerCase()}.png`}
                  alt={`${logo.countryCode} flag`}
                  className="w-8 h-6 object-cover rounded-sm"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
