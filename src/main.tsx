import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/Auth/Auth.provider";
import ShoppingProvider from './context/Shopping/Shopping.provider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ShoppingProvider>
          <App />
        </ShoppingProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
