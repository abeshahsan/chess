import { WebSocketServer } from 'ws';

const allGameCodes = new Map();

const createServerWebSocket = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on("connection", (ws) => {
        wss.clients.forEach(() => {
            console.log(wss.clients.size);
        });

        ws.on("message", (event) => {
            const receivedData = event;

            // Handle ArrayBuffer
            const message = new TextDecoder().decode(new Uint8Array(receivedData));

            let parsedMessage = JSON.parse(message);

            switch (parsedMessage.type) {
                case "register":
                    ws.user = parsedMessage.data.user;
                    break;
                case "generate-game-code":
                    let gameCode = Math.random().toString(36).substring(2, 10);
                    allGameCodes.set(gameCode, ws);

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
                    let client = allGameCodes.get(parsedMessage.data.gameCode);

                    if (client && client !== parsedMessage.data.userID) {
                        ws.send(
                            JSON.stringify({
                                type: "match-game-code",
                                data: {
                                    status: 1,
                                },
                            })
                        );
                        client.send(
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
                        client.send(
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

export default createServerWebSocket;
