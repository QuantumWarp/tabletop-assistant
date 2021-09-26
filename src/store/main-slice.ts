/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Roll from '../models/dice/roll';
import RollResult from '../models/dice/roll-result';
import GameObject from '../models/game-object';
import type { RootState } from './store';

interface MainState {
  selectedTab: string;
  history: RollResult[],
  gameObjects: GameObject[],
  currentRoll: Roll | null,
  currentRollResult: RollResult | null,
}

const initialState: MainState = {
  selectedTab: 'display',
  history: [],
  gameObjects: [],
  currentRoll: null,
  currentRollResult: null,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload;
    },
    addHistory: (state, action: PayloadAction<RollResult>) => {
      state.history.push(action.payload);
    },
    addGameObjects: (state, action: PayloadAction<GameObject[]>) => {
      state.gameObjects.push(...action.payload);
    },
    startRoll: (state, action: PayloadAction<Roll>) => {
      state.currentRoll = action.payload;
      state.selectedTab = 'roller';
    },
    performRoll: (state) => {
      if (!state.currentRoll) return;
      state.currentRollResult = state.currentRoll.roll();
      state.history.push(state.currentRollResult);
    },
  },
});

export const {
  setTab,
  addHistory,
  addGameObjects,
  startRoll,
  performRoll,
} = mainSlice.actions;

export const selectTab = (state: RootState) => state.main.selectedTab;
export const selectHistory = (state: RootState) => state.main.history;
export const selectGameObjects = (state: RootState) => state.main.gameObjects;
export const selectCurrentRoll = (state: RootState) => state.main.currentRoll;
export const selectCurrentRollResult = (state: RootState) => state.main.currentRollResult;

export default mainSlice.reducer;
