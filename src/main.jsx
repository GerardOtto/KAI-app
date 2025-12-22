import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import "./styles/variables.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/navbar.css";
import "./styles/selector.css";
import "./styles/table.css";
import "./styles/placeholders.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
