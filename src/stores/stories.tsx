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

// Single story response interface
interface SingleStoryResponse {
  story: Story;
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

  // User's created stories
  userStories: Story[];
  isLoadingUserStories: boolean;
  userStoriesError: string | null;

  // Actions
  fetchHandpickedStories: () => Promise<void>;
  fetchMoreStories: (limit: number, skip: number) => Promise<void>;
  fetchStoryById: (storyId: string) => Promise<Story | null>;
  addStory: (story: Story) => void;

  fetchBookmarkedStories: () => Promise<void>;
  fetchUserStories: (userEmail: string) => Promise<void>;

  upvoteStory: (storyId: string) => Promise<void>;
  downvoteStory: (storyId: string) => Promise<void>;
  bookmarkStory: (storyId: string) => Promise<void>;
  removeBookmarkStory: (storyId: string) => Promise<void>;
  readStory: (storyId: string) => Promise<void>;

  clearErrors: () => void;
}

// Base URL - you may need to adjust this based on your environment
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const { currentUser } = useAuthStore.getState();

// Create axios config - adjust headers as needed
const getConfig = () => {
  // Safely access localStorage only on client side
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("ys_access_token")
      : null;

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

  // User's created stories initial state
  userStories: [],
  isLoadingUserStories: false,
  userStoriesError: null,

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

  // Fetch single story by ID
  fetchStoryById: async (storyId: string) => {
    try {
      const config = getConfig();
      const response = await axios.get<SingleStoryResponse>(
        `${BASE_URL}liveStories/getStoryById/${storyId}`,
        config
      );

      return response.data.story;
    } catch (error: any) {
      return null;
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

  // Fetch user's created stories
  fetchUserStories: async (userEmail: string) => {
    set({ isLoadingUserStories: true, userStoriesError: null });
    try {
      const config = getConfig();
      const response = await axios.get<StoriesResponse>(
        `${BASE_URL}profileStories/get/${userEmail}`,
        config
      );
      set({
        userStories: response.data.Stories,
        isLoadingUserStories: false,
      });
    } catch (error: any) {
      set({
        userStoriesError: error.message || "Failed to fetch user stories",
        isLoadingUserStories: false,
      });
    }
  },

  upvoteStory: async (storyId) => {
    const { currentUser, updateUserInLocalStorage } = useAuthStore.getState();
    const userId = get().userId || currentUser?._id;

    if (!userId && !currentUser) {
      toast.error("Please login to upvote stories");
      return;
    }

    try {
      const config = getConfig();
      const res = await axios.put(
        `${BASE_URL}user/upVoteStory/${userId}/${storyId}`,
        {}, // no body, backend handles user via session
        config
      );

      if (res.data?.type === "success") {
        // Update story upvote count in all story arrays
        set((state) => ({
          handpickedStories: state.handpickedStories.map((story) =>
            story._id === storyId
              ? { ...story, upvoteCount: story.upvoteCount + 1 }
              : story
          ),
          moreStories: state.moreStories.map((story) =>
            story._id === storyId
              ? { ...story, upvoteCount: story.upvoteCount + 1 }
              : story
          ),
          bookmarkedStories: state.bookmarkedStories.map((story) =>
            story._id === storyId
              ? { ...story, upvoteCount: story.upvoteCount + 1 }
              : story
          ),
        }));

        // Update user's upVoteStories in localStorage
        const updatedUpVoteStories = [
          ...(currentUser?.upVoteStories || []),
          storyId,
        ];
        const updatedUser = {
          ...currentUser,
          upVoteStories: updatedUpVoteStories,
        };
        updateUserInLocalStorage(updatedUser);
      }
    } catch (err) {
      console.error(err);
    }
  },

  downvoteStory: async (storyId) => {
    const { currentUser, updateUserInLocalStorage } = useAuthStore.getState();
    const userId = get().userId || currentUser?._id;

    if (!userId && !currentUser) {
      toast.error("Please login to manage votes");
      return;
    }

    try {
      const config = getConfig();
      const res = await axios.put(
        `${BASE_URL}user/downVoteStory/${userId}/${storyId}`,
        {},
        config
      );

      if (res.data?.type === "success") {
        // Update story upvote count in all story arrays (decrease by 1)
        set((state) => ({
          handpickedStories: state.handpickedStories.map((story) =>
            story._id === storyId
              ? { ...story, upvoteCount: Math.max(0, story.upvoteCount - 1) }
              : story
          ),
          moreStories: state.moreStories.map((story) =>
            story._id === storyId
              ? { ...story, upvoteCount: Math.max(0, story.upvoteCount - 1) }
              : story
          ),
          bookmarkedStories: state.bookmarkedStories.map((story) =>
            story._id === storyId
              ? { ...story, upvoteCount: Math.max(0, story.upvoteCount - 1) }
              : story
          ),
        }));

        // Remove story from user's upVoteStories in localStorage
        const updatedUpVoteStories = (currentUser?.upVoteStories || []).filter(
          (id) => id !== storyId
        );
        const updatedUser = {
          ...currentUser,
          upVoteStories: updatedUpVoteStories,
        };
        updateUserInLocalStorage(updatedUser);
      }
    } catch (err) {
      console.error(err);
    }
  },

  bookmarkStory: async (storyId) => {
    const { currentUser } = useAuthStore.getState();
    const userId = get().userId || currentUser?._id;
    
    try {
      const config = getConfig();
      const res = await axios.put(
        `${BASE_URL}user/bookmarkStory/${userId}/${storyId}`,
        {},
        config
      );

      if (res.data?.type === "success") {
        // Update local state and localStorage
        const { currentUser, updateUserInLocalStorage } =
          useAuthStore.getState();
        if (currentUser) {
          const updatedBookmarks = [
            ...(currentUser.bookmarkedStories || []),
            storyId,
          ];
          const updatedUser = {
            ...currentUser,
            bookmarkedStories: updatedBookmarks,
          };
          updateUserInLocalStorage(updatedUser);
        }

        // Refresh bookmarked stories list
        get().fetchBookmarkedStories();
      }
    } catch (err) {
      console.error(err);
    }
  },

  // Remove bookmark story
  removeBookmarkStory: async (storyId) => {
    const { currentUser } = useAuthStore.getState();
    const userId = get().userId || currentUser?._id;

    try {
      const config = getConfig();
      const res = await axios.put(
        `${BASE_URL}user/unBookmarkStory/${userId}/${storyId}`,
        {},
        config
      );

      if (res.data?.type === "success") {
        // Update local state and localStorage
        const { currentUser, updateUserInLocalStorage } =
          useAuthStore.getState();
        if (currentUser) {
          const updatedBookmarks = (currentUser.bookmarkedStories || []).filter(
            (id) => id !== storyId
          );
          const updatedUser = {
            ...currentUser,
            bookmarkedStories: updatedBookmarks,
          };
          updateUserInLocalStorage(updatedUser);
        }

        // Refresh bookmarked stories list
        get().fetchBookmarkedStories();
      }
    } catch (err) {
      console.error(err);
    }
  },

  readStory: async (storyId) => {
    const { currentUser, addToReadStories } = useAuthStore.getState();
    const userId = get().userId || currentUser?._id;

    if (!userId && !currentUser?._id) {
      toast.error("Please login to track reading progress");
      return;
    }

    try {
      // Check if story is already in readStories to avoid duplicate API calls
      const currentReadStories = currentUser?.readStories || [];
      if (currentReadStories.includes(storyId)) {
        return; // Already marked as read
      }

      const config = getConfig();
      const res = await axios.put(
        `${BASE_URL}user/updateReadList/${userId}/${storyId}`,
        {}, // no body, backend handles user via session
        config
      );

      if (res.data?.type === "success") {
        // Update user's readStories in localStorage through auth store
        addToReadStories(storyId);
      }
    } catch (error) {
      console.error("Error marking story as read:", error);
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
export type { Story, StoriesResponse, SingleStoryResponse };
