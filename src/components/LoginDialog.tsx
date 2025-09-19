'use client';

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onLogin?: (provider: string) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose, onLogin }) => {
  // Handle Login
  const handleOnClick = (provider: string) => {
    if (onLogin) {
      onLogin(provider);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-gradient-to-br from-gray-900/90 to-black/95 backdrop-blur-xl border border-white/10 rounded-3xl text-white p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 text-white/70" />
        </button>

        <DialogHeader className="space-y-6">
          {/* Logo Section */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <Image 
              src="/JoinWhiteText.svg" 
              alt="Join" 
              width={60} 
              height={20} 
              className="object-contain"
            />
            <Image 
              src="/YourStoriesLogo.svg" 
              alt="YourStories" 
              width={100} 
              height={20} 
              className="object-contain"
            />
          </div>

          {/* Description */}
          <p className="text-center text-sm font-medium text-white/90 leading-relaxed px-2">
            Create an account to read the inspirational stories of how YourStories
            helped 2+ Million users to minimize their phone addiction
          </p>
        </DialogHeader>

        {/* Login Buttons */}
        <div className="space-y-4 mt-8">
          <Button
            onClick={() => handleOnClick('google')}
            className="w-full h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
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
            onClick={() => handleOnClick('facebook')}
            className="w-full h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
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
        <p className="text-center text-xs text-white/60 mt-6 leading-relaxed">
          Click "Log In" to agree to YourStories' Terms of Services and
          acknowledge that YourStories' Privacy Policy applies to you.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;