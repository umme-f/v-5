import React from 'react';
import ReactDOM from 'react-dom';
import { LanguageProvider } from './LanguageContext';
import App from './App';

ReactDOM.render(
  <LanguageProvider>
    <App />
  </LanguageProvider>,
  document.getElementById('root')
);
