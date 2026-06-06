const WebSocket = require("ws");

let clients = [];


//websocket connection setup
function initializeWebSocket(server) {
    const wss = new WebSocket.Server({
        server
    });

    wss.on("connection", (ws) => {
        console.log(
            "WebSocket Client Connected"
        );
        clients.push(ws);
        ws.on("close", () => {
            clients = clients.filter(
                client => client !== ws
            );
            console.log(
                "WebSocket Client Disconnected"
            );
        });
    });
}


//send message to all clients
function broadcast(message) {
    clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN) {
            client.send(
                JSON.stringify(message)
            );
        }
    });
}

module.exports = {
    initializeWebSocket,
    broadcast
};