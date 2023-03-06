/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface EntityFieldValue {
  entityId: string;
  fieldKey: string;
  value: any;
}

interface MappingState {
  mappings: EntityFieldValue[],
}

const initialState: MappingState = {
  mappings: [],
};

export const mappingSlice = createSlice({
  name: 'mapping',
  initialState,
  reducers: {
    setMappings(state, action: PayloadAction<EntityFieldValue[]>) {
      state.mappings = action.payload;
    },
  },
});

export const {
  setMappings,
} = mappingSlice.actions;

export const selectMappings = (state: RootState) => state.mapping.mappings;

export const selectEntityMappings = (entityId: string) => (
  state: RootState,
) => selectMappings(state).filter((x) => x.entityId === entityId);

export const selectMapping = (entityId: string, fieldKey: string) => (
  state: RootState,
) => selectEntityMappings(entityId)(state).find((x) => x.fieldKey === fieldKey);

export const selectValue = (state: RootState) => (
  entityId: string, fieldKey: string,
) => selectMapping(entityId, fieldKey)(state)?.value;

export default mappingSlice.reducer;
