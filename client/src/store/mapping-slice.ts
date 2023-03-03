/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface EntityFieldValue {
  entityId: string;
  fieldKey: string;
  value: any;
}

interface MappingState {
  entries: EntityFieldValue[],
}

const initialState: MappingState = {
  entries: [],
};

export const mappingSlice = createSlice({
  name: 'mapping',
  initialState,
  reducers: {
    setEntries(state, action: PayloadAction<EntityFieldValue[]>) {
      state.entries = action.payload;
    },
  },
});

export const {
  setEntries,
} = mappingSlice.actions;

export const selectEntries = (state: RootState) => state.mapping.entries;

export const selectEntityEntries = (entityId: string) => (
  state: RootState,
) => selectEntries(state).filter((x) => x.entityId === entityId);

export const selectEntry = (entityId: string, fieldKey: string) => (
  state: RootState,
) => selectEntityEntries(entityId)(state).find((x) => x.fieldKey === fieldKey);

export const selectValue = (state: RootState) => (
  entityId: string, fieldKey: string,
) => selectEntry(entityId, fieldKey)(state)?.value;

export default mappingSlice.reducer;
