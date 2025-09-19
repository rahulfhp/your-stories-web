import React from 'react';
import { Story } from '@/stores/stories';
import TestImage from "../../public/TestImage.svg"
import Image from 'next/image';

interface StoryCardProps {
  storyData: Story;
  onClick?: () => void;
  onRemove?: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ storyData, onClick, onRemove }) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatReadTime = (readCount: number) => {
    // Estimate read time based on content length or use a default
    const estimatedMinutes = Math.max(1, Math.ceil(readCount / 200));
    return `${estimatedMinutes} min read`;
  };

  return (
    <div 
      className="group relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl shadow-lg shadow-black/20"
      onClick={onClick}
    >
      {/* Story Cover Image */}
      <div className="relative h-48 overflow-hidden">
        {storyData.coverPicRef ? (
          <Image
            src={storyData.coverPicRef}
            alt={storyData.storyTitle}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            fill
          />
        ) : (
          <Image
            src={TestImage}
            alt={storyData.storyTitle}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            fill
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Remove Button */}
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute top-3 right-3 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors duration-200 backdrop-blur-md border border-white/20"
          >
            ×
          </button>
        )}
      </div>

      {/* Story Content */}
      <div className="p-4 space-y-3">
        {/* Author Info */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            {storyData.profilePicRef ? (
              <img
                src={storyData.profilePicRef}
                alt={storyData.userName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-sm font-semibold">
                {storyData.userName?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            )}
          </div>
          <div>
            <p className="text-white/90 text-sm font-medium">{storyData.userName}</p>
            <p className="text-white/60 text-xs">{storyData.profession || 'Storyteller'}</p>
          </div>
        </div>

        {/* Story Title */}
        <h3 className="text-white font-semibold text-lg leading-tight line-clamp-2 group-hover:text-purple-200 transition-colors duration-200">
          {storyData.storyTitle}
        </h3>

        {/* Story Preview */}
        {storyData.storyContent && (
          <p className="text-white/70 text-sm line-clamp-2 leading-relaxed">
            {storyData.storyContent.replace(/<[^>]*>/g, '').substring(0, 100)}...
          </p>
        )}

        {/* Story Meta */}
        <div className="flex items-center justify-between text-white/60 text-xs">
          <div className="flex items-center space-x-4">
            <span>{formatDate(storyData.publishDate)}</span>
            <span>•</span>
            <span>{formatReadTime(storyData.readCount || 0)}</span>
          </div>
          <div className="flex items-center space-x-3">
            {storyData.upvoteCount > 0 && (
              <span className="flex items-center space-x-1">
                <span>👍</span>
                <span>{storyData.upvoteCount}</span>
              </span>
            )}
            {storyData.readCount > 0 && (
              <span className="flex items-center space-x-1">
                <span>👁</span>
                <span>{storyData.readCount}</span>
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
                className="px-2 py-1 bg-white/15 text-white/80 text-xs rounded-full backdrop-blur-md border border-white/20"
              >
                #{tag}
              </span>
            ))}
            {storyData.tagList.length > 3 && (
              <span className="px-2 py-1 bg-white/15 text-white/60 text-xs rounded-full backdrop-blur-md border border-white/20">
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

export default StoryCard;