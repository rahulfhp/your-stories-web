"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import YourStoriesLogo from "../../public/YourStoriesLogo.svg";

// Icons (using Heroicons as replacement for MUI icons)
import {
  MagnifyingGlassIcon as SearchIcon,
  BookmarkIcon,
  BellIcon as NotificationsIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import LoginDialog from "./LoginDialog";
import { useAuthStore } from "@/stores/auth";
import ThemeSwitcher from "./ThemeSwitcher";

// Types
interface User {
  user?: {
    displayName: string;
    photoURL: string;
  };
  length?: number;
}

interface Admin {
  displayName?: string;
  photoURL?: string;
  email?: string;
  length?: number;
}

interface HeaderProps {
  user?: User;
  admin?: Admin;
  onAdminSignOut?: (router: any) => void;
}

// Logo Component
const Logo: React.FC = () => (
  <div className="w-40 h-10 relative md:w-44 md:h-11">
    <Image src={YourStoriesLogo} alt="Logo" fill className="object-contain" />
  </div>
);

// TopBarOption Component
interface TopBarOptionProps {
  Icon?: React.ComponentType<{ className?: string }>;
  avatar?: boolean;
  alt?: string;
  src?: string;
  button?: boolean;
  buttonVariant?: "outlined" | "contained";
  buttonValue?: string;
  onClick?: () => void;
}

const TopBarOption: React.FC<TopBarOptionProps> = ({
  Icon,
  avatar,
  alt,
  src,
  button,
  buttonVariant = "outlined",
  buttonValue,
  onClick,
}) => {
  if (button) {
    const baseClasses =
      "px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 backdrop-blur-sm";
    const variantClasses =
      buttonVariant === "outlined"
        ? "border dark:border-white/20 dark:text-white/90 dark:hover:bg-white/10 dark:hover:border-white/30 border-gray-300/40 text-gray-700 hover:bg-gray-100/20 hover:border-gray-400/50"
        : "dark:bg-white/20 dark:text-white dark:hover:bg-white/30 dark:border-white/10 bg-gray-800/20 text-gray-800 hover:bg-gray-900/30 border-gray-700/10";

    return (
      <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
        {buttonValue}
      </button>
    );
  }

  if (avatar) {
    // Get initials from the name (first letter of first and last name)
    const getInitials = (name?: string) => {
      if (!name) return "?";
      const names = name.trim().split(" ");
      if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
      }
      return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    };

    return (
      <div
        className="w-8 h-8 rounded-full overflow-hidden cursor-pointer transition-all duration-300 hover:scale-110 border backdrop-blur-sm dark:border-white/20 border-gray-300/30"
        onClick={onClick}
      >
        {src ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Hide the image and show initials if image fails to load
              (e.target as HTMLImageElement).style.display = 'none';
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent) {
                const initialsDiv = document.createElement('div');
                initialsDiv.className = 'w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 backdrop-blur-sm flex items-center justify-center text-white font-semibold text-sm';
                initialsDiv.textContent = getInitials(alt);
                parent.appendChild(initialsDiv);
              }
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 backdrop-blur-sm flex items-center justify-center dark:text-white text-gray-700 font-semibold text-sm">
            {getInitials(alt)}
          </div>
        )}
      </div>
    );
  }

  if (Icon) {
    return (
      <div
        className="p-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20"
        onClick={onClick}
      >
        <Icon className="w-5 h-5 text-white/90" />
      </div>
    );
  }

  return null;
};

