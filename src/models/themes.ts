import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    custom: {
      action: {
        border: React.CSSProperties['color'],
        background: React.CSSProperties['color'],
      },
      layout: {
        border: React.CSSProperties['color'],
        background: React.CSSProperties['color'],
      },
      dot: {
        border: React.CSSProperties['color'],
        background: React.CSSProperties['color'],
      },
    };
  }
}

const dark = createTheme({
  palette: {
    mode: 'dark',
    custom: {
      action: {
        border: '#696969',
        background: '#1e1e1e',
      },
      layout: {
        border: '#696969',
        background: '#1e1e1e',
      },
      dot: {
        border: '#f8f8f8',
        background: '#f8f8f8',
      },
    },
  },
});

const light = createTheme({
  palette: {
    mode: 'light',
    custom: {
      action: {
        border: '#d3d3d3',
        background: '#f8f8f8',
      },
      layout: {
        border: '#d3d3d3',
        background: '#f8f8f8',
      },
      dot: {
        border: '#202020',
        background: '#202020',
      },
    },
  },
});

export {
  dark,
  light,
};
