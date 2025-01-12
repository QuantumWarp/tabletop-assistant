import {  Layout } from '@tabletop-assistant/common';
import { useElementWidth } from '../../helpers/hooks/use-element-width';
import { LayoutContainerEntry } from './LayoutContainerEntry';
import { Box } from '@mui/material';

interface LayoutContainerProps {
  layout: Layout,
}

export function LayoutContainer({ layout }: LayoutContainerProps) {
  const { elementRef, width } = useElementWidth();

  return (
    <Box ref={elementRef} sx={{
      position: "relative",
      flex: 1,
      maxWidth: "1200px",
      height: "100%",
      backgroundColor: "white",
    }}>
      {width !== 0 && layout.entries.map((entry) => (
        <LayoutContainerEntry
          key={entry.entityId}
          entry={entry}
          containerWidth={width}
        />
      ))}
    </Box>
  );
};
