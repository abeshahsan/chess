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
    const [registrationError, setRegistrationError] = useState("");


    const onSubmit = (data) => {
        setRegistrationError("");
        console.log(data.email);

        fetch("/api/send-email", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: data.email, type: "register" })
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if (data.error) {
                    setRegistrationError(data.error);
                } else {
                    setRegistrationError("");
                    setLoginModalOpen(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setLoginModalOpen(true);
                setRegistrationError("An error occurred while registering");
            }
            );

        // fetch("/api/register", {
        //     method: "POST",
        //     headers: {
        //         'Accept': 'application/json',
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((data) => {
        //         console.log(data);
        //         if (data.error) {
        //             setRegistrationError(data.error);
        //         } else {
        //             setRegistrationError("");
        //             setLoginModalOpen(false);
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         setRegistrationError("An error occurred while registering");
        //     }
        //     );
    };

    return (
        <Form className='mt-3' onSubmit={handleSubmit(onSubmit)}>
            {registrationError && <Alert variant="danger">{registrationError}</Alert>}
            <Form.Group className="mb-3" controlId="registerFormBasicEmail">
                <Form.Label className="text-center w-100" style={{ fontSize: "12px" }}> An email will be sent to this address with an OTP</Form.Label>
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

            <div className="mb-1 d-flex flex-column align-items-center justify-content-center p-1">
                <Button className='w-50 bg-success' variant="primary" type="submit" disabled={isSubmitSuccessful && !registrationError}>
                    {isSubmitSuccessful && !registrationError ? <Spinner animation="border" role="status" /> : <big>Send OTP</big>}
                </Button>
            </div>
        </Form>
    );
};

RegisterForm.propTypes = {
    setLoginModalOpen: PropTypes.func.isRequired
};

export default RegisterForm;
