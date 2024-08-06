import PropTypes from "prop-types";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

export default function Users({ users }) {
    Users.propTypes = {
        users: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                username: PropTypes.string,
                password: PropTypes.string,
                email: PropTypes.string,
                pfp: PropTypes.object,
            })
        ).isRequired,
    };

    const [currentUser] = useContext(UserContext);

    return (
        <ul className="container h-100 p-5 mt-1 list-group">
            {users &&
                users.map(
                    (user) =>
                        (!currentUser || currentUser._id !== user._id) && (
                            <Link
                                to={""}
                                className="list-group-item list-group-item-action"
                                key={user._id}
                            >
                                {user.name}
                            </Link>
                        )
                )}
        </ul>
    );
}
