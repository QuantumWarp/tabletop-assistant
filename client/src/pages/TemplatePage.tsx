import {
  Box, Button, Container, FormControlLabel, Switch, TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Entity, TemplateGroup, Layout, TemplateRoot,
} from 'tabletop-assistant-common';
import { useTemplateRoot } from '../helpers/hooks/use-template-root';
import TopBar from '../components/TopBar';
import TemplateGroupTiles from '../features/template/TemplateGroupTiles';
import TemplateRootTiles from '../features/template/TemplateRootTiles';
import TemplateSelector from '../features/template/TemplateSelector';
import TemplateImportDialog from '../features/template/TemplateImportDialog';

const TemplatePage = () => {
  const { tabletopId } = useParams<{ tabletopId: string }>();

  const { isLoading, templateRoot: usedTemplateRoot } = useTemplateRoot();
  const [templateRoot, setTemplateRoot] = useState<TemplateRoot | undefined>(undefined);
  const templateRootId = (templateRoot || usedTemplateRoot)?._id;

  const [templateImportDialog, setTemplateImportDialog] = useState(false);
  const [showLists, setShowLists] = useState(false);
  const [filter, setFilter] = useState('');

  const [groupIds, setGroupIds] = useState<string[]>([]);
  const [layoutIds, setLayoutIds] = useState<string[]>([]);
  const [entityIds, setEntityIds] = useState<string[]>([]);

  const updateIdsList = (
    updatedIds: string[], selected: boolean, idList: string[], setIdsFunc: (ids: string[]) => void,
  ) => {
    const newIdList = selected
      ? idList.concat(...updatedIds)
      : idList.filter((x) => !updatedIds.includes(x));
    setIdsFunc(newIdList);
  };

  const groupHandler = (group: TemplateGroup, selected: boolean) => {
    updateIdsList([group._id], selected, groupIds, setGroupIds);
    updateIdsList(group.templateLayoutIds, selected, layoutIds, setLayoutIds);
    updateIdsList(group.templateEntityIds, selected, entityIds, setEntityIds);
  };

  const layoutHandler = (layout: Layout, selected: boolean) => {
    updateIdsList([layout._id], selected, layoutIds, setLayoutIds);
    // updateIdsList(layout.referencedEntityIds, selected, entityIds, setEntityIds);
  };

  const entityHandler = (entity: Entity, selected: boolean) => {
    updateIdsList([entity._id], selected, entityIds, setEntityIds);
  };

  return (
    <>
      <TopBar title="Templates">
        <TextField
          sx={{ minWidth: 400 }}
          label="Search"
          variant="standard"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <Box>
          {templateRootId && (
            <FormControlLabel
              control={(
                <Switch
                  value={showLists}
                  onChange={(e) => setShowLists(e.target.checked)}
                />
              )}
              label="Show Lists"
            />
          )}

          <Button
            variant="outlined"
            onClick={() => setTemplateImportDialog(true)}
          >
            Import
          </Button>

          {templateImportDialog && (
            <TemplateImportDialog
              templateImport={{ tabletopId, layoutIds, entityIds }}
              open={templateImportDialog}
              onClose={() => setTemplateImportDialog(false)}
            />
          )}

          <Button
            variant="outlined"
            onClick={() => setTemplateRoot(undefined)}
          >
            Clear
          </Button>
        </Box>
      </TopBar>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Container sx={{ py: 2 }} maxWidth="lg">
          {!isLoading && !templateRootId && (
            <TemplateRootTiles
              onChange={(selected) => setTemplateRoot(selected)}
            />
          )}

          {!isLoading && templateRootId && !showLists && (
            <TemplateGroupTiles
              templateRootId={templateRootId}
              onChange={groupHandler}
            />
          )}

          {!isLoading && templateRootId && showLists && (
            <TemplateSelector
              filter={filter}
              groupIds={groupIds}
              layoutIds={layoutIds}
              entityIds={entityIds}
              onGroupClick={groupHandler}
              onLayoutClick={layoutHandler}
              onEntityClick={entityHandler}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

export default TemplatePage;
