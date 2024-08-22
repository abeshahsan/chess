import { useState, useEffect } from "react";
import { useUserContext } from "../Contexts/UserContext";

export function useFetchUser(dependencies = []) {
    const { user, setUser, fetchingUser: loading, setFetchingUser: setLoading } = useUserContext();

    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        let controller = new AbortController();
        let signal = controller.signal;

        async function setUserByFetching(isMounted, setUser, setLoading, setError, signal) {
            try {
                let response = await fetch(
                    "/api/current-user",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                    { signal }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }

                let data = await response.json();

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
                    setLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    setError(error);
                    setLoading(false);
                }
            }
        }

        async function setUserFromLocalStorage(isMounted, setUser, setLoading, setError) {
            try {
                let user = JSON.parse(localStorage.getItem("user"));

                if (user) {
                    user = {
                        ...user,
                        loggedIn: true,
                    };
                }

                if (isMounted) {
                    setUser({
                        ...user,
                    });
                    setLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    setError(error);
                    setLoading(false);
                }
            }
        }

        async function fetchOrLoadUser(isMounted, setUser, setLoading, setError) {
            await setUserFromLocalStorage(isMounted, setUser, setLoading, setError);

            console.log(user);


            if (!user?._id) {
                await setUserByFetching(isMounted, setUser, setLoading, setError);
                localStorage.setItem("user", JSON.stringify(user));
            }
        }

        fetchOrLoadUser(isMounted, setUser, setLoading, setError);

        return () => {
            controller.abort();
            isMounted = false;
        };
    }, [...dependencies]);

    return { user, setUser, loading, error };
}
