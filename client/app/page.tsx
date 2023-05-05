'use client'

import { useDraw } from '@/hooks/useDraw';
import { drawLine } from '@/utils/drawLine';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { io } from 'socket.io-client'
import Navbar from './navbar';

import ColorPicker from './components/colorpicker';
import StrokeOptions, { strokeOptions } from './components/stoke-options';
import BrushOptions, { brushOptions } from './components/brush-options';


const port = 'https://draw-live-server.onrender.com'|| 'http://localhost:5000'
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
        <div className='flex flex-col h-screen'>
            <Navbar />
            <div className='tool-bar py-3 pl-7 my-6 ml-6 items-center md:mr-6 flex md:justify-center overflow-auto rounded-l-full md:rounded-r-full'>              
                <BrushOptions onOptionChange={handleBrushOptionChange} />
                <div className="divider border rounded-md bg-gray-700 mr-2"></div>
                <StrokeOptions onOptionChange={handleStrokeOptionChange} />
                <div className="divider border rounded-md bg-gray-700 mr-2"></div>
                <ColorPicker color={color} onChange={(e) => setColor(e)} />
                <div className="divider border rounded-md bg-gray-700 mr-2"></div>
                <div className='bg-red-400 text-white whitespace-nowrap border rounded-md h-10 px-3 flex justify-center items-center hover:bg-red-600 cursor-pointer mr-2' onClick={() => socket.emit('clear-canvas')}>
                    <span>Clear Canvas</span>
                </div>
                <div onClick={saveImage} className='bg-purple-400 text-white whitespace-nowrap border rounded-md h-10 px-3 flex justify-center items-center hover:bg-purple-600 cursor-pointer mr-2'>
                    <span>Save Image</span>
                </div>
            </div>
            <div className='self-center w-full h-full px-4'>
                <canvas
                ref={canvasRef} 
                onMouseDown={onMouseDown}
                className='rounded-md bg-white shadow-sm'/>
            </div>          
        </div>
    );
}
 
export default Page;