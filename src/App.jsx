import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Grid from "./GridComponents/grid";
import { GridMatrixContextProvider, PiecesInfoContextProvider, blackPieces, whitePieces } from "./contexts/chessboard-context";

const App = () => {
    let gridMatrix;
    return (
        <>
            <div className="main-container">
                <GridMatrixContextProvider>
                    <PiecesInfoContextProvider>
                    </PiecesInfoContextProvider>
                </GridMatrixContextProvider>
            </div>
        </>
    );
};

export default App;
