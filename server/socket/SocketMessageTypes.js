import { CreateNewBoard } from "../database/Chessboard.js";
import { CreateNewMatch } from "../database/Match.js";
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
        sendErrorMsg({ msgType: "register-user", ws, error });
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
        sendErrorMsg({ msgType: "invite-to-game", ws, error });
    }
}

function joinGame({ wss, ws, parsedMessage, allGameCodes }) {
    const gameCode = parsedMessage.data?.gameCode;

    const gameHost = allGameCodes.get(gameCode);

    const successMsg = JSON.stringify({
        type: "join-game",
        status: "success",
        data: {
            host: gameHost.user,
            invitee: ws.user,
            gameCode: gameCode,
        },
    });

    const errorMsg = JSON.stringify({
        type: "join-game",
        status: "error",
        data: {
            error: "Game not found",
        },
    });

    if (gameHost) {
        gameHost.send(successMsg);
        ws.send(successMsg);
    } else {
        ws.send(errorMsg());
    }
}

async function startMatch({ wss, ws, parsedMessage }) {
    try {
        const { gameCode, player1, player2 } = parsedMessage.data;

        if (ActiveMatches.has(gameCode)) return;

        // find the sockets of the players
        const player1Socket = wss.clients.find((client) => client.user._id === player1._id);
        const player2Socket = wss.clients.find((client) => client.user._id === player2._id);

        if (!player1Socket || !player2Socket) {
            throw new Error("One or more players are not connected!");
        }

        ActiveMatches.set(gameCode, [player1Socket, player2Socket]);

        const newBoard = await CreateNewBoard();
        const newMatch = await CreateNewMatch(gameCode, newBoard._id, [player1, player2]);

        console.log(newMatch);

        ws.send(
            JSON.stringify({
                type: "start-match",
                data: {
                    status: "success",
                    gameCode,
                    player1,
                    player2,
                },
            })
        );
    } catch (error) {
        console.log(error);
        sendErrorMsg({ msgType: "start-match", ws, error });
    }
}

function updateMatch({ ws, parsedMessage }) {
    try {
        const { gameCode, updatedMatch } = parsedMessage.data;

        if (!ActiveMatches.has(gameCode)) return;

        ActiveMatches.get(gameCode).forEach((player) => {
            player.send(
                JSON.stringify({
                    type: "update-match",
                    data: {
                        gameCode,
                        updatedMatch,
                    },
                })
            );
        });
    } catch (error) {
        console.log(error);
        sendErrorMsg({ msgType: "update-match", ws, error });
    }
}

const sendErrorMsg = ({ msgType, ws, error }) => {
    ws.send(
        JSON.stringify({
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
