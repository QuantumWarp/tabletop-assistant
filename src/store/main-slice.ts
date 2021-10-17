/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
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
  },
});

export const {
  loadConfigurations,
} = mainSlice.actions;

export const selectConfigurations = (state: RootState) => state.main.configurations;

export default mainSlice.reducer;
