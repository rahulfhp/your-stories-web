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
        ? "border border-white/20 text-white/90 hover:bg-white/10 hover:border-white/30"
        : "bg-white/20 text-white hover:bg-white/30 border border-white/10";

    return (
      <button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
        {buttonValue}
      </button>
    );
  }

  if (avatar) {
    return (
      <div
        className="w-8 h-8 rounded-full overflow-hidden cursor-pointer transition-all duration-300 hover:scale-110 border border-white/20 backdrop-blur-sm"
        onClick={onClick}
      >
        {src ? (
          <Image
            src={src}
            alt={alt || "Avatar"}
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/90 text-sm">
            {alt?.charAt(0) || "?"}
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

  const handleClick = (
    event: React.MouseEvent<HTMLElement | SVGSVGElement>
  ) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const openPopover = Boolean(anchorEl);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (pathname.includes("write")) {
      setWritePublish(true);
    } else {
      setWritePublish(false);
    }
  }, [user, pathname]);

  const isUserLoggedIn = user.length || user.user;
  const isAdminLoggedIn = admin.length || admin.email;

  return (
    <>
      <header className="fixed top-0 left-0 z-[100] w-full">
        {/* Backdrop blur container */}
        <div className="relative">
          {/* Background with blur effect */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]" />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-gray-900/40" />

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
                <div className="flex items-center bg-gray-900/60 backdrop-blur-[10px] rounded-xl px-3 py-1.5 border border-white/10 shadow-[0_4px_16px_0_rgba(0,0,0,0.2)] transition-all duration-200 cursor-pointer hover:bg-gray-900/80 hover:-translate-y-0.5">
                  <TopBarOption
                    avatar={true}
                    alt={admin.displayName}
                    src={admin.photoURL}
                  />
                  <ChevronDownIcon
                    className="w-4 h-4 text-white ml-2 cursor-pointer"
                    onClick={handleClick}
                  />

                  {/* Popover */}
                  {openPopover && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50">
                      <div className="bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden">
                        <button
                          onClick={() => onAdminSignOut?.(router)}
                          className="w-full px-4 py-2 text-white font-medium text-left hover:bg-white/10 transition-colors duration-200"
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
                        alt={user.user?.displayName}
                        src={user.user?.photoURL}
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
      <LoginDialog open={open} onClose={handleClose} />
    </>
  );
};

export default Header;
