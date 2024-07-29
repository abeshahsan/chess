/**
 * Express router for handling API requests related to user authentication and registration.
 * @module requests
 */
const express = require('express');
const { senEmail: sendEmail } = require('./mailer');
const { findUser, insertUser, getAllUsers, checkIfEmailExists } = require('../database/data-fetch');
const argon2 = require('argon2');


const router = express.Router();



router.post('/login', async (req, res, next) => {
    try {
        let { data: queryResult } = await findUser(req.body.email);

        let user;

        if (queryResult?.length) {
            user = queryResult[0]
            const valid = await argon2.verify(user.password, req.body.password);

            if (valid) {
                req.session.user = user;
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

router.get('/current-user', function (req, res, next) {
    return res.send({
        user: req.session.user
    });
});

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



router.post('/logout', function (req, res, next) {

    req.session.user = undefined

    return res.send({
        message: "logged out"
    });
});

const STEPS = {
    EMAIL: "email",
    OTP: "otp",
    RESEND_OTP: "resend_otp",
    PASSWORD: "password",
}


const emailStep = async (req, res, next) => {
    try {
        let { exists } = await checkIfEmailExists(req.body.email);

        console.log(exists);

        if (exists) {
            return res.send({
                status: 2,
            });
        }

        let { otp } = await sendEmail(req.body.email);
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

const resendOtpStep = async (req, res, next) => {
    try {
        let { otp } = await sendEmail(req.body.email);
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


const passwordStep = async (req, res, next) => {
    try {
        const hashedPassword = await argon2.hash(req.body.password);
        let user = {
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username,
        };
        let { response } = await insertUser(user);
        req.session.user = user;
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

router.post('/register', async function (req, res, next) {

    console.log(req.body);

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

router.post('*', async (req, res, next) => {
    let { data: queryResult } = await findUser(req.body.email);

    let user = queryResult[0];

    req.session.user = user

    return res.send({
        status: "no url",
    });
});

module.exports = router;
