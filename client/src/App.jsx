import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import {GoogleOAuthProvider} from "@react-oauth/google";
import Login from "./login";
import { Header } from "./header-components/header.jsx";
import { Sidebar } from "./sidebar";

import {GridMatrixContextProvider, PiecesInfoContextProvider} from "./store/chessboard-context.jsx";
import { useEffect, useState } from "react";

const App = () => {
    useEffect(() => {
        fetch(`/api/comments`)
            .then((res) => {
                res.json().then((data) =>{
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
        <GoogleOAuthProvider clientId="929768303544-st9fu3ts2jsgeavkta8c1lp4g3qe891k.apps.googleusercontent.com">
                {path == "" ? 
                (
                    <>
                        <Header onClickLoginBtn={onClickLoginBtn}></Header>
                        <div className="main-container d-flex align-items-center justify-content-center">
                            <Sidebar></Sidebar>
                            <div className="container game-container">
                                <GridMatrixContextProvider>
                                    <PiecesInfoContextProvider/>
                                </GridMatrixContextProvider>
                            </div>
                        </div>
                    </>
                )
                : path == "login" && <Login setpath={setPath}/>
                
                }
        </GoogleOAuthProvider>
        </>
    );
};

export default App;
