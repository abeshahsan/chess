import { useContext } from "react";
import GoogleSiginIn from "./APIs/google-login";
import { UserContext } from "./store/user-context";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Login({ register }) {
    return (
        <>
            <GoogleOAuthProvider clientId="929768303544-st9fu3ts2jsgeavkta8c1lp4g3qe891k.apps.googleusercontent.com">

                <div className="container-fluid d-flex align-items-center 
                            justify-content-center"
                    style={{ "height": "100%", width: "100%" }}
                >
                    <div className="container-fluid d-flex align-items-center 
                            justify-content-center border rounded-4 shadow-sm bg-light"
                        style={{ "height": "50%", width: "30%" }}>
                        <GoogleSiginIn register={register} />
                    </div>
                </div>
            </GoogleOAuthProvider>
        </>
    );
};
