 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface MainState {
  theme: 'dark' | 'light' | null,
}

const initialState: MainState = {
  theme: null,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<'dark' | 'light'>) {
      state.theme = action.payload;
    },
  },
});

export const {
  setTheme,
} = mainSlice.actions;

export const selectTheme = (state: RootState) => state.main.theme;

export default mainSlice.reducer;
