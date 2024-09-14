import { useRef, useState } from "react";
import Chessboard from "../Components/Chessboard";
import { Header } from "../Components/Header/Header";
import { Sidebar } from "../Components/Sidebar";
import NewGameModal from "./HomePage/NewGameModal";
import { Navigate } from "react-router-dom";
import PageLoading from "../Components/ErrorsAndPlaceHolders/PageLoading";

export default function Game() {
    const [gameModalOpen, setGameModalOpen] = useState(true);

    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);
    const [match, setMatch] = useState(null);

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
                        player1={player1}
                        player2={player2}
                        setPlayer1={setPlayer1}
                        setPlayer2={setPlayer2}
                        setMatch={setMatch}
                    />
                    <Header />
                    <div className="main-container d-flex align-items-center justify-content-center">
                        <Sidebar />
                        <Chessboard match={match} />
                    </div>
                </>
            )}
        </>
    );
}
