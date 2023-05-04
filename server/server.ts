const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)

import { Server } from 'socket.io'

const io = new Server(server, {
    cors: {
        origin: '*',
    }
})

type Point = {x: number, y: number}

type Drawline = {
    prevPoint: Point | null,
    currentPoint: Point,
    color: string,
    strokeWidth: number,
    brushType: string,
}

io.on('connection', (socket) => {

    socket.on('client-ready', () => {
        socket.broadcast.emit('get-canvas-state')
    })

    socket.on('canvas-state', (state) => {
        console.log('received canvas state')
        socket.broadcast.emit('canvas-state-from-server', state)
    })

    socket.on('draw-line', ({prevPoint, currentPoint, color, strokeWidth, brushType}: Drawline) => {
        socket.broadcast.emit('draw-line', {prevPoint, currentPoint, color, strokeWidth, brushType})
    })

    socket.on('clear-canvas', () => io.emit('clear-canvas'))
})

server.listen(5000, () => {
    console.log('listening on localhost:5000')
})