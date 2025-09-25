import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./auth";

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
  userId: string | null;
  handpickedStories: Story[];
  moreStories: Story[];
  isLoadingHandpicked: boolean;
  isLoadingMore: boolean;
  handpickedError: string | null;
  moreStoriesError: string | null;

  bookmarkedStories: Story[];
  isLoadingBookmarked: boolean;
  bookmarkedError: string | null;

  // Actions
  fetchHandpickedStories: () => Promise<void>;
  fetchMoreStories: (limit: number, skip: number) => Promise<void>;
  addStory: (story: Story) => void;

  fetchBookmarkedStories: () => Promise<void>;

  upvoteStory: (storyId: string) => Promise<void>;
  downvoteStory: (storyId: string) => Promise<void>;
  bookmarkStory: (storyId: string) => Promise<void>;
  removeBookmarkStory: (storyId: string) => Promise<void>;

  clearErrors: () => void;
}

// Base URL - you may need to adjust this based on your environment
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const { currentUser } = useAuthStore.getState();

// Create axios config - adjust headers as needed
const getConfig = () => {
  // Safely access localStorage only on client side
  const token = typeof window !== 'undefined' ? window.localStorage.getItem("ys_access_token") : null;
  
  return {
    headers: {
      "Content-Type": "application/json",
      // Add authorization header if needed
      ...(token && { Authorization: `Bearer ${token}` }),
      "ngrok-skip-browser-warning": "true", // Skip ngrok browser warning
    },
  };
};

const useStoriesStore = create<StoriesState>((set, get) => ({
  userId: currentUser?._id || null,

  // Initial state
  handpickedStories: [],
  moreStories: [],
  isLoadingHandpicked: false,
  isLoadingMore: false,
  handpickedError: null,
  moreStoriesError: null,

  bookmarkedStories: [],
  isLoadingBookmarked: false,
  bookmarkedError: null,

  // Fetch handpicked stories
  fetchHandpickedStories: async () => {
    set({ isLoadingHandpicked: true, handpickedError: null });

    try {
      const config = getConfig();
      const response = await axios.get<StoriesResponse>(
        `${BASE_URL}handPickedStories/get`,
        config
      );

      set({
        handpickedStories: response.data.Stories,
        isLoadingHandpicked: false,
      });
    } catch (error: any) {
      set({
        handpickedError: error.message || "Failed to fetch handpicked stories",
        isLoadingHandpicked: false,
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
      const newStories =
        skip === 0
          ? response.data.Stories
          : [...currentMoreStories, ...response.data.Stories];

      set({
        moreStories: newStories,
        isLoadingMore: false,
      });
    } catch (error: any) {
      set({
        moreStoriesError: error.message || "Failed to fetch more stories",
        isLoadingMore: false,
      });
    }
  },

  // Add a single story (for future use)
  addStory: (story: Story) => {
    set((state) => ({
      moreStories: [...state.moreStories, story],
    }));
  },

  // Fetch bookmarked stories
  fetchBookmarkedStories: async () => {
    set({ isLoadingBookmarked: true, bookmarkedError: null });
    try {
      const config = getConfig();
      const response = await axios.get<StoriesResponse>(
        `${BASE_URL}bookmarkedStories/get`,
        config
      );
      set({
        bookmarkedStories: response.data.Stories,
        isLoadingBookmarked: false,
      });
    } catch (error: any) {
      set({
        bookmarkedError: error.message || "Failed to fetch bookmarked stories",
        isLoadingBookmarked: false,
      });
    }
  },

  upvoteStory: async (storyId) => {
    const userId = get().userId;
    try {
      const config = getConfig();
      const res = await axios.put(
        `${BASE_URL}user/upVoteStory/${userId}/${storyId}`,
        {}, // no body, backend handles user via session
        config
      );

      if (res.data?.type === "success") {
        toast.success("Story upvoted");
      } else {
        toast.error("Failed to upvote");
      }
    } catch (err) {
      console.error(err);
    }
  },

  downvoteStory: async (storyId) => {
    const userId = get().userId;
    try {
      const config = getConfig();
      const res = await axios.put(
        `${BASE_URL}user/downVoteStory/${userId}/${storyId}`,
        {},
        config
      );

      if (res.data?.type === "success") {
        toast.success("Downvote removed");
      } else {
        toast.error("Failed to downvote");
      }
    } catch (err) {
      console.error(err);
    }
  },

  bookmarkStory: async (storyId) => {
    const userId = get().userId;
    try {
      const config = getConfig();
      const res = await axios.put(
        `${BASE_URL}user/bookmarkStory/${userId}/${storyId}`,
        {},
        config
      );

      if (res.data?.type === "success") {
        toast.success("Story bookmarked");
      } else {
        toast.error("Failed to bookmark");
      }
    } catch (err) {
      console.error(err);
    }
  },

  // Remove bookmark story
  removeBookmarkStory: async (storyId) => {
    const userId = get().userId;
    try {
      const config = getConfig();
      const res = await axios.put(
        `${BASE_URL}user/unBookmarkStory/${userId}/${storyId}`,
        {},
        config
      );

      if (res.data?.type === "success") {
        toast.success("Bookmark removed");
      } else {
        toast.error("Failed to unbookmark");
      }
    } catch (err) {
      console.error(err);
    }
  },

  // Clear all errors
  clearErrors: () => {
    set({
      handpickedError: null,
      moreStoriesError: null,
    });
  },
}));

export default useStoriesStore;
export type { Story, StoriesResponse };
