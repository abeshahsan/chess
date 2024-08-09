const WebSocket = require("ws");

const allGameCodes = new Map();

const createServerWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        ws.on("message", (event) => {
            const receivedData = event;

            // Handle ArrayBuffer
            const message = new TextDecoder().decode(new Uint8Array(receivedData));

            parsedMessage = JSON.parse(message);

            switch (parsedMessage.type) {
                case "generate-game-code":
                    let gameCode = Math.random().toString(36).substring(2, 10);
                    allGameCodes.set(gameCode, parsedMessage.data.userID);

                    ws.userID = parsedMessage.data.userID;
                    ws.gameCode = gameCode;

                    ws.send(
                        JSON.stringify({
                            type: "generate-game-code",
                            data: {
                                gameCode: gameCode,
                            },
                        })
                    );

                    break;
                case "match-game-code":
                    let c = allGameCodes.get(parsedMessage.data.gameCode);
                    if ( c &&
                        c !==
                        parsedMessage.data.userID
                    ) {
                        ws.send(
                            JSON.stringify({
                                type: "match-game-code",
                                data: {
                                    status: 1,
                                },
                            })
                        );
                    } else {
                        ws.send(
                            JSON.stringify({
                                type: "match-game-code",
                                data: {
                                    status: 0,
                                },
                            })
                        );
                    }

                    break;
            }

        });

        ws.on("close", () => {
            console.log("Client disconnected");
        });
    });
};

module.exports = createServerWebSocket;
