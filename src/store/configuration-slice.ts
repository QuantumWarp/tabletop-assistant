/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Configuration from '../models/configuration';
import Roll from '../models/dice/roll';
import RollResult from '../models/dice/roll-result';
import GameObject from '../models/game-object';
import type { RootState } from './store';

interface MainState {
  configuration: Configuration | null;
  configure: boolean;
  tabIndex: number;
  gameObjects: GameObject[],
  roll: Roll | null,
  rollResult: RollResult | null,
  history: RollResult[],
}

const initialState: MainState = {
  configuration: null,
  configure: false,
  tabIndex: 0,
  gameObjects: [],
  roll: null,
  rollResult: null,
  history: [],
};

export const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setConfiguration(state, action: PayloadAction<Configuration | null>) {
      state.configuration = action.payload;
    },
    toggleConfigure(state) {
      state.configure = !state.configure;
    },
    setTabIndex: (state, action: PayloadAction<number>) => {
      state.tabIndex = action.payload;
    },
    addGameObjects: (state, action: PayloadAction<GameObject[]>) => {
      state.gameObjects.push(...action.payload);
    },
    startRoll: (state, action: PayloadAction<Roll>) => {
      state.roll = action.payload;
    },
    performRoll: (state) => {
      if (!state.roll) return;
      state.rollResult = state.roll.roll();
      state.history.push(state.rollResult);
    },
    addHistory: (state, action: PayloadAction<RollResult>) => {
      state.history.push(action.payload);
    },
  },
});

export const {
  setConfiguration,
  toggleConfigure,
  setTabIndex,
  addGameObjects,
  startRoll,
  performRoll,
  addHistory,
} = configurationSlice.actions;

export const selectConfiguration = (state: RootState) => state.configuration.configuration;
export const selectConfigure = (state: RootState) => state.configuration.configure;
export const selectTabIndex = (state: RootState) => state.configuration.tabIndex;
export const selectTabs = (state: RootState) => state.configuration.configuration?.tabs;
export const selectGameObjects = (state: RootState) => state.configuration.gameObjects;
export const selectRoll = (state: RootState) => state.configuration.roll;
export const selectRollResult = (state: RootState) => state.configuration.rollResult;
export const selectHistory = (state: RootState) => state.configuration.history;

export default configurationSlice.reducer;
