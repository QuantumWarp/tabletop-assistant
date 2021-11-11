/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as guid } from 'uuid';
import Configuration from '../models/configuration';
import LayoutEntry from '../models/layout/layout-entry';
import GameObject from '../models/objects/game-object';
import type { RootState } from './store';
import { LayoutPositionHelper } from '../models/layout/layout-position';
import LayoutPositionUpdate from '../models/layout/layout-position-update';
import GameAction from '../models/objects/game-action';
import ActionTree, { ActionTreeHelper } from '../models/objects/action-tree';
import HistoryEntry from '../models/history/history-entry';
import Note from '../models/notes/note';
import LayoutTab from '../models/layout/layout-tab';
import RollCombo, { RollComboHelper } from '../models/rolling/roll-combo';
import ConfigInfo, { defaultConfigInfo } from '../models/config-info';

interface ConfigurationState {
  layoutId: string | null;
  actionTree: ActionTree;

  id: string;
  info: ConfigInfo;
  layouts: LayoutTab[];
  objects: GameObject[];
  actions: GameAction[];
  notes: Note[];
  history: HistoryEntry[];
}

const initialState: ConfigurationState = {
  layoutId: null,
  actionTree: [],

  id: '',
  info: defaultConfigInfo(),
  layouts: [],
  objects: [],
  actions: [],
  notes: [],
  history: [],
};

export const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    loadConfig(state, action: PayloadAction<Configuration>) {
      const config = action.payload;
      Object.assign(state, {
        ...state,
        ...config,
        layoutId: config.layouts[0]?.id || null,
      });
    },
    setLayoutId(state, action: PayloadAction<string>) {
      state.layoutId = action.payload;
    },

    // Info
    setInfo(state, action: PayloadAction<ConfigInfo>) {
      state.info = action.payload;
    },

    // GameObjects
    upsertObject(state, action: PayloadAction<GameObject>) {
      const index = state.objects.findIndex((x) => x.id === action.payload.id);

      if (index !== -1) {
        state.objects[index] = action.payload;
      } else {
        state.objects.push(action.payload);
      }
    },
    deleteObject(state, action: PayloadAction<string>) {
      state.objects = state.objects.filter((x) => x.id !== action.payload);
    },
    upsertAction(state, action: PayloadAction<GameAction>) {
      const index = state.actions.findIndex((x) => x.id === action.payload.id);

      if (index !== -1) {
        state.actions[index] = action.payload;
      } else {
        state.actions.push(action.payload);
      }
    },
    deleteAction(state, action: PayloadAction<string>) {
      state.actions = state.actions.filter((x) => x.id !== action.payload);
    },

    // Layouts
    upsertLayout(state, action: PayloadAction<LayoutTab>) {
      const index = state.layouts.findIndex((x) => x.id === action.payload.id);

      if (index !== -1) {
        state.layouts[index] = action.payload;
      } else {
        state.layouts.push(action.payload);
        state.layoutId = action.payload.id;
      }
    },
    deleteLayout(state, action: PayloadAction<string>) {
      state.layouts = state.layouts.filter((x) => x.id !== action.payload);
      state.layoutId = state.layouts[0]?.id || null;
    },
    moveLayout(state, action: PayloadAction<{ id: string, index: number }>) {
      const endIndex = action.payload.index;
      if (endIndex < 0 || endIndex >= state.layouts.length) return;

      const startIndex = state.layouts.findIndex((x) => x.id === action.payload.id);
      if (startIndex === endIndex) return;

      const layout = state.layouts[startIndex];
      state.layouts.splice(startIndex, 1);
      state.layouts.splice(endIndex, 0, layout);
    },

    // LayoutEntry
    upsertEntry(state, action: PayloadAction<LayoutEntry>) {
      const tab = state.layouts.find((x) => x.id === state.layoutId);
      if (!tab) return;

      const index = tab.entries.findIndex((x) => x.id === action.payload.id);

      if (index !== -1) {
        tab.entries[index] = action.payload;
      } else {
        tab.entries.push(action.payload);
      }
    },
    updateEntryPosition(state, action: PayloadAction<LayoutPositionUpdate>) {
      const tab = state.layouts.find((x) => x.id === state.layoutId);
      if (!tab) return;

      const entry = tab.entries.find((x) => x.id === action.payload.entryId);
      if (!entry) return;

      entry.position = LayoutPositionHelper.updatePositionAndSize(entry.position, action.payload);
    },
    deleteEntry(state, action: PayloadAction<string>) {
      const tab = state.layouts.find((x) => x.id === state.layoutId);
      if (!tab) return;
      tab.entries = tab.entries.filter((x) => x.id !== action.payload);
    },

    // Action
    setAction(state, action: PayloadAction<GameAction>) {
      state.actionTree = ActionTreeHelper.createActionTree(action.payload, state.actions);
      state.history = [{
        id: guid(),
        objectId: action.payload.objectId,
        actionId: action.payload.id,
        date: Date.now(),
      } as HistoryEntry].concat(state.history);
    },
    setupRollAction(state, action: PayloadAction<{ actionId: string, combo: RollCombo }>) {
      const node = ActionTreeHelper.findNode(state.actionTree, action.payload.actionId);
      node.combo = action.payload.combo;
    },
    rollAction(state, action: PayloadAction<string>) {
      const node = ActionTreeHelper.findNode(state.actionTree, action.payload);
      if (!node.combo) return;

      const result = RollComboHelper.roll(node.combo);
      node.results.push(result);
      state.history = [{
        id: guid(),
        date: Date.now(),
        rollResult: result,
      } as HistoryEntry].concat(state.history);
    },
    clearAction(state) {
      state.actionTree = [];
    },

    // Notes
    upsertNote(state, action: PayloadAction<Note>) {
      const index = state.notes.findIndex((x) => x.id === action.payload.id);

      if (index !== -1) {
        state.notes[index] = action.payload;
      } else {
        state.notes.push(action.payload);
      }
    },
    deleteNote(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter((x) => x.id !== action.payload);
    },

    // History
    upsertHistory: (state, action: PayloadAction<HistoryEntry>) => {
      const currentHistoryIndex = state.history.findIndex((x) => x.id === action.payload.id);

      if (currentHistoryIndex !== -1) {
        state.history[currentHistoryIndex] = action.payload;
      } else {
        state.history = [action.payload].concat(state.history);
      }
    },
    deleteHistory(state, action: PayloadAction<string>) {
      state.history = state.history.filter((x) => x.id !== action.payload);
    },
  },
});

