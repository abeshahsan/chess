import 'bootstrap/dist/css/bootstrap.min.css';


import "./App.css";
import "./global.css";

import LoginFullScreenModal from "./Components/Auth/LoginModal.jsx";

import Layout from "./Routes/Layout.jsx";

const App = () => {
    return (
        <>
            <LoginFullScreenModal />
            <Layout />
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
