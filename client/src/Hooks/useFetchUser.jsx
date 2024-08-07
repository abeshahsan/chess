import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

export function useFetchUser(dependencies = []) {
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        let controller = new AbortController();
        let signal = controller.signal;

        async function fetchUser() {
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

                if (isMounted) {
                    setUser({
                        ...data.user,
                        loggedIn: true
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

        fetchUser();

        return () => {
            controller.abort();
            isMounted = false;
        };
    }, [...dependencies]);

    return { user, setUser, loading, error };
}
