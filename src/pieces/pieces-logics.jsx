export const findValidMoves = {
    "whitePawn": (gridMatrix, currentRow, currentCol) => {
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

    "blackPawn": (gridMatrix, currentRow, currentCol) => {
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

    "knight": (gridMatrix, currentRow, currentCol) => {
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

    "king": (gridMatrix, currentRow, currentCol) => {
        let moveR = [-1, -1, -1,  1, 1, 1,  0, 0]
        let moveC = [-1,  1,  0, -1, 1, 0, -1, 1]
        
        let validMoves = {}
        
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

    "bishop": (gridMatrix, currentRow, currentCol) => {
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

    "queen": (gridMatrix, currentRow, currentCol) => {
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

    "rook": (gridMatrix, currentRow, currentCol) => {
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
