import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import { GridMatrixContextProvider, PiecesInfoContextProvider, blackPieces, whitePieces } from "./contexts/chessboard-context";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

const App = () => {
    return (
        <>
            <Header></Header>
            <div className="main-container d-flex align-items-center justify-content-center">
                <Sidebar></Sidebar>
                <div className="container game-container">
                    <GridMatrixContextProvider>
                        <PiecesInfoContextProvider/>
                    </GridMatrixContextProvider>
                </div>
            </div>
        </>
    );
};

export default App;
