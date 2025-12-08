import React, { useEffect, useRef, useState } from "react";

const AnimatedSection = ({
  children,
  direction = "left",
  className = "",
}: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Check if screen is mobile size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getAnimationClass = () => {
    // On mobile, always show content without animation
    if (isMobile) {
      return "opacity-100 translate-x-0 translate-y-0";
    }

    // On desktop, apply animations
    if (!isVisible) {
      if (direction === "left") return "opacity-0 -translate-x-20";
      if (direction === "right") return "opacity-0 translate-x-20";
      if (direction === "bottom") return "opacity-0 translate-y-20";
    }
    return "opacity-100 translate-x-0 translate-y-0";
  };

  return (
    <div
      ref={sectionRef}
      className={`${
        !isMobile ? "transition-all duration-800 ease-out" : ""
      } ${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
};

const FeaturesPage = () => {
  return (
    <div className="bg-white">
      {/* Features Section - The Dashboard */}
      <section className="px-4 py-4 md:px-[10%] md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="w-full max-w-[33.15rem]">
              <h2 className="text-3xl text-black md:text-4xl mb-4 font-bold tracking-wide">
                The Dashboard
              </h2>
              <h3 className="text-xl text-black md:text-2xl mb-4 font-medium">
                Your Daily Usage Summary
              </h3>
              <p className="mb-6 text-black font-normal leading-[180%] tracking-wide">
                Mr. Slow awaits you on this board! The app keeps a track on your
                "Usage Time" & "Unlock Count" and thereby, gives a comparative
                infographic view of your today's and past 7-day's activity.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#06CCDB] font-bold list-disc pl-4">
                <li>Create Your Goals</li>
                <li>Set Screen Unlock Count</li>
                <li>Track Usage Time</li>
                <li>Analyse Most Used Apps</li>
                <li>Track Most Visited Apps</li>
                <li>Check Your Addiction Level</li>
              </ul>
            </div>
            <AnimatedSection direction="right" className="text-center">
              <img
                src="yourhour-website-img/phoneaddiction_dashboard.webp"
                alt="Dashboard"
                className="aspect-[1/1] w-full md:w-4xl object-contain mx-auto"
                loading="lazy"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section - The Reports */}
      <section className="px-4 py-4 md:px-[10%] md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection
              direction="left"
              className="text-center order-2 md:order-1"
            >
              <img
                src="yourhour-website-img/phoneaddiction_multiple_reports.webp"
                alt="Reports"
                className="aspect-[1/1] w-full md:w-4xl object-contain mx-auto"
                loading="lazy"
              />
            </AnimatedSection>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl text-black md:text-4xl mb-4 font-bold tracking-wide">
                The Reports
              </h2>
              <h3 className="text-xl text-black md:text-2xl mb-4 font-medium">
                Multiple Detailed Reports
              </h3>
              <p className="mb-6 text-black font-normal leading-[180%] tracking-wide">
                YourHour app provides its users insightful Daily, Weekly and
                Monthly infographic based reports for their app usage with great
                analytics. The Daily consolidated usage report gets delivered
                everyday through a notification.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#06CCDB] font-bold list-disc pl-4">
                <li>Daily Reports</li>
                <li>Weekly Reports</li>
                <li>Monthly Reports</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Goal Spots */}
      <section className="px-4 py-4 md:px-[10%] md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl text-black md:text-4xl mb-4 font-bold tracking-wide">
                The Goal Spots
              </h2>
              <h3 className="text-xl text-black md:text-2xl mb-4 font-medium">
                Know Your Level of Addiction!
              </h3>
              <p className="mb-6 text-black font-normal leading-[180%] tracking-wide">
                Using the data of your phone usage for past 7 days, YourHour app
                defines the Category of Phone Addict that you currently are from
                the listed six categories vis-a-vis Addicted, Obsessed,
                Dependent, Habitual, Achiever and Champion.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#06CCDB] font-bold list-disc pl-4">
                <li>Addicted</li>
                <li>Obsessed</li>
                <li>Dependent</li>
                <li>Habitual</li>
                <li>Achiever</li>
                <li>Champion</li>
              </ul>
            </div>
            <AnimatedSection direction="right" className="text-center">
              <img
                src="yourhour-website-img/phoneaddiction_level.webp"
                alt="Addiction Level"
                className="aspect-[1/1] w-full md:w-4xl object-contain mx-auto"
                loading="lazy"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section - Challenges */}
      <section className="px-4 py-4 md:px-[10%] md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection
              direction="left"
              className="text-center order-2 md:order-1"
            >
              <img
                src="yourhour-website-img/phoneaddiction_challenges.webp"
                alt="Challenges"
                className="aspect-[1/1] w-full md:w-4xl object-contain mx-auto"
                loading="lazy"
              />
            </AnimatedSection>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl text-black md:text-4xl mb-4 font-bold tracking-wide">
                Smart & Curated Challenges
              </h2>
              <p className="mb-6 text-black font-normal leading-[180%] tracking-wide">
                YourHour app provides personalized challenge recommendations to
                its users to help them Break the Habit Loop.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#06CCDB] font-bold list-disc pl-4">
                <li>App Diet Challenge</li>
                <li>App Fasting Challenge</li>
                <li>No Phone Challenge</li>
                <li>Scheduled Challenges!</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Usage Analytics */}
      <section className="px-4 py-4 md:px-[10%] md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl text-black md:text-4xl mb-4 font-bold tracking-wide">
                Usage Analytics
              </h2>
              <p className="mb-6 text-black font-normal leading-[180%] tracking-wide">
                Generate PDF reports with all the important analytics at your
                fingertips.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#06CCDB] font-bold list-disc pl-4">
                <li>Weekly and Monthly Average</li>
                <li>Top Used Category</li>
                <li>Peak Usage Time</li>
                <li>Top Used Apps</li>
                <li>Track Daywise Phone Usage</li>
                <li>Carbon Footprint Reduction</li>
              </ul>
            </div>
            <AnimatedSection direction="right" className="text-center">
              <img
                src="yourhour-website-img/phoneaddiction_detailed_reports.webp"
                alt="Analytics"
                className="aspect-[1/1] w-full md:w-4xl object-contain mx-auto"
                loading="lazy"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section - Export Data */}
      <section className="px-4 py-4 md:px-[10%] md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection
              direction="left"
              className="text-center order-2 md:order-1"
            >
              <img
                src="yourhour-website-img/phoneaddiction_reports.webp"
                alt="Export"
                className="aspect-[1/1] w-full md:w-4xl object-contain mx-auto"
                loading="lazy"
              />
            </AnimatedSection>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl text-black md:text-4xl mb-4 font-bold tracking-wide">
                Export your data to XLSX format!
              </h2>
              <p className="mb-6 text-black font-normal leading-[180%] tracking-wide">
                YourHour app does not store any of your data, so all your data
                is stored in your phone memory and you can export the entire
                data since the installation of the app in excel format for your
                data analysis or statistics purpose.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#06CCDB] font-bold list-disc pl-4">
                <li>Export Data to PDF</li>
                <li>Export Data to Excel</li>
                <li>Backup on Google Drive</li>
                <li>Share with Friends</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* NEW FEATURES Mindful Pause */}
      <section className="px-4 py-4 md:px-[10%] md:py-10 mx-auto">
        <div className="max-w-5xl flex flex-col gap-7 items-center justify-center mx-auto px-4 mb-10 md:mb-16">
          {/* Heading */}
          <h2 className="text-3xl text-black md:text-4xl mb-4 font-bold tracking-wide text-center">
            Mindful Pause | Usage Pattern | Dark Mode
          </h2>

          {/* Description */}
          <p className="text-black font-normal tracking-wide leading-relaxed text-sm md:text-base mx-auto">
            We’ve Added Powerful Features To Help You Stay Aware And In Control
            Of Your Screentime:
          </p>

          {/* Paragraphs */}
          <p className="text-black font-normal tracking-wide leading-relaxed text-sm md:text-base mx-auto">
            <span className="font-semibold">Mindful Pause</span> – Get Notified
            When You Exceed Yourself Beyond Your Set App Usage Limit. A Gentle
            Reminder Appears Right On The App’s Opening Screen To Help You Take
            A Mindful Break.
          </p>

          <p className="text-black font-normal tracking-wide leading-relaxed text-sm md:text-base mx-auto">
            <span className="font-semibold">Usage Pattern</span> – Visualize
            Your App Habits With Easy-To-Read Graphs. See How Often You Open An
            App And How Much Time You Spend, Categorized Into Four Behavioral
            Types For Better Self-Awareness.
          </p>
        </div>

        {/* Image */}
        <AnimatedSection direction="bottom" className="w-full">
          <img
            src="yourhour-website-img/mindful-pause.webp"
            alt="Export"
            className="w-full max-w-5xl scale-105 mx-auto"
            loading="lazy"
          />
        </AnimatedSection>
      </section>
    </div>
  );
};

export default FeaturesPage;
