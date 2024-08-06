/*Node module imports */
import PropTypes from "prop-types";
import Tabs from "react-bootstrap/esm/Tabs";
import Tab from "react-bootstrap/esm/Tab";
import Modal from "react-bootstrap/Modal";

/*Component imports */
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

/*CSS imports*/
import "./LoginModal.css";

/**
 * Renders the login full screen modal component.
 *
 * The login full screen modal component contains the login and register forms.
 * The user can switch between the login and register forms by clicking the tabs.
 *
 * The modal is displayed full screen.
 * When it is displayed, the user cannot interact with the rest of the page.
 * But if the user clicks outside the modal, the modal is closed.
 *
 * The modal is displayed when the loginModalOpen prop is true.
 * (say, when the user clicks any login button)
 *
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.loginModalOpen - The state to determine if the login modal is open.
 * @param {Function} props.setLoginModalOpen - The function to set the login modal open state.
 * @returns {JSX.Element} The rendered component.
 * @example
 * <LoginFullScreenModal loginModalOpen={loginModalOpen} setLoginModalOpen={setLoginModalOpen} />
 * @example
 * const [loginModalOpen, setLoginModalOpen] = useState(false);
 * <LoginFullScreenModal loginModalOpen={loginModalOpen} setLoginModalOpen={setLoginModalOpen} />
 *
 */
const LoginFullScreenModal = ({ loginModalOpen, setLoginModalOpen }) => {
    LoginFullScreenModal.propTypes = {
        loginModalOpen: PropTypes.bool.isRequired,
        setLoginModalOpen: PropTypes.func.isRequired,
    };

    return (
        <Modal
            show={loginModalOpen}
            backdrop="static"
            onHide={() => setLoginModalOpen(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
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
                        <LoginModalTabs setLoginModalOpen={setLoginModalOpen} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex align-items-center justify-content-center"></Modal.Footer>
        </Modal>
    );
};

/**
 * Renders the login modal tabs component.
 * The modal tabs component contains the login and register forms.
 *
 * The login form is rendered by default.
 *
 * The user can switch between the login and register forms by clicking the tabs.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.setLoginModalOpen - The function to set the login modal open state.
 * @returns {JSX.Element} The rendered component.
 */
function LoginModalTabs({ setLoginModalOpen }) {
    LoginModalTabs.propTypes = {
        setLoginModalOpen: PropTypes.func.isRequired,
    };
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
                className="p-2 custom-border custom-border-login border-top-0"
            >
                <LoginForm setLoginModalOpen={setLoginModalOpen} />
            </Tab>
            <Tab
                eventKey="register"
                title="Register"
                className="p-2 custom-border custom-border-register border-top-0"
            >
                <RegisterForm setLoginModalOpen={setLoginModalOpen} />
            </Tab>
        </Tabs>
    );
}

export default LoginFullScreenModal;
