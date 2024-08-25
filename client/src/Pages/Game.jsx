import { useEffect, useRef, useState } from "react";
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

    const { user } = useUserContext();
    const { socket: ws, subscribe } = useWebsocketContext();
    let { gameCode } = useParams();
    const subscriptions = useRef([]);

    const isNavigatedProgrammatically = localStorage.getItem("isNavigatedProgrammatically");

    useEffect(() => {
        if (isNavigatedProgrammatically) {
            subscriptions.current.push(
                subscribe("invite-to-game", (data) => {
                    console.log("invite-to-game", data);
                })
            );
        } else {
            if (ws && ws.readyState === ws.OPEN) {
                ws.send(
                    JSON.stringify({
                        type: "join-game",
                        data: { gameCode: gameCode },
                    })
                );
            }
            subscriptions.current.push(
                subscribe("join-game", (data) => {
                    console.log("join-game", data);
                })
            );
        }

        return () => {
            subscriptions.current.forEach((unsubscribe) => {
                unsubscribe();
            });
        };
    }, [isNavigatedProgrammatically, gameCode, subscribe, ws?.readyState]);

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
                        gameCode={"null"}
                        setGameCode={() => "null"}
                        player1={user}
                        player2={{ username: "Player 2" }}
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
