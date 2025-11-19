import React, { useEffect, useRef, useState } from "react";

const AnimatedSection = ({
  children,
  direction = "left",
  className = "",
}: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
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
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getAnimationClass = () => {
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
      className={`transition-all duration-800 ease-out ${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
};

const FeaturesPage = () => {
  return (
    <div className="bg-white">
      {/* Features Section - The Dashboard */}
      <section className="py-12 px-4 md:px-[10%]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="w-full max-w-lg">
              <h2 className="text-3xl text-black md:text-4xl mb-4 font-bold tracking-wide">
                The Dashboard
              </h2>
              <h3 className="text-xl text-black md:text-2xl mb-4 font-medium">
                Your Daily Usage Summary
              </h3>
              <p className="mb-6 text-black font-normal leading-[180%] tracking-wide text-justify">
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
                className="w-full max-w-[25rem] mx-auto"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section - The Reports */}
      <section className="py-12 px-4 md:px-[10%]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection
              direction="left"
              className="text-center order-2 md:order-1"
            >
              <img
                src="yourhour-website-img/phoneaddiction_multiple_reports.webp"
                alt="Reports"
                className="w-full max-w-[25rem] mx-auto"
              />
            </AnimatedSection>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl text-black md:text-4xl mb-4 font-bold tracking-wide">
                The Reports
              </h2>
              <h3 className="text-xl text-black md:text-2xl mb-4 font-medium">
                Multiple Detailed Reports
              </h3>
              <p className="mb-6 text-black font-normal leading-[180%] tracking-wide text-justify">
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
      <section className="py-12 px-4 md:px-[10%]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl text-black md:text-4xl mb-4 font-bold tracking-wide">
                The Goal Spots
              </h2>
              <h3 className="text-xl text-black md:text-2xl mb-4 font-medium">
                Know Your Level of Addiction!
              </h3>
              <p className="mb-6 text-black font-normal leading-[180%] tracking-wide text-justify">
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
                className="w-full max-w-[25rem] mx-auto"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section - Challenges */}
      <section className="py-12 px-4 md:px-[10%]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection
              direction="left"
              className="text-center order-2 md:order-1"
            >
              <img
                src="yourhour-website-img/phoneaddiction_challenges.webp"
                alt="Challenges"
                className="w-full max-w-[25rem] md:h-[37.5rem] mx-auto object-contain"
              />
            </AnimatedSection>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl text-black md:text-4xl mb-4 font-bold tracking-wide">
                Smart & Curated Challenges
              </h2>
              <p className="mb-6 text-black font-normal leading-[180%] tracking-wide text-justify">
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
      <section className="py-12 px-4 md:px-[10%]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl text-black md:text-4xl mb-4 font-bold tracking-wide">
                Usage Analytics
              </h2>
              <p className="mb-6 text-black font-normal leading-[180%] tracking-wide text-justify">
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
                className="w-full max-w-[25rem] mx-auto"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section - Export Data */}
      <section className="py-12 px-4 md:px-[10%]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection
              direction="left"
              className="text-center order-2 md:order-1"
            >
              <img
                src="yourhour-website-img/phoneaddiction_reports.webp"
                alt="Export"
                className="w-full max-w-[25rem] mx-auto"
              />
            </AnimatedSection>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl text-black md:text-4xl mb-4 font-bold tracking-wide">
                Export your data to XLSX format!
              </h2>
              <p className="mb-6 text-black font-normal leading-[180%] tracking-wide text-justify">
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

      {/* The Dark Mode */}
      <section className="py-12 px-4 md:px-[10%]">
        <div className="container mx-auto">
          <div className="text-center mb-5 mx-auto">
            <h2 className="text-3xl text-black md:text-4xl mb-7 font-bold tracking-wide">
              The Dark Mode
            </h2>
            <h3 className="text-xl text-black md:text-2xl mb-7 font-medium">
              Know Your Level of Addictions
            </h3>
            <p className="max-w-4xl mx-auto text-center text-black font-normal leading-[180%] tracking-wide">
              YourHour equips the user with Dark Mode feature where they can
              change the App Layout, according to their preference. And guess
              what? You can use this feature for free!
            </p>
          </div>
          <AnimatedSection direction="bottom" className="w-full">
            <img
              src="yourhour-website-img/yourhour-dark-image.webp"
              alt="Export"
              className="w-full max-w-[1120px] mx-auto py-5"
            />
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
