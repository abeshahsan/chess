import { useContext, useEffect, useState } from "react";


import { UserContext } from "../store/user-context";
import { useNavigate } from "react-router-dom";



export default function UserComponent() {

    let [user, setUser] = useContext(UserContext);

    let [dropdownShow, setDropdownToggle] = useState(false)

    let navigate = useNavigate();

    function handleOnLogout() {
        setUser(null);
        navigate("/");
    }

    return (
        <>
            <div className={`dropdown ${dropdownShow ? "show" : ""}`}>
                <button className="btn btn-sm rounded-circle p-1" type="button" style={{ aspectRatio: 1 }} id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    onClick={() => setDropdownToggle(() => { return !dropdownShow; })}
                >
                    <img className="rounded-circle" style={{ width: '35px', aspectRatio: "1" }} src={user.picture} />
                </button>
                <div className={`dropdown-menu shadow p-2 ${dropdownShow ? "show" : ""}`} style={{ "right": "0", "left": "auto", "width": "240px" }} aria-labelledby="dropdownMenu2">
                    <div className="border rounded d-flex align-items-center flex-column justify-content-center m-2 p-2 shadow-sm bg-light" style={{ margin: "0 auto" }}>
                        <span className="" style={{ fontSize: 13, fontWeight: "bold" }}>{user.name}</span>
                        <span style={{ fontSize: 11 }}>{user.email}</span>
                    </div>
                    <button className="dropdown-item" type="button">Profile</button>
                    <button className="dropdown-item" type="button">Settings</button>
                    <hr className="dropdown-divider" />
                    <button className="dropdown-item" type="button" onClick={(event) => { handleOnLogout() }}>Log out</button>
                </div>
            </div>
        </>
    );
}
