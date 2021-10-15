/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as guid } from 'uuid';
import Configuration from '../models/configuration';
import RollResult from '../models/dice/roll-result';
import DisplayType from '../models/layout/display-type';
import LayoutEntry from '../models/layout/layout-entry';
import GameObject from '../models/objects/game-object';
import type { RootState } from './store';
import { LayoutPositionHelper } from '../models/layout/layout-position';
import LayoutPositionUpdate from '../models/layout/layout-position-update';
import GameAction from '../models/objects/game-action';
import ActionTree, { ActionTreeHelper } from '../models/objects/action-tree';

interface ConfigurationState {
  configuration: Configuration | null;
  layoutIndex: number;
  actionTree: ActionTree;
}

const initialState: ConfigurationState = {
  layoutIndex: 0,
  configuration: null,
  actionTree: [],
};

export const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setConfiguration(state, action: PayloadAction<Configuration | null>) {
      state.configuration = action.payload;
    },
    setLayoutIndex: (state, action: PayloadAction<number>) => {
      state.layoutIndex = action.payload;
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

      const tab = state.configuration.layouts[state.layoutIndex];
      tab.entries.push(entry);
    },
    updateEntry(state, action: PayloadAction<Partial<LayoutEntry>>) {
      if (!state.configuration) return;
      const tab = state.configuration.layouts[state.layoutIndex];
      const entry = tab.entries.find((x) => x.id === action.payload.id);
      Object.assign(entry, action.payload);
    },
    updateEntryPosition(state, action: PayloadAction<LayoutPositionUpdate>) {
      if (!state.configuration) return;
      const tab = state.configuration.layouts[state.layoutIndex];
      const entry = tab.entries.find((x) => x.id === action.payload.entryId);
      if (!entry) return;
      entry.position = LayoutPositionHelper.updatePositionAndSize(entry.position, action.payload);
    },
    deleteEntry(state, action: PayloadAction<string>) {
      if (!state.configuration) return;
      const tab = state.configuration.layouts[state.layoutIndex];
      tab.entries = tab.entries.filter((x) => x.id === action.payload);
    },

    // Action
    setAction(state, action: PayloadAction<GameAction>) {
      if (!state.configuration) return;
      state.actionTree = ActionTreeHelper.createActionTree(
        action.payload,
        state.configuration.actions,
      );
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
  setLayoutIndex,

  addGameObject,
  updateGameObject,
  deleteGameObject,

  addEntry,
  updateEntry,
  updateEntryPosition,
  deleteEntry,

  setAction,

  addHistory,
  deleteHistory,
} = configurationSlice.actions;

export const selectConfiguration = (state: RootState) => state.configuration.configuration;
export const selectLayouts = (state: RootState) => state.configuration.configuration?.layouts;
export const selectGameObjects = (state: RootState) => state.configuration.configuration?.objects
  || [];
export const selectActions = (state: RootState) => state.configuration.configuration?.actions;
export const selectObjectActions = (objectId: string) => (state: RootState) => selectActions(state)
  ?.filter((x) => x.objectId === objectId);
export const selectHistory = (state: RootState) => state.configuration.configuration?.history || [];
export const selectLayoutIndex = (state: RootState) => state.configuration.layoutIndex;
export const selectActionTree = (state: RootState) => state.configuration.actionTree;

export default configurationSlice.reducer;
