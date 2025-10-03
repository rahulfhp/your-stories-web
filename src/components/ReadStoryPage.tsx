"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Story } from "@/stores/stories";
import useStoriesStore from "@/stores/stories";
import useSearchStore from "@/stores/search";
import LoginDialog from "./LoginDialog";
import { useAuthStore } from "@/stores/auth";
import TestImage from "../../public/TestImage.svg";

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
  // sourceType?:
  //   | "handpicked"
  //   | "more-stories"
  //   | "search"
  //   | "bookmarked"
  //   | "profile";
}

const ReadStoryPage: React.FC<ReadStoryPageProps> = ({ storyId }) => {
  const router = useRouter();
  const {
    handpickedStories,
    moreStories,
    userStories,
    bookmarkedStories,
    fetchStoryById,
    upvoteStory,
    downvoteStory,
    bookmarkStory,
    removeBookmarkStory,
    readStory,
  } = useStoriesStore();

  const { searchResults } = useSearchStore();

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

  // Find story based on ID
  useEffect(() => {
    const findStory = async () => {
      setIsLoading(true);
      let foundStory: Story | undefined;

      try {
        // First, try to find story in all existing stores
        foundStory =
          handpickedStories.find((s) => s._id === storyId) ||
          moreStories.find((s) => s._id === storyId) ||
          userStories.find((s) => s._id === storyId) ||
          bookmarkedStories.find((s) => s._id === storyId) ||
          searchResults.find((s) => s._id === storyId);

        // If not found in any store, fetch from backend by ID
        if (!foundStory) {
          const fetchedStory = await fetchStoryById(storyId);
          if (fetchedStory) {
            foundStory = fetchedStory;
          } else {
            console.error("fetchStoryById returned null or undefined");
          }
        }

        if (foundStory) {
          setStory(foundStory);

          // Check if story is bookmarked by current user
          if (currentUser?.bookmarkedStories) {
            setIsBookmarked(
              currentUser.bookmarkedStories.includes(foundStory._id)
            );
          }

          // Check if story is upvoted by current user
          if (currentUser?.upVoteStories) {
            setIsUpvoted(currentUser.upVoteStories.includes(foundStory._id));
          }

          // Check if story is already marked as read
          if (
            currentUser?.readStories &&
            currentUser.readStories.includes(foundStory._id)
          ) {
            setHasMarkedAsRead(true);
            setIsTimerActive(false);
          } else {
            // Start the read timer when story is loaded
            setIsTimerActive(true);
            setReadTimer(0);
          }
        } else {
          setStory(null); // Explicitly set to null
        }
      } catch (error) {
        setStory(null); // Set to null on error
      } finally {
        setIsLoading(false);
      }
    };

    if (storyId) {
      findStory();
    }
  }, [
    storyId,
    handpickedStories,
    moreStories,
    userStories,
    bookmarkedStories,
    searchResults,
    fetchStoryById,
    currentUser?.bookmarkedStories,
    currentUser?.upVoteStories,
    currentUser?.readStories,
  ]);

  // Sync upvote state when user's upVoteStories changes
  useEffect(() => {
    if (story && currentUser?.upVoteStories) {
      setIsUpvoted(currentUser.upVoteStories.includes(story._id));
    }
  }, [currentUser?.upVoteStories, story?._id]);

  // Sync bookmark state when user's bookmarkedStories changes
  useEffect(() => {
    if (story && currentUser?.bookmarkedStories) {
      setIsBookmarked(currentUser.bookmarkedStories.includes(story._id));
    }
  }, [currentUser?.bookmarkedStories, story?._id]);

  // Timer logic for read tracking (15 seconds)
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerActive && readTimer < 15) {
      interval = setInterval(() => {
        setReadTimer((prev) => prev + 1);
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
      console.error("Error marking story as read:", error);
    }
  };

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
  const handleUpvote = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!story) return;

    requireAuth(async () => {
      const currentUpvoteState = isUpvoted;
      const currentUpvoteCount = story.upvoteCount;

      // Optimistic update
      setIsUpvoted(!currentUpvoteState);
      setStory({
        ...story,
        upvoteCount: currentUpvoteState
          ? currentUpvoteCount - 1
          : currentUpvoteCount + 1,
      });

      try {
        if (currentUpvoteState) {
          // Currently upvoted, so downvote
          await downvoteStory(story._id);
        } else {
          // Not upvoted, so upvote
          await upvoteStory(story._id);
        }

        // Get updated story from store to sync with latest data
        const updatedStory =
          useStoriesStore
            .getState()
            .handpickedStories.find((s) => s._id === story._id) ||
          useStoriesStore
            .getState()
            .moreStories.find((s) => s._id === story._id) ||
          useStoriesStore
            .getState()
            .userStories.find((s) => s._id === story._id) ||
          useStoriesStore
            .getState()
            .bookmarkedStories.find((s) => s._id === story._id) ||
          useSearchStore
            .getState()
            .searchResults.find((s) => s._id === story._id);

        if (updatedStory) {
          setStory(updatedStory);
        }
      } catch (error) {
        // Revert optimistic update on error
        setIsUpvoted(currentUpvoteState);
        setStory({ ...story, upvoteCount: currentUpvoteCount });
        console.error("Error handling upvote:", error);
      }
    });
  };

  const handleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-900 dark:to-black relative overflow-hidden flex items-center justify-center px-4">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-gray-400/10 dark:bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-gray-300/8 dark:bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-gradient-to-r from-gray-200/5 dark:from-white/2 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="bg-gray-100/80 dark:bg-white/10 backdrop-blur-xl border border-gray-300/40 dark:border-white/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 relative z-10">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-gray-600 dark:border-white"></div>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-900 dark:to-black relative overflow-hidden flex items-center justify-center px-4">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-gray-400/10 dark:bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-gray-300/8 dark:bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-gradient-to-r from-gray-200/5 dark:from-white/2 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="bg-gray-100/80 dark:bg-white/10 backdrop-blur-xl border border-gray-300/40 dark:border-white/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center relative z-10 max-w-md w-full">
          <h2 className="text-gray-800 dark:text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Story Not Found
          </h2>
          <p className="text-gray-600 dark:text-white/70 mb-4 sm:mb-6 text-sm sm:text-base">
            The story you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={handleBack}
            className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-sky-500/80 hover:bg-sky-500 text-white rounded-xl backdrop-blur-md border border-gray-300/40 dark:border-white/20 transition-all duration-200 text-sm sm:text-base"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-900 dark:to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-400/10 dark:bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-300/8 dark:bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-gray-200/5 dark:from-white/2 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 pt-20 sm:pt-24 md:pt-28 lg:pt-28 relative z-10">
        <div className="w-full max-w-2xl">
          {/* Story Header */}
          <div className="bg-gray-100/80 dark:bg-white/5 backdrop-blur-xl border border-gray-300/40 dark:border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8 shadow-lg">
            {/* Cover Image */}
            <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6">
              {story.coverPicRef ? (
                <Image
                  src={story.coverPicRef}
                  alt={story.storyTitle}
                  fill
                  className="object-cover"
                />
              ) : (
                <Image
                  src={TestImage}
                  alt={story.storyTitle}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Country Badge */}
              {story.country && (
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                  <span className="px-2 sm:px-3 py-1 bg-black/50 text-white text-xs sm:text-sm rounded-full backdrop-blur-md border border-white/20">
                    📍 {story.country}
                  </span>
                </div>
              )}
            </div>

            {/* Story Title */}
            <h1 className="text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              {story.storyTitle}
            </h1>

            {/* Author Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  {story.profilePicRef ? (
                    <Image
                      src={story.profilePicRef}
                      alt={story.userName}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm sm:text-lg font-semibold">
                      {story.userName?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-900 dark:text-white font-semibold text-sm sm:text-base truncate">
                    {story.userName}
                  </p>
                  <p className="text-gray-600 dark:text-white/60 text-xs sm:text-sm truncate">
                    {story.profession || "Storyteller"}
                  </p>

                  {/* Social Media Links */}
                  {(story.facebookLink ||
                    story.instagramLink ||
                    story.twitterLink) && (
                    <div className="flex items-center space-x-1.5 sm:space-x-2 mt-1.5 sm:mt-2">
                      {/* Facebook Link */}
                      {story.facebookLink && (
                        <button
                          onClick={() => {
                            const facebookUrl = `https://www.facebook.com/${encodeURIComponent(
                              story.facebookLink
                            )}`;
                            window.open(
                              facebookUrl,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }}
                          className="group w-6 h-6 sm:w-7 sm:h-7 bg-gray-200/80 dark:bg-white/10 hover:bg-blue-600/80 rounded-full flex items-center justify-center backdrop-blur-md border border-gray-300/40 dark:border-white/20 transition-all duration-200 hover:scale-110 hover:shadow-lg"
                          title={`Facebook: ${story.facebookLink}`}
                        >
                          <svg
                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-600 dark:text-white/70 group-hover:text-white transition-colors duration-200"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </button>
                      )}

                      {/* Instagram Link */}
                      {story.instagramLink && (
                        <button
                          onClick={() => {
                            const instagramUrl = `https://www.instagram.com/${story.instagramLink}`;
                            window.open(
                              instagramUrl,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }}
                          className="group w-6 h-6 sm:w-7 sm:h-7 bg-gray-200/80 dark:bg-white/10 hover:bg-gradient-to-br hover:from-sky-500/80 hover:to-pink-500/80 rounded-full flex items-center justify-center backdrop-blur-md border border-gray-300/40 dark:border-white/20 transition-all duration-200 hover:scale-110 hover:shadow-lg"
                          title={`Instagram: @${story.instagramLink}`}
                        >
                          <svg
                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-600 dark:text-white/70 group-hover:text-white transition-colors duration-200"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </button>
                      )}

                      {/* X (Twitter) Link */}
                      {story.twitterLink && (
                        <button
                          onClick={() => {
                            const twitterUrl = `https://twitter.com/${story.twitterLink}`;
                            window.open(
                              twitterUrl,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }}
                          className="group w-6 h-6 sm:w-7 sm:h-7 bg-gray-200/80 dark:bg-white/10 hover:bg-black/80 rounded-full flex items-center justify-center backdrop-blur-md border border-gray-300/40 dark:border-white/20 transition-all duration-200 hover:scale-110 hover:shadow-lg"
                          title={`X (Twitter): @${story.twitterLink}`}
                        >
                          <svg
                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-600 dark:text-white/70 group-hover:text-white transition-colors duration-200"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Story Meta */}
              <div className="text-left sm:text-right">
                <p className="text-gray-700 dark:text-white/80 text-xs sm:text-sm">
                  {formatDate(story.publishDate)}
                </p>
                <p className="text-gray-500 dark:text-white/60 text-xs">
                  {formatReadTime(story.storyContent)}
                </p>
              </div>
            </div>

            {/* Tags */}
            {story.tagList && story.tagList.length > 0 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                {story.tagList.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 sm:px-3 py-1 bg-gray-200/80 dark:bg-white/15 text-gray-700 dark:text-white/80 text-xs sm:text-sm rounded-full backdrop-blur-md border border-gray-300/40 dark:border-white/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Story Stats */}
            <div className="flex items-center space-x-4 sm:space-x-6 text-gray-600 dark:text-white/60 text-xs sm:text-sm">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <EyeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{story.readCount} reads</span>
              </div>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <StarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{story.upvoteCount} upvotes</span>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="bg-gray-100/80 dark:bg-white/5 backdrop-blur-xl border border-gray-300/40 dark:border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg overflow-hidden">
            <div
              className="prose prose-sm sm:prose-base lg:prose-lg prose-gray dark:prose-invert max-w-none text-gray-800 dark:text-white/90 leading-relaxed break-words"
              dangerouslySetInnerHTML={{ __html: story.storyContent }}
            />
          </div>

          {/* Bottom Actions */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={handleUpvote}
              className="group flex items-center justify-center space-x-2 cursor-pointer w-full sm:w-auto px-4 sm:px-6 py-3 bg-gray-200/80 dark:bg-white/10 hover:bg-gray-300/90 dark:hover:bg-white/20 rounded-xl backdrop-blur-md border border-gray-300/40 dark:border-white/20 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              {isUpvoted ? (
                <StarFilledIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 group-hover:scale-110 transition-transform duration-200" />
              ) : (
                <StarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-white/70 group-hover:text-yellow-400 transition-colors duration-200" />
              )}
              <span className="text-sm sm:text-base text-gray-800 dark:text-white/90 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                {story.upvoteCount}
              </span>
            </button>

            <button
              onClick={handleBookmark}
              className="group flex items-center justify-center space-x-2 cursor-pointer w-full sm:w-auto px-4 sm:px-6 py-3 bg-gray-200/80 dark:bg-white/10 hover:bg-gray-300/90 dark:hover:bg-white/20 rounded-xl backdrop-blur-md border border-gray-300/40 dark:border-white/20 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              {isBookmarked ? (
                <BookmarkFilledIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
              ) : (
                <BookmarkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-white/70 group-hover:text-blue-400 transition-colors duration-200" />
              )}
              <span className="text-sm sm:text-base text-gray-800 dark:text-white/90 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                {isBookmarked ? "Saved" : "Save"}
              </span>
            </button>

            <button
              onClick={handleShare}
              className="group flex items-center justify-center space-x-2 cursor-pointer w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-sky-500/80 to-blue-600/80 hover:from-sky-500 hover:to-blue-600 rounded-xl backdrop-blur-md border border-gray-300/40 dark:border-white/20 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <ShareIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm sm:text-base text-white font-medium">
                Share
              </span>
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
