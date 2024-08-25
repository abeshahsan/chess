import { useEffect, useState } from "react";
import Chessboard from "../Components/Chessboard";
import { Header } from "../Components/Header/Header";
import { Sidebar } from "../Components/Sidebar";
import { useUserContext } from "../Contexts/UserContext";
import NewGameModal from "./HomePage/NewGameModal";
import { useWebsocketContext } from "../Contexts/WebSocketContext";
import { Navigate, useParams } from "react-router-dom";
import PageLoading from "../Components/ErrorsAndPlaceHolders/PageLoading";

export default function Game() {
    const [gameModalOpen, setGameModalOpen] = useState(true);

    const { socket: ws, subscribe } = useWebsocketContext();

    const [gameCode, setGameCode] = useState("");

    const { user } = useUserContext();

    const { gameID } = useParams();

    useEffect(() => {
        if (!ws) return;

        ws.send(
            JSON.stringify({
                type: "match-game-code",
                data: { gameID },
            })
        );

        const unsub = subscribe(
            ("match-game-code",
            (data) => {
                console.log(data);
            })
        );

        return () => {
            unsub();
        };
    }, [ws?.readyState]);

    useEffect(() => {
        const abortController = new AbortController();
        const { signal } = abortController;

        async function fetchGameLink() {
            if (user?._id) {
                const data = await fetch(`/api/new-game-link/${user._id}`, { signal }).then((res) => res.json());

                const link = `${window.location.origin}${data.link}`;

                setGameCode(link);

                return () => {
                    abortController.abort();
                };
            }
        }

        fetchGameLink();
    }, [user?._id]);

    return (
        <>
            {false ? (
                <PageLoading />
            ) : false ? (
                <Navigate to="/" />
            ) : (
                <>
                    <NewGameModal
                        open={gameModalOpen}
                        setOpen={setGameModalOpen}
                        gameCode={gameCode}
                        setGameCode={setGameCode}
                    />
                    <Header />
                    <div className="main-container d-flex align-items-center justify-content-center">
                        <Sidebar />
                        <Chessboard />
                    </div>
                </>
            )}
        </>
    );
}
