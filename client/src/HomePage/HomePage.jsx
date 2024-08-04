
import { useContext, useState } from "react";
import { UserContext } from "../store/user-context";
import { Button } from "react-bootstrap";
import { HOME_PAGE_OPTIONS } from "./HomePageOptions";


export default function HomePage() {

    const {user} = useContext(UserContext);

    const [currentOption,] = useState(user?.loggedIn ? HOME_PAGE_OPTIONS.NEW_GAME_MODAL : HOME_PAGE_OPTIONS.LOGIN);

    function onClickStart() {
        switch (currentOption) {
            case HOME_PAGE_OPTIONS.LOGIN:
                return document.getElementById("nav-login-btn").click();
            case HOME_PAGE_OPTIONS.NEW_GAME_MODAL:
                return console.log("lol");

        }
    }

    return (
        <>
            <div className="container w-100 h-100 d-flex align-items-center justify-items-center">
                <Button onClick={onClickStart} variant="primary">
                    Start a new match
                </Button>
            </div>
        </>
    );
}
