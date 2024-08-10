import { WebSocketServer } from "ws";
import { SOCKET_MESSAGE_HANDLERS } from "./SocketMessageTypes.js";

const allGameCodes = new Map();

const createServerWebSocket = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on("connection", (ws) => {
        ws.on("message", (event) => {
            const receivedData = event;

            // Handle ArrayBuffer
            const message = new TextDecoder().decode(new Uint8Array(receivedData));

            const parsedMessage = JSON.parse(message);

            if (SOCKET_MESSAGE_HANDLERS[parsedMessage.type]) {
                SOCKET_MESSAGE_HANDLERS[parsedMessage.type]({ws, parsedMessage, allGameCodes});
            } else {
                console.log("Message type not found");
            }
        });

        ws.on("close", () => {
            console.log("Client disconnected");
        });
    });
};

export default createServerWebSocket;
