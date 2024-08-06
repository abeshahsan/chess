import { useState } from "react";
import GoogleSiginIn from "../APIs/google-login";
import { Link } from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Login() {

    let [loginError, setloginError] = useState(false);

    return (
        <>
            <GoogleOAuthProvider clientId="929768303544-st9fu3ts2jsgeavkta8c1lp4g3qe891k.apps.googleusercontent.com">

                <div className="container-fluid d-flex align-items-center
                            justify-content-center"
                    style={{ "height": "100%", width: "100%" }}
                >
                    <div className="container-fluid d-flex  flex-column align-items-center
                            justify-content-center border rounded-4 shadow-sm bg-light"
                        style={{ "height": "50%", width: "30%" }}>

                        <GoogleSiginIn setError={setloginError} />

                        <div className={` mt-3`} style={{ fontSize: "12px" }}>
                            Don&apos;t have an account? <Link to={"/register"}> Register </Link>
                        </div>
                        <div className={`mt-2 text-danger ${!loginError && "invisible"}`} style={{ fontSize: "10px" }}>
                            No account associated with this email was found
                        </div>
                    </div>
                </div>
            </GoogleOAuthProvider>
        </>
    );
}
