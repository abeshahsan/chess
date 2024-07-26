
import Modal from 'react-bootstrap/Modal';
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

import PropTypes from "prop-types"
import Tabs from 'react-bootstrap/esm/Tabs';
import Tab from 'react-bootstrap/esm/Tab';

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
                <div className="container d-flex align-items-center justify-content-center">
                    <div className="container">
                        <LoginModalTabs setLoginModalOpen={setLoginModalOpen}/>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className='d-flex align-items-center justify-content-center'>

            </Modal.Footer>
        </Modal>
    );
}

function LoginModalTabs({setLoginModalOpen}) {
    LoginModalTabs.propTypes = {
        setLoginModalOpen: PropTypes.func.isRequired
    }
    return (
        <Tabs
            defaultActiveKey="login"
            className="mb-3"
        >
            <Tab eventKey="login" title="Login">
                <LoginForm setLoginModalOpen={setLoginModalOpen} />
            </Tab>
            <Tab eventKey="register" title="Register">
                <RegisterForm setLoginModalOpen={setLoginModalOpen} />
            </Tab>
        </Tabs>
    );
}

export default LoginFullScreenOverlay;
