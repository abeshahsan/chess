import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { HOME_PAGE_OPTIONS } from "./HomePageOptions.js";

import NewGameModal from "./NewGameModal.jsx";

import LoginFullScreenModal from "../../Components/Auth/LoginModal.jsx";

import { UserContext } from "../../Contexts/UserContext.jsx";

export default function HomePageMainContainer() {
    let { user } = useContext(UserContext);

    const [currentOption, setCurrentOption] = useState(0);

    function onClickStart() {
        if (user?.loggedIn) {
            setCurrentOption(HOME_PAGE_OPTIONS.NEW_GAME_MODAL);
        } else {
            setCurrentOption(HOME_PAGE_OPTIONS.LOGIN);
        }
    }

    return (
        <>
            <NewGameModal
                open={currentOption === HOME_PAGE_OPTIONS.NEW_GAME_MODAL}
                setOpen={setCurrentOption}
            />
            <LoginFullScreenModal
                loginModalOpen={currentOption === HOME_PAGE_OPTIONS.LOGIN}
                setLoginModalOpen={setCurrentOption}
            />

            <div className="container w-100 h-100 d-flex align-items-center justify-items-center">
                <Button
                    onClick={onClickStart}
                    variant="primary"
                >
                    Start a new match
                </Button>
            </div>
        </>
    );
}
