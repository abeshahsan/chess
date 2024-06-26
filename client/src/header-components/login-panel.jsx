import {useNavigate} from "react-router-dom";

export default function LoginPanel() {
    const navigate = useNavigate();

    return (
        <>
            <div className={`col-md-3 text-end`}>
                <button type="button" className="btn btn-outline-success me-2" onClick={()=> navigate("/login")}>Login</button>
                <button type="button" className="btn btn-warning"  onClick={()=> navigate("/register")}>Register</button>
            </div>
        </>
    );
}