import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, InputGroup, Alert, Spinner } from 'react-bootstrap';

import PropTypes from 'prop-types';
import { UserContext } from './store/user-context';

const STEPS = {
    EMAIL: "email",
    OTP: "otp",
    RESEND_OTP: "resend_otp",
    PASSWORD: "password",
};

const RegisterForm = ({ setLoginModalOpen }) => {
    RegisterForm.propTypes = {
        setLoginModalOpen: PropTypes.func.isRequired
    };


    const [step, setStep] = useState(STEPS.EMAIL);

    const [email, setEmail] = useState("");

    return (
        <>
            {step === STEPS.EMAIL && <EmailForm setStep={setStep} setEmail={setEmail} />}
            {step === STEPS.OTP && <OTPForm setStep={setStep} email={email} />}
            {step === STEPS.PASSWORD && <PasswordForm setLoginModalOpen={setLoginModalOpen} email={email} />}
        </>
    );
};

const EmailForm = ({ setStep, setEmail }) => {
    EmailForm.propTypes = {
        setStep: PropTypes.func.isRequired,
        setEmail: PropTypes.func.isRequired
    };


    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();

    const [emailStepError, setEmailStepError] = useState("");


    const onSubmit = (formData) => {
        setEmailStepError("");

        fetch("/api/register", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: formData.email, step: STEPS.EMAIL })
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                console.log(response);
                checkSuccessfulEmail({ ...response, email: formData.email });
            })
            .catch((err) => {
                console.log(err);
                checkSuccessfulEmail({ status: 0 });
            }
            );

        // Check if the mail was sent successfully
        // If it was, close the register form and open the OTP form
        // If it wasn't, display an error message
        let checkSuccessfulEmail = (fetchedResponse) => {
            let { status, email } = fetchedResponse;
            if (status === 1) {
                setEmailStepError("");
                setEmail(email);
                setStep(STEPS.OTP);
            }
            else if (status === 2) {
                setEmailStepError("User with this email already exists");
            }
            else {
                setEmailStepError("An error occurred while sending the email");
            }
        };
    };

    return (
        <Form className='mt-3' onSubmit={handleSubmit(onSubmit)}>
            {emailStepError && <Alert variant="danger">{emailStepError}</Alert>}
            <Form.Group className="mb-3" controlId="registerFormBasicEmail">
                <Form.Label className="text-center w-100" style={{ fontSize: "14px" }}> An email will be sent to this address with an OTP</Form.Label>
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
                <Button className='w-50 bg-success' variant="primary" type="submit" disabled={isSubmitSuccessful && !emailStepError}>
                    {isSubmitSuccessful && !emailStepError ? <Spinner animation="border" role="status" /> : <big>Send OTP</big>}
                </Button>
            </div>
        </Form>
    );
}

const OTPForm = ({ setStep, email }) => {
    OTPForm.propTypes = {
        setStep: PropTypes.func.isRequired,
        email: PropTypes.func.isRequired
    };

    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();

    const [otpStepError, setOtpStepError] = useState("");

    const [resendingOTP, setResendingOTP] = useState(false);

    const sendFetchRequest = async (formData, step) => {
        return new Promise((resolve, reject) => {
            fetch("/api/register", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...formData, step: step })
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    resolve(data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                }
                );
        });
    };

    const onSubmit = (data) => {
        setOtpStepError("");
        let res = sendFetchRequest(data, STEPS.OTP);
        res.then((data) => {
            if (data.status === 1) {
                setOtpStepError("");
                setStep(STEPS.PASSWORD);
            }
            else {
                setOtpStepError("Incorrect OTP");
            }
        })
            .catch((err) => {
                console.log(err);
                setOtpStepError("An error occurred. Please try again later");
            }
            );
    };

    const onClickResend = async () => {
        setOtpStepError("");
        setResendingOTP(true);
        try {
            console.log(email);
            let res = await sendFetchRequest({ email }, STEPS.RESEND_OTP);
            setResendingOTP(false);
            if (res.status === 1) {
                setOtpStepError("");
            }
            else {
                setOtpStepError("An error occurred. Please try again later");
            }
        } catch (err) {
            console.log(err);
            setOtpStepError("An error occurred. Please try again later");
        }
    }

    return (
        <Form className='mt-3' onSubmit={handleSubmit(onSubmit)}>
            {otpStepError && <Alert variant="danger">{otpStepError}</Alert>}
            <Form.Group className="mb-3" controlId="registerFormBasicOTP">
                <Form.Label className="text-center w-100" style={{ fontSize: "14px" }}> Enter the OTP sent to your email</Form.Label>
                <Form.Control
                    type="input"
                    placeholder="OTP"
                    {...register('otp', {
                        required: 'OTP is required',
                        pattern: {
                            value: /^[a-zA-Z0-9]{8}$/,
                            message: 'Invalid OTP'
                        },
                    })}
                    isInvalid={
                        !!errors.otp
                    }
                />
                <Form.Control.Feedback type="invalid">
                    {errors.otp?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <div className="md-1 d-flex flex-column align-items-center justify-content-center gap-2">
                <Button className='w-50 bg-success' variant="primary" type="submit" disabled={isSubmitSuccessful && !otpStepError}>
                    {isSubmitSuccessful && !otpStepError ? <Spinner animation="border" role="status" /> : <big>Verify</big>}
                </Button>

                <Button className='w-50' variant="primary" disabled={resendingOTP} onClick={onClickResend}>
                    {resendingOTP ? <Spinner animation="border" role="status" /> : <big>Resend</big>}
                </Button>
            </div>
        </Form>
    );
}

