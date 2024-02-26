import GridRow from "./grid-row";


import "bootstrap/dist/css/bootstrap.min.css"
import "./grid.css"

function Grid({ len }) {
    const gridElements = [];

    for (let i = 0; i < 8; i++) {
        const key = `row-${i}`;
        gridElements.push(
            <GridRow key={key}></GridRow>
        );
    }

    return (
        <>
            {gridElements}
        </>
    );
}

export default Grid;