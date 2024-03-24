
import {GoogleLogin, googleLogout} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { useContext } from "react";
import { UserContext } from "../store/user-context";

export default function GoogleSiginIn({register}) {
    let [user, setUser] = useContext(UserContext);

    return (
        <>
            <GoogleLogin
                buttonText={`${register ? "Sign up" : "Sign in"} with Google`}
                onSuccess={credentialResponse => {
                    let decodedJSON = jwtDecode(credentialResponse.credential);
                    setUser({
                        id: decodedJSON.sub,
                        name: decodedJSON.name,
                        email: decodedJSON.email,
                        picture: decodedJSON.picture
                    });
                    console.log(decodedJSON)
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </>
    );
};
