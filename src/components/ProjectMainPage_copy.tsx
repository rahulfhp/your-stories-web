"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useStoriesStore from "@/stores/stories";
import StoryCard from "@/components/StoryCard";
import { trackHomepageVisited } from "@/lib/analytics";
import { getDomainType } from "@/lib/domainUtils";
import WebsiteHomePage from "@/components/WebsiteHomePage";
import { createStorySlug } from "@/lib/utils";

export default function Home() {
  const router = useRouter();
  const {
    handpickedStories,
    moreStories,
    isLoadingHandpicked,
    isLoadingMore,
    handpickedError,
    moreStoriesError,
    fetchHandpickedStories,
    fetchMoreStories,
  } = useStoriesStore();

  const [domainType, setDomainType] = useState<"app" | "website" | "localhost">(
    "localhost"
  );

  const [isClient, setIsClient] = useState(false);
  const [moreStoriesPage, setMoreStoriesPage] = useState(0);

  const STORIES_PER_PAGE = 9;

  // Detect domain and mark client-side
  useEffect(() => {
    setIsClient(true);
    setDomainType(getDomainType());
  }, []);

  // Only fetch stories when not on website domain
  useEffect(() => {
    if (isClient && domainType !== "website") {
      // Fetch handpicked stories on component mount
      fetchHandpickedStories();

      // Fetch initial more stories
      fetchMoreStories(STORIES_PER_PAGE, 0);

      // Track homepage visit
      trackHomepageVisited();
    }
  }, [isClient, domainType, fetchHandpickedStories, fetchMoreStories]);

  const handleLoadMoreStories = () => {
    const nextPage = moreStoriesPage + 1;
    const skip = nextPage * STORIES_PER_PAGE;
    fetchMoreStories(STORIES_PER_PAGE, skip);
    setMoreStoriesPage(nextPage);
  };

  const handleStoryClick = (storyId: string, storyTitle: string) => {
    const slug = createStorySlug(storyTitle, storyId);
    router.push(`/screentime/${slug}`);
  };

  // Conditional render
  if (isClient && domainType === "website") {
    return <WebsiteHomePage />;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-900 dark:to-black relative overflow-hidden">
        {/* Animated background elements - optimized for mobile */}
        <div className="absolute inset-0">
          <div className="hidden sm:block">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gray-400/10 dark:bg-white/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gray-300/8 dark:bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] bg-gradient-to-r from-gray-200/5 dark:from-white/2 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 pt-24 sm:pt-28 md:pt-32 lg:pt-32 relative z-10">
          {/* Handpicked Stories Section */}
          <section className="mb-8 sm:mb-10 lg:mb-12">
            <div className="flex items-center justify-between mb-4 sm:mb-5 lg:mb-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white/90">
                ✨ Handpicked Stories
              </h2>
              <div className="h-1 flex-1 ml-4 bg-gradient-to-r from-gray-400/40 dark:from-white/30 to-transparent rounded"></div>
            </div>

            {handpickedError && (
              <div className="bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-700 dark:text-red-400 text-sm">
                  Failed to load handpicked stories: {handpickedError}
                </p>
              </div>
            )}

            {isLoadingHandpicked ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200/60 dark:bg-white/10 rounded-2xl p-4">
                      <div className="bg-gray-300/80 dark:bg-white/20 h-[150px] rounded-xl mb-3"></div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="bg-gray-300/80 dark:bg-white/20 w-6 h-6 rounded-full"></div>
                          <div className="bg-gray-300/80 dark:bg-white/20 h-3 w-24 rounded"></div>
                        </div>
                        <div className="bg-gray-300/80 dark:bg-white/20 h-4 w-3/4 rounded"></div>
                        <div className="flex space-x-4">
                          <div className="bg-gray-300/80 dark:bg-white/20 h-3 w-20 rounded"></div>
                          <div className="bg-gray-300/80 dark:bg-white/20 h-3 w-16 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {handpickedStories && handpickedStories.length > 0
                  ? handpickedStories.map((story) => (
                      <StoryCard
                        key={story._id}
                        storyData={story}
                        onClick={() =>
                          handleStoryClick(story._id, story.storyTitle)
                        }
                      />
                    ))
                  : null}
              </div>
            )}

            {!isLoadingHandpicked &&
              (!handpickedStories || handpickedStories.length === 0) &&
              !handpickedError && (
                <div className="text-center py-8 sm:py-10 lg:py-12">
                  <p className="text-gray-600 dark:text-white/60 text-base sm:text-lg">
                    No handpicked stories available at the moment.
                  </p>
                </div>
              )}
          </section>

          {/* More Stories Section */}
          <section>
            <div className="flex items-center justify-between mb-4 sm:mb-5 lg:mb-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white/90">
                📚 More Stories
              </h2>
              <div className="h-1 flex-1 ml-4 bg-gradient-to-r from-gray-400/30 dark:from-white/20 to-transparent rounded"></div>
            </div>

            {moreStoriesError && (
              <div className="bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-700 dark:text-red-400 text-sm">
                  Failed to load more stories: {moreStoriesError}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {moreStories && moreStories.length > 0
                ? moreStories.map((story) => (
                    <StoryCard
                      key={story._id}
                      storyData={story}
                      onClick={() =>
                        handleStoryClick(story._id, story.storyTitle)
                      }
                    />
                  ))
                : null}
            </div>

            {isLoadingMore && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mt-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-200/60 dark:bg-white/10 rounded-2xl p-4">
                      <div className="bg-gray-300/80 dark:bg-white/20 h-[150px] rounded-xl mb-3"></div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="bg-gray-300/80 dark:bg-white/20 w-6 h-6 rounded-full"></div>
                          <div className="bg-gray-300/80 dark:bg-white/20 h-3 w-24 rounded"></div>
                        </div>
                        <div className="bg-gray-300/80 dark:bg-white/20 h-4 w-3/4 rounded"></div>
                        <div className="flex space-x-4">
                          <div className="bg-gray-300/80 dark:bg-white/20 h-3 w-20 rounded"></div>
                          <div className="bg-gray-300/80 dark:bg-white/20 h-3 w-16 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoadingMore &&
              (!moreStories || moreStories.length === 0) &&
              !moreStoriesError && (
                <div className="text-center py-8 sm:py-10 lg:py-12">
                  <p className="text-gray-600 dark:text-white/60 text-base sm:text-lg">
                    No more stories available at the moment.
                  </p>
                </div>
              )}

            {/* Load More Button */}
            {moreStories && moreStories.length > 0 && !isLoadingMore && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMoreStories}
                  className="bg-gray-200/80 dark:bg-white/10 backdrop-blur-xl border border-gray-300/60 dark:border-white/20 hover:bg-gray-300/90 dark:hover:bg-white/20 hover:border-gray-400/70 dark:hover:border-white/30 text-gray-800 dark:text-white/90 font-semibold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)] cursor-pointer"
                >
                  Load More Stories
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
