import { SlotFieldMapping } from 'tabletop-assistant-common';
import { Mapping } from './mapping';

export const fakeMapping = (value: any) => ({
  entityId: '',
  fieldKey: '',
  displayKey: '',
  slotKey: '',
  value,
});

export const actionMapping = (mapping: SlotFieldMapping) => ({
  entityId: '',
  fieldKey: mapping.fieldKey,
  displayKey: '',
  slotKey: mapping.slotKey,
  value: '',
});

export interface SlotMapping extends Mapping {
  entityId: string;
  fieldKey: string;

  displayKey: string;
  slotKey: string;

  value: any;
  formattedValue: string;
}
