const WebSocket = require('ws');


const createServerWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('New client connected');

        ws.on('message', (event) => {
            const receivedData = event;

            // Handle ArrayBuffer
            const message = new TextDecoder().decode(new Uint8Array(receivedData));

            parsedMessage = JSON.parse(message);

            // Broadcast the message to all clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        data: parsedMessage.data,
                        timestamp: new Date().toISOString()
                    }));
                }
            });
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
}

module.exports = createServerWebSocket;