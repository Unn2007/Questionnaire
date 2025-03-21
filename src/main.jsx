
import React from "react";
import { StrictMode } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { HelmetProvider } from "react-helmet-async";
import { createRoot } from 'react-dom/client'
import { store } from "./redux/store.js";
import "modern-normalize";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
    
        <BrowserRouter>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </BrowserRouter>
   
    </Provider>
  // </React.StrictMode>
)