export const {
  loadConfig,
  setLayoutId,

  setInfo,

  upsertObject,
  deleteObject,
  upsertAction,
  deleteAction,

  upsertLayout,
  deleteLayout,
  moveLayout,

  upsertEntry,
  updateEntryPosition,
  deleteEntry,

  setAction,
  setupRollAction,
  rollAction,
  clearAction,

  upsertNote,
  deleteNote,

  upsertHistory,
  deleteHistory,
} = configurationSlice.actions;

export const selectCurrentLayout = (state: RootState) => state.config.layouts
  .find((x) => x.id === state.config.layoutId);
export const selectActionTree = (state: RootState) => state.config.actionTree;

export const selectInfo = (state: RootState) => state.config.info;
export const selectObjects = (state: RootState) => state.config.objects;
export const selectActions = (state: RootState) => state.config.actions;
export const selectLayouts = (state: RootState) => state.config.layouts;
export const selectNotes = (state: RootState) => state.config.notes;
export const selectHistory = (state: RootState) => state.config.history;

export const selectConfigId = (state: RootState) => state.config.id;
export const selectConfig: (state: RootState) => Configuration = (state: RootState) => ({
  id: state.config.id,
  info: state.config.info,
  layouts: state.config.layouts,
  objects: state.config.objects,
  actions: state.config.actions,
  notes: state.config.notes,
  history: state.config.history,
});

export default configurationSlice.reducer;
