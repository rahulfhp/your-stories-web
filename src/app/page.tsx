'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useStoriesStore from "@/stores/stories";
import StoryCard from '@/components/StoryCard';

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
    fetchMoreStories
  } = useStoriesStore();

  const [moreStoriesPage, setMoreStoriesPage] = useState(0);
  const STORIES_PER_PAGE = 9;

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

  const handleStoryClick = (storyId: string, sourceType: 'handpicked' | 'more-stories') => {
    // Navigate to story detail page with source type
    router.push(`/read/${storyId}?source=${sourceType}`);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-white/2 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
          
          {/* Handpicked Stories Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white/90">
                ✨ Handpicked Stories
              </h2>
              <div className="h-1 flex-1 ml-4 bg-gradient-to-r from-white/30 to-transparent rounded"></div>
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
                    onClick={() => handleStoryClick(story._id, 'handpicked')}
                  />
                )) : null}
              </div>
            )}
            
            {!isLoadingHandpicked && (!handpickedStories || handpickedStories.length === 0) && !handpickedError && (
              <div className="text-center py-12">
                <p className="text-white/60 text-lg">No handpicked stories available at the moment.</p>
              </div>
            )}
          </section>

          {/* More Stories Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white/90">
                📚 More Stories
              </h2>
              <div className="h-1 flex-1 ml-4 bg-gradient-to-r from-white/20 to-transparent rounded"></div>
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
                  onClick={() => handleStoryClick(story._id, 'more-stories')}
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
                <p className="text-white/60 text-lg">No more stories available at the moment.</p>
              </div>
            )}
            
            {/* Load More Button */}
            {moreStories && moreStories.length > 0 && !isLoadingMore && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMoreStories}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 hover:border-white/30 text-white/90 font-semibold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
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
