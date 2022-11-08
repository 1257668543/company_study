import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AComp, BComp } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AComp />
  </React.StrictMode>
);
