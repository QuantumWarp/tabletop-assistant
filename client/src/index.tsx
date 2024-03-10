import React from 'react';
import { Provider } from 'react-redux';
import { MsalProvider } from '@azure/msal-react';

import App from './App';
import store from './store/store';
import { msalInstance } from './store/api';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
        <App />
      </Provider>
    </MsalProvider>
  </React.StrictMode>
);
