'use client'

import { useEffect, useRef, useState } from 'react'

export default function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // ======================
  // 🖥️ DESKTOP: IMAGE SEQUENCE
  // ======================
  useEffect(() => {
    if (typeof window === 'undefined' || isMobile) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const frameCount = 218
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const images: HTMLImageElement[] = []
    const imageSeq = { frame: 0 }

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

    images[0].onload = render

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

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile])

  // ======================
  // 📱 MOBILE: VIDEO SCROLL
  // ======================
  useEffect(() => {
    if (!isMobile) return

    const video = videoRef.current
    const section = document.querySelector('.scroll-section')
    if (!video || !section) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      if (rect.top <= 0 && rect.bottom >= windowHeight) {
        const scrollInside = Math.abs(rect.top)
        const maxScroll = section.scrollHeight - windowHeight
        const scrollFraction = scrollInside / maxScroll

        // 🎬 scrub video with scroll
        video.currentTime = scrollFraction * video.duration
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile])

  return (
    <section className="scroll-section header-index">
      
      {/* 🖥️ DESKTOP */}
      {!isMobile && (
        <canvas ref={canvasRef} className="sequence-canvas" />
      )}

      {/* 📱 MOBILE */}
      {isMobile && (
        <video
          ref={videoRef}
          className="sequence-video"
          src="/video/galaxy_4.mp4" // 🔥 your mobile optimized video
          muted
          playsInline
          preload="auto"
        />
      )}

    </section>
  )
}