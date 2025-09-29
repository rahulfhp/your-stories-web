"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/stores/auth";
import useStoriesStore from "@/stores/stories";
import StoryCard from "@/components/StoryCard";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProfilePage: React.FC = () => {
  const user = useAuthStore((s) => s.currentUser);
  const signOut = useAuthStore((s) => s.signOut);
  const router = useRouter();

  // Stories store
  const { 
    userStories, 
    isLoadingUserStories, 
    userStoriesError, 
    fetchUserStories 
  } = useStoriesStore();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  const handleStoryClick = (storyId: string) => {
    router.push(`/read/${storyId}?source=profile`);
  };

  // Fetch user stories when component mounts or user changes
  useEffect(() => {
    if (user?.email) {
      fetchUserStories(user.email);
    }
  }, [user?.email, fetchUserStories]);

  console.log("user", user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-900 dark:to-black pt-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-400/10 dark:bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-300/8 dark:bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-gray-200/5 dark:from-white/2 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <h1 className="text-gray-800 dark:text-white text-2xl font-semibold mb-6">
          {user?.displayName || "Profile"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column: Avatar + About + Logout */}
          <div className="md:col-span-1">
            <div className="bg-gray-100/80 dark:bg-white/5 backdrop-blur-xl border border-gray-300/40 dark:border-white/15 rounded-2xl p-6 shadow-lg shadow-gray-400/20 dark:shadow-black/20">
              <div className="w-28 h-28 relative rounded-xl overflow-hidden bg-purple-600/60 flex items-center justify-center mx-auto">
                {user?.photoURL ? (
                  <Image
                  src={user?.photoURL}
                  alt={user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                  fill
                  className="object-cover"
                />
                ) : (
                  <span className="text-white dark:text-white text-3xl font-bold">
                    {user?.displayName?.charAt(0) || "U"}
                  </span>
                )}
              </div>

              <div className="mt-6">
                <h2 className="text-gray-600 dark:text-white/80 text-sm mb-2">ABOUT</h2>
                <p className="text-gray-800 dark:text-white text-base font-medium">
                  {user?.displayName || "-"}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={handleLogout}
                  className="mt-6 w-40 px-4 py-2 cursor-pointer rounded-xl bg-gray-200/80 dark:bg-white/10 hover:bg-gray-300/90 dark:hover:bg-white/20 text-gray-800 dark:text-white border border-gray-300/60 dark:border-white/15 transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Right column: User's Created Stories */}
          <div className="md:col-span-2">
            <div className="bg-gray-100/80 dark:bg-white/5 backdrop-blur-xl border border-gray-300/40 dark:border-white/15 rounded-2xl p-6 shadow-lg shadow-gray-400/20 dark:shadow-black/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                  📝 Your Stories
                </h2>
                <div className="h-1 flex-1 ml-4 bg-gradient-to-r from-gray-400/40 dark:from-white/30 to-transparent rounded"></div>
              </div>

              {/* Error State */}
              {userStoriesError && (
                <div className="bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500/30 rounded-lg p-4 mb-6">
                  <p className="text-red-700 dark:text-red-400 text-sm">
                    Failed to load your stories: {userStoriesError}
                  </p>
                </div>
              )}

              {/* Loading State */}
              {isLoadingUserStories ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200/60 dark:bg-white/10 rounded-2xl p-4">
                        <div className="bg-gray-300/80 dark:bg-white/20 h-[150px] rounded-xl mb-3"></div>
                        <div className="space-y-2">
                          <div className="bg-gray-300/80 dark:bg-white/20 h-4 rounded w-3/4"></div>
                          <div className="bg-gray-300/80 dark:bg-white/20 h-3 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : userStories.length > 0 ? (
                /* Stories Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userStories.map((story) => (
                    <StoryCard
                      key={story._id}
                      storyData={story}
                      onClick={() => handleStoryClick(story._id)}
                    />
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="relative w-32 h-32 mb-6 opacity-60">
                    <Image
                      src="/YourStoriesLogo.svg"
                      alt="No stories"
                      fill
                      className="object-contain dark:block hidden"
                    />
                    <Image
                      src="/YourStoriesLogoLight.svg"
                      alt="No stories"
                      fill
                      className="object-contain block dark:hidden"
                    />
                  </div>
                  <p className="text-gray-700 dark:text-white/80 mb-2">You haven't created any stories yet</p>
                  <a
                    href="/write"
                    className="text-blue-600 dark:text-sky-400 hover:underline font-semibold"
                  >
                    WRITE YOUR FIRST STORY
                  </a>
                  <p className="text-gray-600 dark:text-white/60 mt-2 text-sm">
                    Share your journey and inspire others
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
