/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entity, ValueMap } from 'tabletop-assistant-common';
import MappingResolver from '../helpers/mapping-resolver';
import { Mapping } from '../models/mapping';
import type { RootState } from './store';

interface MappingState {
  valueMaps: ValueMap[],
  entities: Entity[],

  updates: Mapping[],
  mappings: Mapping[],
}

const initialState: MappingState = {
  valueMaps: [],
  entities: [],

  updates: [],
  mappings: [],
};

export const mappingSlice = createSlice({
  name: 'mapping',
  initialState,
  reducers: {
    reset(state, action: PayloadAction<{ valueMaps: ValueMap[], entities: Entity[] }>) {
      state.valueMaps = action.payload.valueMaps;
      state.entities = action.payload.entities;

      state.updates = [];
      state.mappings = [];
    },
    addUpdates(state, action: PayloadAction<Mapping[]>) {
      state.updates = state.updates.concat(action.payload);
    },
    determineMappings(state, action: PayloadAction<Mapping[]>) {
      const resolver = new MappingResolver(state.mappings, state.valueMaps, state.entities);
      const newMappings = resolver.resolve(action.payload);

      state.mappings = state.mappings
        .filter((mapping) => !newMappings.find(
          (x) => x.entityId === mapping.entityId && x.fieldKey === mapping.fieldKey,
        ))
        .concat(newMappings);
    },
  },
});

export const {
  addUpdates,
  reset,
  determineMappings,
} = mappingSlice.actions;

export const selectUpdates = (state: RootState) => state.mapping.updates;

export const selectMappings = (emptyMappings: Mapping[]) => (
  state: RootState,
) => emptyMappings.map((em) => state.mapping.mappings.find(
  (x) => em.entityId === x.entityId && em.fieldKey === x.fieldKey,
)).filter((x): x is Mapping => Boolean(x));

export default mappingSlice.reducer;
