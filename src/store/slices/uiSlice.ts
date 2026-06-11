import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  modals: {
    [key: string]: boolean;
  };
  authModalView: 'login' | 'register';
  activeCategory: string;
  selectedGame: { title: string; image: string } | null;
}

const initialState: UiState = {
  theme: 'dark',
  sidebarOpen: false,
  modals: {},
  authModalView: 'register',
  activeCategory: 'Lobby',
  selectedGame: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = false;
    },
    setAuthModalView: (state, action: PayloadAction<'login' | 'register'>) => {
      state.authModalView = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
    setSelectedGame: (state, action: PayloadAction<{ title: string; image: string } | null>) => {
      state.selectedGame = action.payload;
    },
  },
});

export const { toggleTheme, setTheme, toggleSidebar, setSidebarOpen, openModal, closeModal, setAuthModalView, setActiveCategory, setSelectedGame } = uiSlice.actions;
export default uiSlice.reducer;
