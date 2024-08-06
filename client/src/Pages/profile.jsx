import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

export default function Profile() {
    const [user] = useContext(UserContext);

    return (
        <>
            <div
                className="card"
                style={{ width: "18rem" }}
            >
                <img
                    src={`${user && user.picture}`}
                    className="card-img-top"
                    alt="..."
                />
                <div className="card-body">
                    <div className="card-title h5 mb-0">{user && user.name}</div>
                    <div className="mt-0">{user && user.email}</div>
                </div>
            </div>
        </>
    );
}
