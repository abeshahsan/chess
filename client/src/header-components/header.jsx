import { useContext } from "react";
import "./header.css";
import { UserContext } from "../store/user-context";
import LoginComponent from "./login-component";
import UserComponent from "./user-component";

export function Header({ onClickLoginBtn }) {

    let [user, setUser] = useContext(UserContext);

    return <>
        <div className="container-fluid header-container py-2 sticky-top bg-body border-bottom shadow-sm" style={{ zIndex: "5" }}>
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
                <div className="col-md-3 mb-2 mb-md-0">
                    <a href="/" className="d-inline-flex a-body-emphasis text-decoration-none">
                        <svg className="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref={"#bootstrap"}></use></svg>
                    </a>
                </div>

                <ul className="nav col-10 col-md-auto justify-content-center mb-md-0">
                </ul>

                {
                    user ?
                    <UserComponent></UserComponent>
                    
                    :
                    
                    <LoginComponent onClickLoginBtn={onClickLoginBtn}></LoginComponent>
                }

            </header>
        </div>
    </>
}
