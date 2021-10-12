/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as guid } from 'uuid';
import Configuration from '../models/configuration';
import Roll from '../models/dice/roll';
import RollResult from '../models/dice/roll-result';
import DisplayType from '../models/layout/display-type';
import LayoutEntry from '../models/layout/layout-entry';
import GameObject from '../models/objects/game-object';
import type { RootState } from './store';
import { LayoutPositionHelper } from '../models/layout/layout-position';
import LayoutPositionUpdate from '../models/layout/layout-position-update';

interface ConfigurationState {
  configuration: Configuration | null;
  tabIndex: number;
  roll: Roll | null,
  rollResult: RollResult | null,
}

const initialState: ConfigurationState = {
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
      if (!state.configuration) return;
      const entry: LayoutEntry = {
        id: guid(),
        display: DisplayType.simpleCard,
        position: LayoutPositionHelper.createPosition(0, 0, 10, 10),
        key: '',
      };

      const tab = state.configuration.tabs[state.tabIndex];
      tab.entries.push(entry);
    },
    updateEntry(state, action: PayloadAction<Partial<LayoutEntry>>) {
      if (!state.configuration) return;
      const tab = state.configuration.tabs[state.tabIndex];
      const entry = tab.entries.find((x) => x.id === action.payload.id);
      Object.assign(entry, action.payload);
    },
    updateEntryPosition(state, action: PayloadAction<LayoutPositionUpdate>) {
      if (!state.configuration) return;
      const tab = state.configuration.tabs[state.tabIndex];
      const entry = tab.entries.find((x) => x.id === action.payload.entryId);
      if (!entry) return;
      entry.position = LayoutPositionHelper.updatePositionAndSize(entry.position, action.payload);
    },
    deleteEntry(state, action: PayloadAction<string>) {
      if (!state.configuration) return;
      const tab = state.configuration.tabs[state.tabIndex];
      tab.entries = tab.entries.filter((x) => x.id === action.payload);
    },

    // Rolling
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setAction(state, action: PayloadAction<string>) {

    },
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

  setAction,
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
