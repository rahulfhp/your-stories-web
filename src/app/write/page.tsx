"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';
import { useWriteStoryStore, UnsplashImage } from '@/stores/writeStory';
import { TAGS_WITH_COLOR } from '@/stores/search';
import { Button } from '@/components/ui/button';
import { 
  PlusIcon, 
  PhotoIcon, 
  CloudArrowUpIcon,
  BookmarkIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import toast from 'react-hot-toast';

const WriteStoryPage: React.FC = () => {
  const router = useRouter();
  const currentUser = useAuthStore((s) => s.currentUser);
  const openLoginDialog = useAuthStore((s) => s.openLoginDialog);
  
  const {
    formData,
    selectedTags,
    coverImage,
    visibleSections,
    isSubmitting,
    isSavingDraft,
    isImageGalleryOpen,
    unsplashImages,
    isLoadingImages,
    updateFormData,
    addTag,
    removeTag,
    setCoverImage,
    toggleSection,
    setImageGalleryOpen,
    searchImages,
    saveDraft,
    loadDraft,
    submitStory,
    resetForm,
  } = useWriteStoryStore();

  // Image gallery state
  const [searchQuery, setSearchQuery] = useState('nature');
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);

  // Load draft on component mount
  useEffect(() => {
    loadDraft();
  }, [loadDraft]);

  // Search for images when dialog opens or search query changes
  useEffect(() => {
    if (isImageGalleryOpen && searchQuery.trim()) {
      searchImages(searchQuery);
    }
  }, [isImageGalleryOpen, searchQuery, searchImages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      openLoginDialog();
      return;
    }

    const success = await submitStory(currentUser);
    if (success) {
      router.push('/');
    }
  };

  const handleSaveDraft = () => {
    saveDraft();
  };

  const handleImageSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchImages(searchQuery);
    }
  };

  const handleImageSelect = () => {
    if (selectedImage) {
      setCoverImage(selectedImage);
      setImageGalleryOpen(false);
      setSelectedImage(null);
    }
  };

  const handleImageGalleryClose = () => {
    setImageGalleryOpen(false);
    setSelectedImage(null);
  };

  const sectionOptions = [
    { key: 'body' as const, label: 'Your Story', icon: '📝' },
    { key: 'coverImage' as const, label: 'Cover Image', icon: '🖼️' },
    { key: 'facebookLink' as const, label: 'Facebook Handle', icon: '📘' },
    { key: 'twitterLink' as const, label: 'Twitter Handle', icon: '🐦' },
    { key: 'instagramLink' as const, label: 'Instagram Handle', icon: '📷' },
  ];

  const availableOptions = sectionOptions.filter(option => !visibleSections[option.key]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            ✍️ Write Your Story
          </h1>
          <p className="text-white/70 text-lg">
            Share your experiences and inspire others
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
            <input
              type="text"
              placeholder="Your Story Title..."
              value={formData.title}
              onChange={(e) => updateFormData('title', e.target.value)}
              className="w-full bg-transparent text-white text-3xl font-bold placeholder-white/50 focus:outline-none"
              maxLength={50}
              required
            />
            <div className="text-right text-white/50 text-sm mt-2">
              {formData.title.length}/50 characters
            </div>
          </div>

          {/* Story Body */}
          {visibleSections.body && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <textarea
                placeholder="Tell your story... (minimum 500 characters)"
                value={formData.body}
                onChange={(e) => updateFormData('body', e.target.value)}
                className="w-full bg-transparent text-white placeholder-white/50 focus:outline-none resize-none"
                rows={12}
                minLength={500}
                maxLength={5000}
                required
              />
              <div className="text-right text-white/50 text-sm mt-2">
                {formData.body.length}/5000 characters (min: 500)
              </div>
            </div>
          )}

          {/* Cover Image */}
          {visibleSections.coverImage && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              {coverImage ? (
                <div className="relative">
                  <img
                    src={coverImage.urls.regular}
                    alt={coverImage.alt_description || 'Cover image'}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button
                      type="button"
                      onClick={() => setImageGalleryOpen(true)}
                      className="bg-white/20 hover:bg-white/30 text-white border border-white/20"
                    >
                      <PhotoIcon className="w-4 h-4 mr-2" />
                      Change Image
                    </Button>
                  </div>
                  <div className="mt-3 text-white/70 text-sm">
                    Photo by{' '}
                    <a
                      href={coverImage.user.links.html}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:underline"
                    >
                      {coverImage.user.name}
                    </a>{' '}
                    on Unsplash
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setImageGalleryOpen(true)}
                  className="border-2 border-dashed border-white/30 rounded-xl p-12 text-center cursor-pointer hover:border-white/50 transition-colors"
                >
                  <PhotoIcon className="w-16 h-16 text-white/50 mx-auto mb-4" />
                  <p className="text-white/70 text-lg font-medium">
                    Select a cover image for your story
                  </p>
                  <p className="text-white/50 text-sm mt-2">
                    Click to browse from our curated collection
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Social Media Links */}
          {visibleSections.facebookLink && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">📘</span>
                <label className="text-white font-medium">Facebook Handle</label>
              </div>
              <input
                type="url"
                placeholder="https://facebook.com/yourprofile"
                value={formData.facebookLink}
                onChange={(e) => updateFormData('facebookLink', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>
          )}

          {visibleSections.twitterLink && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">🐦</span>
                <label className="text-white font-medium">Twitter Handle</label>
              </div>
              <input
                type="url"
                placeholder="https://twitter.com/yourhandle"
                value={formData.twitterLink}
                onChange={(e) => updateFormData('twitterLink', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>
          )}

          {visibleSections.instagramLink && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">📷</span>
                <label className="text-white font-medium">Instagram Handle</label>
              </div>
              <input
                type="url"
                placeholder="https://instagram.com/yourhandle"
                value={formData.instagramLink}
                onChange={(e) => updateFormData('instagramLink', e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              />
            </div>
          )}

          {/* Add Section Dropdown */}
          {availableOptions.length > 0 && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <h3 className="text-white font-medium mb-4 flex items-center">
                <PlusIcon className="w-5 h-5 mr-2" />
                Add More Sections
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableOptions.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => toggleSection(option.key)}
                    className="flex items-center space-x-2 p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all duration-300 text-white hover:scale-105"
                  >
                    <span className="text-lg">{option.icon}</span>
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tag Selection */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
            <h3 className="text-white font-medium mb-4 flex items-center">
              <span className="mr-2">🏷️</span>
              Choose Tags (max 3) - {selectedTags.length}/3
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
              {TAGS_WITH_COLOR.map((tagData) => {
                const isSelected = selectedTags.includes(tagData.tag);
                const isDisabled = !isSelected && selectedTags.length >= 3;
                
                return (
                  <button
                    key={tagData.tag}
                    type="button"
                    onClick={() => isSelected ? removeTag(tagData.tag) : addTag(tagData.tag)}
                    disabled={isDisabled}
                    className={`
                      px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 border-2 shadow-lg
                      ${isSelected 
                        ? 'text-black shadow-md hover:scale-110' 
                        : isDisabled
                        ? 'text-white/30 border-white/10 cursor-not-allowed'
                        : 'text-white hover:scale-105 hover:brightness-125'
                      }
                    `}
                    style={{
                      backgroundColor: isSelected ? tagData.color : isDisabled ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.2)',
                      borderColor: isSelected ? tagData.color : isDisabled ? 'rgba(255, 255, 255, 0.1)' : `${tagData.color}60`,
                      boxShadow: isSelected ? `0 4px 20px ${tagData.color}40` : undefined,
                    }}
                  >
                    #{tagData.tag}
                  </button>
                );
              })}
            </div>

            {/* Selected Tags Display */}
            {selectedTags.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <p className="text-white/70 text-sm mb-2">Selected Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => {
                    const tagData = TAGS_WITH_COLOR.find(t => t.tag === tag);
                    return (
                      <span
                        key={tag}
                        className="flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-semibold border-2 shadow-lg"
                        style={{
                          backgroundColor: tagData?.color,
                          borderColor: tagData?.color,
                          color: 'black',
                          boxShadow: `0 4px 20px ${tagData?.color}40`,
                        }}
                      >
                        <span>#{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-600 transition-colors"
                        >
                          <XMarkIcon className="w-3 h-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSavingDraft}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-md"
            >
              <BookmarkIcon className="w-4 h-4 mr-2" />
              {isSavingDraft ? 'Saving...' : 'Save Draft'}
            </Button>
            
            <Button
              type="submit"
              disabled={isSubmitting || selectedTags.length === 0 || !coverImage || formData.title.length < 5 || formData.body.length < 500}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <CloudArrowUpIcon className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Publishing...' : 'Publish Story'}
            </Button>
          </div>
        </form>

        {/* Image Gallery Dialog */}
        <Dialog open={isImageGalleryOpen} onOpenChange={handleImageGalleryClose}>
          <DialogContent className="max-w-6xl max-h-[90vh] bg-white/10 backdrop-blur-xl border border-white/20 text-white overflow-hidden">
            <DialogTitle className="sr-only">
              Select Cover Image
            </DialogTitle>
            
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <PhotoIcon className="w-8 h-8 text-white" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Choose Cover Image
                    </h2>
                    <p className="text-white/70">
                      Select from our curated collection of high-quality images
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleImageGalleryClose}
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/20 p-2"
                >
                  <XMarkIcon className="w-5 h-5" />
                </Button>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleImageSearch} className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for images... (e.g., nature, technology, business)"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  />
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Button
                    type="submit"
                    disabled={isLoadingImages}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-4 py-2"
                  >
                    {isLoadingImages ? 'Searching...' : 'Search'}
                  </Button>
                </div>
              </form>

              {/* Image Grid */}
              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                {isLoadingImages ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    <span className="ml-3 text-white/70">Searching for images...</span>
                  </div>
                ) : unsplashImages.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {unsplashImages.map((image: UnsplashImage) => (
                      <div
                        key={image.id}
                        onClick={() => setSelectedImage(image)}
                        className={`
                          relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-105
                          ${selectedImage?.id === image.id 
                            ? 'ring-4 ring-blue-400 shadow-lg shadow-blue-400/50' 
                            : 'hover:shadow-lg'
                          }
                        `}
                      >
                        <img
                          src={image.urls.small}
                          alt={image.alt_description || 'Unsplash image'}
                          className="w-full h-32 object-cover"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          {selectedImage?.id === image.id && (
                            <div className="bg-blue-500 rounded-full p-2">
                              <CheckIcon className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Attribution */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2">
                          <p className="truncate">
                            by{' '}
                            <span className="font-medium">
                              {image.user.name}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <PhotoIcon className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <p className="text-white/70 text-lg">
                      No images found for "{searchQuery}"
                    </p>
                    <p className="text-white/50 text-sm mt-2">
                      Try searching for different keywords
                    </p>
                  </div>
                )}
              </div>

              {/* Selected Image Preview & Actions */}
              {selectedImage && (
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedImage.urls.thumb}
                        alt={selectedImage.alt_description || 'Selected image'}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-white font-medium">
                          Selected Image
                        </p>
                        <p className="text-white/70 text-sm">
                          by {selectedImage.user.name} on Unsplash
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => setSelectedImage(null)}
                        className="bg-white/20 hover:bg-white/30 text-white border border-white/20"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleImageSelect}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
                      >
                        Use This Image
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default WriteStoryPage;