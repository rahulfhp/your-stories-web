import { create } from 'zustand';
import axios from 'axios';
import firebase from '@/config/firebaseConfig';
import { googleProvider, facebookProvider } from '@/config/authProviders';

type AuthProviderId = 'google' | 'facebook';

interface BackendUserProfile {
  _id: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  readStories?: string[];
  bookmarkedStories?: string[];
  upVoteStories?: string[];
}

interface AuthState {
  currentUser: BackendUserProfile | null;
  isLoading: boolean;
  error: string | null;
  loginWithProvider: (provider: AuthProviderId) => Promise<void>;
  signOut: () => Promise<void>;
  // UI state for login dialog
  isLoginDialogOpen: boolean;
  openLoginDialog: () => void;
  closeLoginDialog: () => void;
  // Guard utility
  requireAuth: (onAuthenticated: () => void) => void;
  accessToken: string | null;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  isLoading: false,
  error: null,
  isLoginDialogOpen: false,
  accessToken: null,

  loginWithProvider: async (provider: AuthProviderId) => {
    set({ isLoading: true, error: null });
    try {
      const providerInstance = provider === 'google' ? googleProvider : facebookProvider;
      const result = await firebase.auth().signInWithPopup(providerInstance);

      const user = result.user;
      if (!user) {
        throw new Error('Authentication failed');
      }

      // Map provider to expected backend providerId
      const providerId = provider === 'google' ? 'google.com-web' : 'facebook.com-web';

      // Send user details to backend sign-in API
      try {
        const resp = await axios.post(
          `${BASE_URL}user/signIn`,
          {
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            providerId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true',
            },
          }
        );

        const backendUser: BackendUserProfile = resp.data?.user;
        const accessToken: string | null = resp.data?.accessToken || null;

        set({ currentUser: backendUser, accessToken, isLoading: false, error: null, isLoginDialogOpen: false });

        // Persist to localStorage for hydration
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('ys_auth_user', JSON.stringify(backendUser));
          if (accessToken) window.localStorage.setItem('ys_access_token', accessToken);
        }
      } catch (apiError) {
        const message = apiError instanceof Error ? apiError.message : 'Login failed';
        set({ isLoading: false, error: message });
        return;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      set({ error: message, isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      await firebase.auth().signOut();
      set({ currentUser: null, accessToken: null, isLoading: false });
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('ys_auth_user');
        window.localStorage.removeItem('ys_access_token');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signout failed';
      set({ error: message, isLoading: false });
    }
  },

  openLoginDialog: () => set({ isLoginDialogOpen: true }),
  closeLoginDialog: () => set({ isLoginDialogOpen: false }),

  requireAuth: (onAuthenticated: () => void) => {
    const state = (useAuthStore.getState());
    if (state.currentUser) {
      onAuthenticated();
    } else {
      state.openLoginDialog();
    }
  },
}));

// Hydrate from localStorage on module load (client-side only)
if (typeof window !== 'undefined') {
  try {
    const savedUser = window.localStorage.getItem('ys_auth_user');
    const savedToken = window.localStorage.getItem('ys_access_token');
    if (savedUser) {
      useAuthStore.setState({ currentUser: JSON.parse(savedUser), accessToken: savedToken });
    }
  } catch (e) {
    console.warn('Failed to hydrate auth state', e);
  }
}

export type { BackendUserProfile };

