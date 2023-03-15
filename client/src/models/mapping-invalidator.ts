import { Mapping } from './mapping';

export interface MappingInvalidator {
  mapping: Mapping,
  invalidate: Mapping,
}
