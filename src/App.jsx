import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Grid from "./GridComponents/grid";

const App = () => {
    const gridMatrix = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ];

    for (let i = 0; i < 8; i++) {
        gridMatrix[1][i] = "Pawn-B"
    }
    gridMatrix[0][0] = gridMatrix[0][7] = "Rook-B"
    gridMatrix[0][1] = gridMatrix[0][6] = "Knight-B"
    gridMatrix[0][1] = gridMatrix[0][6] = "Bishop-B"
    gridMatrix[0][2] = gridMatrix[0][5] = "Bishop-B"
    gridMatrix[0][3] = "King-B"
    gridMatrix[0][4] = "Queen-B"
    
    for (let i = 0; i < 8; i++) {
        gridMatrix[6][i] = "Pawn-W"
    }
    gridMatrix[7][0] = gridMatrix[7][7] = "Rook-W"
    gridMatrix[7][1] = gridMatrix[7][6] = "Knight-B"
    gridMatrix[7][2] = gridMatrix[7][5] = "Bishop-W"
    gridMatrix[7][3] = "King-W"
    gridMatrix[7][4] = "Queen-W"
    
    return (
        <>
            <div className="main-container">
                <div className="ch-chessboard">
                    <Grid matrix={gridMatrix} />
                </div>
            </div>
        </>
    );
};

export default App;
