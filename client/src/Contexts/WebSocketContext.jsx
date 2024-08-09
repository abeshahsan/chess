import React, { useEffect, useState } from "react";

// Create the WebSocket context
export const WebSocketContext = React.createContext(null);

export function WebSocketContextProvider({ children }) {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(() => {
            return new WebSocket("ws://localhost:3000");
        });
    }, []);

    return <WebSocketContext.Provider value={socket}>{children}</WebSocketContext.Provider>;
}
