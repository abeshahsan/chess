
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { UserContext } from "../store/user-context";
import { useNavigate, useLocation } from "react-router-dom";

import PropTypes from "prop-types";


let navigate, location;

export default function GoogleSiginIn({ setError }) {
    GoogleSiginIn.propTypes = {
        setError: PropTypes.func.isRequired
    }

    let { setUser } = useContext(UserContext);

    navigate = useNavigate();
    location = useLocation();

    let register = location.pathname == "/register";

    // googleLogout();

    return (
        <>
            <GoogleLogin
                buttonText={`${register ? "Sign up" : "Sign in"} with Google`}
                onSuccess={credentialResponse => {
                    handleSuccess(credentialResponse, register, setUser);
                    setUser(() => {
                        return {
                            loggedIn: true
                        }
                    })
                }
                }
                onError={() => {
                    setError(true);
                }}
            />
        </>
    );
}

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
            setUser(data[0]);
            navigate("/")
        })
        .catch((err) => {
            console.log(err);
        })
}

function handleRegisterRequest(credentialResponse, setUser) {
    let decodedJSON = jwtDecode(credentialResponse.credential);
    setUser({
        name: decodedJSON.name,
        email: decodedJSON.email,
        picture: decodedJSON.picture
    });
    fetch("/api/register", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: decodedJSON.name,
            email: decodedJSON.email,
            picture: decodedJSON.picture
        })
    })
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            console.log(res);
            navigate("/")
        })
        .catch((err) => {
            console.log(err);
        });
}