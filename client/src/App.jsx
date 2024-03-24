import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Login from "./login.jsx";
import { Header } from "./header-components/header.jsx";

import { BrowserRouter, Routes, Route, Outlet, HashRouter } from "react-router-dom"

import { useEffect, useState } from "react";

import { Sidebar } from "./sidebar.jsx";
import { GridMatrixContextProvider, PiecesInfoContextProvider } from "./store/chessboard-context.jsx";
import NotFoundPage from "./NotFound.jsx";
import Register from "./register.jsx";

const App = () => {
    let [path, setPath] = useState("");

    return (
        <>
            <BrowserRouter>

                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Header/>
                                <div className="main-container d-flex align-items-center justify-content-center">
                                    <Sidebar />
                                    <div className="container game-container">
                                        <GridMatrixContextProvider>
                                            <PiecesInfoContextProvider />
                                        </GridMatrixContextProvider>
                                    </div>
                                </div>
                            </>
                        }
                    >

                    </Route>
                    <Route
                        path="/login"
                        element={
                            <Login></Login>
                        }
                    >
                    </Route>
                    <Route
                        path="/register"
                        element={
                            <Register register={true}></Register>
                        }
                    >
                    </Route>
                    <Route
                        path="*"
                        element={
                            <NotFoundPage></NotFoundPage>
                        }
                    >
                    </Route>

                </Routes>
            </BrowserRouter >
        </>
    );
}


export default App;
