import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
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
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </MsalProvider>
  </React.StrictMode>
);
