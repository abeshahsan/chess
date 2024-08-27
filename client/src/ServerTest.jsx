import { useEffect } from "react";
import { useWebsocketContext } from "./Contexts/WebSocketContext";

export default function ServerTest() {
    const { socket: ws, subscribe } = useWebsocketContext();
    let unsub = () => {};

    useEffect(() => {
        const handleOpen = () => {
            console.log("Sending message");

            unsub = subscribe("start-match", (data) => {
                console.log("Received start-match message: ", data);
            });

            ws.send(
                JSON.stringify({
                    type: "start-match",
                    data: {
                        gameCode: "1234",
                        player1: "player1",
                        player2: "player2",
                    },
                })
            );
        };

        if (ws) {
            ws.addEventListener("open", handleOpen);
        }

        return () => {
            if (ws) {
                ws.removeEventListener("open", handleOpen);
            }
            unsub();
        };
    }, [ws]);

    return <div>Test you server</div>;
}
