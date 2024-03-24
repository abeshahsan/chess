import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Login from "./login";
import { Header } from "./header-components/header.jsx";

import { BrowserRouter, Routes, Route, Outlet, HashRouter } from "react-router-dom"

import { useEffect, useState } from "react";

import { Sidebar } from "./sidebar.jsx";
import { GridMatrixContextProvider, PiecesInfoContextProvider } from "./store/chessboard-context.jsx";
import NotFoundPage from "./NotFound.jsx";

const App = () => {
    useEffect(() => {
        fetch(`/api/comments`)
            .then((res) => {
                res.json().then((data) => {
                    console.log(data);
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    let [path, setPath] = useState("");

    function onClickLoginBtn(event) {
        setPath("login");
    }

    return (
        <>
            <BrowserRouter>

                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Header onClickLoginBtn={onClickLoginBtn} />
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
                            <Login register={true}></Login>
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
