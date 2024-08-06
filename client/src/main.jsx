import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import UserContextProvider from './Contexts/UserContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    </UserContextProvider>
)
