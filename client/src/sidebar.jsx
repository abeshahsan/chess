import { useContext } from "react";
import "./sidebar.css"
import { UserContext } from "./store/user-context";
import { Link } from "react-router-dom";

export function Sidebar() {

    return (
        <div className="ch-sidebar d-flex flex-column flex-shrink-0 p-4 bg-body-tertiary">
            <hr style={{ visibility: "hidden" }} />
            <hr style={{ visibility: "hidden" }} />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link active" aria-current="page">
                        <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/users" className="nav-link link-body-emphasis">
                        <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
                        Users
                    </Link>
                </li>
                <li>
                    <a href="#" className="nav-link link-body-emphasis">
                        <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
                        Orders
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-body-emphasis">
                        <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#grid"></use></svg>
                        Products
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-body-emphasis">
                        <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
                        Customers
                    </a>
                </li>
            </ul>
        </div>
    );
}
