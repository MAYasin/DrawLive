import express, { Request, Response } from 'express'

const http = require('http')
const app = express()
const port = process.env.PORT || 5000
const server = http.createServer(app)

import { Server } from 'socket.io'

app.get('/', (_req: Request, res: Response) => {
    return res.send('Express Typescript on Vercel')
})

app.get('/ping', (_req: Request, res: Response) => {
    return res.send('pong 🏓')
})

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

server.listen(port, () => {
    return console.log(`Server is listening on ${port}`)
})