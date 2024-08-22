import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UserContextProvider from "./Contexts/UserContext.jsx";
import FlagsContextProvider from "./Contexts/FlagsContext.jsx";
import { WebSocketContextProvider } from "./Contexts/WebSocketContext.jsx";

import { Provider } from "react-redux";
import store from "./.redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <UserContextProvider>
                <WebSocketContextProvider>
                    <FlagsContextProvider>
                        <App />
                    </FlagsContextProvider>
                </WebSocketContextProvider>
            </UserContextProvider>
        </Provider>
    </React.StrictMode>
);