// Main Header Component
const Header: React.FC<HeaderProps> = ({
  user = {},
  admin = {},
  onAdminSignOut,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  // State management
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [writePublish, setWritePublish] = useState(false);

  const currentUser = useAuthStore((s) => s.currentUser);
  const isLoginDialogOpen = useAuthStore((s) => s.isLoginDialogOpen);
  const openLoginDialog = useAuthStore((s) => s.openLoginDialog);
  const closeLoginDialog = useAuthStore((s) => s.closeLoginDialog);

  const handleClick = (
    event: React.MouseEvent<HTMLElement | SVGSVGElement>
  ) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const openPopover = Boolean(anchorEl);

  const handleClickOpen = () => {
    setOpen(true);
    openLoginDialog();
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
    closeLoginDialog();
  };

  useEffect(() => {
    if (pathname.includes("write")) {
      setWritePublish(true);
    } else {
      setWritePublish(false);
    }
  }, [user, pathname]);

  const isUserLoggedIn = currentUser || user.length || user.user;
  const isAdminLoggedIn = admin.length || admin.email;

  return (
    <>
      <header className="fixed top-0 left-0 z-[100] w-full">
        {/* Backdrop blur container */}
        <div className="relative">
          {/* Background with blur effect */}
          <div className="absolute inset-0 backdrop-blur-xl border-b shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] dark:bg-black/20 dark:border-white/10 bg-white/20 border-black/10" />

          {/* Gradient overlay */}
          <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-black/30 dark:to-gray-900/40 bg-gradient-to-br from-white/30 to-blue-50/40" />

          {/* Content */}
          <div className="relative flex justify-between items-center w-full px-6 py-3 transition-all duration-500 ease-in-out md:px-8 lg:px-12 md:py-4">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Logo />
              </Link>
            </div>

            {/* Actions Section */}
            <div className="flex items-center">
              {isAdminLoggedIn ? (
                /* Admin Section */
                <div className="flex items-center backdrop-blur-[10px] rounded-xl px-3 py-1.5 border shadow-[0_4px_16px_0_rgba(0,0,0,0.2)] transition-all duration-200 cursor-pointer hover:-translate-y-0.5 dark:bg-gray-900/60 dark:border-white/10 dark:hover:bg-gray-900/80 bg-white/60 border-gray-300/20 hover:bg-white/80">
                  <TopBarOption
                    avatar={true}
                    alt={admin.displayName}
                    src={admin.photoURL}
                  />
                  <ChevronDownIcon
                    className="w-4 h-4 ml-2 cursor-pointer dark:text-white text-gray-700"
                    onClick={handleClick}
                  />

                  {/* Popover */}
                  {openPopover && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50">
                      <div className="backdrop-blur-xl border rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden dark:bg-gray-900/80 dark:border-white/10 bg-white/80 border-gray-300/20">
                        <button
                          onClick={() => onAdminSignOut?.(router)}
                          className="w-full px-4 py-2 font-medium text-left transition-colors duration-200 dark:text-white dark:hover:bg-white/10 text-gray-700 hover:bg-gray-100/20"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Regular User Section */
                <div className="flex items-center gap-3">
                  {/* Theme Switcher */}
                  <ThemeSwitcher />

                  {/* Search Icon */}
                  <Link href="/search">
                    <TopBarOption Icon={SearchIcon} />
                  </Link>

                  {/* Bookmarked Section */}
                  {isUserLoggedIn ? (
                    <Link href="/bookmarked">
                      <TopBarOption Icon={BookmarkIcon} />
                    </Link>
                  ) : (
                    <TopBarOption
                      Icon={BookmarkIcon}
                      onClick={handleClickOpen}
                    />
                  )}

                  {/* Write/Publish Button */}
                  {isUserLoggedIn ? (
                    !writePublish ? (
                      <Link href="/write">
                        <TopBarOption
                          button={true}
                          buttonVariant="outlined"
                          buttonValue="Write"
                        />
                      </Link>
                    ) : null
                  ) : (
                    <TopBarOption
                      button={true}
                      buttonVariant="outlined"
                      buttonValue="Write"
                      onClick={handleClickOpen}
                    />
                  )}

                  {/* Profile Avatar */}
                  {isUserLoggedIn ? (
                    <Link href="/profile">
                      <TopBarOption
                        avatar={true}
                        alt={
                          (currentUser?.displayName ||
                            user.user?.displayName) as string
                        }
                        src={
                          (currentUser?.photoURL ||
                            user.user?.photoURL) as string
                        }
                      />
                    </Link>
                  ) : (
                    <TopBarOption avatar={true} onClick={handleClickOpen} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Login Dialog */}
      <LoginDialog open={open || isLoginDialogOpen} onClose={handleClose} />
    </>
  );
};

export { Header as default };
