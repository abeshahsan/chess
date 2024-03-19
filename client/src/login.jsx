import { useContext } from "react";
import GoogleSiginIn from "./APIs/google-login";
import { UserContext } from "./store/user-context";

export default function Login({setpath}) {
    return (
        <>
            <div className="sign-in-container container-fluid d-flex align-items-center 
                            justify-content-center"
                        style={{"height": "100%", width:"100%"}}
                        >
                <div className="sign-in-container container-fluid d-flex align-items-center 
                            justify-content-center border rounded-4 shadow-sm bg-light"
                        style={{"height": "50%", width:"30%"}}>
                    <GoogleSiginIn setPath={setpath}/>
                </div>
            </div>
        </>
    );
};
