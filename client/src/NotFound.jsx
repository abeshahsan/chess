import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="container-fluid d-flex align-items-center 
                            justify-content-center"
                style={{ "width": "100%", height: "100%" }}
            >
                <div className="container-fluid d-flex flex-column align-items-center 
                            justify-content-center border rounded-2 bg-light mt-5"
                    style={{ "width": "50%", height: "70%" }}
                >
                    <h1>404 - Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                    <button className='btn btn-outline-success' onClick={() => navigate("/")}>Go to home page</button>
                    <br />
                    <button className='btn btn-warning' onClick={() => window.history.back()}>Go Back</button>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
