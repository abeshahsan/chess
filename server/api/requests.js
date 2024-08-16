import { Router } from "express";
import { sendEmailWithOTP } from "./mailer.js";
import { findUserByEmail, insertUser, getAllUsers, checkIfEmailExists } from "../database/data-fetch.js";
import { verify } from "argon2";

const router = Router();

router.post("/register__", async (req, res, _next) => {
    try {
        let { data: queryResult } = await findUserByEmail(req.body.email);

        let user;

        if (queryResult && queryResult.length) {
            //user already registered
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

router.get("/current-user", function (req, res, next) {
    return res.send({
        user: req.session.user,
    });
});

router.get("/get-all-users", async (res) => {
    try {
        let { data: users } = await getAllUsers();

        return res.send({
            users: users,
        });
    } catch (error) {
        console.log(error);
        return res.send({
            error: error.message,
            status: 0,
        });
    }
});

router.post("/logout", function (req, res, _next) {
    req.session.user = undefined;
    return res.send({
        message: "logged out",
    });
});

export default router;
