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
  CheckIcon,
  DocumentTextIcon,
  CameraIcon,
  TagIcon
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
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);

  // Load draft on component mount
  useEffect(() => {
    loadDraft();
  }, [loadDraft]);



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
      setHasSearched(true);
      searchImages(searchQuery.trim());
    }
  };

  const handleSearchInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchQuery.trim()) {
        setHasSearched(true);
        searchImages(searchQuery.trim());
      }
    }
  };

  const handleImageSelect = (image: UnsplashImage) => {
    setCoverImage(image);
    setImageGalleryOpen(false);
    // Reset search state when dialog closes
    setSearchQuery('');
    setHasSearched(false);
  };

  const handleImageGalleryClose = () => {
    setImageGalleryOpen(false);
    setSelectedImage(null);
  };

  const sectionOptions = [
    { key: 'body' as const, label: 'Your Story', icon: <DocumentTextIcon className="w-5 h-5" /> },
    { key: 'coverImage' as const, label: 'Cover Image', icon: <CameraIcon className="w-5 h-5" /> },
    { key: 'facebookLink' as const, label: 'Facebook Handle', icon: <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { key: 'twitterLink' as const, label: 'Twitter Handle', icon: <svg className="w-5 h-5 text-sky-500" fill="currentColor" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/></svg> },
    { key: 'instagramLink' as const, label: 'Instagram Handle', icon: <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  ];

  const availableOptions = sectionOptions.filter(option => !visibleSections[option.key]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-gray-900 dark:to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 bg-gradient-to-r from-gray-800 via-purple-600 to-gray-800 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text">
              Share Your Story
            </h1>
            <p className="text-gray-600 dark:text-white/70 text-lg">
              Create and share your unique story with the world
            </p>
          </div>

          {/* Main Form */}
          <div className="bg-white/90 dark:bg-white/10 backdrop-blur-md rounded-2xl border border-gray-300/80 dark:border-white/20 p-8 shadow-2xl dark:shadow-none space-y-8">
            <div className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-300/60 dark:border-white/20 rounded-2xl p-6 hover:bg-white/90 dark:hover:bg-white/15 transition-all duration-300">
              <input
                type="text"
                placeholder="Your Story Title..."
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                className="w-full bg-transparent text-gray-800 dark:text-white text-3xl font-bold placeholder-gray-500 dark:placeholder-white/50 focus:outline-none"
                maxLength={100}
                required
              />
              <div className="text-right text-gray-500 dark:text-white/50 text-sm mt-2">
                {formData.title.length}/100 characters
              </div>
            </div>

            {/* Story Body */}
            {visibleSections.body && (
              <div className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-300/60 dark:border-white/20 rounded-2xl p-6 hover:bg-white/90 dark:hover:bg-white/15 transition-all duration-300">
                <textarea
                  placeholder="Tell your story... (minimum 500 characters)"
                  value={formData.body}
                  onChange={(e) => updateFormData('body', e.target.value)}
                  className="w-full bg-transparent text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none resize-none"
                  rows={12}
                  minLength={500}
                  maxLength={5000}
                  required
                />
                <div className="text-right text-gray-500 dark:text-white/50 text-sm mt-2">
                  {formData.body.length}/5000 characters (min: 500)
                </div>
              </div>
            )}

            {/* Cover Image */}
            {visibleSections.coverImage && (
              <div className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-300/60 dark:border-white/20 rounded-2xl p-6 hover:bg-white/90 dark:hover:bg-white/15 transition-all duration-300">
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
                  </div>
                ) : (
                  <div
                    onClick={() => setImageGalleryOpen(true)}
                    className="border-2 border-dashed border-gray-400/60 dark:border-white/30 rounded-xl p-12 text-center cursor-pointer hover:border-gray-500/80 dark:hover:border-white/50 transition-colors"
                  >
                    <PhotoIcon className="w-16 h-16 text-gray-500 dark:text-white/50 mx-auto mb-4" />
                    <p className="text-gray-700 dark:text-white/70 text-lg font-medium">
                      Select a cover image for your story
                    </p>
                    <p className="text-gray-500 dark:text-white/50 text-sm mt-2">
                      Click to browse from our curated collection
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Social Media Links */}
            {visibleSections.facebookLink && (
              <div className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-300/60 dark:border-white/20 rounded-2xl p-6 hover:bg-white/90 dark:hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-2">
                  <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <label className="text-gray-800 dark:text-white font-medium">Facebook Handle</label>
                </div>
                <input
                  type="url"
                  placeholder="https://facebook.com/yourprofile"
                  value={formData.facebookLink}
                  onChange={(e) => updateFormData('facebookLink', e.target.value)}
                  className="w-full bg-white/60 dark:bg-white/10 border border-gray-300/60 dark:border-white/20 rounded-xl px-4 py-3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none focus:border-gray-400/80 dark:focus:border-white/40"
                />
              </div>
            )}

            {visibleSections.twitterLink && (
              <div className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-300/60 dark:border-white/20 rounded-2xl p-6 hover:bg-white/90 dark:hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-2">
                  <svg className="w-6 h-6 text-sky-500" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                  </svg>
                  <label className="text-gray-800 dark:text-white font-medium">Twitter/X Handle</label>
                </div>
                <input
                  type="url"
                  placeholder="https://twitter.com/yourhandle"
                  value={formData.twitterLink}
                  onChange={(e) => updateFormData('twitterLink', e.target.value)}
                  className="w-full bg-white/60 dark:bg-white/10 border border-gray-300/60 dark:border-white/20 rounded-xl px-4 py-3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none focus:border-gray-400/80 dark:focus:border-white/40"
                />
              </div>
            )}

            {visibleSections.instagramLink && (
              <div className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-300/60 dark:border-white/20 rounded-2xl p-6 hover:bg-white/90 dark:hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-2">
                  <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <label className="text-gray-800 dark:text-white font-medium">Instagram Handle</label>
                </div>
                <input
                  type="url"
                  placeholder="https://instagram.com/yourhandle"
                  value={formData.instagramLink}
                  onChange={(e) => updateFormData('instagramLink', e.target.value)}
                  className="w-full bg-white/60 dark:bg-white/10 border border-gray-300/60 dark:border-white/20 rounded-xl px-4 py-3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none focus:border-gray-400/80 dark:focus:border-white/40"
                />
              </div>
            )}

            {/* Add Section Dropdown */}
            {availableOptions.length > 0 && (
              <div className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-300/60 dark:border-white/20 rounded-2xl p-6 hover:bg-white/90 dark:hover:bg-white/15 transition-all duration-300">
                <h3 className="text-gray-800 dark:text-white font-medium mb-4 flex items-center">
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Add More Sections
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableOptions.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => toggleSection(option.key)}
                      className="flex items-center space-x-2 p-3 bg-white/60 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 border border-gray-300/60 dark:border-white/20 rounded-xl transition-all duration-300 text-gray-800 dark:text-white hover:scale-105"
                    >
                      <span className="flex items-center justify-center text-gray-800 dark:text-white">{option.icon}</span>
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tag Selection */}
            <div className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-300/60 dark:border-white/20 rounded-2xl p-6 hover:bg-white/90 dark:hover:bg-white/15 transition-all duration-300">
              <h3 className="text-gray-800 dark:text-white font-medium mb-4 flex items-center">
                <TagIcon className="w-5 h-5 mr-2" />
                Choose Tags (max 3) - {selectedTags.length}/3
              </h3>
              
              <div className="flex flex-wrap gap-3 mb-4">
                {TAGS_WITH_COLOR.map((tagData) => {
                  const isSelected = selectedTags.includes(tagData.tag);
                  const isDisabled = !isSelected && selectedTags.length >= 3;
                  
                  return (
                    <button
                      key={tagData.tag}
                      type="button"
                      onClick={() => isSelected ? removeTag(tagData.tag) : addTag(tagData.tag)}
                      disabled={isDisabled}
                      style={{
                        backgroundColor: isSelected 
                          ? tagData.color 
                          : isDisabled 
                          ? 'rgba(255, 255, 255, 0.05)' 
                          : `${tagData.color}20`,
                        borderColor: isSelected 
                          ? tagData.color 
                          : isDisabled 
                          ? 'rgba(255, 255, 255, 0.1)' 
                          : `${tagData.color}40`,
                        color: isSelected ? '#000000' : isDisabled ? 'rgba(255, 255, 255, 0.3)' : '#ffffff',
                        boxShadow: isSelected 
                          ? `0 4px 20px ${tagData.color}40` 
                          : 'none'
                      }}
                      className={`
                        px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 backdrop-blur-md border-2
                        ${isSelected 
                          ? 'shadow-lg font-semibold transform hover:scale-110' 
                          : isDisabled
                          ? 'cursor-not-allowed'
                          : 'hover:shadow-md hover:brightness-125'
                        }
                      `}
                      onMouseEnter={(e) => {
                        if (!isSelected && !isDisabled) {
                          e.currentTarget.style.backgroundColor = `${tagData.color}35`;
                          e.currentTarget.style.borderColor = `${tagData.color}60`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected && !isDisabled) {
                          e.currentTarget.style.backgroundColor = `${tagData.color}20`;
                          e.currentTarget.style.borderColor = `${tagData.color}40`;
                        }
                      }}
                    >
                      {tagData.tag}
                    </button>
                  );
                })}
              </div>

              {/* Selected Tags Display */}
              {selectedTags.length > 0 && (
                <div className="mt-4 flex items-center space-x-2">
                  <span className="text-gray-600 dark:text-white/70 text-sm">Selected:</span>
                  {selectedTags.map((tag) => {
                    const tagData = TAGS_WITH_COLOR.find(t => t.tag === tag);
                    return (
                      <span
                        key={tag}
                        style={{
                          backgroundColor: tagData?.color,
                          borderColor: tagData?.color,
                          color: '#000000',
                          boxShadow: `0 2px 10px ${tagData?.color}30`
                        }}
                        className="px-3 py-1 text-sm rounded-full backdrop-blur-md border-2 flex items-center space-x-1 font-medium"
                      >
                        <span>{tag}</span>
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
                  <button
                    type="button"
                    onClick={() => selectedTags.forEach(tag => removeTag(tag))}
                    className="text-gray-500 dark:text-white/50 hover:text-gray-700 dark:hover:text-white text-sm transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSavingDraft}
                className="bg-gray-200/80 dark:bg-white/10 hover:bg-gray-300/90 dark:hover:bg-white/20 text-gray-800 dark:text-white border border-gray-300/60 dark:border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105"
              >
                <BookmarkIcon className="w-4 h-4 mr-2" />
                {isSavingDraft ? 'Saving...' : 'Save Draft'}
              </Button>
              
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting || selectedTags.length === 0 || !coverImage || formData.title.length < 5 || formData.body.length < 500}
                className="bg-gray-200/80 dark:bg-white/10 hover:bg-gray-300/90 dark:hover:bg-white/20 text-gray-800 dark:text-white border border-gray-300/60 dark:border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105"
              >
                <CloudArrowUpIcon className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Publishing...' : 'Publish Story'}
              </Button>
            </div>
          </div>

          {/* Image Gallery Dialog */}
          <Dialog open={isImageGalleryOpen} onOpenChange={handleImageGalleryClose}>
            <DialogContent className="max-w-6xl max-h-[90vh] bg-white/95 dark:bg-white/10 backdrop-blur-xl border border-gray-300/60 dark:border-white/20 text-gray-800 dark:text-white overflow-hidden z-[9999]">
              <DialogTitle className="sr-only">
                Select Cover Image
              </DialogTitle>
              
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center space-x-3 mb-6">
                  <PhotoIcon className="w-8 h-8 text-gray-800 dark:text-white" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      Choose Cover Image
                    </h2>
                    <p className="text-gray-600 dark:text-white/70">
                      Select from our curated collection of high-quality images
                    </p>
                  </div>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleImageSearch} className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleSearchInputKeyPress}
                      placeholder="Search for images..."
                      className="w-full bg-white/60 dark:bg-white/10 border border-gray-300/60 dark:border-white/20 rounded-xl px-12 py-3 pr-24 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none focus:border-gray-400/80 dark:focus:border-white/40"
                    />
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-white/50" />
                    <Button
                      type="submit"
                      disabled={isLoadingImages}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200/80 dark:bg-white/20 hover:bg-gray-300/90 dark:hover:bg-white/30 text-gray-800 dark:text-white border border-gray-300/60 dark:border-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg transition-all duration-300 text-sm"
                    >
                      {isLoadingImages ? 'Searching...' : 'Search'}
                    </Button>
                  </div>
                </form>

                {/* Image Grid */}
                <div className="max-h-96 overflow-y-auto custom-scrollbar">
                  {isLoadingImages ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 dark:border-white"></div>
                      <span className="ml-3 text-gray-600 dark:text-white/70">Searching for images...</span>
                    </div>
                  ) : unsplashImages.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {unsplashImages.map((image: UnsplashImage) => (
                        <div
                          key={image.id}
                          onClick={() => handleImageSelect(image)}
                          className="relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 aspect-square hover:shadow-lg"
                        >
                          <img
                            src={image.urls.small}
                            alt={image.alt_description || 'Unsplash image'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : hasSearched ? (
                    <div className="text-center py-12">
                      <PhotoIcon className="w-16 h-16 text-gray-400 dark:text-white/30 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-white/70 text-lg">
                        No images found for "{searchQuery}"
                      </p>
                      <p className="text-gray-500 dark:text-white/50 text-sm mt-2">
                        Try searching for different keywords
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <PhotoIcon className="w-16 h-16 text-gray-400 dark:text-white/30 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-white/70 text-lg">
                        Search for images to get started
                      </p>
                      <p className="text-gray-500 dark:text-white/50 text-sm mt-2">
                        Enter keywords and press Enter or click Search
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default WriteStoryPage;