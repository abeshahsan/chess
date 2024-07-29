class Piece {
    constructor(grid, color) {
        this.grid = grid;
        this.color = color;
    }

    findValidMoves() {
        return [];
    }

    move(from, to) {
        let [fromRow, fromCol] = [from[0], from[1]];
        let [toRow, toCol] = [to[0], to[1]];

        this.grid[toRow][toCol] = this.grid[fromRow][fromCol];
        this.grid[fromRow][fromCol] = null;

        return this.grid;
    }
}
