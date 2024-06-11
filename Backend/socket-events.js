import mongoose from "mongoose";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const socketIO = require('socket.io');

const initialize = function(server) {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        console.log("A user just connected");
        socket.on('join', (data) => {
            socket.join(data.userId);
            console.log(`User joined room: ${data.userId}`);
        });
    });
};

export default initialize;
