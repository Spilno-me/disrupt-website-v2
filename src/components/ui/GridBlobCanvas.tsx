import React, { useEffect, useRef, ReactNode } from 'react'

const CONFIG = {
  grid: { size: 20, color: 'rgba(180, 180, 180, 0.4)', lineWidth: 1 },
  blob: {
    waypointInterval: 2000,
    easeFactor: 0.02,
    maxWidthRatio: 0.4,
    maxHeightRatio: 0.6,
    gradientStops: [
      { offset: 0, alpha: 1 },
      { offset: 0.5, alpha: 0.8 },
      { offset: 0.7, alpha: 0.3 },
      { offset: 1, alpha: 0 },
    ],
  },
  waypoints: [
    { x: 0.20, y: 0.25, w: 350, h: 280 },
    { x: 0.35, y: 0.40, w: 380, h: 300 },
    { x: 0.55, y: 0.50, w: 420, h: 340 },
    { x: 0.70, y: 0.60, w: 450, h: 360 },
    { x: 0.60, y: 0.70, w: 400, h: 320 },
    { x: 0.40, y: 0.65, w: 370, h: 300 },
    { x: 0.25, y: 0.50, w: 340, h: 270 },
    { x: 0.22, y: 0.35, w: 360, h: 290 },
  ],
  initialBlob: { x: 0.25, y: 0.3, w: 400, h: 320 },
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const { size, color, lineWidth } = CONFIG.grid
  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  ctx.beginPath()
  for (let x = 0; x <= w; x += size) { ctx.moveTo(x, 0); ctx.lineTo(x, h) }
  for (let y = 0; y <= h; y += size) { ctx.moveTo(0, y); ctx.lineTo(w, y) }
  ctx.stroke()
}

function createGradient(ctx: CanvasRenderingContext2D, radius: number) {
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius)
  CONFIG.blob.gradientStops.forEach(({ offset, alpha }) =>
    gradient.addColorStop(offset, `rgba(0,0,0,${alpha})`)
  )
  return gradient
}

interface GridBlobBackgroundProps {
  scale?: number // multiplier for blob size (default 1)
}

export function GridBlobBackground({ scale = 1 }: GridBlobBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const offscreenRef = useRef<HTMLCanvasElement | null>(null)
  const stateRef = useRef({
    x: CONFIG.initialBlob.x, y: CONFIG.initialBlob.y,
    w: CONFIG.initialBlob.w * scale, h: CONFIG.initialBlob.h * scale,
    targetX: CONFIG.initialBlob.x, targetY: CONFIG.initialBlob.y,
    targetW: CONFIG.initialBlob.w * scale, targetH: CONFIG.initialBlob.h * scale,
    waypointIndex: 0, lastChange: 0,
  })
  const scaleRef = useRef(scale)
  const animationRef = useRef<number>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    offscreenRef.current = document.createElement('canvas')

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
      if (offscreenRef.current) {
        offscreenRef.current.width = width
        offscreenRef.current.height = height
      }
    }

    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    const animate = (timestamp: number) => {
      const { width, height } = container.getBoundingClientRect()
      if (width <= 0 || height <= 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const s = stateRef.current
      const { waypointInterval, easeFactor, maxWidthRatio, maxHeightRatio } = CONFIG.blob

      if (timestamp - s.lastChange > waypointInterval) {
        s.waypointIndex = (s.waypointIndex + 1) % CONFIG.waypoints.length
        const wp = CONFIG.waypoints[s.waypointIndex]
        const sc = scaleRef.current
        s.targetX = wp.x; s.targetY = wp.y; s.targetW = wp.w * sc; s.targetH = wp.h * sc
        s.lastChange = timestamp
      }

      s.x = lerp(s.x, s.targetX, easeFactor)
      s.y = lerp(s.y, s.targetY, easeFactor)
      s.w = lerp(s.w, s.targetW, easeFactor)
      s.h = lerp(s.h, s.targetH, easeFactor)

      const offscreen = offscreenRef.current
      const offCtx = offscreen?.getContext('2d')
      if (!offscreen || !offCtx) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      offCtx.clearRect(0, 0, width, height)
      drawGrid(offCtx, width, height)

      ctx.clearRect(0, 0, width, height)
      ctx.save()

      const cx = s.x * width, cy = s.y * height
      const rx = Math.min(s.w, width * maxWidthRatio)
      const ry = Math.min(s.h, height * maxHeightRatio)

      ctx.translate(cx, cy)
      ctx.scale(1, ry / rx)
      ctx.fillStyle = createGradient(ctx, rx)
      ctx.beginPath()
      ctx.arc(0, 0, rx, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      ctx.globalCompositeOperation = 'source-in'
      ctx.drawImage(offscreen, 0, 0)
      ctx.globalCompositeOperation = 'source-over'

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      resizeObserver.disconnect()
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
    </div>
  )
}

/** Wrapper for sections needing grid blob. Usage: <BlobSection className="py-16">...</BlobSection> */
interface BlobSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode
  className?: string
  as?: 'section' | 'div'
}

export function BlobSection({ children, className = '', as: Tag = 'section', ...rest }: BlobSectionProps) {
  return (
    <Tag className={`relative ${className}`} {...rest}>
      <GridBlobBackground />
      <div className="relative z-[1]">{children}</div>
    </Tag>
  )
}

export { GridBlobBackground as GridBlobCanvas }
