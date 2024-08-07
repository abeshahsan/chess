import PropTypes from "prop-types";

export default function Profile({ user }) {
    Profile.propTypes = {
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
