import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './tailwind.css'
import { ColumnsProvider } from '../context/columns.jsx'

ReactDOM.createRoot(document.getElementById('app')).render(
  <ColumnsProvider>
    <App />
  </ColumnsProvider>
)
