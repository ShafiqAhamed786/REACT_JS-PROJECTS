import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import "./Index.css"
import { UserCard } from './UserCard.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <UserCard/>
  </React.StrictMode>,
)
