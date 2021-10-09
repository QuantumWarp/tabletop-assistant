/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Configuration from '../models/configuration';
import Roll from '../models/dice/roll';
import RollResult from '../models/dice/roll-result';
import GameObject from '../models/game-object';
import type { RootState } from './store';

interface MainState {
  configuration: Configuration | null;
  tabIndex: number;
  roll: Roll | null,
  rollResult: RollResult | null,
}

const initialState: MainState = {
  configuration: null,
  tabIndex: 0,
  roll: null,
  rollResult: null,
};

export const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setConfiguration(state, action: PayloadAction<Configuration | null>) {
      state.configuration = action.payload;
    },
    setTabIndex: (state, action: PayloadAction<number>) => {
      state.tabIndex = action.payload;
    },
    addGameObjects: (state, action: PayloadAction<GameObject[]>) => {
      state.configuration?.objects.push(...action.payload);
    },
    startRoll: (state, action: PayloadAction<Roll>) => {
      state.roll = action.payload;
    },
    performRoll: (state) => {
      if (!state.roll) return;
      state.rollResult = state.roll.roll();
      state.configuration?.history.push(state.rollResult);
    },
    addHistory: (state, action: PayloadAction<RollResult>) => {
      state.configuration?.history.push(action.payload);
    },
  },
});

export const {
  setConfiguration,
  setTabIndex,
  addGameObjects,
  startRoll,
  performRoll,
  addHistory,
} = configurationSlice.actions;

export const selectConfiguration = (state: RootState) => state.configuration.configuration;
export const selectTabIndex = (state: RootState) => state.configuration.tabIndex;
export const selectTabs = (state: RootState) => state.configuration.configuration?.tabs;
export const selectGameObjects = (state: RootState) => state.configuration.configuration?.objects
  || [];
export const selectRoll = (state: RootState) => state.configuration.roll;
export const selectRollResult = (state: RootState) => state.configuration.rollResult;
export const selectHistory = (state: RootState) => state.configuration.configuration?.history || [];

export default configurationSlice.reducer;
