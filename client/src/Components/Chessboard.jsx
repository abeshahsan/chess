import { GridMatrixContextProvider, PiecesInfoContextProvider } from '../Contexts/ChessboardContext';

export default function Chessboard() {
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