import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import GoogleSiginIn from "../../APIs/GoogleLogin";

export default function Register() {
    let [registerError, setRegisterError] = useState(false);

    return (
        <>
            <GoogleOAuthProvider clientId="929768303544-st9fu3ts2jsgeavkta8c1lp4g3qe891k.apps.googleusercontent.com">
                <div
                    className="container-fluid d-flex align-items-center
                            justify-content-center"
                    style={{ height: "100%", width: "100%" }}
                >
                    <div
                        className="container-fluid d-flex  flex-column align-items-center
                            justify-content-center border rounded-4 shadow-sm bg-light"
                        style={{ height: "50%", width: "30%" }}
                    >
                        <GoogleSiginIn
                            register={true}
                            setError={setRegisterError}
                        />
                        <div
                            className={` mt-3`}
                            style={{ fontSize: "12px" }}
                        >
                            Already have an account? <Link to={"/login"}> Login </Link>
                        </div>
                        <div
                            className={`mt-2 text-danger ${!registerError && "invisible"}`}
                            style={{ fontSize: "10px" }}
                        >
                            Invalid Email
                        </div>
                    </div>
                </div>
            </GoogleOAuthProvider>
        </>
    );
}
