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

function inviteToGame({ ws, parsedMessage, allGameCodes }) {
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

export const SOCKET_MESSAGE_HANDLERS = {
    "register-user": registerUser,
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
