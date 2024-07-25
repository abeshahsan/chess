import React, { useState } from "react";

export const UserContext = React.createContext([]);

export default function UserContextProvider(props) {
    const [user, setUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    return (
        <UserContext.Provider value={[user, setUser, userLoggedIn, setUserLoggedIn]}>
            {props.children}
        </UserContext.Provider>
    );
}
