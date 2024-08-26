import { useUserContext } from "../Contexts/UserContext";
import { Link, useLocation } from "react-router-dom";
import { House, PersonCircle as Person, People, Controller, Gear } from "react-bootstrap-icons";

import "./Sidebar.css";

export function Sidebar() {
    const pathName = useLocation()["pathname"];

    const { user } = useUserContext();

    return (
        <div
            className="ch-sidebar d-flex flex-column flex-shrink-0 p-4 bg-body-tertiary"
            style={{ overflowY: "auto", height: "100%" }}
        >
            <hr style={{ visibility: "hidden" }} />
            <hr style={{ visibility: "hidden" }} />
            <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                    <Link
                        to="/"
                        className={`nav-link mb-1 ${
                            pathName == "/" ? "active" : "link-body-emphasis"
                        } d-flex `}
                        aria-current="page"
                    >
                        <House
                            className="bi pe-none me-2"
                            width="22"
                            height="22"
                        />
                        <span className="d-none d-md-inline">Home</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to={`/${user._id}/profile`}
                        className={`nav-link mb-1 ${
                            pathName.endsWith("/profile") ? "active" : "link-body-emphasis"
                        } d-flex `}
                        aria-current="page"
                    >
                        <Person
                            className="bi pe-none me-2"
                            width="22"
                            height="22"
                        />
                        <span className="d-none d-md-inline">Profile</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/users"
                        className={`nav-link mb-1 ${
                            pathName == "/users" ? "active" : "link-body-emphasis"
                        } d-flex `}
                        aria-current="page"
                    >
                        <People
                            className="bi pe-none me-2"
                            width="22"
                            height="22"
                        />
                        <span className="d-none d-md-inline">Users</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/games"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                        className={`nav-link mb-1 ${
                            pathName == "/games" ? "active" : "link-body-emphasis"
                        } d-flex `}
                    >
                        <Controller
                            className="bi pe-none me-2"
                            width="22"
                            height="22"
                        />
                        <span className="d-none d-md-inline">Games</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/settings"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                        className={`nav-link mb-1 ${
                            pathName == "/settings" ? "active" : "link-body-emphasis"
                        } d-flex `}
                    >
                        <Gear
                            className="bi pe-none me-2"
                            width="22"
                            height="22"
                        />
                        <span className="d-none d-md-inline">Settings</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
