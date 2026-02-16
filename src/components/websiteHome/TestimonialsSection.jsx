"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SectionHeading from "./SectionHeading";

export default function TestimonialsSection() {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
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
  const isModalOpen = Boolean(selectedTestimonial);

  const handleOpenReview = (testimonial) => {
    setSelectedTestimonial(testimonial);
  };

  const handleModalOpenChange = (open) => {
    if (!open) {
      setSelectedTestimonial(null);
    }
  };

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
            {marqueeTestimonials.map((t, i) => {
              const canExpandReview = t.review.length > 120;

              return (
                <div
                  key={`${t.name}-${i}`}
                  className="p-6 sm:p-8 min-w-[260px] sm:min-w-[320px] md:min-w-[360px] max-w-xs sm:max-w-sm md:max-w-md rounded-3xl border bg-slate-900 shadow-lg shadow-black/20 border-slate-800 hover:border-cyan-500/30 transition-all hover:-translate-y-1 snap-start flex flex-col min-h-[330px] sm:min-h-[360px]"
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

                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-3 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:5] [-webkit-box-orient:vertical]">
                    "{t.review}"
                  </p>

                  {canExpandReview && (
                    <button
                      type="button"
                      onClick={() => handleOpenReview(t)}
                      className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 text-sm font-medium mb-6 w-fit transition-colors cursor-pointer"
                    >
                      Read More
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </button>
                  )}

                  {!canExpandReview && <div className="mb-6" />}

                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4DD0E1] to-[#00BCD4] flex items-center justify-center text-white font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-bold">{t.name}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
        <DialogContent
          overlayClassName="bg-slate-950/70 backdrop-blur-[2px]"
          className="w-[calc(100%-1.5rem)] sm:w-full max-w-2xl border border-slate-700 bg-gradient-to-br from-slate-900/95 to-slate-950/95 text-slate-100 rounded-2xl p-0 overflow-hidden shadow-2xl shadow-black/40 [&>[data-slot='dialog-close']]:top-4 [&>[data-slot='dialog-close']]:right-4 [&>[data-slot='dialog-close']]:rounded-full [&>[data-slot='dialog-close']]:bg-slate-800/90 [&>[data-slot='dialog-close']]:p-1.5 [&>[data-slot='dialog-close']]:cursor-pointer [&>[data-slot='dialog-close']]:text-slate-200 [&>[data-slot='dialog-close']]:hover:bg-slate-700 [&>[data-slot='dialog-close']]:opacity-100"
        >
          {selectedTestimonial && (
            <div className="flex max-h-[85vh] flex-col">
              <DialogHeader className="border-b border-slate-800 px-5 sm:px-7 py-5 text-left">
                <DialogTitle className="text-lg sm:text-xl text-white">
                  User Review
                </DialogTitle>
              </DialogHeader>

              <div className="overflow-y-auto px-5 sm:px-7 py-5 sm:py-6">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span
                        key={idx}
                        className={`text-yellow-400 text-lg ${
                          idx < selectedTestimonial.rating ? "" : "opacity-30"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-slate-400 text-xs sm:text-sm">
                    {selectedTestimonial.date}
                  </span>
                </div>

                <p className="text-slate-200 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                  "{selectedTestimonial.review}"
                </p>

                <div className="flex items-center gap-3 mt-7 pt-5 border-t border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4DD0E1] to-[#00BCD4] flex items-center justify-center text-white font-bold text-sm">
                    {selectedTestimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-bold">
                      {selectedTestimonial.name}
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm">
                      {selectedTestimonial.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
