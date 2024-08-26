import { useState, useEffect } from "react";

export function useFetchAllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetch("/api/get-all-users", { signal })
            .then((res) => res.json())
            .then((data) => {
                setUsers(() => [...data.users]);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });

        return () => {
            controller.abort();
        };
    }, []);

    return { users, loading, error };
}
