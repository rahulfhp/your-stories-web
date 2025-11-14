"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Why floating timer suddenly stops?",
    answer:
      "Some devices like Redmi, Oppo, Vivo, Realme etc kill the background service when you close the app by removing it from recent apps. Features like floating timer, auto lock, app usage alerts, etc does not work without the service. To use them make sure the sticky notifications always stay in the notification tray. If you can see the sticky notification then app's background service is running.",
  },
  {
    question:
      "How can I use floating timer in devices like Redmi, Oppo, Vivi, Realme etc?",
    answer:
      "Try to lock YourHour app in the recent apps to avoid killing it accidentally. You can also remove it from the list of battery optimized apps in your phone settings.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "We are not storing your data on any cloud platform. Your data is safely stored in your device only.",
  },
  {
    question: "Why Auto Lock suddenly stops?",
    answer:
      "Some devices like Redmi, Oppo, Vivo, Realme etc kill the background service when you close the app by removing it from recent apps. Features like floating timer, auto lock, app usage alerts, etc does not work without the service. To use them make sure the sticky notifications always stay in the notification tray. If you can see the sticky notification then app's background service is running.",
  },
  {
    question:
      "How can I use Auto Lock in devices like Redmi, Oppo, Vivi, Realme etc?",
    answer:
      "Try to lock YourHour app in the recent apps to avoid killing it accidentally. You can also remove it from the list of battery optimized apps in your phone settings.",
  },
  {
    question:
      "What will happen to my premium subscription when I will change my phone?",
    answer:
      "Your purchase is linked with your play store account. Reinstalling, changing phone etc won't affect your purchase.",
  },
  {
    question:
      "My money has been deducted but premium features are still locked, what can I do?",
    answer:
      "Sometimes depending on the mode of the payment, it takes around 1-2 days of time to confirm the purchase. Try to restore the purchase after some time. If you still face any issues you can reach out to us with your order id and we will revert to you.",
  },
  {
    question: "How to initiate the refund process?",
    answer: "Reach out to us with your order id and we will revert to you.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="relative w-full overflow-hidden bg-white pt-[12%] md:pt-[8%] lg:pt-[4%]">
        {/* SKY BACKGROUND IMAGE */}
        <div
          className="w-full bg-no-repeat bg-cover bg-top pt-16 pb-[10%]"
          style={{
            backgroundImage: "url('/yourhour-website-img/FAQTopBgImage.svg')",
            backgroundSize: "100% auto",
          }}
        >
          <div className="max-w-5xl mx-auto px-4">
            {/* LEFT TEXT */}
            <div className="max-w-lg">
              <span className="block text-3xl md:text-4xl text-black font-bold font-montserrat">
                Hello!
              </span>

              <span className="block text-2xl md:text-3xl text-black font-normal font-montserrat mt-2">
                We take care of your
              </span>

              <span className="block text-3xl md:text-4xl font-semibold font-montserrat text-[#21ABE1] tracking-widest mt-2">
                SCREENTIME
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Title */}
      <div className="container mx-auto px-4 text-center">
        <span className="text-4xl text-black font-normal font-montserrat leading-normal">
          Frequently Asked Questions
        </span>
      </div>

      {/* FAQ List */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <ul className="space-y-4">
              {faqs.map((faq, index) => (
                <li key={index} className="border-b border-gray-300">
                  <button
                    className="w-full cursor-pointer text-left py-3 px-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  >
                    <span className="max-w-[90%] text-sm md:text-base font-semibold text-[#333333] pr-10 font-montserrat">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        openIndex === index
                          ? "rotate-180 text-[#21ABE1]"
                          : "text-[#333333]"
                      }`}
                    />
                  </button>
                  {openIndex === index && (
                    <div className="px-5 pb-4 text-sm text-[#666666] leading-relaxed font-normal font-montserrat">
                      {faq.answer}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/+919096126060?text= Hello Mindefy Team,"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-16 right-2 z-50 flex items-center gap-2"
      >
        <span className="hidden md:inline-block bg-white px-4 py-2 rounded shadow-lg text-[#080a3c] text-sm border border-gray-200 font-normal font-montserrat">
          Message us
        </span>
        <img
          src="yourhour-website-img/whatsapp-icon.png"
          alt="WhatsApp"
          className="w-12 h-12"
        />
      </a>

      {/* Scroll to Top Button */}
      {isSticky && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-2 right-2 w-10 h-10 cursor-pointer bg-white text-[#080a3c] rounded-full shadow-lg flex items-center justify-center hover:bg-[#24abe0] hover:text-white transition-all z-[4] text-4xl"
        >
          <span className="text-2xl">↑</span>
        </button>
      )}
    </div>
  );
}
