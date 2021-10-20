/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import configurations from '../examples/configurations';
import Configuration from '../models/configuration';
import type { RootState } from './store';

interface MainState {
  configurations: Configuration[];
}

const initialState: MainState = {
  configurations: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    loadConfigurations(state) {
      state.configurations = configurations;
    },
    upsertConfiguration(state, action: PayloadAction<Configuration>) {
      const currentConfigIndex = state.configurations
        .findIndex((x) => x.id === action.payload.id);

      if (currentConfigIndex !== -1) {
        state.configurations[currentConfigIndex] = action.payload;
      } else {
        state.configurations.push(action.payload);
      }
    },
  },
});

export const {
  loadConfigurations,
  upsertConfiguration,
} = mainSlice.actions;

export const selectConfigurations = (state: RootState) => state.main.configurations;

export default mainSlice.reducer;
