import "bootstrap/dist/css/bootstrap.min.css"
import GridCol from "./grid-col";


function GridRow() {
    const gridElements = [];

    for (let i = 0; i < 8; i++) {
        const key = `cell-${i}-${i}`;
        gridElements.push(
            <GridCol key={key}></GridCol>
        );
    }

    return (
        <>
        <div className="grid-row">
            {gridElements}
        </div>
        </>
    );
}

export default GridRow;