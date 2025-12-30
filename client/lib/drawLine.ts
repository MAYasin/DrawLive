type DrawLineProps = Draw & {
    color: string,
    strokeWidth: number,
    brushType: string,
}

export const drawLine = ({prevPoint, currentPoint, ctx, color, strokeWidth, brushType}: DrawLineProps) => {
    const { x: currX, y: currY } = currentPoint
    const lineColor = color
    let lineWidth = strokeWidth
    let lineOpacity = 1
  
    let startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.strokeStyle = lineColor
    ctx.lineCap = 'round'

    if (brushType === 'pencil') {
        lineWidth = Math.max(1, lineWidth)
        lineOpacity = 1
    } else if (brushType === 'marker') {
        lineWidth = Math.max(1, lineWidth)
        lineOpacity = 0.7
    } else if (brushType === 'brush') {
        lineWidth = Math.max(1, lineWidth * 2)
        lineOpacity = 0.5
    }

    ctx.imageSmoothingEnabled = true
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currX, currY)

    ctx.lineWidth = lineWidth
    ctx.globalAlpha = lineOpacity
    ctx.stroke()
  
    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 2, 0, Math.PI * 2)
    ctx.fill()
}
