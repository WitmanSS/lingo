import { create } from 'zustand';

// UI-only state store (client preferences, theme, etc.)
// Server data (stories, vocabulary) is handled by React Query

interface UIState {
  fontSize: number;
  isDarkMode: boolean;
  sidebarOpen: boolean;
  setFontSize: (size: number) => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  fontSize: 16,
  isDarkMode: false,
  sidebarOpen: false,

  setFontSize: (size: number) => set({ fontSize: size }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
