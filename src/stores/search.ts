import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { Story } from "./stories";

// Search state interface
interface SearchState {
  // State
  searchResults: Story[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedTags: string[];

  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedTags: (tags: string[]) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  clearTags: () => void;
  
  // Search functions
  searchByTag: (tag: string) => Promise<void>;
  searchByTagList: (tags: string[]) => Promise<void>;
  searchByTitle: (title: string) => Promise<void>;
  searchByTitleAndTagList: (title: string, tags: string[]) => Promise<void>;
  
  // Utility functions
  clearSearch: () => void;
  clearError: () => void;
}

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

// Tags with colors (since we don't have the constants file, I'll define common story tags)
export const TAGS_WITH_COLOR = [
  { tag: "Student", color: "#E9C5FB" },
  { tag: "Transformation", color: "#A6D6FF" },
  { tag: "Motivation", color: "#FFEFC9" },
  { tag: "Mental Health", color: "#F2994A" },
  { tag: "Productivity", color: "#96FFE1" },
  { tag: "Parenting", color: "#CDD2FD" },
  { tag: "Lifestyle", color: "#FFCBD3" },
  { tag: "Relationships", color: "#FBDDC3" },
  { tag: "Social Media", color: "#9fa8da" },
  { tag: "Mindfulness", color: "#bcaaa4" },
];

const useSearchStore = create<SearchState>((set, get) => ({
  // Initial state
  searchResults: [],
  isLoading: false,
  error: null,
  searchQuery: "",
  selectedTags: [],

  // Actions
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setSelectedTags: (tags: string[]) => {
    set({ selectedTags: tags });
  },

  addTag: (tag: string) => {
    const { selectedTags } = get();
    if (!selectedTags.includes(tag)) {
      set({ selectedTags: [...selectedTags, tag] });
    }
  },

  removeTag: (tag: string) => {
    const { selectedTags } = get();
    set({ selectedTags: selectedTags.filter(t => t !== tag) });
  },

  clearTags: () => {
    set({ selectedTags: [] });
  },

  // Search functions
  searchByTag: async (tag: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const config = getConfig();
      const response = await axios.get(`${BASE_URL}searchStories/byTag/${tag}`, config);
      
      set({ 
        searchResults: response.data.Stories || [],
        isLoading: false 
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to search stories by tag";
      set({ 
        error: errorMessage,
        isLoading: false,
        searchResults: []
      });
      toast.error(errorMessage);
    }
  },

  searchByTagList: async (tags: string[]) => {
    set({ isLoading: true, error: null });
    
    try {
      const config = getConfig();
      const response = await axios.post(`${BASE_URL}searchStories/byTagList`, { tags }, config);
      
      set({ 
        searchResults: response.data.Stories || [],
        isLoading: false 
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to search stories by tags";
      set({ 
        error: errorMessage,
        isLoading: false,
        searchResults: []
      });
      toast.error(errorMessage);
    }
  },

  searchByTitle: async (title: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const config = getConfig();
      const response = await axios.get(`${BASE_URL}searchStories/byTitle/${title}`, config);
      
      set({ 
        searchResults: response.data.Stories || [],
        isLoading: false 
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to search stories by title";
      set({ 
        error: errorMessage,
        isLoading: false,
        searchResults: []
      });
      toast.error(errorMessage);
    }
  },

  searchByTitleAndTagList: async (title: string, tags: string[]) => {
    set({ isLoading: true, error: null });
    
    try {
      const config = getConfig();
      const response = await axios.post(`${BASE_URL}searchStories/byTitleAndTagList`, { title, tags }, config);
      
      set({ 
        searchResults: response.data.Stories || [],
        isLoading: false 
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to search stories";
      set({ 
        error: errorMessage,
        isLoading: false,
        searchResults: []
      });
      toast.error(errorMessage);
    }
  },

  // Utility functions
  clearSearch: () => {
    set({ 
      searchResults: [],
      searchQuery: "",
      selectedTags: [],
      error: null
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useSearchStore;
export type { SearchState };