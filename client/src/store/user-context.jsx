import React, { useState } from "react";

export const UserContext = React.createContext([]);

export default function UserContextProvider(props) {
    const [user, setUser] = useState(null);

    if(!user) setUser(user => {
        return {
            id: 123,
            name: "Abesh Ahsan",
            email: "abeshahsan2002@gmail.com",
            picture: "https://lh3.googleusercontent.com/a/ACg8ocKF-p0FUXHzvakzn1tMlrme1afiKiLSonWXobeb750Tx8o=s96-c",
        }
    })

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
}
