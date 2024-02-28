export const findValidMoves = {
    "whitePawn": function whitePawn(currentCell) {
        let currentRow = currentCell[0];
        let currentCol = currentCell[1];

        let validRow = currentRow - 1;
        let validCol = currentCol;

        let validMoves = {
            [`${validRow}${validCol}`]: true
        }

        return validMoves;
    }
}