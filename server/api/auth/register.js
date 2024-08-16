import { Router } from "express";
import { checkIfEmailExists } from "../../database/data-fetch.js";
import { sendEmailWithOTP } from "../mailer.js";

const router = Router();


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
        console.log(error);
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
        await insertUser({ ...req.body });
        req.session.user = { ...req.body };
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

router.post("/register", async function (req, res, next) {
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
