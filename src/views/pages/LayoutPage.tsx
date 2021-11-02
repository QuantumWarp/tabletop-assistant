import React from 'react';
import {
  Tabs,
  Tab,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectCurrentLayout, selectLayouts, setLayoutId } from '../../store/config-slice';
import LayoutContainer from '../../components/layout/LayoutContainer';
import TopBar from '../../components/common/TopBar';
import './LayoutPage.css';

const LayoutPage = () => {
  const dispatch = useAppDispatch();
  const layouts = useAppSelector(selectLayouts);
  const currentLayout = useAppSelector(selectCurrentLayout);

  return (
    <div className="layout-page">
      <TopBar title="Layout">
        <Tabs
          value={currentLayout?.id}
          onChange={(_e, val) => dispatch(setLayoutId(val))}
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
      </TopBar>

      <div className="layout-content">
        {currentLayout && <LayoutContainer layout={currentLayout} />}
      </div>
    </div>
  );
};

export default LayoutPage;
