import { useContext } from "react";
import "./header.css";
import { UserContext } from "../store/user-context";
import LoginPanel from "./login-panel";
import UserPanel from "./user-panel";
import { Link } from "react-router-dom";


import PropTypes from 'prop-types';

export function Header({ fetchingUser, setLoginModalOpen }) {
    Header.propTypes = {
        fetchingUser: PropTypes.bool.isRequired,
        setLoginModalOpen: PropTypes.func.isRequired
    }


    let { user } = useContext(UserContext);

    return <>
        <div className="container-fluid py-2 sticky-top bg-body border-bottom shadow-sm" style={{ zIndex: "5" }}>
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
                    (user?.loggedIn ?
                        <UserPanel></UserPanel>

                        :

                        <LoginPanel setLoginModalOpen={setLoginModalOpen}></LoginPanel>)
                }

            </header>
        </div>
    </>
}

