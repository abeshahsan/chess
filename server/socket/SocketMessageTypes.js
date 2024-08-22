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

function generateGameCode({ ws, allGameCodes }) {
    let gameCode = Math.random().toString(36).substring(2, 10);
    allGameCodes.set(gameCode, ws);

    ws.gameCode = gameCode;

    ws.send(
        JSON.stringify({
            type: SOCKET_MESSAGE_TYPES.GENERATE_GAME_CODE,
            data: {
                gameCode: gameCode,
            },
        })
    );
}

function matchGameCode({ ws, parsedMessage, allGameCodes }) {
    let client = allGameCodes.get(parsedMessage.data.gameCode);

    if (client && client !== parsedMessage.data.userID) {
        ws.send(
            JSON.stringify({
                type: SOCKET_MESSAGE_TYPES.MATCH_GAME_CODE,
                data: {
                    status: 1,
                },
            })
        );
        client.send(
            JSON.stringify({
                type: SOCKET_MESSAGE_TYPES.MATCH_GAME_CODE,
                data: {
                    status: 1,
                },
            })
        );
    } else {
        ws.send(
            JSON.stringify({
                type: SOCKET_MESSAGE_TYPES.MATCH_GAME_CODE,
                data: {
                    status: 0,
                },
            })
        );
        client.send(
            JSON.stringify({
                type: SOCKET_MESSAGE_TYPES.MATCH_GAME_CODE,
                data: {
                    status: 0,
                },
            })
        );
    }
}

export const SOCKET_MESSAGE_HANDLERS = {
    "register-user": registerUser,
    "generate-game-code": generateGameCode,
    "match-game-code": matchGameCode,
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
