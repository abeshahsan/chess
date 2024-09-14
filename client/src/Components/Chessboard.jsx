import { GridMatrixContextProvider, PiecesInfoContextProvider } from "../Contexts/ChessboardContext";

export default function Chessboard({ match }) {
    return (
        <>
            <div className="container game-container">
                <PiecesInfoContextProvider>
                    <GridMatrixContextProvider match={match} />
                </PiecesInfoContextProvider>
            </div>
        </>
    );
}
