import { Router } from "express";

import { CreateNewBoard, UpdateBoard } from "../database/Chessboard.js";

const router = Router();

router.get("/chessboard", async (req, res, next) => {
    try {
        await UpdateBoard("66be59c7477757724e0e573d", "e2", "e4");
        res.send({
            message: "Chessboard API",
            status: 1,
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
