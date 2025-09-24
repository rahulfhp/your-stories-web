"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useStoriesStore from "@/stores/stories";
import StoryCard from "@/components/StoryCard";

export default function BookmarkedPage() {
  const router = useRouter();
  const {
    bookmarkedStories,
    isLoadingBookmarked,
    bookmarkedError,
    fetchBookmarkedStories,
    unBookmarkStory,
  } = useStoriesStore();

  useEffect(() => {
    fetchBookmarkedStories();
  }, [fetchBookmarkedStories]);

  const handleStoryClick = (storyId: string) => {
    router.push(`/read/${storyId}?source=bookmarked`);
  };

  const handleRemove = (storyId: string) => {
    unBookmarkStory(storyId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white/90">
            🔖 Bookmarked Stories
          </h2>
          <div className="h-1 flex-1 ml-4 bg-gradient-to-r from-white/30 to-transparent rounded"></div>
        </div>

        {bookmarkedError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-400 text-sm">
              Failed to load bookmarked stories: {bookmarkedError}
            </p>
          </div>
        )}

        {isLoadingBookmarked ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="bg-white/20 h-[150px] rounded-xl mb-3"></div>
                  <div className="space-y-3">
                    <div className="bg-white/20 h-3 w-24 rounded"></div>
                    <div className="bg-white/20 h-4 w-3/4 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedStories && bookmarkedStories.length > 0 ? (
              bookmarkedStories.map((story) => (
                <StoryCard
                  key={story._id}
                  storyData={story}
                  onClick={() => handleStoryClick(story._id)}
                  onRemove={() => handleRemove(story._id)}
                />
              ))
            ) : (
              <div className="text-center py-12 col-span-3">
                <p className="text-white/60 text-lg">
                  You haven’t bookmarked any stories yet.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
