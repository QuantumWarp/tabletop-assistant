 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entity, ValueMap } from '@tabletop-assistant/common';
import MappingResolver from '../helpers/mapping-resolver';
import { Mapping, mappingsMatch } from '../models/mapping';
import { MappingInvalidator } from '../models/mapping-invalidator';
import type { RootState } from './store';

interface MappingState {
  valueMaps: ValueMap[],
  entities: Entity[],

  updates: Mapping[],
  mappings: Mapping[],
  invalidators: MappingInvalidator[];
}

const initialState: MappingState = {
  valueMaps: [],
  entities: [],

  updates: [],
  mappings: [],
  invalidators: [],
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
      state.invalidators = [];
    },
    addUpdates(state, action: PayloadAction<Mapping[]>) {
      const invalidators: MappingInvalidator[] = action.payload.map((x) => ({
        mapping: x, invalidate: x,
      }));
      let newInvalidators: MappingInvalidator[] = [...invalidators];

      do {
        const newInvalidateMappings = newInvalidators.map((x) => x.invalidate);

        newInvalidators = state.invalidators
          .filter((a) => newInvalidateMappings.find((b) => mappingsMatch(a.mapping, b)))
          .filter((x) => !invalidators.includes(x));

        invalidators.push(...newInvalidators);
      } while (newInvalidators.length > 0);

      const invalidate = invalidators.map((x) => x.invalidate);

      state.invalidators = state.invalidators.filter((x) => !invalidators.includes(x));
      state.updates = state.updates
        .filter((a) => !action.payload.find((b) => mappingsMatch(a, b)))
        .concat(action.payload);

      state.mappings = state.mappings
        .filter((a) => !invalidate.find((b) => mappingsMatch(a, b)))
        .concat(state.updates);
    },
    determineMappings(state, action: PayloadAction<Mapping[]>) {
      const resolver = new MappingResolver(state.mappings, state.valueMaps, state.entities);
      resolver.resolve(action.payload);

      state.mappings = state.mappings.concat(resolver.newMappings);
      state.invalidators = state.invalidators.concat(resolver.newInvalidators);
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
) => emptyMappings
  .map((em) => state.mapping.mappings.find((x) => mappingsMatch(em, x)))
  .filter((x): x is Mapping => Boolean(x));

export default mappingSlice.reducer;
