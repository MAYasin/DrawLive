type DrawLineProps = Draw & {
    color: string,
    strokeWidth: number,
}

export const drawLine = ({prevPoint, currentPoint, ctx, color, strokeWidth}: DrawLineProps) => {
    const { x: currX, y: currY } = currentPoint
    const lineColor = color
    const lineWidth = strokeWidth
  
    let startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.lineCap = "round"
    ctx.imageSmoothingEnabled = true
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currX, currY)
    ctx.stroke()
  
    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 2, 0, Math.PI * 2)
    ctx.fill()
}
