"use client";

import { useEffect, useState } from "react";

export default function PrivacyPolicyPage() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen pb-12 pt-22 md:pt-25 lg:pt-30 md:pb-12 px-4 md:px-8 flex justify-center">
      {/* A4 Styled Container (never shrinks or changes layout) */}
      <section className="bg-slate-900 border border-slate-800 rounded-lg shadow-xl shadow-black/20 p-5 md:p-8 max-w-4xl min-h-[70rem]">
        {/* Title */}
        <h1 className="text-4xl font-semibold text-[#4DD0E1] font-montserrat tracking-tight mb-8">
          Privacy Policy
        </h1>

        {/* Paragraphs */}
        <p className="mb-5 text-slate-400 leading-relaxed text-base font-normal font-montserrat">
          Mindefy Labs ("we", or "us") is happy to provide YourHour (the "App")
          that helps users ("you") improve their mobile experience with
          privacy-focused app usage tools. When using the App, you may consent
          to us collecting some of your personal information.
        </p>

        <p className="mb-8 text-slate-400 leading-relaxed text-base font-normal font-montserrat">
          The purpose of this Privacy Policy is to provide you with a clear
          understanding of what personal information we have access to when you
          use the App, as well as what personal information may be collected
          when you allow us to collect usage data, how your personal information
          is used, and the choices you have to control the collection and/or use
          of your personal information.
        </p>

        {/* Section Heading */}
        <h4 className="text-2xl mb-4 font-semibold text-[#4DD0E1] font-montserrat">
          Overview
        </h4>

        <p className="mb-5 text-slate-400 leading-relaxed text-base font-normal font-montserrat">
          This Privacy Policy explains how Mindefy Labs collects, stores, uses,
          transfers and shares your personal information in connection with the
          App, which is available for download from the Google Play™ store.
        </p>

        <p className="mb-8 text-slate-400 leading-relaxed text-base font-normal font-montserrat">
          We may and reserve the right to update this Privacy Policy to reflect
          changes in and to keep you informed about our privacy practices.
          Please periodically review the App or the relevant Google Play™ store
          page for the latest information on our privacy practices.
        </p>

        {/* Section Heading */}
        <h4 className="text-2xl mb-4 font-semibold text-[#4DD0E1] font-montserrat">
          Personal Information We Collect About You
        </h4>

        <p className="mb-5 text-slate-400 leading-relaxed text-base font-normal font-montserrat">
          When you install the App, you will be explicitly asked to grant the
          App permission to access your device's usage data (the "Accessible
          Data"). The App locally processes the Accessible Data to provide
          various features and functionality to you.
        </p>

        <p className="mb-8 text-slate-400 leading-relaxed text-base font-normal font-montserrat">
          Only for some features in the app, we may ask you to sign up and
          provide your name, email, date of birth, and country. You are entirely
          free to decide whether or not to share the Collected Data. However,
          some features of the App rely on it, and may not work otherwise.
        </p>

        {/* Section Heading */}
        <h4 className="text-2xl mb-4 font-semibold text-[#4DD0E1] font-montserrat">
          How We Use Your Personal Information
        </h4>

        <ul className="list-disc pl-6 mb-8 text-slate-400 space-y-2 text-base leading-relaxed font-normal font-montserrat">
          <li>To operate, maintain, debug, and improve the App</li>
          <li>To send technical notices, updates, and alerts</li>
          <li>To respond to support and customer queries</li>
          <li>To monitor and analyze usage trends</li>
        </ul>

        {/* Section Heading */}
        <h4 className="text-2xl mb-4 font-semibold text-[#4DD0E1] font-montserrat">
          No Sale of Personal Information
        </h4>

        <p className="mb-8 text-slate-400 leading-relaxed text-base font-normal font-montserrat">
          We do not and will never sell your personal information to advertising
          platforms, data brokers, or information resellers. We will also never
          sell your personal information as may be defined by applicable laws.
        </p>

        {/* Section Heading */}
        <h4 className="text-2xl mb-4 font-semibold text-[#4DD0E1] font-montserrat">
          Information Security
        </h4>

        <p className="mb-8 text-slate-400 leading-relaxed text-base font-normal font-montserrat">
          We take appropriate security measures to protect against unauthorized
          access, alteration, disclosure, or destruction of data. These include
          internal security reviews of our data collection, storage, and
          processing practices.
        </p>

        {/* Section Heading */}
        <h4 className="text-2xl mb-4 font-semibold text-[#4DD0E1] font-montserrat">
          Updates / Changes
        </h4>

        <p className="mb-8 text-slate-400 leading-relaxed text-base font-normal font-montserrat">
          We may alter our privacy policy from time to time to incorporate
          necessary changes in technology, applicable law, or any other variant.
          We reserve the right to change the terms of this Privacy Policy at any
          time.
        </p>

        {/* Section Heading */}
        <h4 className="text-2xl mb-4 font-semibold text-[#4DD0E1] font-montserrat">
          Questions / Grievance Redressal
        </h4>

        <p className="mb-4 text-slate-400 leading-relaxed text-base font-normal font-montserrat">
          If you have any grievance relating to the processing of information
          provided by you, please contact our Grievance Department at{" "}
          <b className="text-white">rahul@mindefy.tech</b> or write to us at:
        </p>

        <p className="text-slate-400 text-base leading-relaxed font-normal font-montserrat mb-2">
          <b className="text-white">Mindefy Technologies Private Limited</b>
          <br />
          201, Atulya IT Park,
          <br />
          Khandwa Road, Indore - 452001,
          <br />
          Madhya Pradesh, India
        </p>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/+919096126060?text= Hello Mindefy Team,"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-16 right-2 z-50 flex items-center gap-2"
      >
        <span className="hidden md:inline-block bg-slate-900 px-4 py-2 rounded shadow-lg text-white text-sm border border-slate-700 font-normal font-montserrat">
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
          className="fixed bottom-2 right-2 w-10 h-10 cursor-pointer bg-slate-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#00BCD4] transition-all z-[4] text-4xl border border-slate-700"
        >
          <span className="text-2xl">↑</span>
        </button>
      )}
    </div>
  );
}
