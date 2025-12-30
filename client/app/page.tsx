'use client'

import { useDraw } from '@/app/hooks/useDraw';
import { drawLine } from '@/lib/drawLine';
import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { strokeOptions } from './components/stoke-options';
import Navbar from './components/navbar';

const port = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'
const socket = io(port)

export default function Home() {
  const [color, setColor] = useState<string>('#000')
  const [strokeWidth, setActiveStrokeOption] = useState(strokeOptions[0].value);
  const [brushType, setActiveBrushOption] = useState("pencil");

  const containerRef = useRef<HTMLDivElement>(null);
  const { canvasRef, onMouseDown, clearCanvas } = useDraw(createLine)

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const resizeCanvas = () => {
      if (!canvas || !containerRef.current) return;

      const tempImage = canvas.toDataURL();

      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;

      const img = new Image();
      img.src = tempImage;
      img.onload = () => ctx?.drawImage(img, 0, 0);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    socket.emit('client-ready')
    socket.on('get-canvas-state', () => {
      if (!canvas?.toDataURL) return
      socket.emit('canvas-state', canvas.toDataURL())
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
      window.removeEventListener('resize', resizeCanvas);
      socket.off('get-canvas-state');
      socket.off('canvas-state-from-server');
      socket.off('draw-line');
      socket.off('clear-canvas');
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
    <div className="h-screen flex flex-col transition-colors">
      <Navbar
        color={color}
        setColor={setColor}
        onStrokeChange={setActiveStrokeOption}
        onBrushChange={setActiveBrushOption}
        onClear={() => socket.emit('clear-canvas')}
        onSave={saveImage}
      />

      <main ref={containerRef} className='flex-1 relative w-full overflow-hidden p-2 md:p-4'>
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          className='block w-full h-full rounded-md bg-white shadow-xl border border-gray-200 touch-none'
        />
      </main>
    </div>
  );
}