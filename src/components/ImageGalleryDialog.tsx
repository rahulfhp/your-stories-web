"use client";

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useWriteStoryStore, UnsplashImage } from '@/stores/writeStory';
import { 
  MagnifyingGlassIcon, 
  PhotoIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

interface ImageGalleryDialogProps {
  open: boolean;
  onClose: () => void;
  onImageSelect: (image: UnsplashImage) => void;
}

const ImageGalleryDialog: React.FC<ImageGalleryDialogProps> = ({
  open,
  onClose,
  onImageSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('nature');
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);
  
  const {
    unsplashImages,
    isLoadingImages,
    searchImages,
  } = useWriteStoryStore();

  // Search for images when dialog opens or search query changes
  useEffect(() => {
    if (open && searchQuery.trim()) {
      searchImages(searchQuery);
    }
  }, [open, searchQuery, searchImages]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchImages(searchQuery);
    }
  };

  const handleImageSelect = () => {
    if (selectedImage) {
      onImageSelect(selectedImage);
      onClose();
      setSelectedImage(null);
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedImage(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
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
              onClick={handleClose}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/20 p-2"
            >
              <XMarkIcon className="w-5 h-5" />
            </Button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
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
  );
};

export default ImageGalleryDialog;