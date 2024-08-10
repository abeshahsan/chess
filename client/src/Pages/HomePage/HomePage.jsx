import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import NewGameModal from "./NewGameModal.jsx";

import LoginFullScreenModal from "../../Components/Auth/LoginModal.jsx";

import { useUserContext } from "../../Contexts/UserContext.jsx";
import { Header } from "../../Components/Header/Header.jsx";
import { Sidebar } from "../../Components/sidebar.jsx";
import { FlagsContext } from "../../Contexts/FlagsContext.jsx";

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
    let { user } = useUserContext();

    const [gameModalOpen, setGameModalOpen] = useState(false);

    let { setLoginModalOpen } = useContext(FlagsContext);

    const onClickStart = () => {
        if (user?.loggedIn) {
            setGameModalOpen(true);
            setLoginModalOpen(false);
        } else {
            setGameModalOpen(false);
            setLoginModalOpen(true);
        }
    };

    return (
        <>
            <NewGameModal
                open={gameModalOpen}
                setOpen={setGameModalOpen}
            />
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
