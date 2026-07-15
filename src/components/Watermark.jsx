import { useEffect, useRef } from "react"

const Watermark = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + "px"
      canvas.style.height = window.innerHeight + "px"
      ctx.scale(dpr, dpr)
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = "14px 'General Sans', sans-serif"
      ctx.fillStyle = "rgba(255, 255, 255, 0.015)"
      ctx.textAlign = "center"

      const text = "GOURAV9211"
      const spacing = 200
      const rows = Math.ceil(canvas.height / (spacing * 0.6))

      for (let row = 0; row < rows; row++) {
        const y = row * spacing * 0.6
        const offset = row % 2 === 0 ? 0 : spacing / 2
        for (let x = offset; x < canvas.width; x += spacing) {
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(-Math.PI / 6)
          ctx.fillText(text, 0, 0)
          ctx.restore()
        }
      }
    }

    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        mixBlendMode: "overlay",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}

export default Watermark
