import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import PropTypes from 'prop-types';


import { UserContext } from "./store/user-context";

const RegisterForm = ({ setLoginModalOpen }) => {
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();

    const [setUser] = useContext(UserContext);
    const [loginError, setLoginError] = useState("");


    const onSubmit = (data) => {
        // If there were multiple login attempts, clear the previous error message
        setLoginError("");

        // verify the login credentials from server
        let isLoginSuccess = false;

        setTimeout(() => {
            if (isLoginSuccess) {
                setLoginError("");
                setUser({
                    name: "John Doe",
                    email: data.email,
                });
                setLoginModalOpen(false);
            } else {
                setLoginModalOpen(true);
                setLoginError("Wrong Credentials");
            }
        }, 1000);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {loginError && <Alert variant="danger">{loginError}</Alert>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
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
                    {isSubmitSuccessful && !loginError ? <Spinner animation="border" role="status" /> : <big>Create Account</big>}
                </Button>
            </div>
        </Form>
    );
};

RegisterForm.propTypes = {
    setLoginModalOpen: PropTypes.func.isRequired
};

export default RegisterForm;
