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

    // console.log(player1, player2);

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
                <div className="container d-flex align-items-center justify-content-center">
                    <div className="container">
                        <NewGameForm
                            setOpen={setOpen}
                            gameCode={gameCode}
                        />
                        <div>
                            {"Player 1: " + player1?.username}
                        </div>
                        <div>
                            {"Player 2: " + player2?.username}
                            </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex align-items-center justify-content-center"></Modal.Footer>
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
