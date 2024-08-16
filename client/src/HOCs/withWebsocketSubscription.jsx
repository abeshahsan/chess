import React, { useEffect, useRef } from "react";
import { useWebsocketContext } from "../Contexts"

const withWebSocketSubscription = (eventName, WrappedComponent) => {
    const WithWebSocketSubscription = (props) => {
        const { subscribe } = useWebsocketContext();
        const subscriptionsRef = useRef([]);

        useEffect(() => {
            subscriptionsRef.current.push(subscribe(eventName, props.onEvent));

            return () => {
                subscriptionsRef.current.forEach((unsub) => unsub());
            };
        }, [eventName, props.onEvent, subscribe]);

        return <WrappedComponent {...props} />;
    };

    return WithWebSocketSubscription;
};
