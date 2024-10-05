import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ValueMap } from '@tabletop-assistant/common';
import { useDebouncedCallback } from 'use-debounce';
import { Mapping } from '../../models/mapping';
import { useGetValueMapsQuery, useUpdateValueMapsMutation } from '../../store/api';
import { addUpdates, selectUpdates } from '../../store/mapping-slice';

export function useMappingUpdate() {
  const dispatch = useDispatch();

  const { tabletopId } = useParams() as { tabletopId: string };
  const { data: valueMaps } = useGetValueMapsQuery(tabletopId);
  const [updateValues] = useUpdateValueMapsMutation();

  const updates = useSelector(selectUpdates);

  const createValueMapUpdates = (mappings: Mapping[]): ValueMap[] => {
    if (!valueMaps) return [];

    const entityIds = mappings
      .map((x) => x.entityId)
      .filter((x, index, self) => self.indexOf(x) === index);

    const valueMapUpdates = valueMaps
      .filter((vm) => entityIds.includes(vm.entityId))
      .map((vm) => {
        const entityMappings = mappings
          .filter((x) => x.entityId === vm.entityId)
          .map((x) => ({ fieldKey: x.fieldKey, value: x.value }));
        const updatedFieldKeys = entityMappings.map((x) => x.fieldKey);

        return {
          ...vm,
          mappings: vm.mappings
            .filter((x) => !updatedFieldKeys.includes(x.fieldKey))
            .concat(entityMappings),
        };
      });

    return valueMapUpdates;
  };

  const debouncedUpdate = useDebouncedCallback(
    async () => updateValues((createValueMapUpdates(updates))),
    1500,
  );

  return (mappings: Mapping[]) => {
    dispatch(addUpdates(mappings.map((x) => ({
      entityId: x.entityId,
      fieldKey: x.fieldKey,
      value: x.value,
    }))));
    debouncedUpdate();
  };
}
