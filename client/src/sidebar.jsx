import { useContext } from "react";
import "./sidebar.css"
import { UserContext } from "./store/user-context";

export function Sidebar() {

    let [user, setUser] = useContext(UserContext);

    return (
        <div className="ch-sidebar d-flex flex-column flex-shrink-0 p-4 bg-body-tertiary">
            <hr style={{ visibility: "hidden" }} />
            <hr style={{ visibility: "hidden" }} />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="#" className="nav-link active" aria-current="page">
                        <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-body-emphasis">
                        <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
                        Dashboard
                    </a>
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
            <hr />
            {
            !!Object.keys(user).length && 
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={`${user.picture}`} alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>{user.name}</strong>
                </a>
                <ul className="dropdown-menu text-small shadow" style={{}}>
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><hr className="dropdown-divider"></hr> </li>
                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div>}
        </div>
    );
}
