import "bootstrap/dist/css/bootstrap.min.css"
import "./grid.css"


const Grid = ({ matrix }) => {
    return (
        <>
            {matrix.map((row, rowIndex) => (
                <div key={rowIndex} className="grid-row">
                    {row.map((item, columnIndex) => (
                        <div key={columnIndex} className="grid-column casper-cell">
                            {item}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default Grid;
