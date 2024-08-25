import { GameIDGenerator } from "../utils/GameIDGenerator.js";

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
        ws.send(
            JSON.stringify({
                type: SOCKET_MESSAGE_TYPES.REGISTER_USER,
                data: {
                    error: error.message,
                },
            })
        );
    }
}

function generateGameCode({ ws, parsedMessage, allGameCodes }) {
    let gameCode = ws.gameCode;

    if (!gameCode) {
        const userID = parsedMessage.data?.userID;

        gameCode = GameIDGenerator(userID);

        allGameCodes.set(gameCode, ws);

        ws.gameCode = gameCode;
    }

    ws.send(
        JSON.stringify({
            type: SOCKET_MESSAGE_TYPES.GENERATE_GAME_CODE,
            data: {
                gameCode: gameCode,
            },
        })
    );
}

function inviteToGame({ ws, parsedMessage, allGameCodes }) {
    const gameCode = parsedMessage.data?.gameCode;
    const invitee = parsedMessage.data?.invitee;

    const inviteeWS = allGameCodes.get(gameCode);

    if (inviteeWS) {
        inviteeWS.send(
            JSON.stringify({
                type: "invite-to-game",
                data: {
                    inviter: ws.user,
                    gameCode: gameCode,
                },
            })
        );
    } else {
        ws.send(
            JSON.stringify({
                type: "invite-to-game",
                data: {
                    error: "Game not found",
                },
            })
        );
    }
}

function joinGame({ ws, parsedMessage, allGameCodes }) {
    const gameCode = parsedMessage.data?.gameCode;

    const gameHost = allGameCodes.get(gameCode);

    if (gameHost) {
        gameHost.send(
            JSON.stringify({
                type: "join-game",
                data: {
                    invitee: ws.user,
                    gameCode: gameCode,
                },
            })
        );
    } else {
        ws.send(
            JSON.stringify({
                type: "join-game",
                data: {
                    error: "Game not found",
                },
            })
        );
    }
}

export const SOCKET_MESSAGE_HANDLERS = {
    "register-user": registerUser,
    "generate-game-code": generateGameCode,
    "invite-to-game": inviteToGame,
    "join-game": joinGame,
};

/**
 *
 * @property {Object} SOCKET_MESSAGE_TYPES
 * @property {string} SOCKET_MESSAGE_TYPES.REGISTER_USER
 * @property {string} SOCKET_MESSAGE_TYPES.GENERATE_GAME_CODE
 * @property {string} SOCKET_MESSAGE_TYPES.MATCH_GAME_CODE
 */
export const SOCKET_MESSAGE_TYPES = Object.keys(SOCKET_MESSAGE_HANDLERS).reduce((acc, key) => {
    acc[key.toUpperCase().replace(/-/g, "_")] = key;
    return acc;
}, {});
