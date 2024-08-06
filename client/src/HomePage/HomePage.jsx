
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/user-context";
import { Button } from "react-bootstrap";
import { HOME_PAGE_OPTIONS } from "./HomePageOptions";

import NewGameModal from "./NewGameModal";

import LoginFullScreenModal from "../auth/login-full-screen-modal.jsx";


export default function HomePage() {

    let { user } = useContext(UserContext);

    const [currentOption, setCurrentOption] = useState(0);

    function onClickStart() {
        if (user?.loggedIn) {
            setCurrentOption(HOME_PAGE_OPTIONS.NEW_GAME_MODAL);
        }
        else {
            setCurrentOption(HOME_PAGE_OPTIONS.LOGIN);
        }
    }

    return (
        <>
            <NewGameModal open={currentOption === HOME_PAGE_OPTIONS.NEW_GAME_MODAL} setOpen={setCurrentOption} />
            <LoginFullScreenModal loginModalOpen={currentOption === HOME_PAGE_OPTIONS.LOGIN} setLoginModalOpen={setCurrentOption} />
            <div className="container w-100 h-100 d-flex align-items-center justify-items-center">
                <Button onClick={onClickStart} variant="primary">
                    Start a new match
                </Button>
            </div>
        </>
    );
}
