
const express = require('express');
const { sendEmailWithOTP } = require('./mailer');
const { findUser, insertUser, getAllUsers, checkIfEmailExists } = require('../database/data-fetch');
const argon2 = require('argon2');

const router = express.Router();

/**
 * Route for user login.
 * @name POST /login
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.post('/login', async (req, res, next) => {
    try {
        let { data: queryResult } = await findUser(req.body.email);

        let user;

        if (queryResult?.length) {
            user = queryResult[0]
            const valid = await argon2.verify(user.password, req.body.password);

            if (valid) {
                req.session.user = user;
                console.log(user);
                return res.send({
                    status: 1,
                });
            }
        }

        return res.send({
            status: 0,
        });
    } catch (error) {
        console.log(error);
        return res.send({
            error: error.message,
            status: 0,
        });
    }
});

/**
 * Route for user registration.
 * @name POST /register__
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.post('/register__', async (req, res, next) => {
    try {
        let { data: queryResult } = await findUser(req.body.email);

        let user;

        if (queryResult && queryResult.length) { //user already registered
            user = queryResult[0];
            req.session.user = user;
            return res.send({
                status: 2,
            });
        }

        try {
            await insertUser({
                email: req.body.email,
                name: req.body.name,
                picture: req.body.picture,
            });
            req.session.user = user;

        } catch (error) {
            throw new Error(error);
        }

        return res.send({
            status: 1,
        });
    } catch (err) {
        console.log(err);
        return res.send({
            error: err.message,
            status: 0,
        });
    }
});

/**
 * Route for getting the current user.
 * @name GET /current-user
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.get('/current-user', function (req, res, next) {
    return res.send({
        user: req.session.user
    });
});

/**
 * Route for getting all users.
 * @name GET /get-all-users
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.get('/get-all-users', async (req, res, next) => {
    try {
        let users = await getAllUsers();

        // console.log(users);

        return res.send({
            users: users
        });
    } catch (error) {
        console.log(error);
        return res.send({
            error: error.message,
            status: 0,
        });
    }
});

/**
 * Route for user logout.
 * @name POST /logout
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.post('/logout', function (req, res, next) {
    req.session.user = undefined;
    return res.send({
        message: "logged out"
    });
});

/**
 * Object containing the possible steps for user registration.
 * @constant {Object} STEPS
 * @property {string} EMAIL - The email step.
 * @property {string} OTP - The OTP step.
 * @property {string} RESEND_OTP - The resend OTP step.
 * @property {string} PASSWORD - The password step.
 */
const STEPS = {
    EMAIL: "email",
    OTP: "otp",
    RESEND_OTP: "resend_otp",
    PASSWORD: "password",
}

/**
 * Middleware function for the email step of user registration.
 * @name emailStep
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const emailStep = async (req, res, next) => {
    try {
        let { exists } = await checkIfEmailExists(req.body.email);

        console.log(exists);

        if (exists) {
            return res.send({
                status: 2,
            });
        }

        let { otp } = await sendEmailWithOTP(req.body.email);
        console.log(otp);
        req.session.otp = otp;
        req.session.email = req.body.email;

        console.log("email sent");

        return res.send({
            status: 1,
        });
    } catch (error) {
        console.log(error);
        return res.send({
            status: 0,
            error: error.message
        });
    }
}

/**
 * Middleware function for the resend OTP step of user registration.
 * @name resendOtpStep
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const resendOtpStep = async (req, res, next) => {
    try {
        let { otp } = await sendEmailWithOTP(req.body.email);
        req.session.otp = otp;

        return res.send({
            status: 1,
        });
    }
    catch (error) {
        console.log(error);
        return res.send({
            status: 0,
            error: error.message
        });
    }
}

/**
 * Middleware function for the OTP step of user registration.
 * @name otpStep
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const otpStep = async (req, res, next) => {
    if (req.body.otp === req.session.otp) {
        return res.send({
            status: 1,
        });
    }

    return res.send({
        status: 0,
    });
}

/**
 * Middleware function for the password step of user registration.
 * @name passwordStep
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const passwordStep = async (req, res, next) => {
    try {
        await insertUser({ ...req.body });
        req.session.user = { ...req.body };
        return res.send({
            status: 1,
        });
    } catch (error) {
        console.log(error);
        return res.send({
            status: 0,
            error: error.message
        });
    }
}

/**
 * Route for user registration.
 * @name POST /register
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.post('/register', async function (req, res, next) {
    switch (req.body.step) {
        case STEPS.EMAIL:
            return emailStep(req, res, next);
        case STEPS.OTP:
            return otpStep(req, res, next);
        case STEPS.RESEND_OTP:
            return resendOtpStep(req, res, next);
        case STEPS.PASSWORD:
            return passwordStep(req, res, next);
        default:
            return res.send({
                status: "no step",
            });
    }
});

/**
 * Route for handling all other POST requests.
 * @name POST /*
 * @function
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
router.post('*', async (req, res, next) => {
    let { data: queryResult } = await findUser(req.body.email);

    let user = queryResult[0];

    req.session.user = user;

    return res.send({
        status: "no url",
    });
});

module.exports = router;
