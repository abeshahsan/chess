import React, { useEffect, useRef, useState } from "react";
import { useUserContext } from "./UserContext";

// Create the WebSocket context
const WebSocketContext = React.createContext({
    socket: null,
    setSocket: () => {},
    subscribe: () => {},
});

export function useWebsocketContext() {
    return React.useContext(WebSocketContext);
}

export function WebSocketContextProvider({ children }) {
    const { user } = useUserContext();
    const [socket, setSocket] = useState(null);
    const subscribers = useRef({}); // Store subscribers

    useEffect(() => {
        if (!user._id) return;

        const ws = new WebSocket("ws://localhost:3000?userID=" + user._id);

        ws.onopen = () => {
            ws.send(
                JSON.stringify({
                    type: "register-user",
                    data: { user },
                })
            );
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);

            console.log("Received message", message);


            // Notify all subscribers
            const subscriberCallbacks = subscribers.current[message.type] || [];
            subscriberCallbacks.forEach((callback) => callback(message));
        };

        ws.onclose = () => {
            console.log("Client disconnected");
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [user._id]);

    const subscribe = (type, callback) => {
        if (!subscribers.current[type]) {
            subscribers.current[type] = [];
        }
        subscribers.current[type].push(callback);

        // Return a function to unsubscribe
        return () => {
            subscribers.current[type] = subscribers.current[type].filter((cb) => cb !== callback);
        };
    };

    return <WebSocketContext.Provider value={{ socket, subscribe }}>{children}</WebSocketContext.Provider>;
}