const PasswordForm = ({ setLoginModalOpen, email }) => {
    PasswordForm.propTypes = {
        setLoginModalOpen: PropTypes.func.isRequired,
        email: PropTypes.func.isRequired
    };

    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, watch } = useForm();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const [passwordStepError, setPasswordStepError] = useState("");

    let [, setUser,] = useContext(UserContext);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const onSubmit = (formData) => {
        setPasswordStepError("");

        fetch("/api/register", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                username: formData.username,
                password: formData.password,
                step: STEPS.PASSWORD
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                console.log(response);
                checkSuccessfulPassword(response);
            })
            .catch((err) => {
                console.log(err);
                checkSuccessfulPassword({ status: 0 });
            }
            );

        // Check if the password was set successfully
        // If it was, close the register form and open the login modal
        // If it wasn't, display an error message
        let checkSuccessfulPassword = (data) => {
            if (data.status === 1) {
                setPasswordStepError("");
                setLoginModalOpen(false);
                setUser({
                    email: email,
                    username: formData.username,
                });
            }
            else {
                setPasswordStepError("An error occurred while setting the password");
            }
        };
    };

    return (
        <Form className='mt-3' onSubmit={handleSubmit(onSubmit)}>
            {passwordStepError && <Alert variant="danger">{passwordStepError}</Alert>}

            <Form.Group className="mb-3" controlId="registerFormBasicUsername">
                <Form.Control
                    type="input"
                    placeholder="Username"
                    {...register('username', {
                        required: 'Username is required',
                        validate: {
                            startsWithLetter: value => /^[a-zA-Z]/.test(value) || 'Username must start with a letter',
                            minLength: value => value.length >= 3 || 'Username must be at least 3 characters long',
                            noSpaces: value => !/\s/.test(value) || 'Username must not contain spaces',
                        }
                    })}
                    isInvalid={
                        !!errors.username
                    }
                />
                <Form.Control.Feedback type="invalid">
                    {errors.username?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerFormBasicPassword">
                <InputGroup>
                    <Form.Control
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Password"
                        {...register('password', {
                            required: 'Password is required',
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&._!])[A-Za-z\d@$!%*?&._!]{3,}$/,
                                message: 'Password must contain at least 1 letter, 1 number, 1 special character, and be at least 3 characters long'
                            },
                        })}
                        isInvalid={!!errors.password}
                    />
                    <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                        {passwordVisible ? "Hide" : "Show"}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                        {errors.password?.message}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerFormBasicConfirmPassword">
                <InputGroup>
                    <Form.Control
                        type={confirmPasswordVisible ? "text" : "password"}
                        placeholder="Confirm Password"
                        {...register('confirmPassword', {
                            required: 'Confirm Password is required',
                            validate: value => value === watch('password') || 'Passwords do not match'
                        })}
                        isInvalid={!!errors.confirmPassword}
                    />
                    <Button variant="outline-secondary" onClick={toggleConfirmPasswordVisibility}>
                        {confirmPasswordVisible ? "Hide" : "Show"}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword?.message}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <div className="mb-1 d-flex align-items-center justify-content-center p-1">
                <Button className='w-50 bg-success' variant="primary" type="submit" disabled={isSubmitSuccessful && !passwordStepError}>
                    {isSubmitSuccessful && !passwordStepError ? <Spinner animation="border" role="status" /> : <big>Create Account</big>}
                </Button>
            </div>
        </Form>
    );
}

export default RegisterForm;
