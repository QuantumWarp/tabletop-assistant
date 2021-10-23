/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    setLayoutIndex(state, action: PayloadAction<number>) {
      state.layoutIndex = action.payload;
    },

    // GameObjects
    upsertObject(state, action: PayloadAction<GameObject>) {
      if (!state.configuration) return;
      const currentNoteIndex = state.configuration.objects
        .findIndex((x) => x.id === action.payload.id);

      if (currentNoteIndex !== -1) {
        state.configuration.objects[currentNoteIndex] = action.payload;
      } else {
        state.configuration.objects.push(action.payload);
      }
    },
    deleteObject(state, action: PayloadAction<string>) {
      if (!state.configuration) return;
      state.configuration.objects = state.configuration.objects
        .filter((x) => x.id !== action.payload);
    },
    upsertAction(state, action: PayloadAction<GameAction>) {
      if (!state.configuration) return;
      const currentNoteIndex = state.configuration.actions
        .findIndex((x) => x.id === action.payload.id);

      if (currentNoteIndex !== -1) {
        state.configuration.actions[currentNoteIndex] = action.payload;
      } else {
        state.configuration.actions.push(action.payload);
      }
    },
    deleteAction(state, action: PayloadAction<string>) {
      if (!state.configuration) return;
      state.configuration.actions = state.configuration.actions
        .filter((x) => x.id !== action.payload);
    },

    // LayoutEntry
    upsertEntry(state, action: PayloadAction<LayoutEntry>) {
      if (!state.configuration) return;
      const tab = state.configuration.layouts[state.layoutIndex];
      const currentEntryIndex = tab.entries
        .findIndex((x) => x.id === action.payload.id);

      if (currentEntryIndex !== -1) {
        tab.entries[currentEntryIndex] = action.payload;
      } else {
        tab.entries.push(action.payload);
      }
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
      tab.entries = tab.entries.filter((x) => x.id !== action.payload);
    },

    // Action
    setAction(state, action: PayloadAction<GameAction>) {
      if (!state.configuration) return;
      state.actionTree = ActionTreeHelper.createActionTree(
        action.payload,
        state.configuration.actions,
      );
    },

    // Notes
    upsertNote(state, action: PayloadAction<Note>) {
      if (!state.configuration) return;
      const currentNoteIndex = state.configuration.notes
        .findIndex((x) => x.id === action.payload.id);

      if (currentNoteIndex !== -1) {
        state.configuration.notes[currentNoteIndex] = action.payload;
      } else {
        state.configuration.notes.push(action.payload);
      }
    },
    deleteNote(state, action: PayloadAction<string>) {
      if (!state.configuration) return;
      state.configuration.notes = state.configuration.notes
        .filter((x) => x.id !== action.payload);
    },

    // History
    upsertHistory: (state, action: PayloadAction<HistoryEntry>) => {
      if (!state.configuration) return;
      const currentHistoryIndex = state.configuration.history
        .findIndex((x) => x.id === action.payload.id);

      if (currentHistoryIndex !== -1) {
        state.configuration.history[currentHistoryIndex] = action.payload;
      } else {
        state.configuration.history = [action.payload].concat(state.configuration.history);
      }
    },
    deleteHistory(state, action: PayloadAction<string>) {
      if (!state.configuration) return;
      state.configuration.history = state.configuration.history
        .filter((x) => x.id !== action.payload);
    },
  },
});

export const {
  setConfiguration,
  setLayoutIndex,

  upsertObject,
  deleteObject,
  upsertAction,
  deleteAction,

  upsertEntry,
  updateEntryPosition,
  deleteEntry,

  setAction,

  upsertNote,
  deleteNote,

  upsertHistory,
  deleteHistory,
} = configurationSlice.actions;

export const selectConfiguration = (state: RootState) => state.configuration.configuration;
export const selectLayouts = (state: RootState) => state.configuration.configuration?.layouts;
export const selectGameObjects = (state: RootState) => state.configuration.configuration?.objects
  || [];
export const selectActions = (state: RootState) => state.configuration.configuration?.actions || [];
export const selectObjectActions = (objectId: string) => (state: RootState) => selectActions(state)
  ?.filter((x) => x.objectId === objectId);
export const selectHistory = (state: RootState) => state.configuration.configuration?.history || [];
export const selectLayoutIndex = (state: RootState) => state.configuration.layoutIndex;
export const selectActionTree = (state: RootState) => state.configuration.actionTree;
export const selectNotes = (state: RootState) => state.configuration.configuration?.notes || [];

export default configurationSlice.reducer;
