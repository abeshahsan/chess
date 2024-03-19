import { useContext } from "react";
import "./header.css";
import { UserContext } from "./store/user-context";

export function Header({onClick}) {

    let [user, setUser] = useContext(UserContext);

    return <>
        <div className="container-fluid header-container py-2 sticky-top bg-light border-bottom shadow-sm" style={{zIndex: "5"}}>
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
                <div className="col-md-3 mb-2 mb-md-0">
                    <a href="/" className="d-inline-flex a-body-emphasis text-decoration-none">
                        <svg className="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref={"#bootstrap"}></use></svg>
                    </a>
                </div>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="#" className="nav-a px-2 a-secondary">Home</a></li>
                    <li><a href="#" className="nav-a px-2">Features</a></li>
                    <li><a href="#" className="nav-a px-2">Pricing</a></li>
                    <li><a href="#" className="nav-a px-2">FAQs</a></li>
                    <li><a href="#" className="nav-a px-2">About</a></li>
                </ul>

                
                <div className={`col-md-3 text-end + ${Object.keys(user).length ? " invisible": " visible"}`}>
                    <button type="button" className="btn btn-outline-primary me-2" onClick={onClick}>Login</button>
                    <button type="button" className="btn btn-primary">Sign-up</button>
                </div>
            </header>
        </div>
    </>
}