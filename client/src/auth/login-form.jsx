import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import PropTypes from 'prop-types';


import { UserContext } from "../store/user-context";

/**
 * Renders the login form component.
 *
 * The login form component contains the email and password fields.
 * The user can submit the form to login.
 *
 * If the login is successful, the user is set in the context and the login modal is closed.
 *
 *@param {Object} props - The component props.
 *@param {Function} props.setLoginModalOpen - The function to set the login modal open state.
 *@returns {JSX.Element} The rendered component.
 *@example
 *<LoginForm setLoginModalOpen={setLoginModalOpen} />
 *@example
 *const [loginModalOpen, setLoginModalOpen] = useState(false);
 *<LoginForm setLoginModalOpen={setLoginModalOpen} />
 */
const LoginForm = ({ setLoginModalOpen }) => {
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();

    const {setUser} = useContext(UserContext);
    const [loginError, setLoginError] = useState("");


    const onSubmit = (data) => {
        // If there were multiple login attempts, clear the previous error message
        setLoginError("");

        // Send the login request to the server
        fetch("/api/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                checkSuccessfulLogin(data);
            })
            .catch((err) => {
                console.log(err);
                checkSuccessfulLogin({ status: 0 });
            });

        // Check if the login was successful
        // If it was, set the user and close the login modal
        // If it wasn't, display an error message
        let checkSuccessfulLogin = (data) => {
            if (data.status) {
                setLoginError("");
                setUser(() => {
                    return {
                        ...data.user,
                        loggedIn: true
                    }
                });
                setLoginModalOpen(false);
            }
            else {
                setLoginModalOpen(true);
                setLoginError("Wrong Credentials");
            }
        };
    };

    return (
        <Form className='mt-3' onSubmit={handleSubmit(onSubmit)}>
            {loginError && <Alert variant="danger">{loginError}</Alert>}
            <Form.Group className="mb-3" controlId="loginFormBasicEmail">
                <Form.Control
                    type="input"
                    placeholder="Email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Invalid email address'
                        },
                    })}
                    isInvalid={
                        !!errors.email
                    }
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginFormBasicPassword">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: 'Password is required' })}
                    isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                </Form.Control.Feedback>
            </Form.Group>
            <div className="mb-1 d-flex flex-column align-items-center justify-content-center p-1">
                <Button className='w-50 bg-success' variant="primary" type="submit" disabled={isSubmitSuccessful && !loginError}>
                    {isSubmitSuccessful && !loginError ? <Spinner animation="border" role="status" /> : <big>Login</big>}
                </Button>
            </div>
        </Form>
    );
};

LoginForm.propTypes = {
    setLoginModalOpen: PropTypes.func.isRequired
};

export default LoginForm;
