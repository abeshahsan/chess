import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage.jsx";
import Game from "../Pages/Game.jsx";
import Users from "../Pages/Users.jsx";
import Profile from "../Pages/Profile";
import NotFound from "../Pages/NotFound";
import { useUserContext } from "../Contexts/UserContext";
import GameCreatingNew from "../Pages/GameCreatingNew.jsx";

export default function Index() {
    let { user } = useUserContext();

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path={`/game/creating-new-game`}
                    element={<GameCreatingNew />}
                />

                {
                    <Route
                        path={`/game/:gameID`}
                        element={<Game />}
                    />
                }
                <Route
                    path="/users"
                    element={<Users />}
                />
                {user._id && (
                    <Route
                        path={`/${user._id}/profile`}
                        element={<Profile />}
                    />
                )}
                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>
        </BrowserRouter>
    );
}
