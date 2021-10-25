import React from 'react';
import {
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/AddCircle';
import LeftIcon from '@mui/icons-material/ArrowLeft';
import RightIcon from '@mui/icons-material/ArrowRight';
import LayoutConfigContainer from '../../components/layout-config/LayoutConfigContainer';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  deleteLayout,
  moveLayout, selectCurrentLayout, selectLayouts, setCurrentLayoutId,
} from '../../store/configuration-slice';
import TopBar from '../../components/common/TopBar';
import './LayoutConfigPage.css';

const LayoutConfigPage = () => {
  const dispatch = useAppDispatch();
  const layouts = useAppSelector(selectLayouts);
  const currentLayout = useAppSelector(selectCurrentLayout);
  const currentIndex = currentLayout && layouts?.indexOf(currentLayout);

  return (
    <div className="layout-config-page">
      <TopBar title="Layout Config">
        <div className="layout-config-controls">
          <Tabs
            value={currentLayout?.id}
            onChange={(_e, val) => dispatch(setCurrentLayoutId(val))}
            centered
          >
            {layouts?.map((layout) => (
              <Tab
                key={layout.id}
                label={layout.name}
                value={layout.id}
              />
            ))}
          </Tabs>

          {currentLayout !== undefined && currentIndex !== undefined && (
            <div className="icon-buttons">
              <IconButton
                color="primary"
                title="Move Layout Left"
                disabled={currentIndex === 0}
                onClick={() => dispatch(moveLayout(
                  { id: currentLayout.id, index: currentIndex - 1 },
                ))}
              >
                <LeftIcon />
              </IconButton>

              <IconButton
                color="primary"
                title="Move Layout Right"
                disabled={currentIndex + 1 === layouts?.length}
                onClick={() => dispatch(moveLayout(
                  { id: currentLayout.id, index: currentIndex + 1 },
                ))}
              >
                <RightIcon />
              </IconButton>

              <IconButton
                color="error"
                title="Delete Layout"
                onClick={() => dispatch(deleteLayout(currentLayout.id))}
              >
                <DeleteIcon />
              </IconButton>

              <IconButton
                color="primary"
                title="New Layout"
              >
                <AddIcon />
              </IconButton>
            </div>
          )}
        </div>
      </TopBar>

      <div className="layout-config-content">
        {currentLayout && <LayoutConfigContainer layout={currentLayout} />}
      </div>
    </div>
  );
};

export default LayoutConfigPage;
