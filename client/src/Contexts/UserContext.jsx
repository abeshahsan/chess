import React, { useState } from "react";
import PropTypes from "prop-types";

import { EMPTY_USER } from "./constants";

export const UserContext = React.createContext({
    user: { ...EMPTY_USER },
    setUser: () => {},
    fetchingUser: true,
    setFetchingUser: () => {},
});

export default function UserContextProvider({ children }) {
    UserContextProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

    const [user, setUser] = useState({ ...EMPTY_USER });
    const [fetchingUser, setFetchingUser] = useState(true);

    return (
        <UserContext.Provider value={{ user, setUser, fetchingUser, setFetchingUser }}>{children}</UserContext.Provider>
    );
}
