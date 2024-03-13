import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import UserStore from '../src/components/store/UserStore';

export const Context = createContext(null);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Context.Provider
      value={{
        user: new UserStore()
      }}
    >
      <App />
    </Context.Provider>
  </BrowserRouter>
);
