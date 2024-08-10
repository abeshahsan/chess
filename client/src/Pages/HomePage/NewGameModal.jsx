import Modal from "react-bootstrap/Modal";
import { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { Form, Button, InputGroup, Alert, Spinner } from "react-bootstrap";

import PropTypes from "prop-types";
import { useUserContext } from "../../Contexts/UserContext";
import { useWebsocketContext } from "../../Hooks/useWebsocketContext";

const NewGameModal = ({ open, setOpen }) => {
    const { user } = useUserContext();
    const [gameCode, setGameCode] = useState("");

    const ws = useWebsocketContext();

    useEffect(() => {
        if (!ws || gameCode) return;

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

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);

            switch (message.type) {
                case "generate-game-code":
                    setGameCode(message.data.gameCode);
                    break;
                case "match-game-code":
                    setOpen(false);
                    break;
                default:
                    break;
            }
        };
    }, [ws?.readyState, user._id]);

    return (
        <Modal
            show={open}
            backdrop="static"
            onHide={() => {
                setOpen(false);
            }}
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
    NewGameForm.propTypes = {
        setOpen: PropTypes.func.isRequired,
    };

    return (
        <>
            <CopyGameCodeForm
                setOpen={setOpen}
                gameCode={gameCode}
            />
            <NewGameCodeForm setOpen={setOpen} />
        </>
    );
}

const NewGameCodeForm = ({ setOpen }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    let controller = new AbortController();
    let signal = controller.signal;

    const [newGameCodeError, setNewGameCodeError] = useState("");

    const ws = useWebsocketContext();
    const { user } = useUserContext();

    function onSubmit(data) {
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

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);

            console.log("Received message:", message);

            if (message.data.status === 1) {
                setOpen(false);
            } else {
                setNewGameCodeError("Invalid game code");
            }
        };
    }

    return (
        <Form
            className="mt-3"
            onSubmit={handleSubmit(onSubmit)}
        >
            {newGameCodeError && <Alert variant="danger">{newGameCodeError}</Alert>}
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
                        disabled={isSubmitSuccessful && !newGameCodeError}
                    >
                        {isSubmitSuccessful && !newGameCodeError ? (
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
    CopyGameCodeForm.propTypes = {
        setOpen: PropTypes.func.isRequired,
    };

    const [newGameCodeError, setNewGameCodeError] = useState("");
    const [copySuccess, setCopySuccess] = useState(false);

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
                        style={copySuccess ? { backgroundColor: "green" } : {}}
                    >
                        {copySuccess ? "Copied!" : "Copy"}
                    </Button>
                </InputGroup>
            </Form.Group>
        </Form>
    );
};

export default NewGameModal;
