"use client";

import React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onLogin?: (provider: string) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({
  open,
  onClose,
  onLogin,
}) => {
  const loginWithProvider = useAuthStore((s) => s.loginWithProvider);

  const handleOnClick = async (provider: any) => {
    const providerKey =
      provider === "google" || provider === "facebook" ? provider : undefined;
    // Keep backward compatibility if parent passes string, else use explicit keys
    const selected: "google" | "facebook" =
      typeof provider === "string"
        ? (provider as "google" | "facebook")
        : providerKey || "google";
    await loginWithProvider(selected);
    if (onLogin) onLogin(selected);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full md:max-w-md mx-auto bg-gradient-to-br from-gray-100/90 to-gray-200/95 dark:from-gray-900/90 dark:to-black/95 backdrop-blur-xl border border-gray-300/30 dark:border-white/15 rounded-3xl text-gray-900 dark:text-white p-8 shadow-2xl shadow-gray-400/20 dark:shadow-black/40">
        <DialogHeader className="space-y-6">
          <DialogTitle className="sr-only">Login to YourStories</DialogTitle>
          {/* Logo Section */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-2xl font-bold text-gray-800 dark:text-white tracking-wide font-montserrat">
              Join
            </span>
            <span className="text-3xl font-bold text-[#50BDE7] font-lobster">
              YourHour
            </span>
          </div>

          {/* Description */}
          <p className="text-center text-sm font-medium text-gray-700 dark:text-white/90 leading-relaxed px-2">
            Create an account to read the inspirational stories of how
            YourStories helped 2+ Million users to minimize their phone
            addiction
          </p>
        </DialogHeader>

        {/* Login Buttons */}
        <div className="flex flex-col items-center justify-center space-y-4 mt-8">
          <Button
            onClick={() => handleOnClick("google")}
            className="w-3xs h-12 cursor-pointer bg-gray-200/60 dark:bg-white/10 hover:bg-gray-300/80 dark:hover:bg-white/20 backdrop-blur-sm border border-gray-400/40 dark:border-white/20 rounded-xl text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-white font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg shadow-gray-300/30 dark:shadow-black/20"
            variant="outline"
          >
            <Image
              src="/GoogleLogo.svg"
              alt="Google"
              width={20}
              height={20}
              className="mr-3"
            />
            Login with Google
          </Button>

          <Button
            onClick={() => handleOnClick("facebook")}
            className="w-3xs h-12 bg-gray-200/60 dark:bg-white/10 cursor-pointer hover:bg-gray-300/80 dark:hover:bg-white/20 backdrop-blur-sm border border-gray-400/40 dark:border-white/20 rounded-xl text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-white font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg shadow-gray-300/30 dark:shadow-black/20"
            variant="outline"
          >
            <Image
              src="/FacebookLogo.svg"
              alt="Facebook"
              width={20}
              height={20}
              className="mr-3"
            />
            Login with Facebook
          </Button>
        </div>

        {/* Terms and Privacy */}
        <p className="text-center text-xs text-gray-600 dark:text-white/60 mt-6 leading-relaxed">
          Click "Log In" to agree to YourStories' Terms of Services and
          acknowledge that YourStories' Privacy Policy applies to you.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
