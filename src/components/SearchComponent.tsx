import React, { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { TAGS_WITH_COLOR } from '@/stores/search';

interface SearchComponentProps {
  onSearch: (query: string, tags: string[]) => void;
  onTagsChange: (tags: string[]) => void;
  selectedTags: string[];
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  placeholder?: string;
  showTags?: boolean;
  className?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearch,
  onTagsChange,
  selectedTags,
  searchQuery,
  onSearchQueryChange,
  placeholder = "Search stories...",
  showTags = true,
  className = ""
}) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearchQueryChange(inputValue.trim());
      onSearch(inputValue.trim(), selectedTags);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleTagClick = (tag: string) => {
    let newTags: string[];
    if (selectedTags.includes(tag)) {
      newTags = selectedTags.filter(t => t !== tag);
    } else {
      newTags = [...selectedTags, tag];
    }
    onTagsChange(newTags);
  };

  const removeTag = (tag: string) => {
    const newTags = selectedTags.filter(t => t !== tag);
    onTagsChange(newTags);
  };

  const clearAllTags = () => {
    onTagsChange([]);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Input */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
        <div className="flex items-center space-x-3">
          <MagnifyingGlassIcon className="w-5 h-5 text-white/70 flex-shrink-0" />
          <input
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-md border border-white/20"
          >
            Search
          </button>
        </div>
      </div>

      {/* Tags Section */}
      {showTags && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-medium text-sm flex items-center">
              <span className="mr-2">🏷️</span>
              Filter by Tags
            </h4>
            {selectedTags.length > 0 && (
              <button
                onClick={clearAllTags}
                className="text-white/60 hover:text-white text-xs transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {TAGS_WITH_COLOR.slice(0, 8).map((tagData) => {
              const isSelected = selectedTags.includes(tagData.tag);
              return (
                <button
                  key={tagData.tag}
                  onClick={() => handleTagClick(tagData.tag)}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 backdrop-blur-md border
                    ${isSelected 
                      ? 'text-white border-white/40 shadow-md' 
                      : 'text-white/80 border-white/20 hover:border-white/40'
                    }
                  `}
                  style={{
                    backgroundColor: isSelected ? tagData.color : 'rgba(255, 255, 255, 0.1)',
                    borderColor: isSelected ? tagData.color : undefined,
                  }}
                >
                  #{tagData.tag}
                </button>
              );
            })}
          </div>

          {/* Selected Tags Display */}
          {selectedTags.length > 0 && (
            <div className="flex items-center space-x-2 pt-2 border-t border-white/10">
              <span className="text-white/70 text-xs">Selected:</span>
              <div className="flex flex-wrap gap-1">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-md border border-white/20 flex items-center space-x-1"
                  >
                    <span>#{tag}</span>
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-300 transition-colors"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;