import { Router } from "express";
import { findUserByEmail } from "../../database/data-fetch.js";
import { sendEmailWithOTP } from "../../utils/mailer.js";

const router = Router();

const emailStep = async (req, res, next) => {
    try {
        let queryResult = await findUserByEmail(req.body.email);

        let user;

        if (queryResult?.length) {
            user = queryResult[0];

            req.session.user = user;
            return res.send({
                status: 1, // user exists
            });
        } else {
            return res.send({
                status: 0, // user does not exist
            });
        }
    } catch (error) {
        console.error(error);
        return res.send({
            status: 0,
            error: error.message,
        });
    }
};

const resendOtpStep = async (req, res, next) => {
    try {
        let { otp } = await sendEmailWithOTP(req.body.email);
        req.session.otp = otp;

        return res.send({
            status: 1,
        });
    } catch (error) {
        console.error(error);
        return res.send({
            status: 0,
            error: error.message,
        });
    }
};

const otpStep = async (req, res, next) => {
    if (req.body.otp === req.session.otp) {
        return res.send({
            status: 1,
        });
    }

    return res.send({
        status: 0,
    });
};

const passwordStep = async (req, res, next) => {
    try {
        const updatedUser = {
            ...req.session.user,
            password: req.body.password,
        };

        await insertUser(updatedUser);
        req.session.user = { ...updatedUser };
        return res.send({
            status: 1,
        });
    } catch (error) {
        console.log(error);
        return res.send({
            status: 0,
            error: error.message,
        });
    }
};

const STEPS = {
    EMAIL: "email",
    OTP: "otp",
    RESEND_OTP: "resend_otp",
    PASSWORD: "password",
};

const STEP_HANDLERS = {
    [STEPS.EMAIL]: emailStep,
    [STEPS.OTP]: otpStep,
    [STEPS.RESEND_OTP]: resendOtpStep,
    [STEPS.PASSWORD]: passwordStep,
};

router.post("/forgot-password", async (req, res, next) => {
    try {
        let { step } = req.body;

        if (!step) {
            return res.send({
                status: 0,
                error: "Step not provided",
            });
        }

        if (!STEP_HANDLERS[step]) {
            return res.send({
                status: 0,
                error: "Invalid step",
            });
        }

        await STEP_HANDLERS[step](req, res, next);
    } catch (error) {
        console.log(error);
        return res.send({
            status: 0,
            error: error.message,
        });
    }
});

export default router;
