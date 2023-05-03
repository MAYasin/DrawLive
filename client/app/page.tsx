'use client'

import { useDraw } from '@/hooks/useDraw';
import React, { FunctionComponent, useState } from 'react';
import { ChromePicker } from 'react-color';

interface pageProps {
    
}
 
const page: FunctionComponent<pageProps> = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [color, setColor] = useState<string>('#000')

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { canvasRef, onMouseDown, clearCanvas } = useDraw(drawLine)

    function drawLine({prevPoint, currentPoint, ctx}: Draw) {
        const { x: currX, y: currY } = currentPoint
        const lineColor = color
        const lineWidth = 5

        let startPoint = prevPoint ?? currentPoint
        ctx.beginPath()
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = lineColor
        ctx.moveTo(startPoint.x, startPoint.y)
        ctx.lineTo(currX, currY)
        ctx.stroke()

        ctx.fillStyle = lineColor
        ctx.beginPath()
        ctx.arc(startPoint.x, startPoint.y, 2, 0, Math.PI * 2)
        ctx.fill()
    }

    return (
        <div className='w-screen h-screen bg-white flex justify-center items-center'>
            <div className='flex flex-col gap-10 pr-10'>
                <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
                <button type='button' className='p-2 rounded-md border border-black' onClick={clearCanvas}>Clear canvas</button>
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
 
export default page;