'use client'

import { useDraw } from '@/hooks/useDraw';
import { drawLine } from '@/utils/drawLine';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001')

interface PageProps {}

type DrawLineProps = {
    prevPoint: Point | null
    currentPoint: Point
    color: string
}
 
const Page: FunctionComponent<PageProps> = () => {

    const [color, setColor] = useState<string>('#000')

    const { canvasRef, onMouseDown, clearCanvas } = useDraw(createLine)

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d')

        socket.emit('client-ready')

        socket.on('get-canvas-state', () => {
            if(!canvasRef.current?.toDataURL) return

            socket.emit('canvas-state', canvasRef.current.toDataURL())
        })

        socket.on('canvas-state-from-server', (state: string) => {
            const img = new Image()
            img.src = state

            img.onload = () => {
                ctx?.drawImage(img, 0, 0)
            }
        })

        socket.on('draw-line', ({prevPoint, currentPoint, color}: DrawLineProps) => {
            if(!ctx) return

            drawLine({prevPoint, currentPoint, ctx, color})
        })

        socket.on('clear-canvas', clearCanvas)

        return () => {
            socket.off('get-canvas-state')
            socket.off('canvas-state-from-server')
            socket.off('draw-line')
            socket.off('clear-canvas')
        }

    }, [canvasRef, clearCanvas])
    

    function createLine({prevPoint, currentPoint, ctx}: Draw) {
        socket.emit('draw-line', ({prevPoint, currentPoint, color}))
        drawLine({prevPoint, currentPoint, ctx, color})
    }

    return (
        <div className='w-screen h-screen bg-white flex justify-center items-center'>
            <div className='flex flex-col gap-10 pr-10'>
                <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
                <button type='button' className='p-2 rounded-md border border-black' onClick={() => socket.emit('clear-canvas')}>Clear canvas</button>
            </div>
            <canvas
            ref={canvasRef} 
            onMouseDown={onMouseDown}
            width={750}
            height={750}
            className='border border-black rounded-md'/>
        </div>
    );
}
 
export default Page;