require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");

const pool = require("./config/db");

const teamRoutes = require("./routes/teamRoutes");

const {
    startListener,
    setNotificationHandler
} = require("./services/postgresListener");

const {
    initializeWebSocket,
    broadcast
} = require("./websocket/wsServer");

const app = express();

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/teams", teamRoutes);

async function startServer() {
    try {
        await pool.query("SELECT NOW()");
        console.log("Database Connected");
        initializeWebSocket(server);
        setNotificationHandler((payload) => {
            console.log("Broadcasting Update");
            broadcast(payload);
        });

        await startListener();
        server.listen(process.env.PORT, () => {
            console.log(
                `Server running on port ${process.env.PORT}`
            );
        });

    } catch (error) {
        console.error(error);
    }
}

startServer();