import { SlotFieldMapping } from '@tabletop-assistant/common';

export const fakeMapping = (value: string | number | boolean) => ({
  entityId: '',
  fieldKey: '',
  displayKey: '',
  slotKey: '',
  value,
  formattedValue: value.toString(),
});

export const actionMapping = (mapping: SlotFieldMapping, value: string | number | boolean | undefined) => ({
  entityId: '',
  fieldKey: mapping.fieldKey,
  displayKey: '',
  slotKey: mapping.slotKey,
  value,
  formattedValue: value?.toString(),
});

export interface SlotMapping {
  entityId: string;
  fieldKey: string;

  displayKey: string;
  slotKey: string;

  value: string | number | boolean | undefined;
  formattedValue: string;
}
