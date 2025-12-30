'use client'

import { useDraw } from '@/app/hooks/useDraw';
import { drawLine } from '@/lib/drawLine';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { io } from 'socket.io-client'

import ColorPicker from './components/colorpicker';
import StrokeOptions, { strokeOptions } from './components/stoke-options';
import BrushOptions, { brushOptions } from './components/brush-options';
import Navbar from './components/navbar';


const port = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'
const socket = io(port)

type DrawLineProps = {
  prevPoint: Point | null
  currentPoint: Point
  color: string,
  strokeWidth: number,
  brushType: string
}

export default function Home() {

  const [color, setColor] = useState<string>('#000')
  const [strokeWidth, setActiveStrokeOption] = useState(strokeOptions[0].value);
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
      if (!canvasRef.current?.toDataURL) return

      socket.emit('canvas-state', canvasRef.current.toDataURL())
    })

    socket.on('canvas-state-from-server', (state: string) => {
      const img = new Image()
      img.src = state

      img.onload = () => {
        ctx?.drawImage(img, 0, 0)
      }
    })

    socket.on('draw-line', ({ prevPoint, currentPoint, color, strokeWidth, brushType }: DrawLineProps) => {
      if (!ctx) return

      drawLine({ prevPoint, currentPoint, ctx, color, strokeWidth, brushType })
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

  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    socket.emit('draw-line', ({ prevPoint, currentPoint, color, strokeWidth, brushType }))
    drawLine({ prevPoint, currentPoint, ctx, color, strokeWidth, brushType })
  }

  /* function resizeCanvas() {
      const canvas = canvasRef.current;
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = canvas!.width;
      tempCanvas.height = canvas!.height;
      tempCtx!.drawImage(canvas!, 0, 0);
    
      canvas!.width = window.innerWidth * 0.85;
      canvas!.height = window.innerHeight * 0.75;
      
      canvas!.getContext('2d')!.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height);
  }

  useEffect(() => {   
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
  
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
  }, []); */

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <Navbar />
      <div className='tool-bar py-3 pl-7 my-3 ml-6 md:mr-6 flex md:justify-center items-center rounded-l-full md:rounded-r-full'>
        <div className='tool-bar-child flex overflow-scroll'>
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
      </div>
      <div className='flex justify-center items-center w-full h-full overflow-auto'>
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          width={750}
          height={750}
          className='rounded-md bg-white shadow-sm' />
      </div>
    </div>
  );
}