import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import {App} from './app';

import './styles/global-styles.scss';
import './styles/colors.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
