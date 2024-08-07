import React, { useRef, useState } from "react";
import {
    BlackBishop,
    BlackKing,
    BlackKnight,
    BlackPawn,
    BlackQueen,
    BlackRook,
    WhiteBishop,
    WhiteKing,
    WhiteKnight,
    WhitePawn,
    WhiteQueen,
    WhiteRook,
} from "../GameLogics/Pieces/Pieces";
import Grid from "../Components/GridComponents/Grid";

export const GridMatrixContext = React.createContext([]);

export const PiecesInfoContext = React.createContext({
    blackPieces: [],
    whitePieces: [],
});

export let blackPieces = [
    {
        alive: true,
        pieceComponent: <BlackKnight />,
        pieceType: "black",
        pieceLogic: "knight",
        row: 4,
        col: 1,
    },
    {
        alive: true,
        pieceComponent: <BlackKing />,
        pieceType: "black",
        pieceLogic: "king",
        row: 1,
        col: 0,
    },
];

export let whitePieces = [
    {
        alive: true,
        pieceComponent: <WhiteQueen />,
        pieceType: "white",
        pieceLogic: "queen",
        row: 3,
        col: 2,
    },
    {
        alive: true,
        pieceComponent: <WhiteBishop />,
        pieceType: "white",
        pieceLogic: "bishop",
        row: 3,
        col: 5,
    },
    {
        alive: true,
        pieceComponent: <WhiteKing />,
        pieceType: "white",
        pieceLogic: "king",
        row: 1,
        col: 3,
    },

    // {
    //     alive: true,
    //     pieceComponent: <BlackPawn/>,
    //     pieceType: "black",
    //     pieceLogic: "blackPawn",
    //     row: 1,
    //     col: 0
    // },
    // {
    //     alive: true,
    //     pieceComponent: <BlackPawn/>,
    //     pieceType: "black",
    //     pieceLogic: "blackPawn",
    //     row: 1,
    //     col: 1
    // },
    // {
    //     alive: true,
    //     pieceComponent: <BlackPawn/>,
    //     pieceType: "black",
    //     pieceLogic: "blackPawn",
    //     row: 1,
    //     col: 2
    // },
    // {
    //     alive: true,
    //     pieceComponent: <BlackPawn/>,
    //     pieceType: "black",
    //     pieceLogic: "blackPawn",
    //     row: 1,
    //     col: 3
    // },
    // {
    //     alive: true,
    //     pieceComponent: <BlackPawn/>,
    //     pieceType: "black",
    //     pieceLogic: "blackPawn",
    //     row: 1,
    //     col: 4
    // },
    // {
    //     alive: true,
    //     pieceComponent: <BlackPawn/>,
    //     pieceType: "black",
    //     pieceLogic: "blackPawn",
    //     row: 1,
    //     col: 5
    // },
    // {
    //     alive: true,
    //     pieceComponent: <BlackPawn/>,
    //     pieceType: "black",
    //     pieceLogic: "blackPawn",
    //     row: 1,
    //     col: 6
    // },
    // {
    //     alive: true,
    //     pieceComponent: <BlackPawn/>,
    //     pieceType: "black",
    //     pieceLogic: "blackPawn",
    //     row: 1,
    //     col: 7
    // },
    // {
    //     alive: true,
    //     pieceComponent: <BlackRook/>,
    //     pieceType: "black",
    //     pieceLogic: "rook",
    //     row: 0,
    //     col: 0
    // },
    // {
    //     alive: true,
    //     pieceComponent: <BlackRook/>,
    //     pieceType: "black",
    //     pieceLogic: "rook",
    //     row: 0,
    //     col: 7
    // },
    // {
    //     alive: true,
    //     pieceComponent: <BlackKnight/>,
    //     pieceType: "black",
    //     pieceLogic: "knight",
    //     row: 0,
    //     col: 1
    // },
    // {
    //     alive: true,
    //     pieceComponent: <BlackKnight/>,
    //     pieceType: "black",
    //     pieceLogic: "knight",
    //     row: 0,
    //     col: 6
    // },
    // {
    //     alive: true,
    //     pieceComponent: <BlackBishop/>,
    //     pieceType: "black",
    //     pieceLogic: "bishop",
    //     row: 0,
    //     col: 2
    // },
    // {
    //     alive: true,
    //     pieceComponent: <BlackBishop/>,
    //     pieceType: "black",
    //     pieceLogic: "bishop",
    //     row: 0,
    //     col: 5
    // },
    // {
    //     alive: true,
    //     pieceComponent: <BlackQueen/>,
    //     pieceType: "black",
    //     pieceLogic: "queen",
    //     row: 0,
    //     col: 4
    // },
    // {
    //     alive: true,
    //     pieceComponent: <BlackKing/>,
    //     pieceType: "black",
    //     pieceLogic: "king",
    //     row: 0,
    //     col: 3
    // },
    // //White Pieces
    // {
    //     alive: true,
    //     pieceComponent: <WhitePawn/>,
    //     pieceType: "white",
    //     pieceLogic: "whitePawn",
    //     row: 6,
    //     col: 0
    // },
    // {
    //     alive: true,
    //     pieceComponent: <WhitePawn/>,
    //     pieceType: "white",
    //     pieceLogic: "whitePawn",
    //     row: 6,
    //     col: 1
    // },
    // {
    //     alive: true,
    //     pieceComponent: <WhitePawn/>,
    //     pieceType: "white",
    //     pieceLogic: "whitePawn",
    //     row: 6,
    //     col: 2
    // },
    // {
    //     alive: true,
    //     pieceComponent: <WhitePawn/>,
    //     pieceType: "white",
    //     pieceLogic: "whitePawn",
    //     row: 6,
    //     col: 3
    // },
    // {
    //     alive: true,
    //     pieceComponent: <WhitePawn/>,
    //     pieceType: "white",
    //     pieceLogic: "whitePawn",
    //     row: 6,
    //     col: 4
    // },
    // {
    //     alive: true,
    //     pieceComponent: <WhitePawn/>,
    //     pieceType: "white",
    //     pieceLogic: "whitePawn",
    //     row: 6,
    //     col: 5
    // },
    // {
    //     alive: true,
    //     pieceComponent: <WhitePawn/>,
    //     pieceType: "white",
    //     pieceLogic: "whitePawn",
    //     row: 6,
    //     col: 6
    // },
    // {
    //     alive: true,
    //     pieceComponent: <WhitePawn/>,
    //     pieceType: "white",
    //     pieceLogic: "whitePawn",
    //     row: 6,
    //     col: 7
    // },
    // {
    //     alive: true,
    //     pieceComponent: <WhiteRook/>,
    //     pieceType: "white",
    //     pieceLogic: "rook",
    //     row: 7,
    //     col: 0
    // },
    // {
    //     alive: true,
    //     pieceComponent: <WhiteRook/>,
    //     pieceType: "white",
    //     pieceLogic: "rook",
    //     row: 7,
    //     col: 7
    // },
    // {
    //     alive: true,
    //     pieceComponent: <WhiteKnight/>,
    //     pieceType: "white",
    //     pieceLogic: "knight",
    //     row: 7,
    //     col: 1
    // },
    // {
    //     alive: true,
    //     pieceComponent: <WhiteKnight/>,
    //     pieceType: "white",
    //     pieceLogic: "knight",
    //     row: 7,
    //     col: 6
    // },
    // {
    //     alive: true,
    //     pieceComponent: <WhiteBishop/>,
    //     pieceType: "white",
    //     pieceLogic: "bishop",
    //     row: 7,
    //     col: 2
    // },
    // {
    //     alive: true,
    //     pieceComponent: <WhiteBishop/>,
    //     pieceType: "white",
    //     pieceLogic: "bishop",
    //     row: 7,
    //     col: 5
    // },
    // {
    //     alive: true,
    //     pieceComponent: <WhiteQueen/>,
    //     pieceType: "white",
    //     pieceLogic: "queen",
    //     row: 7,
    //     col: 4
    // },
    // {
    //     alive: true,
    //     pieceComponent: <WhiteKing/>,
    //     pieceType: "white",
    //     pieceLogic: "king",
    //     row: 7,
    //     col: 3
    // },
];

