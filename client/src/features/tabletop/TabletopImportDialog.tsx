import { useRef, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useAppDispatch } from '../../store/store';
import { ExportConfig } from '@tabletop-assistant/common';
import { useCreateEntityMutation, useCreateHistoryEntryMutation, useCreateLayoutMutation, useCreateNoteMutation, useCreateTabletopMutation, useCreateValueMapMutation } from '../../store/api';
import dnd from '@tabletop-assistant/templates/src/collections/dnd';

interface ConfigImportDialogProps {
  open: boolean;
  onClose: () => void;
}

const TabletopImportDialog = ({ open, onClose }: ConfigImportDialogProps) => {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const inputRef = useRef<HTMLInputElement>(null);

  const [createTabletop, { isLoading: createTabletopLoading }] = useCreateTabletopMutation();
  const [createNote, { isLoading: createNoteLoading }] = useCreateNoteMutation();
  const [createHistoryEntry, { isLoading: createHistoryEntryLoading }] = useCreateHistoryEntryMutation();
  const [createEntity, { isLoading: createEntityLoading }] = useCreateEntityMutation();
  const [createValueMap, { isLoading: createValueMapLoading }] = useCreateValueMapMutation();
  const [createLayout, { isLoading: createLayoutLoading }] = useCreateLayoutMutation();

  const importTabletop = async (text: string) => {
    const data: ExportConfig = JSON.parse(text);

    const tabletop = data.info;
    delete tabletop.image;
    const { data: tabletopId } = await createTabletop(data.info);

    for (const note of data.notes) {
      delete note.image;
      note.name = note.title;
      note.description = note.text;
      note.tabletopId = tabletopId;
      await createNote(note);
    }
  
    for (const historyEntry of data.history) {
      if (!historyEntry.text) continue;
      historyEntry.name = historyEntry.title;
      historyEntry.description = historyEntry.text;
      historyEntry.createdAt = historyEntry.date;
      await createHistoryEntry(historyEntry);
    }

    for (const entity of dnd.entities) {
      await createEntity(entity);
    }
    
    for (const layout of dnd.layouts) {
      await createLayout(layout);
    }

    onClose();

  //   const newConfig: Configuration = {
  //     ...defaultConfiguration(),
  //     ...parsedConfig,
  //     id: guid(),
  //   };
  //   dispatch(upsertConfig(newConfig));
  //   onClose();
  };

  const importConfig = () => {
    if (!selectedFile) return;
    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile, 'UTF-8');
    fileReader.onload = (event) => {
      const text = event.target?.result;
      if (!text) return;
      importTabletop(text.toString());
    };
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>
        Import
      </DialogTitle>

      <DialogContent>
        <input
          ref={inputRef}
          style={{ display: 'none' }}
          type="file"
          onChange={(event) => setSelectedFile(event.target.files && event.target.files[0])}
        />

        <Button variant="outlined" onClick={() => inputRef.current?.click()}>
          Choose File
        </Button>

        {selectedFile && selectedFile.name}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onClose()} variant="outlined">
          Cancel
        </Button>

        <Button disabled={!selectedFile} onClick={importConfig} variant="outlined">
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TabletopImportDialog;
