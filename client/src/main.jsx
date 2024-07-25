import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import UserContextProvider from './store/user-context.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    </UserContextProvider>
)
