/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import configs from '../examples/configurations';
import Configuration from '../models/configuration';
import type { RootState } from './store';

interface MainState {
  configs: Configuration[];
}

const initialState: MainState = {
  configs: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    loadConfigs(state) {
      state.configs = configs;
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
  loadConfigs,
  upsertConfig,
  deleteConfig,
} = mainSlice.actions;

export const selectConfigs = (state: RootState) => state.main.configs;

export default mainSlice.reducer;
