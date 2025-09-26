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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <h1 className="text-white text-2xl font-semibold mb-6">
          {user?.displayName || "Profile"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column: Avatar + About + Logout */}
          <div className="md:col-span-1">
            <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl p-6">
              <div className="w-28 h-28 relative rounded-xl overflow-hidden bg-purple-600/60 flex items-center justify-center mx-auto">
                {user?.photoURL ? (
                  <Image
                  src={user?.photoURL}
                  alt={user?.displayName?.charAt(0)?.toUpperCase() || "U"}
                  fill
                  className="object-cover"
                />
                ) : (
                  <span className="text-white text-3xl font-bold">
                    {user?.displayName?.charAt(0) || "U"}
                  </span>
                )}
              </div>

              <div className="mt-6">
                <h2 className="text-white/80 text-sm mb-2">ABOUT</h2>
                <p className="text-white text-base font-medium">
                  {user?.displayName || "-"}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={handleLogout}
                  className="mt-6 w-40 px-4 py-2 cursor-pointer rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Right column: User's Created Stories */}
          <div className="md:col-span-2">
            <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white/90">
                  📝 Your Stories
                </h2>
                <div className="h-1 flex-1 ml-4 bg-gradient-to-r from-white/30 to-transparent rounded"></div>
              </div>

              {/* Error State */}
              {userStoriesError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                  <p className="text-red-400 text-sm">
                    Failed to load your stories: {userStoriesError}
                  </p>
                </div>
              )}

              {/* Loading State */}
              {isLoadingUserStories ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-white/10 rounded-2xl p-4">
                        <div className="bg-white/20 h-[150px] rounded-xl mb-3"></div>
                        <div className="space-y-2">
                          <div className="bg-white/20 h-4 rounded w-3/4"></div>
                          <div className="bg-white/20 h-3 rounded w-1/2"></div>
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
                      className="object-contain"
                    />
                  </div>
                  <p className="text-white/80 mb-2">You haven't created any stories yet</p>
                  <a
                    href="/write"
                    className="text-sky-400 hover:underline font-semibold"
                  >
                    WRITE YOUR FIRST STORY
                  </a>
                  <p className="text-white/60 mt-2 text-sm">
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
