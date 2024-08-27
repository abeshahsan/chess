import { useEffect, useRef, useState } from "react";
import Chessboard from "../Components/Chessboard";
import { Header } from "../Components/Header/Header";
import { Sidebar } from "../Components/Sidebar";
import { useUserContext } from "../Contexts/UserContext";
import NewGameModal from "./HomePage/NewGameModal";
import { useWebsocketContext } from "../Contexts/WebSocketContext";
import { Navigate, useParams } from "react-router-dom";
import PageLoading from "../Components/ErrorsAndPlaceHolders/PageLoading";
import { useSelector } from "react-redux";
import { setNavigatedProgrammatically } from "../.redux/features/navigation/NavigationSlice.js";

export default function Game() {
    const [gameModalOpen, setGameModalOpen] = useState(true);

    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);

    const { user } = useUserContext();
    const { socket: ws, subscribe } = useWebsocketContext();
    let { gameID: gameCode } = useParams();
    const subscriptions = useRef([]);

    const { isNavigatedProgrammatically } = useSelector((state) => state.navigation);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (isNavigatedProgrammatically) {
            setPlayer1(user);
            console.log("waiting for player 2 to join");
            if (ws && ws.readyState === ws.OPEN) {
                subscriptions.current.push(
                    subscribe("join-game", (msg) => {
                        console.log("Player 2 joined the game", msg.data);
                        setPlayer2(msg.data.invitee);
                    })
                );
            }
        } else {
            // This player is the invitee
            if (ws && ws.readyState === ws.OPEN) {
                subscriptions.current.push(
                    subscribe("join-game", (msg) => {
                        console.log("join-game", msg.data);
                        setPlayer1(msg.data.host);
                        setPlayer2(msg.data.invitee);
                    })
                );

                ws.send(
                    JSON.stringify({
                        type: "join-game",
                        data: { gameCode: gameCode },
                    })
                );
            }
        }

        return () => {
            subscriptions.current.forEach((unsubscribe) => {
                unsubscribe();
            });
            abortController.abort();
        };
    }, [ws?.readyState]);

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
                        player1={player1}
                        player2={player2}
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
