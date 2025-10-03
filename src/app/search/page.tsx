"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  Suspense,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import useSearchStore, { TAGS_WITH_COLOR } from "@/stores/search";
import StoryCard from "@/components/StoryCard";

const SearchContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    searchResults,
    isLoading,
    error,
    searchQuery,
    selectedTags,
    setSearchQuery,
    addTag,
    removeTag,
    searchByTag,
    searchByTagList,
    searchByTitle,
    searchByTitleAndTagList,
    clearSearch,
  } = useSearchStore();

  const [inputValue, setInputValue] = useState("");

  // Sync inputValue with searchQuery from store
  useEffect(() => {
    setInputValue(searchQuery || "");
  }, [searchQuery]);

  useEffect(() => {
    // Check if there's a tag in the URL params
    const tagFromUrl = searchParams.get("tag");
    if (tagFromUrl) {
      addTag(tagFromUrl);
      searchByTag(tagFromUrl);
    }
  }, [searchParams, addTag, searchByTag]);

  // Handle input changes and clear searchQuery when input is empty
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      // If input is cleared, also clear the searchQuery in store
      if (!value.trim()) {
        setSearchQuery("");
      }
    },
    [setSearchQuery]
  );

  // Debounced search effect to prevent stuttering
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Perform search when tags change
      if (selectedTags.length > 0) {
        if (searchQuery && searchQuery.trim()) {
          searchByTitleAndTagList(searchQuery, selectedTags);
        } else {
          searchByTagList(selectedTags);
        }
      } else if (searchQuery && searchQuery.trim()) {
        // Only search by title if there's a search query
        searchByTitle(searchQuery);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [
    selectedTags,
    searchQuery,
    searchByTagList,
    searchByTitleAndTagList,
    searchByTitle,
  ]);

  const handleSearch = useCallback(() => {
    if (inputValue.trim()) {
      setSearchQuery(inputValue.trim());
      if (selectedTags.length > 0) {
        searchByTitleAndTagList(inputValue.trim(), selectedTags);
      } else {
        searchByTitle(inputValue.trim());
      }
    }
  }, [
    inputValue,
    selectedTags,
    setSearchQuery,
    searchByTitleAndTagList,
    searchByTitle,
  ]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  const handleTagClick = useCallback(
    (tag: string) => {
      if (selectedTags.includes(tag)) {
        removeTag(tag);
      } else {
        addTag(tag);
      }
    },
    [selectedTags, removeTag, addTag]
  );

  const handleStoryClick = useCallback(
    (storyId: string) => {
      router.push(`/read/${storyId}?source=search`);
    },
    [router]
  );

  const getTagColor = useCallback((tag: string) => {
    const tagData = TAGS_WITH_COLOR.find((t) => t.tag === tag);
    return tagData?.color || "#6B7280";
  }, []);

  // Memoize tag data to prevent re-renders
  const memoizedTags = useMemo(() => TAGS_WITH_COLOR, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-900 dark:to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gray-400/10 dark:bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gray-300/8 dark:bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-sky-400/15 dark:bg-sky-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-2 sm:px-3 lg:px-4 xl:px-6 pt-20 sm:pt-24 pb-6 sm:pb-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4 bg-gradient-to-r from-gray-800 via-sky-500 to-gray-800 dark:from-white dark:via-sky-200 dark:to-white bg-clip-text">
            Search Stories
          </h1>
          <p className="text-gray-600 dark:text-white/70 text-base sm:text-lg">
            Discover amazing stories by title or explore by tags
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8 px-1 sm:px-0">
          {/* Search Input */}
          <div className="bg-white/90 dark:bg-white/10 backdrop-blur-xl border border-gray-300/80 dark:border-white/20 rounded-2xl p-3 sm:p-4 lg:p-6 mb-6 hover:bg-white/95 dark:hover:bg-white/15 transition-all duration-300 shadow-lg dark:shadow-none">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              <MagnifyingGlassIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600 dark:text-white/70 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search stories by title..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white/50 text-sm sm:text-base lg:text-lg focus:outline-none min-w-0"
              />
              <button
                onClick={handleSearch}
                className="cursor-pointer px-2 sm:px-4 lg:px-6 py-1.5 sm:py-2 bg-gray-300/80 dark:bg-white/20 hover:bg-gray-400/90 dark:hover:bg-white/30 text-gray-800 dark:text-white rounded-md sm:rounded-lg lg:rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-md border border-gray-400/60 dark:border-white/20 text-xs sm:text-sm lg:text-base flex-shrink-0"
              >
                Search
              </button>
            </div>
          </div>

          {/* Tags Section */}
          <div className="bg-white/90 dark:bg-white/10 backdrop-blur-xl border border-gray-300/80 dark:border-white/20 rounded-2xl p-4 sm:p-6 hover:bg-white/95 dark:hover:bg-white/15 transition-all duration-300 shadow-lg dark:shadow-none">
            <h3 className="text-gray-800 dark:text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center">
              <span className="mr-2">🏷️</span>
              Filter by Tags
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {memoizedTags.map((tagData) => {
                const isSelected = selectedTags.includes(tagData.tag);
                return (
                  <button
                    key={tagData.tag}
                    onClick={() => handleTagClick(tagData.tag)}
                    className={`
                     cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 backdrop-blur-md border-2
                      ${
                        isSelected
                          ? "bg-gray-800 dark:bg-white text-white dark:text-gray-900 border-gray-800 dark:border-white shadow-lg font-semibold transform hover:scale-110 hover:shadow-xl"
                          : "bg-gray-200/80 dark:bg-white/10 text-gray-700 dark:text-white/80 border-gray-300/60 dark:border-white/20 hover:bg-gray-300/90 dark:hover:bg-white/20 hover:shadow-md hover:border-gray-400/80 dark:hover:border-white/30"
                      }
                    `}
                  >
                    {tagData.tag}
                    {isSelected && (
                      <XMarkIcon className="w-4 h-4 ml-2 inline" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <MagnifyingGlassIcon className="w-6 h-6 text-gray-600 dark:text-white/70" />
              <h2 className="text-gray-800 dark:text-white text-lg sm:text-xl font-semibold">
                Search Results
              </h2>
              {!isLoading && (
                <span className="text-gray-500 dark:text-white/60 text-sm">
                  ({searchResults.length}{" "}
                  {searchResults.length === 1 ? "story" : "stories"} found)
                </span>
              )}
            </div>
            {(searchQuery || selectedTags.length > 0) && (
              <button
                onClick={clearSearch}
                className="text-gray-500 dark:text-white/60 hover:text-gray-800 dark:hover:text-white text-sm transition-colors"
              >
                Clear search
              </button>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200/80 dark:bg-white/10 rounded-2xl p-4 animate-pulse"
                >
                  <div className="bg-gray-300/80 dark:bg-white/20 h-48 rounded-xl mb-4"></div>
                  <div className="space-y-3">
                    <div className="bg-gray-300/80 dark:bg-white/20 h-4 rounded w-3/4"></div>
                    <div className="bg-gray-300/80 dark:bg-white/20 h-3 rounded w-1/2"></div>
                    <div className="bg-gray-300/80 dark:bg-white/20 h-3 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-8 sm:py-12">
              <div className="bg-red-100/80 dark:bg-red-500/20 backdrop-blur-xl border border-red-300/60 dark:border-red-500/30 rounded-2xl p-4 sm:p-6 max-w-md mx-auto">
                <p className="text-red-700 dark:text-red-300 font-medium">
                  ⚠️ {error}
                </p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading &&
            !error &&
            searchResults.length === 0 &&
            (searchQuery || selectedTags.length > 0) && (
              <div className="text-center py-8 sm:py-12">
                <div className="bg-gray-200/80 dark:bg-white/10 backdrop-blur-xl border border-gray-300/60 dark:border-white/20 rounded-2xl p-6 sm:p-8 max-w-md mx-auto">
                  <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📚</div>
                  <h3 className="text-gray-800 dark:text-white font-semibold text-lg sm:text-xl mb-2">
                    No Results Found
                  </h3>
                  <p className="text-gray-600 dark:text-white/70 text-xs sm:text-sm mb-4">
                    Sorry, we couldn't find any stories matching your search
                    criteria. Try adjusting your search terms or exploring
                    different tags.
                  </p>
                  <button
                    onClick={clearSearch}
                    className="px-4 py-2 bg-gray-300/80 dark:bg-white/20 hover:bg-gray-400/90 dark:hover:bg-white/30 text-gray-800 dark:text-white rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-md border border-gray-400/60 dark:border-white/20"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            )}

          {/* Results Grid */}
          {!isLoading && !error && searchResults.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {searchResults.map((story) => (
                <StoryCard
                  key={story._id}
                  storyData={story}
                  onClick={() => handleStoryClick(story._id)}
                />
              ))}
            </div>
          )}

          {/* Initial State */}
          {!isLoading &&
            !error &&
            searchResults.length === 0 &&
            !searchQuery &&
            selectedTags.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <div className="bg-gray-200/80 dark:bg-white/10 backdrop-blur-xl border border-gray-300/60 dark:border-white/20 rounded-2xl p-6 sm:p-8 max-w-md mx-auto">
                  <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🔍</div>
                  <h3 className="text-gray-800 dark:text-white font-semibold text-lg sm:text-xl mb-2">
                    Start Your Search
                  </h3>
                  <p className="text-gray-600 dark:text-white/70 text-xs sm:text-sm">
                    Enter a title or select tags to discover amazing stories
                    from our community.
                  </p>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

const SearchPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
};

export default SearchPage;
