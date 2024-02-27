import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Grid from "./GridComponents/grid";
import ChessboardContext from "./contexts/chessboard-context";
import { useContext, useState } from "react";
import { BlackBishop, BlackKing, BlackKnight, BlackPawn, BlackQueen, BlackRook, WhiteBishop, WhiteKing, WhiteKnight, WhitePawn, WhiteQueen, WhiteRook } from "./pieces/pieces";

const App = () => {
    let [gridMatrix, setGridMatrix] = useState([
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ]);

    for (let i = 0; i < 8; i++) {
        gridMatrix[1][i] = <BlackPawn/>
    }
    gridMatrix[0][0] = gridMatrix[0][7] = <BlackRook/>
    gridMatrix[0][1] = gridMatrix[0][6] = <BlackKnight/>
    gridMatrix[0][2] = gridMatrix[0][5] = <BlackBishop/>
    gridMatrix[0][3] = <BlackKing/>
    gridMatrix[0][4] = <BlackQueen/>
    
    for (let i = 0; i < 8; i++) {
        gridMatrix[6][i] = <WhitePawn/>
    }
    gridMatrix[7][0] = gridMatrix[7][7] = <WhiteRook></WhiteRook>
    gridMatrix[7][1] = gridMatrix[7][6] = <WhiteKnight></WhiteKnight>
    gridMatrix[7][2] = gridMatrix[7][5] = <WhiteBishop></WhiteBishop>
    gridMatrix[7][3] = <WhiteKing></WhiteKing>
    gridMatrix[7][4] = <WhiteQueen></WhiteQueen>

    return (
        <>
            <div className="main-container">
                <ChessboardContext.Provider value={gridMatrix}>
                    <div className="ch-chessboard">
                            <Grid matrix={gridMatrix} />
                    </div>
                </ChessboardContext.Provider>
            </div>
        </>
    );
};

export default App;
