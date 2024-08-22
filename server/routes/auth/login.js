import { Router } from "express";
import { findUserByEmail } from "../../database/data-fetch.js";
import { verify } from "argon2";

const router = Router();

router.post("/login", async (req, res, _next) => {
    try {
        let queryResult = await findUserByEmail(req.body.email);

        let user;

        if (queryResult) {
            user = queryResult[0];
            const valid = await verify(user.password, req.body.password);

            if (valid) {
                req.session.user = user;

                return res.send({
                    status: 1,
                    user: user,
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

export default router;
