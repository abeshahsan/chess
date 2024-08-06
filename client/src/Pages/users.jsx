import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./store/user-context";

export default function Users({ users }) {
    const [currentUser,] = useContext(UserContext);

    return (
        <ul className="container h-100 p-5 mt-1 list-group">
            {users && users.map((user) => (
                (!currentUser || currentUser._id !== user._id) &&
                <Link to={""} className="list-group-item list-group-item-action" key={user._id}>
                    {user.name}
                </Link>
            ))}
        </ul>
    );
}
