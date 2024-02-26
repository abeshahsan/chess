import "bootstrap/dist/css/bootstrap.min.css"
import GridCell from "./grid-cell";

function GridCol() {
    return (
        <div className="col border d-flex align-items-center justify-content-center grid-column">
            <GridCell></GridCell>
        </div>
    );
}

export default GridCol;