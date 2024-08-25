import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import NewGameModal from "./NewGameModal.jsx";

import LoginFullScreenModal from "../../Components/Auth/LoginModal.jsx";

import { useUserContext } from "../../Contexts/UserContext.jsx";
import { Header } from "../../Components/Header/Header.jsx";
import { Sidebar } from "../../Components/Sidebar.jsx";
import { FlagsContext } from "../../Contexts/FlagsContext.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNavigatedProgrammatically } from "../../.redux/features/navigation/NavigationSlice.js";

export default function HomePage() {
    return (
        <>
            <Header />
            <div className="main-container d-flex align-items-center justify-content-center">
                <Sidebar />
                <HomePageMainContainer />
            </div>
        </>
    );
}

function HomePageMainContainer() {
    const navigate = useNavigate();

    let { user } = useUserContext();
    let { setLoginModalOpen } = useContext(FlagsContext);

    const dispatch = useDispatch();

    const onClickStart = () => {
        if (!user.loggedIn) {
            setLoginModalOpen(true);
            return;
        }
        localStorage.setItem("isNavigatedProgrammatically", true);
        navigate("/game/creating-new-game");
    };

    return (
        <>
            <LoginFullScreenModal />

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
