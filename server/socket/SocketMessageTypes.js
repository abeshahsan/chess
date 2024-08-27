import { CreateNewBoard, UpdateBoard } from "../database/Chessboard.js";
import { CreateNewMatch, UpdateMatch } from "../database/Match.js";
import { GameIDGenerator } from "../utils/GameIDGenerator.js";
import { ActiveMatches } from "./ActiveMatches.js";

function registerUser({ ws, parsedMessage }) {
    try {
        ws.user = parsedMessage.data.user;

        ws.send(
            JSON.stringify({
                type: SOCKET_MESSAGE_TYPES.REGISTER_USER,
                data: {
                    user: ws.user,
                },
            })
        );
    } catch (error) {
        console.log(error);
        sendErrorMsg(ws, "register-user", error);
    }
}

function inviteToGame({ ws, parsedMessage, allGameCodes }) {
    try {
        let gameCode = ws.gameCode;
        const { userID } = parsedMessage.data;

        if (!gameCode) {
            gameCode = GameIDGenerator(userID);
            allGameCodes.set(gameCode, ws);
        }

        ws.send(
            JSON.stringify({
                type: "invite-to-game",
                data: { gameCode },
            })
        );
    } catch (error) {
        console.log(error);
        sendErrorMsg(ws, "invite-to-game", error);
    }
}

function joinGame({ wss, ws, parsedMessage, allGameCodes }) {
    const gameCode = parsedMessage.data?.gameCode;

    const gameHost = allGameCodes.get(gameCode);

    try {
        if (gameHost) {
            sendResponse(gameHost, "join-game", { invitee: ws.user, host: gameHost.user });
            sendResponse(ws, "join-game", { invitee: ws.user, host: gameHost.user });
        } else {
            throw new Error("Game not found!");
        }
    } catch (error) {
        console.log(error);
        sendErrorMsg(ws, "join-game", error);
    }
}

async function startMatch({ wss, ws, parsedMessage }) {
    try {
        console.log(wss.clients);

        const { gameCode, player1, player2 } = parsedMessage.data;

        console.log(player1, player2);


        if (ActiveMatches.has(gameCode)) return;

        // find the sockets of the players
        let player1Socket = null;
        let player2Socket = null;

        for (const client of wss.clients) {
            if (client.user._id === player1._id) {
                player1Socket = client;
            }
            if (client.user._id === player2._id) {
                player2Socket = client;
            }
            if (player1Socket && player2Socket) {
                break;
            }
        }

        if (!player1Socket || !player2Socket) {
            throw new Error("One or more players are not connected!");
        }

        ActiveMatches.set(gameCode, [player1Socket, player2Socket]);

        const newBoard = await CreateNewBoard();
        const newMatch = await CreateNewMatch(gameCode, newBoard._id, [player1, player2]);

        console.log(newMatch);

        ActiveMatches.get(gameCode).forEach((player) => {
            sendResponse(player, "start-match", newMatch);
        });
    } catch (error) {
        console.log(error);
        sendErrorMsg(ws, "start-match", error);
    }
}

async function updateMatch({ ws, parsedMessage }) {
    try {
        const { gameCode, updatedMatch } = parsedMessage.data;

        if (!ActiveMatches.has(gameCode)) return;

        if (updatedMatch.updateBoard) {
            const { move } = updatedMatch.updateBoard;
            // update the board state
            await UpdateBoard(updatedMatch.boardID, move.from, move.to);
            delete updatedMatch.updateBoard;
            const updatedMatch = await UpdateMatch(gameCode, updatedMatch);
        }

        ActiveMatches.get(gameCode).forEach((player) => {
            sendResponse(player, "update-match", updatedMatch);
        });
    } catch (error) {
        console.log(error);
        sendErrorMsg(ws, "update-match", error);
    }
}

const sendResponse = (ws, msgType, payload) => {
    ws.send(
        JSON.stringify({
            status: "success",
            type: msgType,
            data: payload,
        })
    );
};

const sendErrorMsg = (ws, msgType, error) => {
    ws.send(
        JSON.stringify({
            status: "error",
            type: msgType,
            data: {
                error: error.message,
            },
        })
    );
};

export const SOCKET_MESSAGE_HANDLERS = {
    "register-user": registerUser,
    "invite-to-game": inviteToGame,
    "join-game": joinGame,
    "start-match": startMatch,
    "update-match": updateMatch,
};

export const SOCKET_MESSAGE_TYPES = Object.keys(SOCKET_MESSAGE_HANDLERS).reduce((acc, key) => {
    acc[key.toUpperCase().replace(/-/g, "_")] = key;
    return acc;
}, {});
