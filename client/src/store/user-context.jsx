import React, { useState } from "react";
import PropTypes from "prop-types";

import { EMPTY_USER } from "./constants";


export const UserContext = React.createContext();

export default function UserContextProvider({ children }) {
    UserContextProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

    const [user, setUser] = useState({ ...EMPTY_USER });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
