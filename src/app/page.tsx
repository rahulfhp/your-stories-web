'use client';

import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import useStoriesStore from "@/stores/stories";
import StoryCard from '@/components/StoryCard';

export default function Home() {
  const {
    handpickedStories,
    moreStories,
    isLoadingHandpicked,
    isLoadingMore,
    handpickedError,
    moreStoriesError,
    fetchHandpickedStories,
    fetchMoreStories
  } = useStoriesStore();

  const [moreStoriesPage, setMoreStoriesPage] = useState(0);
  const STORIES_PER_PAGE = 10;

  useEffect(() => {
    // Fetch handpicked stories on component mount
    fetchHandpickedStories();
    
    // Fetch initial more stories
    fetchMoreStories(STORIES_PER_PAGE, 0);
  }, [fetchHandpickedStories, fetchMoreStories]);

  const handleLoadMoreStories = () => {
    const nextPage = moreStoriesPage + 1;
    const skip = nextPage * STORIES_PER_PAGE;
    fetchMoreStories(STORIES_PER_PAGE, skip);
    setMoreStoriesPage(nextPage);
  };

  const handleStoryClick = (storyId: string) => {
    // Handle story click - navigate to story detail page
    console.log('Story clicked:', storyId);
    // You can implement navigation logic here
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8 pt-24">
          
          {/* Handpicked Stories Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">
                ✨ Handpicked Stories
              </h2>
              <div className="h-1 flex-1 ml-4 bg-gradient-to-r from-purple-500 to-transparent rounded"></div>
            </div>
            
            {handpickedError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-400 text-sm">
                  Failed to load handpicked stories: {handpickedError}
                </p>
              </div>
            )}
            
            {isLoadingHandpicked ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-white/10 rounded-2xl p-4">
                      <div className="bg-white/20 h-[150px] rounded-xl mb-3"></div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="bg-white/20 w-6 h-6 rounded-full"></div>
                          <div className="bg-white/20 h-3 w-24 rounded"></div>
                        </div>
                        <div className="bg-white/20 h-4 w-3/4 rounded"></div>
                        <div className="flex space-x-4">
                          <div className="bg-white/20 h-3 w-20 rounded"></div>
                          <div className="bg-white/20 h-3 w-16 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {handpickedStories && handpickedStories.length > 0 ? handpickedStories.map((story) => (
                  <StoryCard
                    key={story._id}
                    storyData={story}
                    onClick={() => handleStoryClick(story._id)}
                  />
                )) : null}
              </div>
            )}
            
            {!isLoadingHandpicked && (!handpickedStories || handpickedStories.length === 0) && !handpickedError && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No handpicked stories available at the moment.</p>
              </div>
            )}
          </section>

          {/* More Stories Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">
                📚 More Stories
              </h2>
              <div className="h-1 flex-1 ml-4 bg-gradient-to-r from-blue-500 to-transparent rounded"></div>
            </div>
            
            {moreStoriesError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-400 text-sm">
                  Failed to load more stories: {moreStoriesError}
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {moreStories && moreStories.length > 0 ? moreStories.map((story) => (
                <StoryCard
                  key={story._id}
                  storyData={story}
                  onClick={() => handleStoryClick(story._id)}
                />
              )) : null}
            </div>
            
            {isLoadingMore && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-white/10 rounded-2xl p-4">
                      <div className="bg-white/20 h-[150px] rounded-xl mb-3"></div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="bg-white/20 w-6 h-6 rounded-full"></div>
                          <div className="bg-white/20 h-3 w-24 rounded"></div>
                        </div>
                        <div className="bg-white/20 h-4 w-3/4 rounded"></div>
                        <div className="flex space-x-4">
                          <div className="bg-white/20 h-3 w-20 rounded"></div>
                          <div className="bg-white/20 h-3 w-16 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {!isLoadingMore && (!moreStories || moreStories.length === 0) && !moreStoriesError && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No more stories available at the moment.</p>
              </div>
            )}
            
            {/* Load More Button */}
            {moreStories && moreStories.length > 0 && !isLoadingMore && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMoreStories}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
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
