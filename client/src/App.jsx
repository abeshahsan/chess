import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./global.css";

import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./Components/Header/Header";
import { Sidebar } from "./Components/sidebar.jsx";
import LoginFullScreenModal from "./Components/Auth/LoginModal.jsx";

import HomePage from "./Pages/HomePage/HomePage.jsx";
import Users from "./Pages/Users.jsx";
import Profile from "./Pages/Profile.jsx";
import NotFoundPage from "./Pages/NotFound.jsx";

import { UserContext } from "./Contexts/UserContext.jsx";

const App = () => {
    let [allUsers, setAllUsers] = useState(undefined);

    let [loginModalOpen, setLoginModalOpen] = useState(false);

    useEffect(() => {
        document.title = "Chess";
        fetch("/api/get-all-users")
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                setAllUsers(response.users.data);
                // console.log(response.users.data);
            });
    }, []);

    let { user, setUser } = useContext(UserContext);

    let [fetchingUser, setFetchingUser] = useState(true);

    useEffect(() => {
        setFetchingUser(true);

        fetch("/api/current-user")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.user) {
                    setUser(() => {
                        return {
                            ...user,
                            ...data.user,
                            loggedIn: true,
                        };
                    });
                } else {
                    setUser(() => {
                        return {
                            ...user,
                        };
                    });
                }
                setFetchingUser(false);
            });
    }, []);

    return (
        <>
            <LoginFullScreenModal
                loginModalOpen={loginModalOpen}
                setLoginModalOpen={setLoginModalOpen}
            ></LoginFullScreenModal>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Header
                                    fetchingUser={fetchingUser}
                                    setLoginModalOpen={setLoginModalOpen}
                                />
                                <div className="main-container d-flex align-items-center justify-content-center">
                                    <Sidebar />
                                    <HomePage />
                                    {/* <ChessboardComponent /> */}
                                </div>
                            </>
                        }
                    ></Route>
                    <Route
                        path="/users"
                        element={
                            <>
                                <Header
                                    fetchingUser={fetchingUser}
                                    setLoginModalOpen={setLoginModalOpen}
                                />
                                <div className="main-container d-flex align-items-center justify-content-center">
                                    <Sidebar />
                                    <Users users={allUsers}></Users>
                                </div>
                            </>
                        }
                    ></Route>
                    <Route
                        path={user && `${user._id}/profile`}
                        element={
                            <>
                                <Header
                                    fetchingUser={fetchingUser}
                                    setLoginModalOpen={setLoginModalOpen}
                                />
                                <div className="main-container d-flex align-items-center justify-content-center">
                                    <Sidebar />
                                    <div className="container game-container">
                                        <Profile></Profile>
                                    </div>
                                </div>
                            </>
                        }
                    ></Route>
                    <Route
                        path="*"
                        element={
                            <>
                                <NotFoundPage></NotFoundPage>
                            </>
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;

// import React, { useRef, useState } from 'react';

// const ComponentWithCoordinates = () => {
//   const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
//   const componentRef = useRef(null);

//   const moveComponent = (newX, newY) => {
//     setCoordinates({ x: newX, y: newY });
//   };

//   return (
//     <div
//       style={{
//         position: 'absolute',
//         width: '100px',
//         height: '100px',
//         backgroundColor: '#00f',
//         color: '#fff',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         cursor: 'pointer',
//         transition: 'transform 0.5s ease-in-out',
//         transform: `translate(${coordinates.x}px, ${coordinates.y}px)`
//       }}
//       onClick={() => moveComponent(Math.random() * 300, Math.random() * 300)}
//     >
//       Component Content
//     </div>
//   );
// };

// export default ComponentWithCoordinates;

// import { useState } from 'react';
// import useWebSocket, { ReadyState } from 'react-use-websocket';

// function App() {
//     const [input, setInput] = useState('');
//     const [messages, setMessages] = useState([]);

//     const { sendMessage, readyState } = useWebSocket('ws://localhost:3000', {
//         onOpen: () => console.log('Connected to the WebSocket server'),
//         onClose: () => console.log('Disconnected from the WebSocket server'),
//         onMessage: (message) => {
//             const parsedMessage = JSON.parse(message.data);

//             setMessages(() => parsedMessage.data);
//         },
//     });

//     const handleClickSendMessage = () => {
//         sendMessage(JSON.stringify({
//             data: [...messages, input],
//         }));
//         setInput('');
//     };

//     return (
//         <div className="App">
//             <h1>WebSocket Chat</h1>
//             <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//             />
//             <button onClick={handleClickSendMessage} disabled={readyState !== ReadyState.OPEN}>Send</button>
//             <ul>
//                 {messages.map((message, index) => (
//                     <li key={index}>{message}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default App;
