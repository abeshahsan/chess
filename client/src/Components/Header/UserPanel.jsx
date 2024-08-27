import { useContext } from "react";
import { useUserContext } from "../../Contexts/UserContext";
import { EMPTY_USER } from "../../Contexts/constants";
import { useNavigate } from "react-router-dom";
import { Box, BoxArrowRight, Gear, PersonCircle } from "react-bootstrap-icons";

import { Dropdown } from "react-bootstrap";
import { useWebsocketContext } from "../../Contexts/WebSocketContext";

export default function UserPanel() {
    let { user, setUser } = useUserContext();

    let { socket: ws } = useWebsocketContext();

    let navigate = useNavigate();

    function handleOnLogout() {
        logout(navigate, setUser, ws);
    }

    return (
        <Dropdown>
            <Dropdown.Toggle
                variant="success"
                id="header-dropdown-toggle"
                style={{ width: "50px", height: "50px", border: "none" }}
                className="custom-dropdown-toggle btn btn-sm bg-light rounded-circle d-flex align-items-center justify-content-center"
                data-toggle="dropdown"
                aria-haspopup="true"

            >
                <img
                    className="rounded-circle"
                    style={{ width: "40px", height: "40px" }}
                    src={`/user-default-pfp.png`}
                />
            </Dropdown.Toggle>

            <Dropdown.Menu className="border shadow p-1" >
                <div className="border rounded d-flex align-items-center flex-column m-2 p-2 shadow-sm bg-light">
                    <span style={{ fontSize: 13, fontWeight: "bold" }}>{user.username}</span>
                    <span style={{ fontSize: 11 }}>{user.email}</span>
                </div>

                <Dropdown.Item onClick={() => navigate(`/${user._id}/profile`)}>
                    <PersonCircle
                        size={24}
                        className="me-2"
                    />
                    <span>Profile</span>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Gear
                        size={24}
                        className="me-2"
                    />
                    <span>Settings</span>
                </Dropdown.Item>
                <Dropdown.Item onClick={handleOnLogout}>
                    <BoxArrowRight
                        size={24}
                        className="me-2"
                    />
                    <span>Logout</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function logout(navigate, setUser, ws) {
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
            localStorage.removeItem("user");
            ws.close();
            navigate("/");
        })
        .catch((err) => {
            console.log(err);
        });
}
