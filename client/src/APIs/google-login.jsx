
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useContext, useState } from "react";
import { UserContext } from "../store/user-context";
import { useNavigate } from "react-router-dom";


let navigate;

export default function GoogleSiginIn({ register, setError }) {
    let [user, setUser] = useContext(UserContext);

    navigate = useNavigate();

    googleLogout();

    return (
        <>
            <GoogleLogin
                buttonText={`${register ? "Sign up" : "Sign in"} with Google`}
                onSuccess={credentialResponse => handleSuccess(credentialResponse, register, setUser)}
                onError={() => {
                    setError(true);
                }}
            />
        </>
    );
};

function handleSuccess(credentialResponse, register, setUser) {
    if (register) {
        handleRegisterRequest(credentialResponse, setUser, navigate);
        // console.log(decodedJSON)
    }
    else {
        handleLoginRequest(credentialResponse, setUser, navigate);
    }
}

function handleLoginRequest(credentialResponse, setUser) {
    let decodedJSON = jwtDecode(credentialResponse.credential);
    fetch("/api/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: decodedJSON.email,
        })
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        setUser(data);
        navigate("/")
    });
}

function handleRegisterRequest(credentialResponse, setUser) {
    let decodedJSON = jwtDecode(credentialResponse.credential);
    setUser({
        name: decodedJSON.name,
        email: decodedJSON.email,
        picture: decodedJSON.picture
    });
}