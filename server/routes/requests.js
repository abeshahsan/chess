import { Router } from "express";
import { getAllUsers } from "../database/data-fetch.js";
import { GameIDGenerator } from "../utils/GameIDGenerator.js";

const router = Router();

router.get("/current-user", (req, res, next) => {
    return res.send({
        user: req.session.user,
    });
});

router.get("/get-all-users", async (req, res) => {
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

router.post("/logout", (req, res, _next) => {
    req.session.user = undefined;
    return res.send({
        message: "logged out",
    });
});

router.post("/set-flags", (req, res, next) => {
    try {
        req.session.flags = req.body.flags;
        console.log(req.session.flags);

        return res.send({
            message: "flags set",
        });
    } catch (error) {
        console.log(error);
    }
    next();
});

export default router;
