import {useNavigate} from "react-router-dom";

export default function LoginComponent({onClickLoginBtn}) {
    const navigate = useNavigate();

    return (
        <>
            <div className={`col-md-3 text-end`}>
                <button type="button" className="btn btn-outline-primary me-2" onClick={()=> navigate("/login")}>Login</button>
                <button type="button" className="btn btn-primary">Sign-up</button>
            </div>
        </>
    );
}