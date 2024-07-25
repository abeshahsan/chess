import { GridMatrixContextProvider, PiecesInfoContextProvider } from "./store/chessboard-context";

export default function ChessboardComponent() {
    return (
        <>
            <div className="container game-container">
                <PiecesInfoContextProvider>
                    <GridMatrixContextProvider>
                    </GridMatrixContextProvider>
                </PiecesInfoContextProvider>
            </div>
        </>
    );
}