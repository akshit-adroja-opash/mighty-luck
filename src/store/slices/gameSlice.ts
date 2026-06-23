import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  currentGameId: string | null;
  balance: number;
  betAmount: number;
  status: 'idle' | 'playing' | 'paused' | 'finished';
  favorites: any[]; // Store the full game object or just an ID
}

const initialState: GameState = {
  currentGameId: null,
  balance: 0,
  betAmount: 0,
  status: 'idle',
  favorites: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentGame: (state, action: PayloadAction<string | null>) => {
      state.currentGameId = action.payload;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
    },
    setBetAmount: (state, action: PayloadAction<number>) => {
      state.betAmount = action.payload;
    },
    setGameStatus: (state, action: PayloadAction<'idle' | 'playing' | 'paused' | 'finished'>) => {
      state.status = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<any>) => {
      // Expecting action.payload to be a game object e.g. { title: string, image: string }
      const game = action.payload;
      const index = state.favorites.findIndex(f => f.image === game.image);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(game);
      }
    },
  },
});

export const { setCurrentGame, setBalance, updateBalance, setBetAmount, setGameStatus, toggleFavorite } = gameSlice.actions;
export default gameSlice.reducer;
