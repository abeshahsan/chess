
import Modal from 'react-bootstrap/Modal';
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

import PropTypes from "prop-types"
import Tabs from 'react-bootstrap/esm/Tabs';
import Tab from 'react-bootstrap/esm/Tab';


import "./login-full-screen-modal.css";

const LoginFullScreenModal = ({ loginModalOpen, setLoginModalOpen }) => {
    LoginFullScreenModal.propTypes = {
        loginModalOpen: PropTypes.bool.isRequired,
        setLoginModalOpen: PropTypes.func.isRequired
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
                <div className="container d-flex align-items-center justify-content-center">
                    <div className="container">
                        <LoginModalTabs setLoginModalOpen={setLoginModalOpen} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='d-flex align-items-center justify-content-center'>

            </Modal.Footer>
        </Modal>
    );
}

function LoginModalTabs({ setLoginModalOpen }) {
    LoginModalTabs.propTypes = {
        setLoginModalOpen: PropTypes.func.isRequired
    }
    return (
        <Tabs
            defaultActiveKey="login"
            className="mb-0"
            id="login-register-tabs"
            fill
        >
            <Tab
                eventKey="login"
                title="Login"
                className='p-2 custom-border custom-border-login border-top-0'

            >
                <LoginForm setLoginModalOpen={setLoginModalOpen} />
            </Tab>
            <Tab
                eventKey="register"
                title="Register"
                className='p-2 custom-border custom-border-register border-top-0'
            >
                <RegisterForm setLoginModalOpen={setLoginModalOpen} />
            </Tab>
        </Tabs>
    );
}

export default LoginFullScreenModal;
