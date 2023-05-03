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
    prePoint: Point | null,
    currentPoint: Point,
    color: string
}

io.on('connection', (socket) => {
    socket.on('drawline', ({prePoint, currentPoint, color}: Drawline) => {
        socket.broadcast.emit('drawline', {prePoint, currentPoint, color})
    })
})

server.listen(3001, () => {
    console.log('listening on *:3001')
})