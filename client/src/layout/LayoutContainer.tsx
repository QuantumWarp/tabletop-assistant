import React, { useEffect, useRef, useState } from 'react';
import {
  Entity, EntityDisplay, Layout, Values,
} from 'tabletop-assistant-common';
import { useDebouncedCallback } from 'use-debounce';
import { useHistory, useParams } from 'react-router-dom';
import LayoutPositionHelper from '../models/layout/layout-position';
import './LayoutContainer.css';
import { useGetAllValuesQuery, useGetEntitiesQuery, useUpdateValuesMutation } from '../store/api';
import DisplayType from '../helpers/display.type';
import LayoutDisplay from '../display/LayoutDisplay';

interface LayoutContainerProps {
  layout: Layout,
}

const LayoutContainer = ({ layout }: LayoutContainerProps) => {
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);
  const { data: values } = useGetAllValuesQuery(tabletopId);

  const [updateValues] = useUpdateValuesMutation();

  const [updatedValuesList, setUpdatedValuesList] = useState<Values[]>([]);

  const valuesList = values?.map((x) => updatedValuesList.find((val) => x._id === val._id) || x);

  const history = useHistory();

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    setUpdatedValuesList([]);
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
      updatedValuesList.map((x) => updateValues(x));
      await Promise.all(updatedValuesList);
    },
    1500,
  );

  const valueRef = useRef<Values[]>([]);

  useEffect(() => {
    valueRef.current = updatedValuesList;
  }, [updatedValuesList]);

  useEffect(() => () => {
    debouncedUpdate.cancel();
    const promises = valueRef.current.map((x) => updateValues(x));
    Promise.all(promises);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueRef]);

  const updateValueHandler = (
    updatedMappings: { [field: string]: any },
    entityValues: Values,
  ) => {
    const newValues = {
      ...entityValues,
      mappings: {
        ...entityValues.mappings,
        ...updatedMappings,
      },
    };
    const newList = updatedValuesList
      .filter((x) => x._id !== newValues._id)
      .concat(newValues);
    setUpdatedValuesList(newList);
    debouncedUpdate();
  };

  const slotClickHandler = (slot: string, entity: Entity, display: EntityDisplay) => {
    const action = entity.actions.find((x) => x.key === display.mappings[slot]);
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
        const display = entity?.displays.find((x) => x.type === entry.displayType);
        const entityValues = valuesList?.find((x) => x.entityId === entry.entityId);
        const invalidEntry = !entity || !display || !entityValues;

        return (
          <div
            key={`${entry.displayType}-${entry.entityId}`}
            className="entry"
            style={{
              ...LayoutPositionHelper.getPositionStyle(entry.position, containerWidth),
              ...LayoutPositionHelper.getSizeStyle(entry.size, containerWidth),
            }}
          >
            {invalidEntry && <div>Invalid entry</div>}

            {!invalidEntry && (
              <LayoutDisplay
                type={entry.displayType as DisplayType}
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
