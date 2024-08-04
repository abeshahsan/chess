import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';

export default function LoginPanel({ setLoginModalOpen }) {
    LoginPanel.propTypes = {
        setLoginModalOpen: PropTypes.func.isRequired
    }


    const navigate = useNavigate();

    return (
        <>
            <div className={`col-md-3 text-end`}>
                <button type="button" id="nav-login-btn" className="btn btn-outline-success me-2" onClick={() => { setLoginModalOpen(true) }}>Login</button>
                <button type="button" className="btn btn-warning" onClick={() => navigate("/register")}>Register</button>
            </div>
        </>
    );
}
