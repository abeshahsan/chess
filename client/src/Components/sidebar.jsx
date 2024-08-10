import { useUserContext } from "../Contexts/UserContext";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";

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
                        to={`/${user._id}/profile`}
                        className={`nav-link mb-1 ${pathName.endsWith("/profile") ? "active" : "link-body-emphasis"} `}
                        aria-current="page"
                    >
                        <svg
                            className="bi pe-none me-2"
                            width="16"
                            height="16"
                        >
                            <use xlinkHref="#person"></use>
                        </svg>
                        Profile
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/"
                        className={`nav-link mb-1 ${pathName == "/" ? "active" : "link-body-emphasis"} `}
                        aria-current="page"
                    >
                        <svg
                            className="bi pe-none me-2"
                            width="16"
                            height="16"
                        >
                            <use xlinkHref="#home"></use>
                        </svg>
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/users"
                        className={`nav-link mb-1 ${pathName == "/users" ? "active" : "link-body-emphasis"} `}
                    >
                        <svg
                            className="bi pe-none me-2"
                            width="16"
                            height="16"
                        >
                            <use xlinkHref="#speedometer2"></use>
                        </svg>
                        Users
                    </Link>
                </li>
                <li>
                    <Link
                        to="/games"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                        className={`nav-link mb-1 ${pathName == "/games" ? "active" : "link-body-emphasis"} `}
                    >
                        <svg
                            className="bi pe-none me-2"
                            width="16"
                            height="16"
                        >
                            <use xlinkHref="#table"></use>
                        </svg>
                        Games
                    </Link>
                </li>
                <li>
                    <Link
                        to="/settings"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                        className={`nav-link mb-1 ${pathName == "/settings" ? "active" : "link-body-emphasis"} `}
                    >
                        <svg
                            className="bi pe-none me-2"
                            width="16"
                            height="16"
                        >
                            <use xlinkHref="#grid"></use>
                        </svg>
                        Settings
                    </Link>
                </li>
            </ul>
        </div>
    );
}
