import "bootstrap/dist/css/bootstrap.min.css"
import "./grid.css"
import ChessboardContext from "../contexts/chessboard-context";
import { useContext, useState } from "react";
import { findValidMoves } from "../pieces/pieces-logics";


const Grid = ({ matrix }) => {
    let [selectedCell, setSelectedCell] = useState([false, 1, 1]);

    let [isAnyCellSelected, selectedRow, selectedCol] = selectedCell;

    let gridMatrix =  useContext(ChessboardContext)

    
    let [validMoves, setValidMoves] = useState({
        "11": true,
        "44": true
    })


    let onClickCell = (event) => {

        let s = event.target.className.split(" ")[0];

        if(isAnyCellSelected) {
            isAnyCellSelected = false;

            let previousRow = selectedRow;
            let previousCol = selectedCol;
            
            selectedRow = s[0];
            selectedCol = s[1];
            
            if(validMoves[`${selectedRow}${selectedCol}`]) {
                gridMatrix[selectedRow][selectedCol] = gridMatrix[previousRow][previousCol];
                gridMatrix[previousRow][previousCol] = null;
            }
        }
        else {
            isAnyCellSelected = true;
            selectedRow = s[0];
            selectedCol = s[1];
            if(!gridMatrix[selectedRow][selectedCol]) isAnyCellSelected = false;
            else {
                let validMoves =  findValidMoves["whitePawn"](`${selectedRow}${selectedCol}`)
                setValidMoves(validMoves);
            }
        }

        setSelectedCell(()=>{
            return [isAnyCellSelected, selectedRow, selectedCol];
        });
    }

    return (
        <>
            {matrix.map((row, r) => (
                <div key={r} className="grid-row">
                    {row.map((item, c) => (
                        <div key={c} onClick={onClickCell} className={`${r}${c} grid-column casper-cell 
                            ${isAnyCellSelected && r == selectedRow && c == selectedCol ? "active":""}
                            ${isAnyCellSelected && validMoves[`${r}${c}`] ? "valid":""}
                            ${(r + c) % 2 == 0 ? "black":"white"}`}>
                            {item}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default Grid;
