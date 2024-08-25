import { useContext, useEffect, useState } from "react";
import Chessboard from "../Components/Chessboard";
import { Header } from "../Components/Header/Header";
import { Sidebar } from "../Components/Sidebar";
import { FlagsContext } from "../Contexts/FlagsContext";
import { useUserContext } from "../Contexts/UserContext";
import NewGameModal from "./HomePage/NewGameModal";
import { useWebsocketContext } from "../Contexts/WebSocketContext";

export default function Game() {
    const [gameModalOpen, setGameModalOpen] = useState(true);

    const { socket: ws, subscribe } = useWebsocketContext();

    const [gameCode, setGameCode] = useState("");

    const { user } = useUserContext();

    useEffect(() => {
        const abortController = new AbortController();
        const { signal } = abortController;

        async function fetchGameLink() {
            if (user?._id) {
                const data = await fetch(`/api/new-game-link/${user._id}`, { signal }).then((res) => res.json());

                setGameCode(data.link);

                return () => {
                    abortController.abort();
                };
            }
        }

        fetchGameLink();
    }, [user?._id]);

    return (
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
    );
}
