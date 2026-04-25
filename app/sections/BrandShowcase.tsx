'use client'

import { useEffect } from 'react'

export default function BrandShowcase() {
  const logoPairs = [
  
  ["/logos/l3.webp", "/logos/l4.webp"],
  ["/logos/l5.webp", "/logos/l6.webp"],
  ["/logos/l7.webp", "/logos/l8.webp"],
  ["/logos/l9.webp", "/logos/l10.webp"],
]
  useEffect(() => {
    if (typeof window === 'undefined') return
    let pairIndex = 0

    const brandHeader = document.getElementById('brandHeader')
    if (brandHeader) {
      setTimeout(() => {
        brandHeader.style.opacity = '1'
        brandHeader.style.transform = 'translateY(0)'
      }, 100)

      setTimeout(() => {
        document.querySelectorAll('#brandShowcase .grid-line').forEach((line) => line.classList.add('visible'))
      }, 500)
    }

    // Parallax background
    document.addEventListener('mousemove', (e) => {
      const bg = document.querySelector('#brandShowcase .stars-bg')
      if (!bg) return
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      ;(bg as HTMLElement).style.transform = `translate(-${x * 10}px, -${y * 10}px) scale(1.05)`
    })

    // Logo wheel animation
    const MOVE_MS = 700
    const PAUSE_MS =1000
    const STEP_MS = MOVE_MS + PAUSE_MS

    const brandTracks = Array.from(document.querySelectorAll('.logo-wheel-track[data-wheel="brand"]'))

    function stepPxFor(track: Element) {
      const firstImg = track.querySelector('img')
      if (!firstImg) return 0
      const cs = getComputedStyle(firstImg)
      const mt = parseFloat(cs.marginTop) || 0
      const mb = parseFloat(cs.marginBottom) || 0
      return firstImg.getBoundingClientRect().height + mt + mb
    }

    function rotateOnce(track: Element) {
      const first = track.querySelector('img')
      if (first) track.appendChild(first)
    }

 function stepAllBrand() {
  // MOVE animation
  brandTracks.forEach((track) => {
    const el = track as HTMLElement
    const stepPx = stepPxFor(track)

    el.style.transition = `transform ${MOVE_MS}ms ease-in-out`
    el.style.transform = `translateY(${-stepPx}px)`
  })

  setTimeout(() => {
  brandTracks.forEach((track, index) => {
    const el = track as HTMLElement

    // 🔥 rotate instead of replace
    const first = track.querySelector("img")
    if (first) {
      track.appendChild(first)
    }

    // 🔥 ONLY update last image (not all)
    const imgs = track.querySelectorAll("img")
    const lastImg = imgs[imgs.length - 1] as HTMLImageElement

    // update pair smoothly
    const currentPairIndex =
  ((pairIndex + (index % 2)) % logoPairs.length + logoPairs.length) % logoPairs.length
    const [logoA, logoB] = logoPairs[currentPairIndex]

    lastImg.src = index % 2 === 0 ? logoA : logoB

    el.style.transition = 'none'
    el.style.transform = 'translateY(0px)'
  })

  // 🔥 update AFTER rotation (important)
  pairIndex = (pairIndex + 1) % logoPairs.length

}, MOVE_MS)
}

    if (brandTracks.length) {
      stepAllBrand()
      const interval = setInterval(stepAllBrand, STEP_MS)
      return () => clearInterval(interval)
    }
  }, [])

  return (
    <section className="brand-showcase" id="brandShowcase">
      <div className="stars-bg"></div>
      <div className="bg-overlay"></div>

      <div className="container brand-inner">
        <div className="brand-header" id="brandHeader">
          <h2 className="brand-title">
            Chosen by Brands That Don&apos;t <br className="d-none d-sm-block" />
            <span>Play It Safe</span>
          </h2>
          <p className="brand-sub">
            The disruptors, innovators, and breakout startups trust us to push creative boundaries and deliver ROI with attitude.
          </p>
        </div>

        <div className="position-relative">
          {/* Decorative lines */}
          <div className="d-none d-md-block">
            <div className="grid-line" style={{ top: '33%' }}></div>
            <div className="grid-line" style={{ top: '66%' }}></div>
            <div className="v-line" style={{ left: '33%' }}></div>
            <div className="v-line" style={{ left: '66%' }}></div>
          </div>

          <div className="glass-card">
            <div className="top-glow"></div>

            <div className="brand-grid">
              {[1, 2, 3, 4, 5, 6].map((item, index) => {
  const isAmae = item % 2 !== 0

  return (
    <div className="brand-item" key={item}>
      <div className="logo-wheel">
        <div className="logo-wheel-track" data-wheel="brand">

          {isAmae ? (
            <>
              <img src="/img/amae.png" alt="Amae Beauty" />
              <img src="/img/amae.png" alt="Amae Beauty" />
              <img src="/img/amae.png" alt="Amae Beauty" />
            </>
          ) : (
            <>
              <img src="/img/RanuPath.png" alt="Dr. Ranu Pathology Centre" />
              <img src="/img/RanuPath.png" alt="Dr. Ranu Pathology Centre" />
              <img src="/img/RanuPath.png" alt="Dr. Ranu Pathology Centre" />
            </>
          )}

        </div>
      </div>
    </div>
  )
})}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}