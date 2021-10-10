/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as guid } from 'uuid';
import produce from 'immer';
import Configuration from '../models/configuration';
import Roll from '../models/dice/roll';
import RollResult from '../models/dice/roll-result';
import DisplayType from '../models/layout/display-type';
import LayoutEntry from '../models/layout/layout-entry';
import { createPosition } from '../models/layout/layout-position';
import GameObject from '../models/objects/game-object';
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

    // GameObjects
    addGameObject: (state, action: PayloadAction<GameObject>) => {
      state.configuration?.objects.push(action.payload);
    },
    updateGameObject() {

    },
    deleteGameObject() {

    },

    // LayoutEntry
    addEntry(state) {
      const entry: LayoutEntry = {
        id: guid(),
        display: DisplayType.simpleCard,
        position: createPosition(0, 0, 10, 10),
        key: '',
      };

      state = produce(state, (draft) => {
        if (!draft.configuration) return;
        const tab = draft.configuration.tabs[state.tabIndex];
        tab.entries.push(entry);
      });
    },
    updateEntry() {

    },
    updateEntryPosition() {

    },
    deleteEntry() {

    },

    // Rolling
    startRoll: (state, action: PayloadAction<Roll>) => {
      state.roll = action.payload;
    },
    performRoll: (state) => {
      if (!state.roll) return;
      state.rollResult = state.roll.roll();
      state.configuration?.history.push(state.rollResult);
    },

    // History
    addHistory: (state, action: PayloadAction<RollResult>) => {
      state.configuration?.history.push(action.payload);
    },
    deleteHistory() {

    },
  },
});

export const {
  setConfiguration,
  setTabIndex,

  addGameObject,
  updateGameObject,
  deleteGameObject,

  addEntry,
  updateEntry,
  updateEntryPosition,
  deleteEntry,

  startRoll,
  performRoll,

  addHistory,
  deleteHistory,
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
