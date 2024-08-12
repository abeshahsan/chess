import Modal from "react-bootstrap/Modal";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, InputGroup, Alert, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import { useUserContext } from "../../Contexts/UserContext";
import { useWebsocketContext } from "../../Contexts/WebSocketContext";
import { useNavigate } from "react-router-dom";

const NewGameModal = ({ open, setOpen }) => {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const [gameCode, setGameCode] = useState("");
    const { subscribe, socket: ws } = useWebsocketContext();
    const subscriptionsRef = useRef([]);

    useEffect(() => {
        if (!ws) return;

        if (ws.readyState === 1) {
            ws.send(
                JSON.stringify({
                    type: "generate-game-code",
                    data: {
                        userID: user._id,
                    },
                })
            );
        }

        subscriptionsRef.current.push(
            subscribe("generate-game-code", (message) => {
                console.log("Game code: ", message.data.gameCode);

                setGameCode(message.data.gameCode);
            })
        );

        subscriptionsRef.current.push(
            subscribe("match-game-code", (message) => {
                if (message.data.status === 1) {
                    navigate(`/game/${gameCode}`); // Redirect to game page
                    setOpen(false);
                } else {
                    console.error("Failed to match game code");
                }
            })
        );

        return () => {
            subscriptionsRef.current.forEach((unsub) => unsub());
        };
    }, [ws, ws?.readyState, user._id]);

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
            <Modal.Header
                closeButton
                className="d-flex align-items-center justify-content-center no-select"
            >
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
            <JoinGameForm
                setOpen={setOpen}
                gameCode={gameCode}
            />
        </>
    );
}

const JoinGameForm = ({ setOpen, gameCode }) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const [gameCodeError, setGameCodeError] = useState("");
    const { subscribe, socket: ws } = useWebsocketContext();
    const { user } = useUserContext();
    const subscriptionsRef = useRef([]);

    const onSubmit = (data) => {
        if (!ws) return;

        ws.send(
            JSON.stringify({
                type: "match-game-code",
                data: {
                    userID: user._id,
                    gameCode: data.gameCode,
                },
            })
        );

        subscriptionsRef.current.push(
            subscribe("match-game-code", (message) => {
                if (message.data.status === 1) {
                    setOpen(false);
                    navigate(`/game/${gameCode}`); // Redirect to game page
                } else {
                    setGameCodeError("Invalid game code");
                }
            })
        );
    };

    useEffect(() => {
        return () => {
            subscriptionsRef.current.forEach((unsub) => unsub());
        };
    }, []);

    return (
        <Form
            className="mt-3"
            onSubmit={handleSubmit(onSubmit)}
        >
            {gameCodeError && <Alert variant="danger">{gameCodeError}</Alert>}
            <Form.Group
                className="mb-3"
                controlId="joinGameFormBasicGameCode"
            >
                <InputGroup>
                    <Form.Control
                        type="input"
                        placeholder="Game Code"
                        {...register("gameCode", {
                            required: "Game Code is required",
                        })}
                        isInvalid={!!errors.gameCode}
                    />
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={isSubmitSuccessful && !gameCodeError}
                    >
                        {isSubmitSuccessful && !gameCodeError ? (
                            <Spinner
                                animation="border"
                                role="status"
                            />
                        ) : (
                            <big>Join</big>
                        )}
                    </Button>
                    <Form.Control.Feedback type="invalid">{errors.gameCode?.message}</Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
        </Form>
    );
};

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
                        readOnly
                        value={gameCode}
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
