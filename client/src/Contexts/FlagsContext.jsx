import React, { useState } from "react";
import PropTypes from "prop-types";

export const FlagsContext = React.createContext({
    loginModalOpen: false,
    setLoginModalOpen: () => {},
});

export default function FlagsContextProvider({ children }) {
    FlagsContextProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

    const [loginModalOpen, setLoginModalOpen] = useState(false);

    return <FlagsContext.Provider value={{ loginModalOpen, setLoginModalOpen }}>{children}</FlagsContext.Provider>;
}
