import PropTypes from "prop-types";
import { Header } from "../Components/Header/Header";
import { Sidebar } from "../Components/sidebar";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

export default function Profile() {
    const { currentUser } = useContext(UserContext);

    return (
        <>
            <Header />
            <div className="main-container d-flex align-items-center justify-content-center">
                <Sidebar />
                <div className="container game-container">
                    <ProfileCard user={currentUser}></ProfileCard>
                </div>
            </div>
        </>
    );
}

function ProfileCard({ user }) {
    ProfileCard.propTypes = {
        user: PropTypes.object.isRequired,
    };

    return (
        <>
            <div
                className="card"
                style={{ width: "18rem" }}
            >
                <img
                    src={"/user-default-pfp.png"}
                    className="card-img-top p-5"
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
