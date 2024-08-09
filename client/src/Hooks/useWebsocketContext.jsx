import { useContext } from "react";
import { WebSocketContext } from "../Contexts/WebSocketContext";

export function useWebsocketContext() {
    return useContext(WebSocketContext);
}
