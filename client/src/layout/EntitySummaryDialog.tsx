import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { CreateEntity } from 'tabletop-assistant-common';

interface EntitySummaryDialogProps {
  entity: CreateEntity;
  fieldMappings: { [field: string]: any };
  open: boolean;
  onClose: () => void;
}

const EntitySummaryDialog = ({
  entity, fieldMappings, open, onClose,
}: EntitySummaryDialogProps) => (
  <Dialog open={open} onClose={() => onClose()} maxWidth="md" fullWidth>
    <DialogTitle>
      <Grid container>
        {entity.icon && (
          <Grid item pr={2} alignItems="center">
            <Icon width={30} icon={entity.icon} />
          </Grid>
        )}
        <b>{entity.name}</b>
      </Grid>
    </DialogTitle>

    <DialogContent>
      <Grid container spacing={2} sx={{ py: 2, height: '100%' }}>
        <Grid item xs={7}>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entity.description}
          </Typography>
        </Grid>

        <Grid item>
          <Divider orientation="vertical" />
        </Grid>

        <Grid item xs>
          {entity.fields.map((field) => {
            const value = fieldMappings[field.key] === undefined
              ? field.initial
              : fieldMappings[field.key];
            const text = field.name;
            return (
              <ListItem
                dense
                key={field.key}
              >
                <ListItemButton>
                  <ListItemText primary={text} secondary={value.toString()} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </Grid>
      </Grid>
    </DialogContent>

    <DialogActions>
      <Button onClick={() => onClose()} variant="outlined">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default EntitySummaryDialog;
