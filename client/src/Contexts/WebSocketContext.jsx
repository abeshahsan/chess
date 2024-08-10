import React, { useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

// Create the WebSocket context
export const WebSocketContext = React.createContext({
    socket: null,
    setSocket: () => {},
});

export function WebSocketContextProvider({ children }) {
    const [socket, setSocket] = useState(null);

    const { user } = useUserContext();

    useEffect(() => {
        setSocket(() => {
            if (!user._id) return null;

            const ws = new WebSocket("ws://localhost:3000?userID=" + user._id);

            ws.onopen = () => {
                ws.send(
                    JSON.stringify({
                        type: "register-user",
                        data: {
                            user: user,
                        },
                    })
                );
            };

            ws.onclose = () => {
                console.log("Client disconnected");
                setSocket(null);
            };

            return ws;
        });
    }, [user._id]);

    return <WebSocketContext.Provider value={{ socket, setSocket }}>{children}</WebSocketContext.Provider>;
}
