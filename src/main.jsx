import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import VeterinariaApp from './App.jsx'

// ⭐️ Importamos el BrowserRouter
import { BrowserRouter } from 'react-router-dom'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ⭐️ Envolvemos la App para que pueda usar el Router */}
    <BrowserRouter>
      <VeterinariaApp />
    </BrowserRouter>
  </React.StrictMode>,
);