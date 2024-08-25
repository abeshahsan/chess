import "bootstrap/dist/css/bootstrap.min.css";
import "./Grid.css";
import { useRef, useState } from "react";
import { checkForCheck, checkForCheckMate, findValidMoves } from "../../GameLogics/Pieces/PieceLogics";

const Grid = ({ gridMatrix, setGridMatrix }) => {
    let [selectedCell, setSelectedCell] = useState([false, 1, 1]);
    let [validMoves, setValidMoves] = useState({});
    let flyingCarpetRef = useRef(null);
    let [movingPiece] = useState(null);

    const handleCellClick = (row, col) => {
        const cellHasPiece = gridMatrix[row][col];
        if (selectedCell[0]) {
            // Handle piece movement
            if (validMoves[`${row}${col}`]) {
                const newGridMatrix = [...gridMatrix];
                newGridMatrix[row][col] = newGridMatrix[selectedCell[1]][selectedCell[2]];
                newGridMatrix[selectedCell[1]][selectedCell[2]] = null;
                newGridMatrix[row][col].row = row;
                newGridMatrix[row][col].col = col;
                setGridMatrix(newGridMatrix);
            }
            // Clear the selection
            setSelectedCell([false, 1, 1]);
            setValidMoves({});
        } else if (cellHasPiece) {
            // Select the piece and calculate valid moves
            const pieceLogic = gridMatrix[row][col].pieceLogic;
            const validMoves = findValidMoves[pieceLogic](gridMatrix, row, col);
            setSelectedCell([true, row, col]);
            setValidMoves(validMoves);
        }
    };

    const onClickCell = (event) => {
        const cellClass = event.target.className.split(" ")[0];
        const row = parseInt(cellClass[0]);
        const col = parseInt(cellClass[1]);
        handleCellClick(row, col);
    };

    return (
        <>
            {gridMatrix.map((row, r) => (
                <div key={r} className="grid-row">
                    {row.map((item, c) => (
                        <div
                            key={c}
                            onClick={onClickCell}
                            className={`${r}${c} grid-column casper-cell
                                ${selectedCell[0] && r === selectedCell[1] && c === selectedCell[2] ? "active" : ""}
                                ${selectedCell[0] && validMoves[`${r}${c}`] ? "valid" : ""}
                                ${(r + c) % 2 === 0 ? "black" : "white"}`}
                        >
                            {item && item.pieceComponent}
                        </div>
                    ))}
                </div>
            ))}
            <div
                id="piece-flying-carpet"
                ref={flyingCarpetRef}
                className="grid-column casper-cell bg-success"
                style={{
                    position: "absolute",
                    pointerEvents: "none",
                }}
            >
                {movingPiece && movingPiece.pieceComponent}
            </div>
        </>
    );
};

export default Grid;