'use client'

import { useDraw } from '@/hooks/useDraw';
import React, { FunctionComponent } from 'react';
interface pageProps {
    
}
 
const page: FunctionComponent<pageProps> = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { canvasRef, onMouseDown } = useDraw(drawLine)

    function drawLine({prevPoint, currentPoint, ctx}: Draw) {
        const { x: currX, y: currY } = currentPoint
        const lineColor = '#000'
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