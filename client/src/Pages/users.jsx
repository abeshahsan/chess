import PropTypes from "prop-types";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import { Header } from "../Components/Header/Header";
import { Sidebar } from "../Components/sidebar";

import { useFetchAllUsers } from "../Hooks/useFetchAllUsers";

export default function Users() {
    let { users } = useFetchAllUsers();

    return (
        <>
            <Header />
            <div className="main-container d-flex align-items-center justify-content-center">
                <Sidebar />
                <UsersContainer users={users} />
            </div>
        </>
    );
}

function UsersContainer({ users }) {
    UsersContainer.propTypes = {
        users: PropTypes.array.isRequired,
    };

    const { user: currentUser } = useContext(UserContext);

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
