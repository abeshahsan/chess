import { useContext } from "react";
import { OccupiedBlockedCells } from "../contexts/chessboard-context";

export const findValidMoves = {
    "whitePawn": (gridMatrix, currentRow, currentCol, occupiedBlockedCells) => {
        let moveR = [-1, -1, -1];
        let moveC = [ 0, -1,  1];

        let validMoves = {};
        for(let i = 0; i < moveR.length; i++) {
            let validRow = currentRow + moveR[i];
            let validCol = currentCol + moveC[i];
            
            if(validRow < 0 || validRow >= 8 || validCol < 0 || validCol >= 8) {
                continue;
            }
            
            if(i == 0) {
                if(!gridMatrix[validRow][validCol]) {
                    console.log("lol");
                    validMoves[`${validRow}${validCol}`] = true;
                }
            } 
            else if(gridMatrix[validRow][validCol] && gridMatrix[validRow][validCol].pieceType != gridMatrix[currentRow][currentCol].pieceType) {
                validMoves[`${validRow}${validCol}`] = true;
            }
        }

        return validMoves;
    },

    "blackPawn": (gridMatrix, currentRow, currentCol, occupiedBlockedCells) => {
        let moveR = [1,  1,  1];
        let moveC = [0, -1,  1];

        let validMoves = {};
        for(let i = 0; i < moveR.length; i++) {
            let validRow = currentRow + moveR[i];
            let validCol = currentCol + moveC[i];

            if(validRow < 0 || validRow >= 8 || validCol < 0 || validCol >= 8) {
                continue;
            }
            
            if(i == 0) {
                if(!gridMatrix[validRow][validCol]) {
                    validMoves[`${validRow}${validCol}`] = true;
                }
            } 
            else if(gridMatrix[validRow][validCol] && gridMatrix[validRow][validCol].pieceType != gridMatrix[currentRow][currentCol].pieceType) {
                validMoves[`${validRow}${validCol}`] = true;
            }
        }

        return validMoves;
    },

    "knight": (gridMatrix, currentRow, currentCol, occupiedBlockedCells) => {
        let moveR = [-2, -2, 2,  2, -1, -1,  1, 1];
        let moveC = [ 1, -1, 1, -1, -2,  2, -2, 2];
        
        let validMoves = {};
        
        for(let i = 0; i < moveR.length; i++) {
            let validRow = currentRow + moveR[i];
            let validCol = currentCol + moveC[i];

            if(validRow < 0 || validRow >= 8 || validCol < 0 || validCol >= 8) {
                continue;
            }

            if(gridMatrix[validRow][validCol]) {
                let pieceType = gridMatrix[validRow][validCol].pieceType;
                if(pieceType != gridMatrix[currentRow][currentCol].pieceType) {
                    validMoves[`${validRow}${validCol}`] = true;
                }
            } 
            else {
                validMoves[`${validRow}${validCol}`] = true;
            }
        }

        return validMoves;
    },

    "king": (gridMatrix, currentRow, currentCol, occupiedBlockedCells) => {
        let moveR = [-1, -1, -1,  1, 1, 1,  0, 0]
        let moveC = [-1,  1,  0, -1, 1, 0, -1, 1]
        
        let validMoves = {}
        
        for(let i = 0; i < moveR.length; i++) {
            let validRow = currentRow + moveR[i];
            let validCol = currentCol + moveC[i];

            if(validRow < 0 || validRow >= 8 || validCol < 0 || validCol >= 8) {
                continue;
            }
            
            let whichKing = gridMatrix[currentRow][currentCol].pieceType
            
            if(whichKing == "white" && occupiedBlockedCells[validRow][validCol].blocked["black"]) {
                continue;
            }
            else if(whichKing == "black" && occupiedBlockedCells[validRow][validCol].blocked["white"]) {
                continue;
            }

            if(gridMatrix[validRow][validCol]) {
                let pieceType = gridMatrix[validRow][validCol].pieceType;
                if(pieceType != gridMatrix[currentRow][currentCol].pieceType) {
                    validMoves[`${validRow}${validCol}`] = true;
                }
            } 
            else {
                validMoves[`${validRow}${validCol}`] = true;
            }
        }

        return validMoves;
    },

    "bishop": (gridMatrix, currentRow, currentCol, occupiedBlockedCells) => {
        let moveR = [-1, -1,  1,  1]
        let moveC = [-1,  1, -1,  1]
        
        let validMoves = {}
        
        for(let i = 0; i < moveR.length; i++) {
            let counter = 1;
            while(true) {
                let validRow = currentRow + counter * moveR[i];
                let validCol = currentCol + counter * moveC[i];

                if(validRow < 0 || validRow >= 8 || validCol < 0 || validCol >= 8) {
                    break;
                }

                if(gridMatrix[validRow][validCol]) {
                    let pieceType = gridMatrix[validRow][validCol].pieceType;
                    if(pieceType != gridMatrix[currentRow][currentCol].pieceType) {
                        validMoves[`${validRow}${validCol}`] = true;
                    }
                    break;
                } 
                else {
                    validMoves[`${validRow}${validCol}`] = true;
                }
                counter++;
            }
        }

        return validMoves;
    },

    "queen": (gridMatrix, currentRow, currentCol, occupiedBlockedCells) => {
        let moveR = [-1, -1,  -1,  1,  1, 1,  0, 0]
        let moveC = [-1,  1,   0, -1,  1, 0, -1, 1]
        
        let validMoves = {}

        for(let i = 0; i < moveR.length; i++) {
            let counter = 1;
            while(true) {
                let validRow = currentRow + counter * moveR[i];
                let validCol = currentCol + counter * moveC[i];

                if(validRow < 0 || validRow >= 8 || validCol < 0 || validCol >= 8) {
                    break;
                }

                if(gridMatrix[validRow][validCol]) {
                    let pieceType = gridMatrix[validRow][validCol].pieceType;
                    if(pieceType != gridMatrix[currentRow][currentCol].pieceType) {
                        validMoves[`${validRow}${validCol}`] = true;
                    }
                    break;
                } 
                else {
                    validMoves[`${validRow}${validCol}`] = true;
                }
                counter++;
            }
        }

        return validMoves;
    },

    "rook": (gridMatrix, currentRow, currentCol, occupiedBlockedCells) => {
        let moveR = [-1, 1,  0, 0]
        let moveC = [ 0, 0, -1, 1]
        
        let validMoves = {}

        for(let i = 0; i < moveR.length; i++) {
            let counter = 1;
            while(true) {
                let validRow = currentRow + counter * moveR[i];
                let validCol = currentCol + counter * moveC[i];

                if(validRow < 0 || validRow >= 8 || validCol < 0 || validCol >= 8) {
                    break;
                }

                if(gridMatrix[validRow][validCol]) {
                    let pieceType = gridMatrix[validRow][validCol].pieceType;
                    if(pieceType != gridMatrix[currentRow][currentCol].pieceType) {
                        validMoves[`${validRow}${validCol}`] = true;
                    }
                    break;
                } 
                else {
                    validMoves[`${validRow}${validCol}`] = true;
                }
                counter++;
            }
        }

        return validMoves;
    },
}

