const SOCKET_MESSAGE_TYPES = {
    REGISTER_USER: "register-user",
    GENERATE_GAME_CODE: "generate-game-code",
    MATCH_GAME_CODE: "match-game-code",
};

export const SOCKET_MESSAGE_HANDLERS = {
    [SOCKET_MESSAGE_TYPES.REGISTER_USER]: registerUser,
    [SOCKET_MESSAGE_TYPES.GENERATE_GAME_CODE]: generateGameCode,
    [SOCKET_MESSAGE_TYPES.MATCH_GAME_CODE]: matchGameCode,
};

function registerUser({ws, parsedMessage}) {
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

function generateGameCode({ws, allGameCodes}) {
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

function matchGameCode({ws, parsedMessage, allGameCodes}) {
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
