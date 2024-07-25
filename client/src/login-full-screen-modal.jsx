
import Modal from 'react-bootstrap/Modal';
import LoginForm from "./login-form";

import PropTypes from "prop-types"

const LoginFullScreenOverlay = ({ loginModalOpen, setLoginModalOpen }) => {
    LoginFullScreenOverlay.propTypes = {
        loginModalOpen: PropTypes.bool,
        setLoginModalOpen: PropTypes.func
    }

    return (
        <Modal
            show={loginModalOpen}
            backdrop="static"
            onHide={() => setLoginModalOpen(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className='d-flex align-items-center justify-content-center no-select'>
                <Modal.Title className='w-100 text-center'>
                    <div>Please Login or Register</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="login-full-screen-overlay container d-flex align-items-center justify-content-center">
                    <div className="login-full-screen-overlay__content container">
                        <LoginForm setLoginModalOpen={setLoginModalOpen}/>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='d-flex align-items-center justify-content-center'>

            </Modal.Footer>
        </Modal>
    );
}

export default LoginFullScreenOverlay;