export let updateOccupiedCells = (occupiedBlockedCells, gridMatrix) => {
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            occupiedBlockedCells[i][j] = {
                occupied: null,
                blocked: {},
            }
        }
    }

    let whiteKingRow, whiteKingCol, blackKingRow, blackKingCol;

    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            if(gridMatrix[i][j]) {
                occupiedBlockedCells[i][j].occupied = gridMatrix[i][j].pieceType;

                let piece = gridMatrix[i][j];
                
                if(piece.pieceLogic == "king") {
                    if(piece.pieceType == "white") {
                        whiteKingRow = i, whiteKingCol = j;
                    }
                    else {
                        blackKingRow = i, blackKingCol = j;
                    }
                }
                
                let valiedMoves = findValidMoves[piece.pieceLogic](gridMatrix, i, j, occupiedBlockedCells);

                for(let key in valiedMoves) {
                    occupiedBlockedCells[`${key[0]}`][`${key[1]}`].blocked[`${piece.pieceType}`] = true;
                }

            } else {
                occupiedBlockedCells[i][j].occupied = null;
            }
        }
    }

    let valiedMoves = findValidMoves["king"](gridMatrix, whiteKingRow, whiteKingCol, occupiedBlockedCells);
    for(let key in valiedMoves) {
        occupiedBlockedCells[`${key[0]}`][`${key[1]}`].blocked["white"] = true;
    }
    valiedMoves = findValidMoves["king"](gridMatrix, blackKingRow, blackKingCol, occupiedBlockedCells);
    for(let key in valiedMoves) {
        occupiedBlockedCells[`${key[0]}`][`${key[1]}`].blocked["black"] = true;
    }

}
