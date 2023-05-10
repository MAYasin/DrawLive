"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = require('http');
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const socket_io_1 = require("socket.io");
app.get('/', (_req, res) => {
    return res.send('Express Typescript on Vercel');
});
app.get('/ping', (_req, res) => {
    return res.send('pong 🏓');
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    }
});
io.on('connection', (socket) => {
    socket.on('client-ready', () => {
        socket.broadcast.emit('get-canvas-state');
    });
    socket.on('canvas-state', (state) => {
        //console.log('received canvas state')
        socket.broadcast.emit('canvas-state-from-server', state);
    });
    socket.on('draw-line', ({ prevPoint, currentPoint, color, strokeWidth, brushType }) => {
        socket.broadcast.emit('draw-line', { prevPoint, currentPoint, color, strokeWidth, brushType });
    });
    socket.on('clear-canvas', () => io.emit('clear-canvas'));
});
server.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map