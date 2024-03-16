import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Grid from "./GridComponents/grid";
import { ChessboardContext, PiecesContext, blackPieces, whitePieces } from "./contexts/chessboard-context";
import { useRef, useState } from "react";

const App = () => {
    let [gridMatrix, setGridMatrix] = useState(new Array(8).fill().map(() => new Array(8).fill(null)));

    for(let index in whitePieces) {
        let piece = whitePieces[index];
        gridMatrix[piece.row][piece.col] = piece;
    }
    for(let index in blackPieces) {
        let piece = blackPieces[index];
        gridMatrix[piece.row][piece.col] = piece;
    }

    return (
        <>
            <div className="main-container">
                <ChessboardContext.Provider value={gridMatrix}>
                    <PiecesContext.Provider value={{}}>
                        <div className="ch-chessboard">
                            <Grid matrix={gridMatrix} />
                        </div>
                    </PiecesContext.Provider>
                </ChessboardContext.Provider>
            </div>
        </>
    );
};

export default App;
