'use client'

import { useDraw } from '@/hooks/useDraw';
import { drawLine } from '@/utils/drawLine';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import { io } from 'socket.io-client'
import Navbar from './navbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ColorPicker from './colorpicker';
import StrokeOptions, { strokeOptions } from './stoke-options';
import BrushOptions, { brushOptions } from './brush-options';


const port = 'https://draw-live-server.vercel.app/ '|| 'http://localhost:5000'
const socket = io(port)

interface PageProps {}

type DrawLineProps = {
    prevPoint: Point | null
    currentPoint: Point
    color: string,
    strokeWidth: number,
    brushType: string
}
 
const Page: FunctionComponent<PageProps> = () => {

    const [color, setColor] = useState<string>('#000')
    const [strokeWidth, setActiveStrokeOption] = useState(strokeOptions[0].stroke);
    const [brushType, setActiveBrushOption] = useState(brushOptions[0]);

    const handleStrokeOptionChange = (option: number) => {
        setActiveStrokeOption(option);
    };

    const handleBrushOptionChange = (option: string) => {
        setActiveBrushOption(option);
    };

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

        socket.on('draw-line', ({prevPoint, currentPoint, color, strokeWidth, brushType}: DrawLineProps) => {
            if(!ctx) return

            drawLine({prevPoint, currentPoint, ctx, color, strokeWidth, brushType})
        })

        socket.on('clear-canvas', clearCanvas)

        return () => {
            socket.off('get-canvas-state')
            socket.off('canvas-state-from-server')
            socket.off('draw-line')
            socket.off('clear-canvas')
        }

    }, [canvasRef, clearCanvas])

    function saveImage() {
        const link = document.createElement('a')
        link.href = canvasRef.current?.toDataURL() || ''
        link.download = 'canvas.png'
        link.click()
    }

    function createLine({prevPoint, currentPoint, ctx}: Draw) {
        socket.emit('draw-line', ({prevPoint, currentPoint, color, strokeWidth, brushType}))
        drawLine({prevPoint, currentPoint, ctx, color, strokeWidth, brushType})
    }

    return (
        <div className='w-screen h-screen background-color flex flex-col'>
            <Navbar />
            <div className='tool-bar p-3 m-6 flex justify-center rounded-full'>              
                <BrushOptions onOptionChange={handleBrushOptionChange} />
                <div className="w-1 border rounded-md bg-gray-700 mr-2"></div>
                <StrokeOptions onOptionChange={handleStrokeOptionChange} />
                <div className="w-1 border rounded-md bg-gray-700 mr-2"></div>
                <ColorPicker color={color} onChange={(e) => setColor(e)} />
                <div className="w-1 border rounded-md bg-gray-700 mr-2"></div>
                <div className='bg-red-400 text-white border rounded-md h-10 px-3 flex justify-center items-center hover:bg-red-600 cursor-pointer mr-2' onClick={() => socket.emit('clear-canvas')}>
                    <span>Clear Canvas</span>
                </div>
                <div onClick={saveImage} className='bg-purple-400 text-white border rounded-md h-10 px-3 flex justify-center items-center hover:bg-purple-600 cursor-pointer mr-2'>
                    <span>Save Image</span>
                </div>
            </div>
            <div className='flex flex-grow justify-center items-center'>               
                <canvas
                ref={canvasRef} 
                onMouseDown={onMouseDown}
                width={750}
                height={750}
                className='rounded-md bg-white shadow-sm'/>
            </div>
        </div>
    );
}
 
export default Page;