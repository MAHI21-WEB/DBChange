const { Client } = require("pg");
require("dotenv").config();

let notificationHandler = null;
let listenerClient = null;

async function startListener() {
    if (listenerClient) {
        return listenerClient;
    }

    listenerClient = new Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 5432),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    listenerClient.on("error", (error) => {
        console.error("PostgreSQL listener error:", error);
    });

    await listenerClient.connect();

    console.log("PostgreSQL Listener Connected");

    await listenerClient.query("LISTEN team_updates");

    console.log("Listening on channel: team_updates");

    listenerClient.on("notification", (msg) => {
        try {
            const payload = JSON.parse(msg.payload);

            console.log("\nNotification Received:");
            console.log(payload);

            if (notificationHandler) {
                notificationHandler(payload);
            }
        } catch (error) {
            console.error("Failed to parse PostgreSQL notification payload:", error);
        }
    });

    return listenerClient;
}

function setNotificationHandler(handler) {
    notificationHandler = handler;
}

module.exports = {
    startListener,
    setNotificationHandler,
};