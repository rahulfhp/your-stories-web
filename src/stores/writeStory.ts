import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

// Types
export interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
  alt_description?: string;
}

export interface StoryFormData {
  title: string;
  body: string;
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
}

export interface DraftData extends StoryFormData {
  coverImage: UnsplashImage | null;
  selectedTags: string[];
  visibleSections: {
    body: boolean;
    coverImage: boolean;
    facebookLink: boolean;
    twitterLink: boolean;
    instagramLink: boolean;
  };
}

export interface StorySubmission {
  id: string;
  age: number;
  country: string;
  coverPicRef: string;
  coverPicOwnerName: string;
  coverPicOwnerLink: string;
  facebookLink: string;
  instagramLink: string;
  loginType: string;
  profession: string;
  profilePicRef: string;
  publishDate: number;
  readCount: number;
  status: number;
  storyContent: string;
  storyTitle: string;
  submissionDate: number;
  tagList: string[];
  tags: string;
  twitterLink: string;
  upvoteCount: number;
  userDetails: string;
  userEmail: string;
  userName: string;
}

interface WriteStoryStore {
  // Form data
  formData: StoryFormData;
  selectedTags: string[];
  coverImage: UnsplashImage | null;
  
  // UI state
  visibleSections: {
    body: boolean;
    coverImage: boolean;
    facebookLink: boolean;
    twitterLink: boolean;
    instagramLink: boolean;
  };
  
  // Loading states
  isSubmitting: boolean;
  isSavingDraft: boolean;
  isLoadingImages: boolean;
  
  // Image gallery
  unsplashImages: UnsplashImage[];
  imageSearchQuery: string;
  isImageGalleryOpen: boolean;
  
  // Actions
  updateFormData: (field: keyof StoryFormData, value: string) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  setCoverImage: (image: UnsplashImage | null) => void;
  toggleSection: (section: keyof WriteStoryStore['visibleSections']) => void;
  
  // Image gallery actions
  searchImages: (query: string) => Promise<void>;
  setImageGalleryOpen: (open: boolean) => void;
  
  // Draft actions
  saveDraft: () => void;
  loadDraft: () => void;
  clearDraft: () => void;
  
  // Submit story
  submitStory: (user: any) => Promise<boolean>;
  
  // Reset form
  resetForm: () => void;
}

const initialFormData: StoryFormData = {
  title: '',
  body: '',
  facebookLink: '',
  twitterLink: '',
  instagramLink: '',
};

const initialVisibleSections = {
  body: false,
  coverImage: false,
  facebookLink: false,
  twitterLink: false,
  instagramLink: false,
};

// Base URL from environment
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create axios config
const getConfig = () => {
  const token = typeof window !== 'undefined' ? window.localStorage.getItem("ys_access_token") : null;
  
  return {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      "ngrok-skip-browser-warning": "true",
    },
  };
};

