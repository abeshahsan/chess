
import {GoogleLogin, googleLogout} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { useContext } from "react";
import { UserContext } from "../store/user-context";

export default function GoogleSiginIn({setPath}) {
    let [user, setUser] = useContext(UserContext);

    return (
        <>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    let decodedJSON = jwtDecode(credentialResponse.credential);
                    setUser({
                        id: decodedJSON.sub,
                        name: decodedJSON.name,
                        email: decodedJSON.email,
                        picture: decodedJSON.picture
                    });
                    setPath("");
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </>
    );
};
