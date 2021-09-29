/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Roll from '../models/dice/roll';
import RollResult from '../models/dice/roll-result';
import GameObject from '../models/game-object';
import Layout from '../models/layout/layout';
import type { RootState } from './store';

interface MainState {
  configure: boolean;
  tabIndex: number;
  layout: Layout | null,
  gameObjects: GameObject[],
  roll: Roll | null,
  rollResult: RollResult | null,
  history: RollResult[],
}

const initialState: MainState = {
  configure: false,
  tabIndex: 0,
  layout: null,
  gameObjects: [],
  roll: null,
  rollResult: null,
  history: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    toggleConfigure(state) {
      state.configure = !state.configure;
    },
    setTabIndex: (state, action: PayloadAction<number>) => {
      state.tabIndex = action.payload;
    },
    setLayout: (state, action: PayloadAction<Layout>) => {
      state.layout = action.payload;
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
  toggleConfigure,
  setTabIndex,
  setLayout,
  addGameObjects,
  startRoll,
  performRoll,
  addHistory,
} = mainSlice.actions;

export const selectConfigure = (state: RootState) => state.main.configure;
export const selectTabIndex = (state: RootState) => state.main.tabIndex;
export const selectLayout = (state: RootState) => state.main.layout;
export const selectGameObjects = (state: RootState) => state.main.gameObjects;
export const selectRoll = (state: RootState) => state.main.roll;
export const selectRollResult = (state: RootState) => state.main.rollResult;
export const selectHistory = (state: RootState) => state.main.history;

export default mainSlice.reducer;
