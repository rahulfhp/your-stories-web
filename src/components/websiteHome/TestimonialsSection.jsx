import SectionHeading from "./SectionHeading";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "o lemonqueen o",
      rating: 5,
      date: "4 February 2026",
      review:
        "Beautiful beautiful update YourHour team, thank you! I never blocked YouTube because I have practical uses at times and now I'm forced to think about it for a second. I had another app that had this function but wanted to charge for multiple apps. Now I continue to stick with you guys, thanks :)",
    },
    {
      name: "Kiran Kiran",
      rating: 5,
      date: "3 February 2026",
      review:
        "It is one of the best applications for tracking time you on your phone and apps and unlock counts. I love the floating clock feature of this application.❤️❤️❤️🙌🏻🙌🏻🙌🏻🥳🥳🥳",
    },
    {
      name: "Sudeeksha",
      rating: 5,
      date: "13 February 2026",
      review:
        "it's worth spending the money. it's features are really helpful in tracking your screen time and seeing the key areas for that are distracting you. i have reduced my screen time from 4-5 he per day to about 1-2 hrs and the change is really good. now I have a lot of time in hand to do things I have always missed out on and tbh my productivity is wayy better now..hope this helps, if you keep being consistent this app will be a really helpful tool",
    },
    {
      name: "Mustafa Joha glass",
      rating: 5,
      date: "25 January 2026",
      review:
        "very nice app for people tryin to control screen time and see how much they can control themselves.also easy to use , go with the flow kind of app",
    },
    {
      name: "richita dutta",
      rating: 5,
      date: "14 January 2026",
      review:
        "Its an Amazing app. It genuinely helps cut down unnecessary phone usage. That said, phones are essential for study and work, so time spent on productive apps should be excluded from both the addiction level and total usage. That distinction would make the insights far more accurate and fair.",
    },
    {
      name: "Aman Pandey",
      rating: 5,
      date: "7 February 2026",
      review: "I am a pro user for more than 3 years now.",
    },
  ];

  const marqueeTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-slate-950 relative border-t border-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          badge="Testimonials"
          title="Rated By Our Users"
          subtitle="Real reviews from people improving their digital habits."
        />
        <div className="overflow-x-auto md:overflow-hidden">
          <div className="flex flex-row gap-6 w-max snap-x snap-mandatory animate-scroll md:snap-none">
            {marqueeTestimonials.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                aria-hidden={i >= testimonials.length}
                className="p-6 sm:p-8 min-w-[260px] sm:min-w-[320px] md:min-w-[360px] max-w-xs sm:max-w-sm md:max-w-md rounded-3xl border bg-slate-900 shadow-lg shadow-black/20 border-slate-800 hover:border-cyan-500/30 transition-all hover:-translate-y-1 snap-start flex flex-col"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span
                        key={idx}
                        className={`text-yellow-400 text-lg ${
                          idx < t.rating ? "" : "opacity-30"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-slate-400 text-xs sm:text-sm">
                    {t.date}
                  </span>
                </div>
                <p className="text-slate-400 mb-6 leading-relaxed text-sm sm:text-base md:h-40">
                  "{t.review}"
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4DD0E1] to-[#00BCD4] flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-bold">{t.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
