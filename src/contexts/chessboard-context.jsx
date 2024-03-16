import React from 'react';
import { BlackBishop, BlackKing, BlackKnight, BlackPawn, BlackQueen, BlackRook, WhiteBishop, WhiteKing, WhiteKnight, WhitePawn, WhiteQueen, WhiteRook } from '../pieces/pieces';

export const ChessboardContext = React.createContext([]);

export const PiecesContext = React.createContext();

export let blackPieces = [
    {
        alive: true,
        pieceComponent: <BlackKnight/>,
        pieceType: "black",
        pieceLogic: "knight",
        row: 4,
        col: 1
    },
    {
        alive: true,
        pieceComponent: <BlackKing/>,
        pieceType: "black",
        pieceLogic: "king",
        row: 1,
        col: 0
    },
];

export let whitePieces = [
    //Black Pieces

    {
        alive: true,
        pieceComponent: <WhiteQueen/>,
        pieceType: "white",
        pieceLogic: "queen",
        row: 3,
        col: 2
    },
    {
        alive: true,
        pieceComponent: <WhiteBishop/>,
        pieceType: "white",
        pieceLogic: "bishop",
        row: 3,
        col: 5
    },
    {
        alive: true,
        pieceComponent: <WhiteKing/>,
        pieceType: "white",
        pieceLogic: "king",
        row: 6,
        col: 5
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
        if(piece.pieceLogic == "king") {
            blackKing = piece;
            return;
        }
    });
    whitePieces.forEach((piece) => {
        if(piece.pieceLogic == "king") {
            whiteKing = piece;
            return;
        }
    });
})();

