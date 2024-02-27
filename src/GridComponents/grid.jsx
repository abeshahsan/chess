import "bootstrap/dist/css/bootstrap.min.css"
import "./grid.css"
import ChessboardContext from "../contexts/chessboard-context";
import { useContext, useState } from "react";


const Grid = ({ matrix }) => {
    let [selectedCell, setSelectedCell] = useState([false, 1, 1]);

    let [isAnyCellSelected, selectedRow, selectedCol] = selectedCell;

    let gridMatrix =  useContext(ChessboardContext)

    let onClickCell = (event) => {

        let s = event.target.className.split(" ")[0];

        if(isAnyCellSelected) {
            isAnyCellSelected = false;

            let previousRow = s[0];
            let previousCol = s[1];

            let temp = gridMatrix[previousRow][previousCol];
            gridMatrix[previousRow][previousCol] = gridMatrix[selectedRow][selectedCol];
            gridMatrix[selectedRow][selectedCol] = temp;
        }
        else {
            isAnyCellSelected = true;
            selectedRow = s[0];
            selectedCol = s[1];
        }

        setSelectedCell(()=>{
            return [isAnyCellSelected, selectedRow, selectedCol];
        });
    }

    return (
        <>
            {matrix.map((row, rowIndex) => (
                <div key={rowIndex} className="grid-row">
                    {row.map((item, columnIndex) => (
                        <div key={columnIndex} onClick={onClickCell} className={`${rowIndex}${columnIndex} grid-column casper-cell 
                            ${isAnyCellSelected && rowIndex == selectedRow && columnIndex == selectedCol ? "active":""}`}>
                            {item}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default Grid;
