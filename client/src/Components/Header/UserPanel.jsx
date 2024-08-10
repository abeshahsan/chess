import { useContext } from "react";
import { useUserContext } from "../../Contexts/UserContext";
import { EMPTY_USER } from "../../Contexts/constants";
import { useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";

export default function UserPanel() {
    let { user, setUser } = useUserContext();

    let navigate = useNavigate();

    function handleOnLogout() {
        logout(navigate, setUser);
    }

    return (
        <Dropdown>
            <Dropdown.Toggle
                variant="success"
                id="header-dropdown-toggle"
                style={{ width: "37px", height: "37px", backgroundColor: "transparent", border: "none" }}
                className="custom-dropdown-toggle btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <img
                    className="rounded-circle"
                    style={{ width: "30px", height: "30px" }}
                    src={`/user-default-pfp.png`}
                />
            </Dropdown.Toggle>

            <Dropdown.Menu className="border shadow p-1">
                <div className="border rounded d-flex align-items-center flex-column justify-content-center m-2 p-2 shadow-sm bg-light">
                    <span style={{ fontSize: 13, fontWeight: "bold" }}>{user.username}</span>
                    <span style={{ fontSize: 11 }}>{user.email}</span>
                </div>

                <Dropdown.Item onClick={() => navigate(`/${user._id}/profile`)}>Profile</Dropdown.Item>
                <Dropdown.Item>Settigs</Dropdown.Item>
                <Dropdown.Item
                    onClick={handleOnLogout}
                >
                    Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function logout(navigate, setUser) {
    fetch("/api/logout", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setUser(() => {
                return { ...EMPTY_USER };
            });
            navigate("/");
        })
        .catch((err) => {
            console.log(err);
        });
}

{
    /* <div className={`dropdown ${dropdownShow ? "show" : ""}`}>
    <button
        className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
        type="button"
        style={{ width: "37px", height: "37px" }}
        id="dropdownMenu2"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={() =>
            setDropdownToggle(() => {
                return !dropdownShow;
            })
        }
    >
        <img
            className="rounded-circle"
            style={{ width: "30px", height: "30px" }}
            src={`/user-default-pfp.png`}
        />
    </button>
    <div
        className={`dropdown-menu shadow p-2 ${dropdownShow ? "show" : ""}`}
        style={{ right: "0", left: "auto", width: "240px" }}
        aria-labelledby="dropdownMenu2"
    >
        <div
            className="border rounded d-flex align-items-center flex-column justify-content-center m-2 p-2 shadow-sm bg-light"
            style={{ margin: "0 auto" }}
        >
            <span
                className=""
                style={{ fontSize: 13, fontWeight: "bold" }}
            >
                {user.username}
            </span>
            <span style={{ fontSize: 11 }}>{user.email}</span>
        </div>
        <button
            className="dropdown-item"
            type="button"
            onClick={() => {
                navigate(`/${user._id}/profile`);
            }}
        >
            Profile
        </button>
        <button
            className="dropdown-item"
            type="button"
        >
            Settings
        </button>
        <hr className="dropdown-divider" />
        <button
            className="dropdown-item"
            type="button"
            onClick={() => {
                handleOnLogout();
            }}
        >
            Log out
        </button>
    </div>
</div>; */
}
