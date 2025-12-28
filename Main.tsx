import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import App from './App'
import './style/Main.scss'




ReactDOM.createRoot(document.getElementById('root')!).render(
 <React.StrictMode> 
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  </React.StrictMode>
)
