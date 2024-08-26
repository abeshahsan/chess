import { useEffect, useRef } from "react";
import PageLoading from "../Components/ErrorsAndPlaceHolders/PageLoading";
import { useWebsocketContext } from "../Contexts/WebSocketContext";
import { useUserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function GameCreatingNew() {
    const { socket: ws, subscribe } = useWebsocketContext();

    const { user } = useUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (ws?.readyState == 1) {
            ws.send(
                JSON.stringify({
                    type: "invite-to-game",
                    data: { userID: user?._id },
                })
            );
        }

        const unsub = subscribe("invite-to-game", (msg) => {
            navigate(`/game/${msg.data.gameCode}`, { replace: true });
        });

        return () => {
            unsub();
        };
    }, [ws?.readyState]);

    return (
        <>
            <PageLoading />
        </>
    );
}
