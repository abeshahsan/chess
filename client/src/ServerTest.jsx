import { useEffect } from "react";
import { useWebsocketContext } from "./Contexts/WebSocketContext";

export default function ServerTest() {
    const { socket: ws, subscribe } = useWebsocketContext();
    let unsub = () => {};

    useEffect(() => {
        const handleOpen = () => {
            console.log("Sending start-match message");

            unsub = subscribe("update-match", (data) => {
                console.log("Received start-match message: ", data);
            });

            ws.send(
                JSON.stringify({
                    type: "update-match",
                    data: {
                        gameCode: "1234",
                        updatedMatch: {
                            status: "2",
                            winner: "white",
                        },
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