export const useWriteStoryStore = create<WriteStoryStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      formData: initialFormData,
      selectedTags: [],
      coverImage: null,
      visibleSections: initialVisibleSections,
      isSubmitting: false,
      isSavingDraft: false,
      isLoadingImages: false,
      unsplashImages: [],
      imageSearchQuery: '',
      isImageGalleryOpen: false,

      // Form actions
      updateFormData: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        })),

      addTag: (tag) =>
        set((state) => {
          if (state.selectedTags.length >= 3 || state.selectedTags.includes(tag)) {
            return state;
          }
          return { selectedTags: [...state.selectedTags, tag] };
        }),

      removeTag: (tag) =>
        set((state) => ({
          selectedTags: state.selectedTags.filter((t) => t !== tag),
        })),

      setCoverImage: (image) => set({ coverImage: image }),

      toggleSection: (section) =>
        set((state) => ({
          visibleSections: {
            ...state.visibleSections,
            [section]: !state.visibleSections[section],
          },
        })),

      // Image gallery actions
      searchImages: async (query) => {
        set({ isLoadingImages: true, imageSearchQuery: query });
        
        try {
          const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
          const response = await axios.get(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20&orientation=landscape`,
            {
              headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
              },
            }
          );
          
          set({ unsplashImages: response.data.results });
        } catch (error) {
          console.error('Error fetching images:', error);
          toast.error('Failed to fetch images');
          set({ unsplashImages: [] });
        } finally {
          set({ isLoadingImages: false });
        }
      },

      setImageGalleryOpen: (open) => set({ isImageGalleryOpen: open }),

      // Draft actions
      saveDraft: () => {
        set({ isSavingDraft: true });
        
        try {
          const { formData, selectedTags, coverImage, visibleSections } = get();
          const draftData: DraftData = {
            ...formData,
            selectedTags,
            coverImage,
            visibleSections,
          };
          
          localStorage.setItem('ys_draft_story', JSON.stringify(draftData));
          toast.success('Story saved as draft');
        } catch (error) {
          console.error('Error saving draft:', error);
          toast.error('Failed to save draft');
        } finally {
          set({ isSavingDraft: false });
        }
      },

      loadDraft: () => {
        try {
          const draftJson = localStorage.getItem('ys_draft_story');
          if (draftJson) {
            const draft: DraftData = JSON.parse(draftJson);
            set({
              formData: {
                title: draft.title,
                body: draft.body,
                facebookLink: draft.facebookLink,
                twitterLink: draft.twitterLink,
                instagramLink: draft.instagramLink,
              },
              selectedTags: draft.selectedTags,
              coverImage: draft.coverImage,
              visibleSections: draft.visibleSections,
            });
          }
        } catch (error) {
          console.error('Error loading draft:', error);
        }
      },

      clearDraft: () => {
        localStorage.removeItem('ys_draft_story');
      },

      // Submit story
      submitStory: async (user) => {
        const { formData, selectedTags, coverImage } = get();
        
        // Validation
        if (!user) {
          toast.error('Please login to submit your story');
          return false;
        }
        
        if (formData.title.length < 5 || formData.title.length > 50) {
          toast.error('Title should be 5 to 50 characters long');
          return false;
        }
        
        if (formData.body.length < 500 || formData.body.length > 5000) {
          toast.error('Story should be 500 to 5000 characters long');
          return false;
        }
        
        if (!coverImage) {
          toast.error('Please select a cover image');
          return false;
        }
        
        if (selectedTags.length === 0) {
          toast.error('Please choose at least 1 tag');
          return false;
        }

        set({ isSubmitting: true });

        try {
          // Create tags string
          const tagString = selectedTags.join('####');

          const storyData: StorySubmission = {
            id: uuidv4(),
            age: 0,
            country: '',
            coverPicRef: coverImage.urls.regular,
            coverPicOwnerName: coverImage.user.name,
            coverPicOwnerLink: coverImage.user.links.html,
            facebookLink: formData.facebookLink,
            instagramLink: formData.instagramLink,
            loginType: user.providerId || 'google',
            profession: '',
            profilePicRef: user.photoURL || '',
            publishDate: 0,
            readCount: 0,
            status: 0,
            storyContent: formData.body,
            storyTitle: formData.title,
            submissionDate: Date.now(),
            tagList: selectedTags,
            tags: tagString,
            twitterLink: formData.twitterLink,
            upvoteCount: 0,
            userDetails: '',
            userEmail: user.email || '',
            userName: user.displayName || '',
          };

          await axios.post(`${BASE_URL}/createStory/create`, storyData, getConfig());
          
          toast.success('Your story has been submitted successfully!');
          
          // Clear form and draft
          get().resetForm();
          get().clearDraft();
          
          return true;
        } catch (error) {
          console.error('Error submitting story:', error);
          toast.error('Failed to submit story. Please try again.');
          return false;
        } finally {
          set({ isSubmitting: false });
        }
      },

      // Reset form
      resetForm: () =>
        set({
          formData: initialFormData,
          selectedTags: [],
          coverImage: null,
          visibleSections: initialVisibleSections,
          unsplashImages: [],
          imageSearchQuery: '',
          isImageGalleryOpen: false,
        }),
    }),
    {
      name: 'write-story-store',
    }
  )
);