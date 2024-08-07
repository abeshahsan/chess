import "bootstrap/dist/css/bootstrap.min.css"
import "./Grid.css"
import { useRef, useState } from "react";
import { checkForCheck, checkForCheckMate, findValidMoves } from "../../GameLogics/Pieces/PieceLogics";


import PropTypes from 'prop-types';

const Grid = ({ gridMatrix}) => {
    Grid.propTypes = {
        gridMatrix: PropTypes.arrayOf(
            PropTypes.arrayOf(
                PropTypes.shape({
                    alive: PropTypes.bool,
                    pieceLogic: PropTypes.string,
                    pieceComponent: PropTypes.element,
                    row: PropTypes.number,
                    col: PropTypes.number,
                })
            )
        ).isRequired,
        setGridMatrix: PropTypes.func.isRequired,
    };
    let [selectedCell, setSelectedCell] = useState([false, 1, 1]);

    let [isAnyCellSelected, selectedRow, selectedCol] = selectedCell;

    let [validMoves, setValidMoves] = useState({})

    // let moveFromPosition = useRef({
    //     row: null,
    //     col: null,
    // });
    // let moveToPosition = useRef({
    //     row: null,
    //     col: null,
    // });

    let flyingCarpetRef = useRef(null);

    let [movingPiece] = useState(null);

    // const updateGridMatrix = (row, col, piece) => {
    //     let newGridMatrix = [...gridMatrix];
    //     newGridMatrix[row][col] = piece
    //     setGridMatrix(newGridMatrix);
    // };

    let onClickCell = (event) => {
        let s = event.target.className.split(" ")[0];

        // const rect = event.target.getBoundingClientRect();


        if (isAnyCellSelected) {
            isAnyCellSelected = false;

            let previousRow = selectedRow;
            let previousCol = selectedCol;

            selectedRow = parseInt(s[0]);
            selectedCol = parseInt(s[1]);

            if (validMoves[`${selectedRow}${selectedCol}`]) {

                if (gridMatrix[selectedRow][selectedCol]) {
                    gridMatrix[selectedRow][selectedCol].alive = false;
                }

                gridMatrix[selectedRow][selectedCol] = gridMatrix[previousRow][previousCol];
                gridMatrix[previousRow][previousCol] = null;
                gridMatrix[selectedRow][selectedCol].row = selectedRow;
                gridMatrix[selectedRow][selectedCol].col = selectedCol;

                console.log(`White: ${checkForCheck(gridMatrix, "white")}`)
                console.log(`Black: ${checkForCheck(gridMatrix, "black")}`)


                console.log(`White in checkmate: ${checkForCheckMate(gridMatrix, "white")}`)
                console.log(`Black in checkmate: ${checkForCheckMate(gridMatrix, "black")}`)

            }
        }
        else {
            isAnyCellSelected = true;
            selectedRow = parseInt(s[0]);
            selectedCol = parseInt(s[1]);
            if (!gridMatrix[selectedRow][selectedCol]) isAnyCellSelected = false;
            else {
                let pieceLogic = gridMatrix[selectedRow][selectedCol].pieceLogic;
                let validMoves = findValidMoves[pieceLogic](gridMatrix, selectedRow, selectedCol);
                setValidMoves(validMoves);
            }
        }

        setSelectedCell([isAnyCellSelected, selectedRow, selectedCol]);
    }

    return (
        <>
            {gridMatrix.map((row, r) => (
                <div key={r} className="grid-row">
                    {row.map((item, c) => (
                        <div key={c} onClick={onClickCell} className={`${r}${c} grid-column casper-cell
                        ${isAnyCellSelected && r == selectedRow && c == selectedCol ? "active" : ""}
                        ${isAnyCellSelected && validMoves[`${r}${c}`] ? "valid" : ""}
                        ${(r + c) % 2 == 0 ? "black" : "white"}`}>
                            {item && item.pieceComponent}
                        </div>
                    ))}
                </div>
            ))}
            <div id="piece-flying-carpet" ref={flyingCarpetRef} className="grid-column casper-cell bg-success"
                style={{
                    position: "absolute",
                    pointerEvents: "none",
                    // backgroundColor: "transparent",
                }}>
                {movingPiece && movingPiece.pieceComponent}
            </div>
        </>
    );
};

export default Grid;
