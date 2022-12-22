/* eslint-disable react/jsx-props-no-spreading */
import {
  Autocomplete,
  Box,
  Chip,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { CreateEntity, EntityActionTrigger, UpdateEntity } from 'tabletop-assistant-common';
import TriggerDialog from './TriggerDialog';
import ActionTreeHelper from '../helpers/action-tree.helper';
import { useGetEntitiesQuery } from '../store/api';

interface RollInputProps {
  value: EntityActionTrigger[];
  entity: UpdateEntity | CreateEntity;
  onChange: (triggers: EntityActionTrigger[]) => void;
}

const RollInput = ({
  value, entity, onChange,
}: RollInputProps) => {
  const [editTrigger, setEditTrigger] = useState<Partial<EntityActionTrigger>>();
  const { tabletopId } = useParams<{ tabletopId: string }>();
  const { data: entities } = useGetEntitiesQuery(tabletopId);

  return (
    <>
      <Autocomplete
        multiple
        freeSolo
        limitTags={2}
        value={value.sort(ActionTreeHelper.triggerCompare)}
        options={[] as EntityActionTrigger[]}
        clearIcon={false}
        renderInput={(params) => (
          <TextField {...params} label="Triggers" onClick={() => setEditTrigger({})} />
        )}
        renderTags={(triggers, getTagProps) => triggers.map((trigger, index) => (
          <Chip
            {...getTagProps({ index })}
            variant="filled"
            icon={(
              <Box display="flex" alignItems="center">
                {!trigger.manual && <Icon icon="mdi:flash-on" />}
                {trigger.sibling && <Icon icon="mdi:person" />}
              </Box>
            )}
            label={ActionTreeHelper.getTriggerString(trigger, entity, entities)}
            size="medium"
            onClick={(e) => { e.stopPropagation(); setEditTrigger(trigger); }}
            onDelete={() => onChange(value.filter((x) => x !== trigger))}
          />
        ))}
      />

      {editTrigger && (
        <TriggerDialog
          initial={editTrigger}
          entity={entity}
          open={Boolean(editTrigger)}
          onSave={(trigger) => onChange(
            value.filter((x) => x !== editTrigger)
              .concat([trigger])
              .sort((a, b) => -ActionTreeHelper.triggerCompare(a, b)),
          )}
          onDelete={() => onChange(value.filter((x) => x !== editTrigger))}
          onClose={() => setEditTrigger(undefined)}
        />
      )}
    </>
  );
};

export default RollInput;
