import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  currentGameId: string | null;
  balance: number;
  betAmount: number;
  status: 'idle' | 'playing' | 'paused' | 'finished';
}

const initialState: GameState = {
  currentGameId: null,
  balance: 0,
  betAmount: 0,
  status: 'idle',
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
  },
});

export const { setCurrentGame, setBalance, updateBalance, setBetAmount, setGameStatus } = gameSlice.actions;
export default gameSlice.reducer;
