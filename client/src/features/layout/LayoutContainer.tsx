import React, { useEffect, useRef, useState } from 'react';
import {
  Entity, EntityDisplay, Layout, ValueMap,
} from 'tabletop-assistant-common';
import { useDebouncedCallback } from 'use-debounce';
import { useHistory, useParams } from 'react-router-dom';
import LayoutPositionHelper from '../../helpers/layout-position.helper';
import './LayoutContainer.css';
import { useGetValueMapsQuery, useGetEntitiesQuery, useUpdateValueMapMutation } from '../../store/api';
import LayoutDisplay from '../display/LayoutDisplay';
import ExpressionHelper from '../../helpers/expression.helper';

interface LayoutContainerProps {
  layout: Layout,
}

const LayoutContainer = ({ layout }: LayoutContainerProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  const { data: valueMaps } = useGetValueMapsQuery(tabletopId);

  const [updateValues] = useUpdateValueMapMutation();

  const [updatedValueMapsList, setUpdatedValueMapsList] = useState<ValueMap[]>([]);

  const valuesList = valueMaps
    ?.map((x) => updatedValueMapsList.find((val) => x._id === val._id) || x);

  const valuesComputedList = valuesList && entities
    && ExpressionHelper.calculateComputedValues(valuesList, entities);

  const history = useHistory();

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    setUpdatedValueMapsList([]);
  }, [entities]);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      setContainerWidth(containerRef.current.offsetWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const debouncedUpdate = useDebouncedCallback(
    async () => {
      updatedValueMapsList.map((x) => updateValues(x));
      await Promise.all(updatedValueMapsList);
    },
    1500,
  );

  const valueRef = useRef<ValueMap[]>([]);

  useEffect(() => {
    valueRef.current = updatedValueMapsList;
  }, [updatedValueMapsList]);

  useEffect(() => () => {
    debouncedUpdate.cancel();
    const promises = valueRef.current.map((x) => updateValues(x));
    Promise.all(promises);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueRef]);

  const updateValueHandler = (
    updatedMappings: { [field: string]: any },
    entityValues: ValueMap,
  ) => {
    const newValues = {
      ...entityValues,
      mappings: {
        ...entityValues.mappings,
        ...updatedMappings,
      },
    };
    const newList = updatedValueMapsList
      .filter((x) => x._id !== newValues._id)
      .concat(newValues);
    setUpdatedValueMapsList(newList);
    debouncedUpdate();
  };

  const slotClickHandler = (slot: string, entity: Entity, display: EntityDisplay) => {
    const mapping = display.mappings.find((x) => x.slotKey === slot);
    const action = entity.actions.find((x) => x.key === mapping?.fieldKey);
    if (!action) return;
    history.push({
      pathname: './action',
      search: `?entity=${entity._id}&action=${action.key}`,
    });
  };

  return (
    <div className="layout-container" ref={containerRef}>
      {layout.entries.map((entry) => {
        const entity = entities?.find((x) => entry.entityId === x._id);
        const display = entity?.displays.find((x) => x.key === entry.displayKey);
        const entityValues = valuesComputedList?.find((x) => x.entityId === entry.entityId);
        const invalidEntry = !entity || !display || !entityValues;

        return (
          <div
            key={`${entry.displayKey}-${entry.entityId}`}
            className="entry"
            style={{
              ...LayoutPositionHelper.getPositionStyle(entry.position, containerWidth),
              ...LayoutPositionHelper.getSizeStyle(entry.size, containerWidth),
            }}
          >
            {invalidEntry && <div>Invalid entry</div>}

            {!invalidEntry && (
              <LayoutDisplay
                display={display}
                entity={entity}
                fieldMappings={entityValues.mappings}
                onSlot={(slot) => slotClickHandler(slot, entity, display)}
                onUpdateValues={(updatedMappings) => updateValueHandler(
                  updatedMappings, entityValues,
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LayoutContainer;
