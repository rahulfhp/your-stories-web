"use client";

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import useStoriesStore from "@/stores/stories";
import WebsiteStoryCard from "./WebsiteStoryCard";
import MindfulNestChatbot from "./MindfulNestChatbot";
import {
  trackWebsiteHomepageVisited,
  trackWebsiteGooglePlayClicked,
  trackWebsiteBottomStoriesLogoClicked,
  trackWebsiteHandpickedStoryCardClicked,
  trackWebsiteLetsReadClicked,
} from "@/lib/website-analytics";
import FeaturesPage from "./YourHourAppFeatures";

const featuresInNews = [
  "inc42",
  "dainik_bhasker",
  "sakal",
  "dailyStar",
  "independent",
  "dailyhunt",
  "lifehack",
  "witty_spark",
  "tracxn",
  "nerdschalk",
  "techarival",
  "techConnecto",
  "techdator",
  "newsBytes",
  "tech_comuters",
  "Elcome",
  "android4all",
  "cosmo",
  "h2s",
  "gt",
  "geochild",
  "rochamama",
  "steemit",
  "topbest",
];

export default function WebsiteHomePage() {
  const [isSticky, setIsSticky] = useState(false);

  const { handpickedStories, fetchHandpickedStories } = useStoriesStore();

  useEffect(() => {
    // Fetch handpicked stories on component mount
    fetchHandpickedStories();

    // Track homepage visit event
    trackWebsiteHomepageVisited();

    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStoryClick = (storyId: string, storyTitle: string) => {
    // Track Story card Click event
    trackWebsiteHandpickedStoryCardClicked(storyId, storyTitle);
    window.open(`https://stories.yourhourapp.com/read/${storyId}`, "_blank");
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="relative pt-28 md:pt-54 pb-10 md:pb-12 min-h-screen"
        style={{
          backgroundImage: "url(yourhour-website-img/hero-BG-Img.webp)",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          width: "100%",
          height: "auto",
        }}
      >
        <div className="container mx-auto px-4 pb-[20%] md:pb-[24%]">
          {/* Heading */}
          <div className="text-center mb-10 md:mb-12">
            <h1 className="text-xl text-black sm:text-2xl md:text-4xl mb-2 sm:mb-3 font-bold tracking-wide font-lobster">
              Meet YourHour
            </h1>
            <h2 className="text-xl text-black sm:text-2xl md:text-4xl font-bold tracking-wide font-lobster">
              The Best ScreenTime App
            </h2>
          </div>

          {/* Social Proofing */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-16 lg:gap-32 mb-10 md:mb-12">
            {/* Side Card 1 */}
            <div
              className="w-50 sm:w-55 md:w-58 h-25 sm:h-28 md:h-29 text-center flex flex-col justify-center bg-center bg-no-repeat bg-cover"
              style={{
                backgroundImage: "url(yourhour-website-img/SideLeafCrown.svg)",
              }}
            >
              <div className="text-[#36BFCB] font-montserrat font-bold text-xs sm:text-sm mb-1">
                Available in
              </div>
              <div className="text-[#36BFCB] font-montserrat font-black text-lg sm:text-2xl mb-1">
                25 Global
              </div>
              <div className="text-[#36BFCB] font-montserrat font-bold text-xs sm:text-sm">
                Languages
              </div>
            </div>

            {/* Main Card */}
            <div
              className="w-50 sm:w-55 md:w-63 h-25 sm:h-28 md:h-29 text-center flex flex-col justify-center bg-center bg-no-repeat bg-cover"
              style={{
                backgroundImage: "url(yourhour-website-img/MainLeafCrown.svg)",
              }}
            >
              <div className="text-[#36BFCB] font-montserrat font-bold text-xs sm:text-sm mb-1">
                Trusted By Over
              </div>
              <div className="text-[#36BFCB] font-montserrat font-black text-lg sm:text-2xl mb-1">
                5 Million
              </div>
              <div className="text-[#36BFCB] font-montserrat font-bold text-xs sm:text-sm">
                Users Worldwide
              </div>
            </div>

            {/* Side Card 2 */}
            <div
              className="w-50 sm:w-55 md:w-58 h-25 sm:h-28 md:h-29 text-center flex flex-col justify-center bg-center bg-no-repeat bg-cover"
              style={{
                backgroundImage: "url(yourhour-website-img/SideLeafCrown.svg)",
              }}
            >
              <div className="text-[#36BFCB] font-montserrat font-bold text-xs sm:text-sm mb-1">
                User Ratings
              </div>
              <div className="text-yellow-400 font-montserrat font-black text-xl sm:text-2xl mb-1 flex items-center justify-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => {
                  const rating = 4.6;
                  const isFull = i <= Math.floor(rating);
                  const isHalf = i === Math.ceil(rating) && rating % 1 !== 0;

                  return (
                    <div key={i} className="relative">
                      {/* Full star (yellow) */}
                      <Star
                        size={16}
                        className={`${
                          isFull ? "fill-current" : "fill-none"
                        } text-yellow-400`}
                      />

                      {/* Half star overlay */}
                      {isHalf && (
                        <div className="absolute inset-0 overflow-hidden w-1/2">
                          <Star
                            size={16}
                            className="fill-current text-yellow-400"
                          />
                        </div>
                      )}

                      {/* Empty star */}
                      {!isFull && !isHalf && (
                        <Star
                          size={16}
                          className="fill-current text-gray-300"
                        />
                      )}
                    </div>
                  );
                })}
                <span className="ml-1 text-[#36BFCB] font-montserrat font-black text-lg sm:text-2xl">
                  4.6
                </span>
              </div>
              <div className="text-[#36BFCB] font-montserrat font-bold text-xs sm:text-sm">
                By 76k+ Users
              </div>
            </div>
          </div>

          {/* Google Play Button */}
          <div className="text-center mb-10 md:mb-12">
            <a
              href="https://play.google.com/store/apps/details?id=com.mindefy.phoneaddiction.mobilepe&hl=en_IN&gl=US"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWebsiteGooglePlayClicked()}
            >
              <img
                src="yourhour-website-img/GooglePlay.png"
                alt="Get it on Google Play"
                className="w-32 sm:w-38 inline-block"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Dashboard Image */}
      <section className="py-12 px-4 md:px-[10%]">
        <div className="text-center">
          <img
            src="yourhour-website-img/YourHourDashboard.webp"
            alt="YourHour Dashboard"
            className="max-w-full h-auto mx-auto"
          />
        </div>
      </section>

      {/* Product Hunt Badge */}
      <section className="pb-12 px-4 md:px-[10%]">
        <div className="text-center">
          <a
            href="https://www.producthunt.com/posts/yourhour?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-yourhour"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=292643&theme=dark"
              alt="YourHour - Track and better control your phone usage | Product Hunt"
              className="w-62 h-13 inline-block"
            />
          </a>
        </div>
      </section>

      {/* YourHourApp Features Section */}
      <FeaturesPage />

      {/* Featured In Section */}
      <section className="py-16 bg-[#333333]">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-center text-white font-montserrat font-bold text-2xl md:text-3xl mb-10">
            Featured In The News
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-x-3 md:gap-x-6 gap-y-4 md:gap-y-6">
            {featuresInNews.map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center w-[100px] md:w-[120px] lg:w-[150px]"
              >
                <img
                  src={`yourhour-website-img/yourhour_${logo}.${
                    logo === "techdator" ? "png" : "webp"
                  }`}
                  alt={logo}
                  className="h-25 sm:h-28 md:h-38 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YourStories Section */}
      <section className="py-16 px-4 md:px-[10%]">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <img
              src="yourhour-website-img/MeetReadWrite.svg"
              alt="Meet Read Write"
              className="h-50 mx-auto mb-8"
            />
            <a
              href="https://stories.yourhourapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWebsiteBottomStoriesLogoClicked()}
            >
              <img
                src="yourhour-website-img/stories-logo.svg"
                alt="YourStories"
                className="mx-auto mb-12"
              />
            </a>
            <h4 className="text-xl font-semibold font-montserrat mb-8">
              Hand Picked Stories
            </h4>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {handpickedStories && handpickedStories.length > 0
              ? handpickedStories.map((story) => (
                  <WebsiteStoryCard
                    key={story._id}
                    storyData={story}
                    onClick={() =>
                      handleStoryClick(story._id, story.storyTitle)
                    }
                  />
                ))
              : null}
          </div>

          <div className="text-center">
            <a
              href="https://stories.yourhourapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center font-semibold font-montserrat text-lg text-[#21ABE1] border border-[#21ABE1] px-4 py-3 rounded-xl hover:opacity-80"
              onClick={() => trackWebsiteLetsReadClicked()}
            >
              Let's Read
            </a>
          </div>
        </div>
      </section>

      {/* MindfulNest Chatbot */}
      <MindfulNestChatbot />

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
