import { useContext, useEffect, useState } from "react";
import "./header.css";
import { UserContext } from "../store/user-context";
import LoginPanel from "./login-panel";
import UserPanel from "./user-panel";
import { Link, useLocation } from "react-router-dom";

export function Header() {
    let [user, setUser] = useContext(UserContext);

    let [fetchingUser, setFetchingUser] = useState(true);

    useEffect(() => {
        setFetchingUser(true);
        fetch("/api/current-user")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if (data.user) {
                    setUser(data.user);
                }
                else {
                    setUser(null);
                }
                setFetchingUser(false);
            });
    }, []);

    return <>
        <div className="container-fluid header-container py-2 sticky-top bg-body border-bottom shadow-sm" style={{ zIndex: "5" }}>
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
                <div className="col-md-3 mb-2 mb-md-0">
                    <Link to="/" className="d-inline-flex a-body-emphasis text-decoration-none">
                        <svg className="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref={"#bootstrap"}></use></svg>
                    </Link>
                </div>

                <ul className="nav col-10 col-md-auto justify-content-center mb-md-0">
                </ul>

                {
                    !fetchingUser &&
                    (user ?
                        <UserPanel></UserPanel>

                        :

                        <LoginPanel></LoginPanel>)
                }

            </header>
        </div>
    </>
}
