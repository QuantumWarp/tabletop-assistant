/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entity, Expression, ValueMap } from 'tabletop-assistant-common';
import { Mapping } from '../models/mapping.js';
import type { RootState } from './store';

interface MappingState {
  updates: Mapping[],
  mappings: Mapping[],
}

const initialState: MappingState = {
  updates: [],
  mappings: [],
};

export const mappingSlice = createSlice({
  name: 'mapping',
  initialState,
  reducers: {
    addUpdates(state, action: PayloadAction<Mapping[]>) {
      state.updates = state.updates.concat(action.payload);
    },
    reset(state, action: PayloadAction<{ valueMaps: ValueMap[], entities: Entity[] }>) {
      
    },
    determineMappings(state, action: PayloadAction<Mapping[]>) {

    },
    setMappings(state, action: PayloadAction<Mapping[]>) {
      state.mappings = [...action.payload];
    },
  },
});

export const {
  addUpdates,
  reset,
  determineMappings,
  setMappings,
} = mappingSlice.actions;

export const selectUpdates = (state: RootState) => state.mapping.updates;

export const selectMappings = (emptyMappings: Mapping[]) => (
  state: RootState,
) => emptyMappings.map((em) => state.mapping.mappings.find(
  (x) => em.entityId === x.entityId && em.fieldKey === x.fieldKey,
)).filter((x): x is Mapping => Boolean(x));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const selectExpressions = (expressions: Expression[]) => (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  state: RootState,
) => [];

export default mappingSlice.reducer;
