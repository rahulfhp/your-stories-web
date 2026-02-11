import { useState } from "react";
import SectionHeading from "./SectionHeading";

export default function FAQsSection() {
  const items = [
    {
      q: "Why floating timer suddenly stops?",
      a: "Some devices like Redmi, Oppo, Vivo, Realme etc kill the background service when you close the app by removing it from recent apps. Features like floating timer, auto lock, app usage alerts, etc does not work without the service. To use them make sure the sticky notifications always stay in the notification tray. If you can see the sticky notification then app's background service is running.",
    },
    {
      q: "How can I use floating timer in devices like Redmi, Oppo, Vivo, Realme etc?",
      a: "Try to lock YourHour app in the recent apps to avoid killing it accidentally. You can also remove it from the list of battery optimized apps in your phone settings.",
    },
    {
      q: "Where is my data stored?",
      a: "We are not storing your data on any cloud platform. Your data is safely stored in your device only.",
    },
    {
      q: "Why Auto Lock suddenly stops?",
      a: "Some devices like Redmi, Oppo, Vivo, Realme etc kill the background service when you close the app by removing it from recent apps. Features like floating timer, auto lock, app usage alerts, etc does not work without the service.",
    },
    {
      q: "How can I use Auto Lock in devices like Redmi, Oppo, Vivo, Realme etc?",
      a: "Try to lock YourHour app in the recent apps to avoid killing it accidentally. You can also remove it from the list of battery optimized apps in your phone settings.",
    },
    {
      q: "What will happen to my premium subscription when I will change my phone?",
      a: "Your purchase is linked with your play store account. Reinstalling, changing phone etc won't affect your purchase.",
    },
    {
      q: "My money has been deducted but premium features are still locked, what can I do?",
      a: "Sometimes depending on the mode of the payment, it takes around 1-2 days of time to confirm the purchase. Try to restore the purchase after some time.",
    },
    {
      q: "How to initiate the refund process?",
      a: "Reach out to us with your order id and we will revert to you.",
    },
  ];

  const [open, setOpen] = useState(null);

  // Split FAQs into 2 columns
  const mid = Math.ceil(items.length / 2);
  const col1 = items.slice(0, mid);
  const col2 = items.slice(mid);

  const renderItem = (it, idx) => (
    <li key={idx} className="border-b border-slate-800">
      <button
        className="w-full text-left py-4 px-4 flex items-center justify-between hover:bg-slate-900 rounded-lg transition-colors"
        onClick={() => setOpen(open === idx ? null : idx)}
      >
        <span className="text-white font-semibold text-lg">{it.q}</span>
        <span
          className={`text-[#00BCD4] transition-transform duration-300 ${
            open === idx ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open === idx
            ? "grid-rows-[1fr] opacity-100 pb-4"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden px-4 text-slate-400 leading-relaxed">
          {it.a}
        </div>
      </div>
    </li>
  );

  return (
    <section className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          badge="FAQs"
          title="Frequently Asked Questions"
          subtitle="Find quick answers to common questions."
        />

        <div className="max-w-6xl mx-auto">
          {/* Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <ul className="space-y-4">
              {col1.map((it, idx) => renderItem(it, idx))}
            </ul>

            <ul className="space-y-4">
              {col2.map((it, idx) => renderItem(it, idx + mid))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