export let blackKing, whiteKing;
(() => {
    blackPieces.forEach((piece) => {
        if (piece.pieceLogic == "king") {
            blackKing = piece;
            return;
        }
    });
    whitePieces.forEach((piece) => {
        if (piece.pieceLogic == "king") {
            whiteKing = piece;
            return;
        }
    });
})();

export function PiecesInfoContextProvider({ children }) {
    return (
        <PiecesInfoContext.Provider
            value={{
                blackPieces,
                whitePieces,
            }}
        >
            {children}
        </PiecesInfoContext.Provider>
    );
}

export function GridMatrixContextProvider() {
    let [gridMatrix, setGridMatrix] = useState(new Array(8).fill().map(() => new Array(8).fill().map(() => null)));

    for (let index in whitePieces) {
        let piece = whitePieces[index];
        gridMatrix[piece.row][piece.col] = piece;
    }
    for (let index in blackPieces) {
        let piece = blackPieces[index];
        gridMatrix[piece.row][piece.col] = piece;
    }

    return (
        <GridMatrixContext.Provider
            value={{
                gridMatrix,
            }}
        >
            <div className="ch-chessboard">
                <Grid
                    gridMatrix={gridMatrix}
                    setGridMatrix={setGridMatrix}
                />
            </div>
        </GridMatrixContext.Provider>
    );
}
