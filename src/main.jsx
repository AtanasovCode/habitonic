import React from 'react'
import ReactDOM from 'react-dom/client'

//Importing the router
import Router from './Router';

//Importing the global styles
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*Telling react to render the <Router /> component*/}
    <Router />
  </React.StrictMode>,
)
