import Modal from "react-bootstrap/Modal";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { Form, Button, InputGroup, Alert, Spinner } from "react-bootstrap";

import PropTypes from "prop-types";

const NewGameModal = ({ open, setOpen }) => {
    NewGameModal.propTypes = {
        open: PropTypes.bool.isRequired,
        setOpen: PropTypes.func.isRequired,
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
            <Modal.Header
                closeButton
                className="d-flex align-items-center justify-content-center no-select"
            >
                <Modal.Title className="w-100 text-center">
                    <div>Please Login or Register</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container d-flex align-items-center justify-content-center">
                    <div className="container">
                        <NewGameForm setOpen={setOpen} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex align-items-center justify-content-center"></Modal.Footer>
        </Modal>
    );
};

function NewGameForm({ setOpen }) {
    NewGameForm.propTypes = {
        setOpen: PropTypes.func.isRequired,
    };

    return (
        <>
            <CopyGameCodeForm setOpen={setOpen} />
            <NewGameCodeForm setOpen={setOpen} />
        </>
    );
}

const NewGameCodeForm = ({ setOpen }) => {
    NewGameCodeForm.propTypes = {
        setOpen: PropTypes.func.isRequired,
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const [newGameCodeError] = useState("");

    function onSubmit() {
        setOpen(false);
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
                            pattern: {
                                value: /^[a-zA-Z0-9]{6}$/,
                                message: "Invalid Game Code",
                            },
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

const CopyGameCodeForm = () => {
    CopyGameCodeForm.propTypes = {
        setOpen: PropTypes.func.isRequired,
    };

    const [newGameCodeError, setNewGameCodeError] = useState("");
    const [copySuccess, setCopySuccess] = useState(false);
    const gameCode = "Game Code";

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
                controlId="joinGameFormBasicGameCode"
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
