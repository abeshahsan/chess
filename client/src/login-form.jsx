import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Spinner from 'react-bootstrap/esm/Spinner';
import Form from 'react-bootstrap/Form';

import PropTypes from "prop-types"

const LoginForm = ({ setLoginModalOpen }) => {

    LoginForm.propTypes = {
        setLoginModalOpen: PropTypes.func.isRequired
    }

    let [loginProcessing, setLoginProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginProcessing(true);
        setTimeout(() => {
            setLoginModalOpen(false);
            setLoginProcessing(false);
        }, 1000);
    };

    return (
        <Form noValidate validated={null} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Email" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" required/>
                
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <div className="mb-1 d-flex flex-column align-items-center justify-content-center p-1">
                <Button className='w-50 bg-success' variant="primary" type="submit" disabled={loginProcessing}>
                    {loginProcessing ? <Spinner animation="border" role="status" /> : <big>Submit</big>}
                </Button >
            </div>
        </Form>
    );
};

export default LoginForm;
