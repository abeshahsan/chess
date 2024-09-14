export function stringTo2DGrid(str = "") {
    if (!str) {
        str = "rnbqkbnrpppppppp................................PPPPPPPPRNBQKBNR";
    }

    const grid = [];
    for (let i = 0; i < 8; i++) {
        grid.push(str.slice(i * 8, i * 8 + 8).split(""));
    }
    return grid;
}
