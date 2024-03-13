import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Grid from "./GridComponents/grid";
import { ChessboardContext, OccupiedBlockedCells } from "./contexts/chessboard-context";
import { useRef, useState } from "react";
import { BlackKing, WhiteKing, WhiteQueen } from "./pieces/pieces";

const App = () => {
    let [gridMatrix, setGridMatrix] = useState(new Array(8).fill().map(() => new Array(8).fill(null)));

    let occupiedCells = useRef(new Array(8).fill().map(() => new Array(8).
        fill({
            occupied: null,
            blocked: {}
        }
        ).map(obj => ({...obj}))
        ));

    // for (let i = 0; i < 8; i++) {
    //     gridMatrix[1][i] = {
    //         pieceComponent: <BlackPawn/>,
    //         pieceType: "black",
    //         pieceLogic: "blackPawn"
    //     }
    // }

    // gridMatrix[0][0] = gridMatrix[0][7] = {
    //     pieceComponent: <BlackRook/>,
    //     pieceType: "black",
    //     pieceLogic: "rook"
    // }
    // gridMatrix[0][1] = gridMatrix[0][6] = {
    //     pieceComponent: <BlackKnight/>,
    //     pieceType: "black",
    //     pieceLogic: "knight"
    // }
    // gridMatrix[0][2] = gridMatrix[0][5] = {
    //     pieceComponent: <BlackBishop/>,
    //     pieceType: "black",
    //     pieceLogic: "bishop"
    // }
    // gridMatrix[0][3] = {
    //     pieceComponent: <BlackKing/>,
    //     pieceType: "black",
    //     pieceLogic: "king"
    // }
    // gridMatrix[0][4] = {
    //     pieceComponent: <BlackQueen/>,
    //     pieceType: "black",
    //     pieceLogic: "queen"
    // }
   
    


    // for (let i = 0; i < 8; i++) {
    //     gridMatrix[6][i] = {
    //         pieceComponent: <WhitePawn/>,
    //         pieceType: "white",
    //         pieceLogic: "whitePawn"
    //     }
    // }
    
    // gridMatrix[7][0] = gridMatrix[7][7] = {
    //     pieceComponent: <WhiteRook/>,
    //     pieceType: "white",
    //     pieceLogic: "rook"
    // }
    // gridMatrix[7][1] = gridMatrix[7][6] = {
    //     pieceComponent: <WhiteKnight/>,
    //     pieceType: "white",
    //     pieceLogic: "knight"
    // }
    // gridMatrix[7][2] = gridMatrix[7][5] = {
    //     pieceComponent: <WhiteBishop/>,
    //     pieceType: "white",
    //     pieceLogic: "bishop"
    // }
    // gridMatrix[7][3] = {
    //     pieceComponent: <WhiteKing/>,
    //     pieceType: "white",
    //     pieceLogic: "king"
    // }
    // gridMatrix[7][4] = {
    //     pieceComponent: <WhiteQueen/>,
    //     pieceType: "white",
    //     pieceLogic: "queen"
    // }

    gridMatrix[6][1] = {
        pieceComponent: <BlackKing/>,
        ID: "11",
        pieceType: "black",
        pieceLogic: "king"
    }
    gridMatrix[4][2] = {
        ID: "01",
        pieceComponent: <WhiteQueen/>,
        pieceType: "white",
        pieceLogic: "queen"
    }
    gridMatrix[7][3] = {
        ID: "02",
        pieceComponent: <WhiteKing/>,
        pieceType: "white",
        pieceLogic: "king"
    }
    gridMatrix[7][4] = {
        ID: "03",
        pieceComponent: <WhiteQueen/>,
        pieceType: "white",
        pieceLogic: "queen"
    }

    return (
        <>
            <div className="main-container">
                <ChessboardContext.Provider value={gridMatrix}>
                    <OccupiedBlockedCells.Provider value={occupiedCells.current}>
                        <div className="ch-chessboard">
                            <Grid matrix={gridMatrix} />
                        </div>
                    </OccupiedBlockedCells.Provider>
                </ChessboardContext.Provider>
            </div>
        </>
    );
};

export default App;
