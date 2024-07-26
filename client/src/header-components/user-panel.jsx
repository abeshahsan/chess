
import { useContext, useState } from "react";
import { UserContext } from "../store/user-context";
import { useNavigate } from "react-router-dom";


export default function UserPanel() {

    let [user, setUser] = useContext(UserContext);

    let [dropdownShow, setDropdownToggle] = useState(false)

    let navigate = useNavigate();

    function handleOnLogout() {
        setUser(null);
        fetch("/api/logout", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setUser(null)
                navigate("/")
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <div className={`dropdown ${dropdownShow ? "show" : ""}`}>
                <button className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center" type="button" style={{ width: '37px', height: "37px" }} id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    onClick={() => setDropdownToggle(() => { return !dropdownShow; })}
                >
                    <img
                        className="rounded-circle"
                        style={{ width: '30px', height: "30px" }}
                        src={`user-default-pfp.png`} />
                </button>
                <div className={`dropdown-menu shadow p-2 ${dropdownShow ? "show" : ""}`} style={{ "right": "0", "left": "auto", "width": "240px" }} aria-labelledby="dropdownMenu2">
                    <div className="border rounded d-flex align-items-center flex-column justify-content-center m-2 p-2 shadow-sm bg-light" style={{ margin: "0 auto" }}>
                        <span className="" style={{ fontSize: 13, fontWeight: "bold" }}>{user.name}</span>
                        <span style={{ fontSize: 11 }}>{user.email}</span>
                    </div>
                    <button className="dropdown-item" type="button" onClick={() => { navigate(`/${user._id}/profile`); }}>Profile</button>
                    <button className="dropdown-item" type="button">Settings</button>
                    <hr className="dropdown-divider" />
                    <button className="dropdown-item" type="button" onClick={() => { handleOnLogout() }}>Log out</button>
                </div>
            </div>
        </>
    );
}
