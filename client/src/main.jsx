import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UserContextProvider from "./Contexts/UserContext.jsx";
import FlagsContextProvider from "./Contexts/FlagsContext.jsx";
import { WebSocketContextProvider } from "./Contexts/WebSocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <WebSocketContextProvider>
            <UserContextProvider>
                <FlagsContextProvider>
                    <App />
                </FlagsContextProvider>
            </UserContextProvider>
        </WebSocketContextProvider>
    </React.StrictMode>
);
