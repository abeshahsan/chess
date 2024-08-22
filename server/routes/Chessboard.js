import { Router } from "express";

import { CreateNewBoard, UpdateBoard } from "../database/Chessboard.js";

const router = Router();

const createNewBoard = async (req, res, next) => {
    try {
        let board = await CreateNewBoard();
        return res.send({
            status: 1,
            board,
        });
    } catch (error) {
        console.error(error);
        return res.send({
            status: 0,
            error: error.message,
        });
    }
};

const updateBoard = async (req, res, next) => {
    try {
        let { boardId, from, to } = req.body;
        let board = await UpdateBoard(boardId, from, to);
        return res.send({
            status: 1,
            board,
        });
    } catch (error) {
        console.error(error);
        return res.send({
            status: 0,
            error: error.message,
        });
    }
};

const deleteBoard = async (req, res, next) => {
    console.error("Delete board not implemented");
};

const GAME_COMMAND_HANDLER = {
    create: createNewBoard,
    update: updateBoard,
    delete: deleteBoard,
};

router.post("/game", async (req, res, next) => {
    let { command } = req.body;

    if (!command) {
        return res.send({
            status: 0,
            error: "No command provided",
        });
    }

    if (GAME_COMMAND_HANDLER[command]) {
        return GAME_COMMAND_HANDLER[command](req, res, next);
    }

    return res.send({
        status: 0,
        error: "Invalid command",
    });
});

export default router;
