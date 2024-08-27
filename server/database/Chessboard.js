import { Error } from "mongoose";
import ChessBoard from "./models/ChessboardModel.js";

export async function CreateNewBoard() {
    try {
        const newBoard = new ChessBoard({
            boardState: "rnbqkbnrpppppppp................................PPPPPPPPRNBQKBNR",
            currentPlayer: "white",
            moveHistory: [],
        });

        const board = await newBoard.save();

        return board;
    } catch (err) {
        console.error("Failed to create new board: ", err);
        return null;
    }
}

export async function GetBoardById(boardId) {
    try {
        const board = await ChessBoard.findById(boardId);

        if (!board) {
            console.error("Board not found!");
            return null;
        }

        return board;
    } catch (err) {
        console.error("Failed to get board: ", err);
        return null;
    }
}

function CreateNewBoardState(prevBoardState, from, to) {
    const fromIndex = from.charCodeAt(0) - 97 + (8 - parseInt(from[1])) * 8;
    const toIndex = to.charCodeAt(0) - 97 + (8 - parseInt(to[1])) * 8;

    console.log(fromIndex, toIndex);

    const fromPiece = prevBoardState[fromIndex];
    const toPiece = prevBoardState[toIndex];

    if (fromPiece === ".") {
        console.error("No piece found at the from index!");
        throw new Error("No piece found at the from index!");
    }

    const newBoardState = prevBoardState
        .split("")
        .map((piece, index) => {
            if (index === fromIndex) {
                return ".";
            } else if (index === toIndex) {
                return fromPiece;
            } else {
                return piece;
            }
        })
        .join("");

    return newBoardState;
}

export async function UpdateBoard(boardId, from, to) {
    try {
        const board = await ChessBoard.findById(boardId);

        if (!board) {
            console.error("Board not found!");
            return;
        }

        const newBoardState = CreateNewBoardState(board.boardState, from, to);

        board.boardState = newBoardState;
        board.currentPlayer = board.currentPlayer === "white" ? "black" : "white";
        board.moveHistory.push({
            from,
            to,
            piece: board.boardState[to.charCodeAt(0) - 97 + (8 - parseInt(to[1])) * 8],
        });

        await board.save();
    } catch (err) {
        throw new Error("Failed to update board: ", err);
    }
}
