import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { EMPTY_USER } from "./constants";

const UserContext = React.createContext({
    user: { ...EMPTY_USER },
    setUser: () => {},
    fetchingUser: true,
    setFetchingUser: () => {},
});

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState({ ...EMPTY_USER });
    const [fetchingUser, setFetchingUser] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        let controller = new AbortController();
        let signal = controller.signal;

        async function setUserByFetching() {
            return new Promise((resolve) => {
                fetch("/api/current-user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    signal,
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to fetch user");
                        }

                        return response.json();
                    })
                    .then((data) => {
                        if (data.user) {
                            data.user = {
                                ...data.user,
                                loggedIn: true,
                            };
                        }

                        if (isMounted) {
                            setUser({
                                ...data.user,
                            });
                            setFetchingUser(false);
                        }

                        resolve();
                    })
                    .catch((error) => {
                        if (isMounted) {
                            setError(error);
                            setFetchingUser(false);
                        }

                        resolve();
                    });
            });
        }

        async function verifyUser(user) {
            return new Promise((resolve) => {
                fetch("/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...user }),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to verify user");
                        }

                        return response.json();
                    })
                    .then((data) => {
                        resolve(!!data);
                    })
                    .catch((error) => {
                        console.log(error);
                        resolve(false);
                    });
            });
        }

        async function setUserFromLocalStorage() {
            return new Promise((resolve) => {
                (async () => {
                    let storedUser = JSON.parse(localStorage.getItem("user"));

                    if (storedUser) {
                        let storedUserVerified = await verifyUser(storedUser);
                        if (storedUserVerified) {
                            storedUser = {
                                ...storedUser,
                                loggedIn: true,
                            };
                        } else {
                            storedUser = { ...EMPTY_USER };
                        }
                    }

                    if (isMounted) {
                        setUser({
                            ...storedUser,
                        });
                        setFetchingUser(false);
                    }

                    resolve(storedUser);
                })();
            });
        }

        async function fetchOrLoadUser() {
            let storedUser = await setUserFromLocalStorage();

            if (!storedUser?._id) {
                await setUserByFetching();
            }
        }

        fetchOrLoadUser();

        return () => {
            controller.abort();
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (user?._id) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user?._id]);

    return (
        <UserContext.Provider value={{ user, setUser, fetchingUser, setFetchingUser }}>{children}</UserContext.Provider>
    );
}

export function useUserContext() {
    return React.useContext(UserContext);
}
