import React from "react";
import { Story } from "@/stores/stories";
import TestImage from "../../public/TestImage.svg";
import Image from "next/image";
import { XMarkIcon, EyeIcon, StarIcon } from "@heroicons/react/24/outline";

interface StoryCardProps {
  storyData: Story;
  onClick?: () => void;
  onRemove?: () => void;
}

const WebsiteStoryCard: React.FC<StoryCardProps> = ({
  storyData,
  onClick,
  onRemove,
}) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatReadTime = (readCount: number) => {
    // Estimate read time based on content length or use a default
    const estimatedMinutes = Math.max(1, Math.ceil(readCount / 200));
    return `${estimatedMinutes} min read`;
  };

  return (
    <div
      className="group relative max-h-fit min-h-[29.5rem] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-[#00BCD4]/30 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-xl shadow-lg shadow-black/50"
      onClick={onClick}
    >
      {/* Story Cover Image */}
      <div className="relative h-48 overflow-hidden">
        {storyData.coverPicRef ? (
          <Image
            src={storyData.coverPicRef}
            alt={storyData.storyTitle}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            fill
            loading="lazy"
          />
        ) : (
          <Image
            src={TestImage}
            alt={storyData.storyTitle}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            fill
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

        {/* Remove Button */}
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute top-3 right-3 group/remove p-2 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-full transition-all duration-300 hover:bg-red-500/20 hover:border-red-500 hover:scale-110 shadow-sm"
          >
            <XMarkIcon className="w-4 h-4 text-slate-400 group-hover/remove:text-red-500 transition-colors duration-200" />
          </button>
        )}
      </div>

      {/* Story Content */}
      <div className="p-5 space-y-4">
        {/* Author Info */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-[#4DD0E1] to-[#00BCD4] p-0.5">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-800">
              {storyData.profilePicRef ? (
                <img
                  src={storyData.profilePicRef}
                  alt={storyData.userName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400 font-bold">
                  {storyData.userName?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>
          </div>
          <div>
            <p className="text-white text-sm font-semibold font-montserrat">
              {storyData.userName}
            </p>
            <p className="text-[#00BCD4] text-xs font-medium font-montserrat">
              {storyData.profession || "Storyteller"}
            </p>
          </div>
        </div>

        {/* Story Title */}
        <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 group-hover:text-[#00BCD4] transition-colors duration-200 font-montserrat">
          {storyData.storyTitle}
        </h3>

        {/* Story Preview */}
        {storyData.storyContent && (
          <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed font-montserrat">
            {storyData.storyContent.replace(/<[^>]*>/g, "").substring(0, 100)}
            ...
          </p>
        )}

        {/* Story Meta */}
        <div className="flex items-center justify-between text-slate-500 text-xs font-medium font-montserrat pt-2 border-t border-slate-800">
          <div className="flex items-center space-x-4">
            <span>{formatDate(storyData.publishDate)}</span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span>{formatReadTime(storyData.readCount || 0)}</span>
          </div>
          <div className="flex items-center space-x-3">
            {storyData.readCount > 0 && (
              <span className="flex items-center space-x-1">
                <EyeIcon className="w-4 h-4" />
                <span>{storyData.readCount}</span>
              </span>
            )}
            {storyData.upvoteCount > 0 && (
              <span className="flex items-center space-x-1">
                <StarIcon className="w-4 h-4" />
                <span>{storyData.upvoteCount}</span>
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        {storyData.tagList && storyData.tagList.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {storyData.tagList.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-800/80 text-slate-300 text-xs rounded-full backdrop-blur-md border border-slate-700/50"
              >
                #{tag}
              </span>
            ))}
            {storyData.tagList.length > 3 && (
              <span className="px-2 py-1 bg-slate-800/80 text-slate-300 text-xs rounded-full backdrop-blur-md border border-slate-700/50">
                +{storyData.tagList.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Country Badge */}
        {storyData.country && (
          <div className="absolute top-4 left-4">
            <span className="px-2 py-1 bg-black/30 text-white text-xs rounded-full backdrop-blur-md border border-white/20">
              📍 {storyData.country}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteStoryCard;
