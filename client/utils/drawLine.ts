type DrawLineProps = Draw & {
    color: string,
    strokeWidth: number,
    brushType: string,
}

function getLineCap (brushType: string): CanvasLineCap {
    switch(brushType){
        case "pencil":
            return 'round'
        case "marker":
            return 'square'
        case "brush":
            return 'round'
        default:
            return 'round'
    }
}

export const drawLine = ({prevPoint, currentPoint, ctx, color, strokeWidth, brushType}: DrawLineProps) => {
    const { x: currX, y: currY } = currentPoint
    const lineColor = color
    const lineWidth = strokeWidth
  
    let startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.lineCap = getLineCap(brushType)
    ctx.imageSmoothingEnabled = true
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currX, currY)
    ctx.stroke()
  
    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 2, 0, Math.PI * 2)
    ctx.fill()
}
