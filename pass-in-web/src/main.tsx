import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import './index.css'

// Componentes e propriedades
// Componentes -> Funções que retornam html
// Propriedades -> Atributos do html

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
