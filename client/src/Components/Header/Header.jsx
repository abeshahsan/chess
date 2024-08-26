import { Link } from "react-router-dom";

import LoginPanel from "./LoginPanel.jsx";
import UserPanel from "./UserPanel";

/**CSS imports */
import "./Header.css";
import { useContext } from "react";
import { useUserContext } from "../../Contexts/UserContext.jsx";
import { FlagsContext } from "../../Contexts/FlagsContext.jsx";

export function Header() {
    let { user, fetchingUser: loading } = useUserContext();
    let { setLoginModalOpen } = useContext(FlagsContext);

    return (
        <>
            <div
                className="container-fluid py-2 sticky-top bg-body border-bottom shadow-sm"
                style={{ zIndex: "5", maxHeight: "60px" }}
            >
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
                    <div className="col-md-3 mb-2 mb-md-0">
                        <Link
                            to="/"
                            className="d-inline-flex a-body-emphasis text-decoration-none"
                        >
                            <img
                                src="/logo.jpg"
                                className="border rounded-circle p-1"
                                width={50}
                            />
                        </Link>
                    </div>

                    <ul className="nav col-10 col-md-auto justify-content-center mb-md-0"></ul>

                    {!loading &&
                        (user?._id ? (
                            <UserPanel></UserPanel>
                        ) : (
                            <LoginPanel setLoginModalOpen={setLoginModalOpen}></LoginPanel>
                        ))}
                </header>
            </div>
        </>
    );
}
