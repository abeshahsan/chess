import Modal from "react-bootstrap/Modal";
import { useEffect, useRef, useState } from "react";
import { Form, Button, InputGroup, Alert, Spinner } from "react-bootstrap";
import { useUserContext } from "../../Contexts/UserContext";
import { useWebsocketContext } from "../../Contexts/WebSocketContext";
import { useNavigate } from "react-router-dom";

const NewGameModal = ({ open, setOpen, gameCode, setGameCode, player1, player2 }) => {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { subscribe, socket: ws } = useWebsocketContext();
    const subscriptionsRef = useRef([]);
    const [errorAlert, setErrorAlert] = useState("");

    const [matchStarting, setMatchStarting] = useState(false);

    const startMatch = () => {
        if (ws && ws.readyState === ws.OPEN) {
            subscriptionsRef.current.push(
                subscribe("start-match", (msg) => {
                    console.log("start-match", msg.data);
                    if (msg.data.error) {
                        setErrorAlert("An error occurred while starting the match");
                    } else {
                        setOpen(false);
                    }
                    setMatchStarting(false);
                })
            );

            ws.send(
                JSON.stringify({
                    type: "start-match",
                    data: {
                        gameCode: gameCode,
                        player1,
                        player2,
                    },
                })
            );
            setMatchStarting(true);
        }
    };

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
                <Alert variant="danger" show={!!errorAlert} >{errorAlert}</Alert>
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

function NewGameForm({ setOpen, gameCode }) {
    return (
        <>
            <CopyGameCodeForm gameCode={gameCode} />
        </>
    );
}

const CopyGameCodeForm = ({ gameCode }) => {
    const navigate = useNavigate();

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
        <Form className="mt-3">
            {newGameCodeError && <Alert variant="danger">{newGameCodeError}</Alert>}
            <Form.Group
                className="mb-3"
                controlId="joinGameFormBasicGameCodeCopy"
            >
                <InputGroup>
                    <Form.Control
                        disabled
                        readOnly
                        value={gameCode}
                        style={{ fontSize: "12px", color: "blue" }}
                        className="bg-light"
                    />
                    <Button
                        variant="primary"
                        onClick={handleCopy}
                        className={copySuccess ? "btn-success" : ""}
                    >
                        {copySuccess ? "Copied!" : "Copy"}
                    </Button>
                </InputGroup>
            </Form.Group>
        </Form>
    );
};

export default NewGameModal;
