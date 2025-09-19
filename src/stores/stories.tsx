import { create } from 'zustand';
import axios from 'axios';

// Story interface based on API response structure
interface Story {
  _id: string;
  age: number;
  country: string;
  coverPicRef: string;
  facebookLink: string;
  instagramLink: string;
  twitterLink: string;
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
  upvoteCount: number;
  userDetails: string;
  userEmail: string;
  userName: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

// API response interface
interface StoriesResponse {
  Stories: Story[];
}

// Store state interface
interface StoriesState {
  // State
  handpickedStories: Story[];
  moreStories: Story[];
  isLoadingHandpicked: boolean;
  isLoadingMore: boolean;
  handpickedError: string | null;
  moreStoriesError: string | null;
  
  // Actions
  fetchHandpickedStories: () => Promise<void>;
  fetchMoreStories: (limit: number, skip: number) => Promise<void>;
  addStory: (story: Story) => void;
  clearErrors: () => void;
}

// Base URL - you may need to adjust this based on your environment
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create axios config - adjust headers as needed
const getConfig = () => ({
  headers: {
    'Content-Type': 'application/json',
    // Add authorization header if needed
    // 'Authorization': `Bearer ${token}`,
    'ngrok-skip-browser-warning': 'true', // Skip ngrok browser warning
  }
});

const useStoriesStore = create<StoriesState>((set, get) => ({
  // Initial state
  handpickedStories: [],
  moreStories: [],
  isLoadingHandpicked: false,
  isLoadingMore: false,
  handpickedError: null,
  moreStoriesError: null,

  // Fetch handpicked stories
  fetchHandpickedStories: async () => {
    set({ isLoadingHandpicked: true, handpickedError: null });
    
    try {
      const config = getConfig();
      const response = await axios.get<StoriesResponse>(`${BASE_URL}handPickedStories/get`, config);

      console.log('handpickedStories', response)
      
      set({ 
        handpickedStories: response.data.Stories,
        isLoadingHandpicked: false 
      });
    } catch (error: any) {
      set({ 
        handpickedError: error.message || 'Failed to fetch handpicked stories',
        isLoadingHandpicked: false 
      });
    }
  },

  // Fetch more stories with pagination
  fetchMoreStories: async (limit: number, skip: number) => {
    set({ isLoadingMore: true, moreStoriesError: null });
    
    try {
      const config = getConfig();
      const data = { limit, skip };
      
      const response = await axios.post<StoriesResponse>(
        `${BASE_URL}liveStories/get?limit=${limit}&skip=${skip}`, 
        data, 
        config
      );
      
      // If skip is 0, replace the stories, otherwise append
      const currentMoreStories = get().moreStories;
      const newStories = skip === 0 ? response.data.Stories : [...currentMoreStories, ...response.data.Stories];
      
      set({ 
        moreStories: newStories,
        isLoadingMore: false 
      });
    } catch (error: any) {
      set({ 
        moreStoriesError: error.message || 'Failed to fetch more stories',
        isLoadingMore: false 
      });
    }
  },

  // Add a single story (for future use)
  addStory: (story: Story) => {
    set((state) => ({ 
      moreStories: [...state.moreStories, story] 
    }));
  },

  // Clear all errors
  clearErrors: () => {
    set({ 
      handpickedError: null, 
      moreStoriesError: null 
    });
  }
}));

export default useStoriesStore;
export type { Story, StoriesResponse };