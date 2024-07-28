import React, { useState } from "react";
import PropTypes from "prop-types";

export const UserContext = React.createContext([]);

export default function UserContextProvider({children}) {
    UserContextProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

    const [user, setUser] = useState({
        username: "",
        email: "",
        pfp: null,
    });
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    return (
        <UserContext.Provider value={[user, setUser, userLoggedIn, setUserLoggedIn]}>
            {children}
        </UserContext.Provider>
    );
}
