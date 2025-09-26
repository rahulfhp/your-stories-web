"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Story } from "@/stores/stories";
import useStoriesStore from "@/stores/stories";
import LoginDialog from "./LoginDialog";
import { useAuthStore } from "@/stores/auth";

// Icons
import {
  StarIcon,
  BookmarkIcon,
  ShareIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarFilledIcon,
  BookmarkIcon as BookmarkFilledIcon,
} from "@heroicons/react/24/solid";

interface ReadStoryPageProps {
  storyId: string;
  sourceType: "handpicked" | "more-stories" | "search" | "bookmarked";
}

const ReadStoryPage: React.FC<ReadStoryPageProps> = ({
  storyId,
  sourceType,
}) => {
  const router = useRouter();
  const {
    handpickedStories,
    moreStories,
    upvoteStory,
    downvoteStory,
    bookmarkStory,
    removeBookmarkStory,
    readStory,
  } = useStoriesStore();
  
  const { currentUser, requireAuth } = useAuthStore();
  const closeLoginDialog = useAuthStore((s) => s.closeLoginDialog);

  // State management
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  // Timer state for read tracking
  const [readTimer, setReadTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [hasMarkedAsRead, setHasMarkedAsRead] = useState(false);

  // Find story based on ID and source type
  useEffect(() => {
    const findStory = async () => {
      setIsLoading(true);
      let foundStory: Story | undefined;

      try {
        // First, try to find in existing stores
        if (sourceType === "handpicked") {
          foundStory = handpickedStories.find((s) => s._id === storyId);
          // If not found and store is empty, fetch handpicked stories
          if (!foundStory && handpickedStories.length === 0) {
            await useStoriesStore.getState().fetchHandpickedStories();
            foundStory = useStoriesStore
              .getState()
              .handpickedStories.find((s) => s._id === storyId);
          }
        } else if (sourceType === "more-stories") {
          foundStory = moreStories.find((s) => s._id === storyId);
          // If not found and store is empty, fetch more stories
          if (!foundStory && moreStories.length === 0) {
            await useStoriesStore.getState().fetchMoreStories(20, 0);
            foundStory = useStoriesStore
              .getState()
              .moreStories.find((s) => s._id === storyId);
          }
        }
        // For search and bookmarked, we'll need to implement those stores later
        // For now, try to find in both existing stores as fallback
        else {
          foundStory =
            handpickedStories.find((s) => s._id === storyId) ||
            moreStories.find((s) => s._id === storyId);
        }

        if (foundStory) {
          setStory(foundStory);
          // Check if story is bookmarked by current user
          if (currentUser?.bookmarkedStories) {
            setIsBookmarked(currentUser.bookmarkedStories.includes(foundStory._id));
          }
          // Check if story is upvoted by current user
          if (currentUser?.upVoteStories) {
            setIsUpvoted(currentUser.upVoteStories.includes(foundStory._id));
          }
          // Start the read timer when story is loaded
          setIsTimerActive(true);
          setReadTimer(0);
          
          // Check if story is already marked as read
          if (currentUser?.readStories && currentUser.readStories.includes(foundStory._id)) {
            setHasMarkedAsRead(true);
            setIsTimerActive(false);
          }
        }
      } catch (error) {
        console.error("Error fetching story:", error);
      } finally {
        setIsLoading(false);
      }
    };

    findStory();
  }, [storyId, sourceType, handpickedStories, moreStories, currentUser?.bookmarkedStories, currentUser?.upVoteStories]);

  // Sync upvote state when user's upVoteStories changes
  useEffect(() => {
    if (story && currentUser?.upVoteStories) {
      setIsUpvoted(currentUser.upVoteStories.includes(story._id));
    }
  }, [currentUser?.bookmarkedStories, story?._id]);

  // Timer logic for read tracking (15 seconds)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerActive && readTimer < 15) {
      interval = setInterval(() => {
        setReadTimer(prev => prev + 1);
      }, 1000);
    } else if (readTimer >= 15 && !hasMarkedAsRead && currentUser && story) {
      // Timer completed, mark story as read
      handleMarkAsRead();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerActive, readTimer, hasMarkedAsRead, currentUser, story]);

  // Handle marking story as read
  const handleMarkAsRead = async () => {
    if (!currentUser || !story || hasMarkedAsRead) return;

    try {
      // Check if story is already in readStories to avoid duplicate API calls
      const currentReadStories = currentUser.readStories || [];
      if (!currentReadStories.includes(story._id)) {
        // Call the store's readStory function
        await readStory(story._id);
        setHasMarkedAsRead(true);
        setIsTimerActive(false);
      } else {
        // Story already marked as read
        setHasMarkedAsRead(true);
        setIsTimerActive(false);
      }
    } catch (error) {
      console.error('Error marking story as read:', error);
    }
  };

  // Sync bookmark state when user's bookmarkedStories changes
  useEffect(() => {
    if (story && currentUser?.bookmarkedStories) {
      setIsBookmarked(currentUser.bookmarkedStories.includes(story._id));
    }
  }, [currentUser?.bookmarkedStories, story?._id]);

  // Format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format read time
  const formatReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    return `${readTime} min read`;
  };

  // Handle interactions
  const handleUpvote = async () => {
    if (!story) return;

    requireAuth(async () => {
      const currentUpvoteState = isUpvoted;
      const currentUpvoteCount = story.upvoteCount;
      
      // Optimistic update
      setIsUpvoted(!currentUpvoteState);
      setStory({ ...story, upvoteCount: currentUpvoteState ? currentUpvoteCount - 1 : currentUpvoteCount + 1 });

      try {
        if (currentUpvoteState) {
          // Currently upvoted, so downvote
          await downvoteStory(story._id);
        } else {
          // Not upvoted, so upvote
          await upvoteStory(story._id);
        }
        
        // Get updated story from store to sync with latest data
        const updatedStory = useStoriesStore.getState().handpickedStories.find(s => s._id === story._id) ||
                           useStoriesStore.getState().moreStories.find(s => s._id === story._id) ||
                           useStoriesStore.getState().bookmarkedStories.find(s => s._id === story._id);
        
        if (updatedStory) {
          setStory(updatedStory);
        }
      } catch (error) {
        // Revert optimistic update on error
        setIsUpvoted(currentUpvoteState);
        setStory({ ...story, upvoteCount: currentUpvoteCount });
        console.error('Error handling upvote:', error);
      }
    });
  };

  const handleBookmark = () => {
    if (!story) return;

    requireAuth(() => {
      if (isBookmarked) {
        removeBookmarkStory(story._id);
        setIsBookmarked(false);
      } else {
        bookmarkStory(story._id);
        setIsBookmarked(true);
      }
    });
  };

  const handleShare = () => {
    if (!story) return;

    if (navigator.share) {
      navigator
        .share({
          title: story.storyTitle,
          text:
            story.storyContent.replace(/<[^>]*>/g, "").substring(0, 100) +
            "...",
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch(() => {
          setShowShareMenu(!showShareMenu);
        });
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleClose = () => {
    setShowLoginDialog(false);
    closeLoginDialog();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden flex items-center justify-center">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-white/2 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden flex items-center justify-center">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-white/2 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center relative z-10">
          <h2 className="text-white text-xl font-semibold mb-4">
            Story Not Found
          </h2>
          <p className="text-white/70 mb-6">
            The story you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-purple-600/80 hover:bg-purple-600 text-white rounded-xl backdrop-blur-md border border-white/20 transition-all duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-white/2 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center px-4 py-8 pt-24 relative z-10">
        <div className="w-full max-w-2xl">
          {/* Story Header */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8 shadow-2xl">
            {/* Cover Image */}
            {story.coverPicRef && (
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
                <Image
                  src={story.coverPicRef}
                  alt={story.storyTitle}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Country Badge */}
                {story.country && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/50 text-white text-sm rounded-full backdrop-blur-md border border-white/20">
                      📍 {story.country}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Story Title */}
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {story.storyTitle}
            </h1>

            {/* Author Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  {story.profilePicRef ? (
                    <Image
                      src={story.profilePicRef}
                      alt={story.userName}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-lg font-semibold">
                      {story.userName?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-white font-semibold">{story.userName}</p>
                  <p className="text-white/60 text-sm">
                    {story.profession || "Storyteller"}
                  </p>
                </div>
              </div>

              {/* Story Meta */}
              <div className="text-right">
                <p className="text-white/80 text-sm">
                  {formatDate(story.publishDate)}
                </p>
                <p className="text-white/60 text-xs">
                  {formatReadTime(story.storyContent)}
                </p>
              </div>
            </div>

            {/* Tags */}
            {story.tagList && story.tagList.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {story.tagList.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/15 text-white/80 text-sm rounded-full backdrop-blur-md border border-white/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Story Stats */}
            <div className="flex items-center space-x-6 text-white/60 text-sm">
              <div className="flex items-center space-x-2">
                <EyeIcon className="w-4 h-4" />
                <span>{story.readCount} reads</span>
              </div>
              <div className="flex items-center space-x-2">
                <StarIcon className="w-4 h-4" />
                <span>{story.upvoteCount} upvotes</span>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div
              className="prose prose-lg prose-invert max-w-none text-white/90 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: story.storyContent }}
            />
          </div>

          {/* Bottom Actions */}
          <div className="mt-8 flex items-center justify-center space-x-4">
            <button
              onClick={handleUpvote}
              className="group flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              {isUpvoted ? (
                <StarFilledIcon className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform duration-200" />
              ) : (
                <StarIcon className="w-5 h-5 text-white/70 group-hover:text-yellow-400 transition-colors duration-200" />
              )}
              <span className="text-white/90 group-hover:text-white transition-colors duration-200">
                {story.upvoteCount}
              </span>
            </button>

            <button
              onClick={handleBookmark}
              className="group flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              {isBookmarked ? (
                <BookmarkFilledIcon className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
              ) : (
                <BookmarkIcon className="w-5 h-5 text-white/70 group-hover:text-blue-400 transition-colors duration-200" />
              )}
              <span className="text-white/90 group-hover:text-white transition-colors duration-200">
                {isBookmarked ? "Saved" : "Save"}
              </span>
            </button>

            <button
              onClick={handleShare}
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600 rounded-xl backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <ShareIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
              <span className="text-white font-medium">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Login Dialog */}
      {showLoginDialog && (
        <LoginDialog open={showLoginDialog} onClose={handleClose} />
      )}
    </div>
  );
};

export default ReadStoryPage;
