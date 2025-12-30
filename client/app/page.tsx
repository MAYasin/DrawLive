'use client'

import { useDraw } from '@/app/hooks/useDraw';
import { drawLine } from '@/lib/drawLine';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { strokeOptions } from './components/stoke-options';
import Navbar from './components/navbar';

const port = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'
const socket = io(port)

export default function Home() {
  const [color, setColor] = useState<string>('#000')
  const [strokeWidth, setActiveStrokeOption] = useState(strokeOptions[0].value);
  const [brushType, setActiveBrushOption] = useState("pencil");

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
      img.onload = () => ctx?.drawImage(img, 0, 0)
    })

    socket.on('draw-line', ({ prevPoint, currentPoint, color, strokeWidth, brushType }: any) => {
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

  function createLine({ prevPoint, currentPoint, ctx }: any) {
    socket.emit('draw-line', ({ prevPoint, currentPoint, color, strokeWidth, brushType }))
    drawLine({ prevPoint, currentPoint, ctx, color, strokeWidth, brushType })
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar
        color={color}
        setColor={setColor}
        onStrokeChange={setActiveStrokeOption}
        onBrushChange={setActiveBrushOption}
        onClear={() => socket.emit('clear-canvas')}
        onSave={saveImage}
      />

      <main className='flex-1 flex justify-center items-center p-4 overflow-auto'>
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          width={750}
          height={750}
          className='rounded-md bg-white shadow-xl border border-gray-200'
        />
      </main>
    </div>
  );
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