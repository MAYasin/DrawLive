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
}

io.on('connection', (socket) => {

    socket.on('client-ready', () => {
        socket.broadcast.emit('get-canvas-state')
    })

    socket.on('canvas-state', (state) => {
        console.log('received canvas state')
        socket.broadcast.emit('canvas-state-from-server', state)
    })

    socket.on('draw-line', ({prevPoint, currentPoint, color, strokeWidth}: Drawline) => {
        socket.broadcast.emit('draw-line', {prevPoint, currentPoint, color, strokeWidth})
    })

    socket.on('clear-canvas', () => io.emit('clear-canvas'))
})

server.listen(3001, () => {
    console.log('listening on localhost:3001')
})