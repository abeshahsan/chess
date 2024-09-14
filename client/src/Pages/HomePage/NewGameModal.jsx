import Modal from "react-bootstrap/Modal";
import { useEffect, useRef, useState } from "react";
import { Button, InputGroup, Alert, Spinner } from "react-bootstrap";
import { useUserContext } from "../../Contexts/UserContext";
import { useWebsocketContext } from "../../Contexts/WebSocketContext";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const NewGameModal = ({ open, setOpen, player1, player2, setPlayer1, setPlayer2, setMatch }) => {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { subscribe, socket: ws } = useWebsocketContext();
    const subscriptionsRef = useRef([]);
    const [errorAlert, setErrorAlert] = useState("");

    const [matchStarting, setMatchStarting] = useState(false);

    let { gameID: gameCode } = useParams();
    const subscriptions = useRef([]);

    const { isNavigatedProgrammatically } = useSelector((state) => state.navigation);

    subscriptionsRef.current.push(
        subscribe("start-match", (msg) => {
            // console.log("start-match", msg.data);
            if (msg.status === "error") {
                setErrorAlert("An error occurred while starting the match");
            } else {
                setMatch(msg.data);
                setOpen(false);
            }
            setMatchStarting(false);
        })
    );

    const startMatch = () => {
        if (ws && ws.readyState === ws.OPEN) {
            ws.send(
                JSON.stringify({
                    type: "start-match",
                    data: {
                        gameCode: gameCode,
                        player1: { ...player1, color: "white" },
                        player2: { ...player2, color: "black" },
                    },
                })
            );
            setMatchStarting(true);
        }
    };

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (isNavigatedProgrammatically) {
            setPlayer1(user);
            // console.log("waiting for player 2 to join");
            if (ws && ws.readyState === ws.OPEN) {
                subscriptions.current.push(
                    subscribe("join-game", (msg) => {
                        // console.log("Player 2 joined the game", msg.data);
                        setPlayer2(msg.data.invitee);
                    })
                );
            }
        } else {
            // This player is the invitee
            if (ws && ws.readyState === ws.OPEN) {
                subscriptions.current.push(
                    subscribe("join-game", (msg) => {
                        // console.log("join-game", msg.data);
                        setPlayer1(msg.data.host);
                        setPlayer2(msg.data.invitee);
                    })
                );

                ws.send(
                    JSON.stringify({
                        type: "join-game",
                        data: { gameCode: gameCode },
                    })
                );
            }
        }

        return () => {
            subscriptions.current.forEach((unsubscribe) => {
                unsubscribe();
            });
            abortController.abort();
        };
    }, [ws?.readyState, matchStarting, isNavigatedProgrammatically]);

    return (
        <Modal
            show={open}
            backdrop="static"
            onHide={() => setOpen(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            keyboard={false}
        >
            <Modal.Header className="d-flex align-items-center justify-content-center no-select">
                <Modal.Title className="w-100 text-center">
                    <div>Start a new game</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert
                    variant="danger"
                    show={!!errorAlert}
                >
                    {errorAlert}
                </Alert>
                <div className="container d-flex flex-column align-items-center justify-content-center">
                    <div className="container">
                        <NewGameForm
                            setOpen={setOpen}
                            gameCode={window.origin + "/game/" + gameCode}
                        />
                        <div>Player 1: {player1?.username}</div>
                        <div>Player 2: {player2?.username}</div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex align-items-center justify-content-center">
                <Button
                    variant={!player2?._id || matchStarting ? "secondary" : "success"}
                    style={{ width: "40%", opacity: "0.8", fontSize: "1.2rem", padding: "5px" }}
                    disabled={matchStarting || !player2?._id}
                    onClick={startMatch}
                >
                    {matchStarting ? (
                        <Spinner
                            animation="border"
                            size="sm"
                        />
                    ) : (
                        "Start"
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

function NewGameForm({ gameCode }) {
    const [copySuccess, setCopySuccess] = useState(false);
    const [newGameCodeError, setNewGameCodeError] = useState("");

    const handleCopy = () => {
        navigator.clipboard
            .writeText(gameCode)
            .then(() => {
                setCopySuccess(true);
                setNewGameCodeError("");
                setTimeout(() => setCopySuccess(false), 2000);
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
                setNewGameCodeError("Failed to copy game code");
                setCopySuccess(false);
            });
    };

    return (
        <div className="mt-3">
            <Alert
                variant="danger"
                show={!!newGameCodeError}
            >
                {newGameCodeError}
            </Alert>
            <div
                className="mb-3"
                id="joinGameFormBasicGameCodeCopy"
            >
                <InputGroup>
                    <input
                        type="text"
                        disabled
                        readOnly
                        value={gameCode}
                        style={{ fontSize: "10px", color: "blue" }}
                        className="form-control bg-light"
                    />
                    <Button
                        variant="primary"
                        onClick={handleCopy}
                        className={copySuccess ? "btn-success" : ""}
                    >
                        {copySuccess ? "Copied!" : "Copy"}
                    </Button>
                </InputGroup>
            </div>
        </div>
    );
}

export default NewGameModal;
