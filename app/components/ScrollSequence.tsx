'use client'

import { useEffect, useRef, useState } from 'react'

export default function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Wait until isMobile is determined
    if (isMobile === null) return
    if (typeof window === 'undefined') return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ✅ Different config for mobile vs desktop
    const config = isMobile
      ? {
          frameCount: 218, // your mobile frame count
          framePath: (i: number) =>
            `/frames/mobile/ezgif-frame-${String(i).padStart(3, '0')}.jpg`,
        }
      : {
          frameCount: 218, // your desktop frame count
          framePath: (i: number) =>
            `/frames/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`,
        }

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const images: HTMLImageElement[] = []
    const imageSeq = { frame: 0 }
    let rafId: number | null = null

    // Preload all images for current device
    for (let i = 1; i <= config.frameCount; i++) {
      const img = new Image()
      img.src = config.framePath(i)
      images.push(img)
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const img = images[imageSeq.frame]
      if (img?.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    }

    images[0].onload = () => render()

    const handleScroll = () => {
      const section = document.querySelector('.scroll-sequence-section') as HTMLElement
      if (!section) return

      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const scrollInside = Math.abs(rect.top)
        const maxScroll = section.scrollHeight - windowHeight

        if (maxScroll <= 0) return

        const scrollFraction = Math.min(1, scrollInside / maxScroll)
        const frameIndex = Math.min(
          config.frameCount - 1,
          Math.floor(scrollFraction * config.frameCount)
        )

        if (frameIndex !== imageSeq.frame) {
          imageSeq.frame = frameIndex
          if (rafId) cancelAnimationFrame(rafId)
          rafId = requestAnimationFrame(render)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      render()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isMobile]) // ✅ Re-runs when device type changes, loads correct frames

  // Don't render until we know device type (avoids flash)
  if (isMobile === null) return null

  return (
    <section
      className="scroll-sequence-section"
      style={{ height: '500vh', position: 'relative' ,zIndex:10}}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'block',
        }}
      />
    </section>
  )
}