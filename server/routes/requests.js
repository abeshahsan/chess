import { Router } from "express";
import { getAllUsers } from "../database/data-fetch.js";
import { GameIDGenerator } from "../utils/GameIDGenerator.js";

const router = Router();

router.get("/current-user", (req, res, next) => {
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

router.get("/new-game-link/:userID", (req, res, _next) => {
    const { userID } = req.params;

    const gameID = GameIDGenerator(userID);
    const link = `${req.protocol}://${req.get("host")}/game/${gameID}`;

    return res.send({
        link: link,
    });
});

router.post("/logout", (req, res, _next) => {
    req.session.user = undefined;
    return res.send({
        message: "logged out",
    });
});

export default router;
