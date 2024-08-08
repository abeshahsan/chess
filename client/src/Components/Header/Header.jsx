import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import LoginPanel from "./LoginPanel.jsx";
import UserPanel from "./UserPanel";

/**CSS imports */
import "./Header.css";

export function Header({ user, loading, setLoginModalOpen }) {
    Header.propTypes = {
        user: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        setLoginModalOpen: PropTypes.func.isRequired,
    };

    return (
        <>
            <div
                className="container-fluid py-2 sticky-top bg-body border-bottom shadow-sm"
                style={{ zIndex: "5" }}
            >
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
                    <div className="col-md-3 mb-2 mb-md-0">
                        <Link
                            to="/"
                            className="d-inline-flex a-body-emphasis text-decoration-none"
                        >
                            <svg
                                className="bi"
                                width="40"
                                height="32"
                                role="img"
                                aria-label="Bootstrap"
                            >
                                <use xlinkHref={"#bootstrap"}></use>
                            </svg>
                        </Link>
                    </div>

                    <ul className="nav col-10 col-md-auto justify-content-center mb-md-0"></ul>

                    {!loading &&
                        (user?.loggedIn ? (
                            <UserPanel></UserPanel>
                        ) : (
                            <LoginPanel setLoginModalOpen={setLoginModalOpen}></LoginPanel>
                        ))}
                </header>
            </div>
        </>
    );
}
