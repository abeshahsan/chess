import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import { GridMatrixContextProvider, PiecesInfoContextProvider, blackPieces, whitePieces } from "./contexts/chessboard-context";

const App = () => {
    return (
        <>
            <div className="main-container">
                <GridMatrixContextProvider>
                    <PiecesInfoContextProvider/>
                </GridMatrixContextProvider>
            </div>
        </>
    );
};

export default App;
