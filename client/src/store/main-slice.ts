/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Configuration from '../models/configuration';
import type { RootState } from './store';

interface MainState {
  theme: 'dark' | 'light' | null,
  configs: Configuration[];
}

const initialState: MainState = {
  theme: null,
  configs: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<'dark' | 'light'>) {
      state.theme = action.payload;
    },
    upsertConfig(state, action: PayloadAction<Configuration>) {
      const index = state.configs.findIndex((x) => x.id === action.payload.id);

      if (index !== -1) {
        state.configs[index] = action.payload;
      } else {
        state.configs.push(action.payload);
      }
    },
    deleteConfig(state, action: PayloadAction<string>) {
      state.configs = state.configs.filter((x) => x.id !== action.payload);
    },
  },
});

export const {
  setTheme,
  upsertConfig,
  deleteConfig,
} = mainSlice.actions;

export const selectTheme = (state: RootState) => state.main.theme;
export const selectConfigs = (state: RootState) => state.main.configs;

export default mainSlice.reducer;
