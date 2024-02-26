import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import GridRow from "./GridComponents/grid-row";
import Grid from "./GridComponents/grid";

function App({ len }) {
    return (
        <>
            <div className="main-container">
                <div className="ch-chessboard">
                    <Grid></Grid>
                </div>
            </div>
        </>
    );
}

export default App;