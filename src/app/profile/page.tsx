"use client";

import React from "react";
import { useAuthStore } from "@/stores/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProfilePage: React.FC = () => {
  const user = useAuthStore((s) => s.currentUser);
  const signOut = useAuthStore((s) => s.signOut);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

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

          {/* Right column: Empty state for stories */}
          <div className="md:col-span-2">
            <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl p-10 h-full flex flex-col items-center justify-center text-center">
              <div className="relative w-56 h-56 mb-6">
                <Image
                  src="/YourStoriesLogo.svg"
                  alt="Empty"
                  fill
                  className="object-contain opacity-80"
                />
              </div>
              <p className="text-white/80">We can't find your stories</p>
              <a
                href="/write"
                className="mt-2 text-sky-400 hover:underline font-semibold"
              >
                WANNA WRITE ONE?
              </a>
              <p className="text-white/60 mt-4">
                Tap on Write button in your top right corner.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
