'use client'

import { useEffect, useRef } from 'react'

export default function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
 
    const frameCount = 218
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const images: HTMLImageElement[] = []
    const imageSeq = { frame: 0 }

    // Preload all images
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image()
      img.src = `/frames/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`
      images.push(img)
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (images[imageSeq.frame]) {
        ctx.drawImage(images[imageSeq.frame], 0, 0, canvas.width, canvas.height)
      }
    }

    images[0].onload = () => {
      render()
    }

    const section = document.querySelector('.scroll-section')
    if (!section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const scrollInside = Math.abs(rect.top)
        const maxScroll = section.scrollHeight - windowHeight
        const scrollFraction = scrollInside / maxScroll

        const frameIndex = Math.min(
          frameCount - 1,
          Math.floor(scrollFraction * frameCount)
        )

        if (frameIndex !== imageSeq.frame) {
          imageSeq.frame = frameIndex
          render()
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="scroll-section header-index">
      <canvas className="header-index" ref={canvasRef} id="sequence"></canvas>
    </section>
  )
}