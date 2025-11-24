"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useStoriesStore from "@/stores/stories";
import StoryCard from "@/components/StoryCard";
import { createStorySlug } from "@/lib/utils";

export default function BookmarkedPage() {
  const router = useRouter();
  const {
    bookmarkedStories,
    isLoadingBookmarked,
    bookmarkedError,
    fetchBookmarkedStories,
    removeBookmarkStory,
  } = useStoriesStore();

  useEffect(() => {
    fetchBookmarkedStories();
  }, [fetchBookmarkedStories]);

  const handleStoryClick = (storyId: string, storyTitle: string) => {
    const slug = createStorySlug(storyTitle, storyId);
    router.push(`/read/${slug}`);
  };

  const handleRemove = (storyId: string) => {
    removeBookmarkStory(storyId);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-900 dark:to-black pt-20 sm:pt-24 md:pt-28 relative overflow-hidden">
      {/* Animated background elements - optimized for mobile */}
      <div className="absolute inset-0">
        <div className="hidden sm:block">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gray-400/10 dark:bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gray-300/8 dark:bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] bg-gradient-to-r from-gray-200/5 dark:from-white/2 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 relative z-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white/90">
            🔖 Bookmarked Stories
          </h1>
          <div className="h-1 flex-1 ml-3 sm:ml-4 bg-gradient-to-r from-gray-400/40 dark:from-white/30 to-transparent rounded"></div>
        </div>

        {bookmarkedError && (
          <div className="bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-red-700 dark:text-red-400 text-xs sm:text-sm">
              Failed to load bookmarked stories: {bookmarkedError}
            </p>
          </div>
        )}

        {isLoadingBookmarked ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200/60 dark:bg-white/10 rounded-2xl p-3 sm:p-4">
                  <div className="bg-gray-300/80 dark:bg-white/20 h-[120px] sm:h-[150px] rounded-xl mb-2 sm:mb-3"></div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="bg-gray-300/80 dark:bg-white/20 w-5 h-5 sm:w-6 sm:h-6 rounded-full"></div>
                      <div className="bg-gray-300/80 dark:bg-white/20 h-2 sm:h-3 w-20 sm:w-24 rounded"></div>
                    </div>
                    <div className="bg-gray-300/80 dark:bg-white/20 h-3 sm:h-4 w-3/4 rounded"></div>
                    <div className="flex space-x-3 sm:space-x-4">
                      <div className="bg-gray-300/80 dark:bg-white/20 h-2 sm:h-3 w-16 sm:w-20 rounded"></div>
                      <div className="bg-gray-300/80 dark:bg-white/20 h-2 sm:h-3 w-12 sm:w-16 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {bookmarkedStories && bookmarkedStories.length > 0 ? (
              bookmarkedStories.map((story) => (
                <StoryCard
                  key={story._id}
                  storyData={story}
                  onClick={() => handleStoryClick(story._id, story.storyTitle)}
                  onRemove={() => handleRemove(story._id)}
                />
              ))
            ) : (
              <div className="text-center py-8 sm:py-12 col-span-1 sm:col-span-2 lg:col-span-3">
                <p className="text-gray-600 dark:text-white/60 text-base sm:text-lg mb-3 sm:mb-4">
                  You haven't bookmarked any stories yet.
                </p>
                <p className="text-gray-500 dark:text-white/40 text-xs sm:text-sm">
                  Discover amazing stories and bookmark them to read later!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
