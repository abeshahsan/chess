import React, { useState } from "react";
import PropTypes from "prop-types";

export const UserContext = React.createContext({
    user: {},
    setUser: () => { }
});

export default function UserContextProvider({ children }) {
    UserContextProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

    const [user, setUser] = useState({
        loggedIn: false,
        username: "",
        email: "",
        pfp: null,
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
