'use client'
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function ScrollHeadingDesktop() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 45%'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [80, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        opacity,
      }}
      className="wcu-heading-wrap desktop-heading"
    >
      <h2 className="wcu-heading">
        <span
          className="wcu-line-1"
          style={{ display: 'block' }}
        >
          Why Choose
        </span>

        <span
          className="wcu-line-1"
          style={{ display: 'block' }}
        >
          Starnext Softech
        </span>
      </h2>

      <p className="wcu-subtitle">
        Best digital marketing company turning digital attention into sales and clicks into conversions. Trusted by 100+ clients. Zero guesswork. Only measurable wins.
      </p>
    </motion.div>
  )
}
function ScrollHeadingMobile() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'end 55%'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [40, 0])

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        y,
      }}
      className="wcu-heading-wrap mobile-heading"
    >
      <h2 className="wcu-heading">
        <span
          className="wcu-line-1"
          style={{ display: 'block' }}
        >
          Why Choose
        </span>

        <span
          className="wcu-line-1"
          style={{ display: 'block' }}
        >
          Starnext Softech
        </span>
      </h2>

      <p className="wcu-subtitle">
        Best digital marketing company turning digital attention into sales and clicks into conversions. Trusted by 100+ clients. Zero guesswork. Only measurable wins.
      </p>
    </motion.div>
  )
}
export default function WhyChooseUs() {
  useEffect(() => {  if (typeof window === 'undefined') return

  document.querySelectorAll('[data-wcu-card]').forEach((card) => {
    const gsap = (window as any).gsap

    if (!gsap) return

    const enter = () => {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const leave = () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    card.addEventListener('mouseenter', enter)
    card.addEventListener('mouseleave', leave)

    return () => {
      card.removeEventListener('mouseenter', enter)
      card.removeEventListener('mouseleave', leave)
    }
  })
}, [])

  return (
    <section style={{ position: 'relative', padding: '80px 24px', background: '#fff', overflow: 'hidden', fontFamily: "'DM Sans', sans-serif", zIndex: 10 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
 
        .wcu-section * { box-sizing: border-box;  }
 
        /* ─── DESKTOP GRID (≥1024px) — unchanged from original ─── */
        .wcu-grid {
          display: grid;
          grid-template-columns: 340px 340px 1fr;
          grid-template-rows: 250px 250px;
          gap: 16px;
          align-items: stretch;
          position: relative;
          z-index: 1;
        }
 
        .wcu-card-1 { grid-column: 1 / 2; grid-row: 1 / 2; }
        .wcu-card-2 { grid-column: 2 / 3; grid-row: 1 / 2; }
        .wcu-card-3 { grid-column: 1 / 2; grid-row: 2 / 3; }
 
        .wcu-card-dark {
          background: #0f1c3f;
          color: #fff;
          grid-column: 2 / 4;
          grid-row: 2 / 3;
          min-height: 250px;
        }
          a:hover{
          color:white;}
 
        /* ─── TABLET GRID (640px–1023px) ─── */
        @media (min-width: 640px) and (max-width: 1023px) {
          .wcu-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto auto;
            gap: 14px;
          }
 
          .wcu-card-1 { grid-column: 1 / 2; grid-row: 1 / 2; }
          .wcu-card-2 { grid-column: 2 / 3; grid-row: 1 / 2; }
          .wcu-card-3 { grid-column: 1 / 2; grid-row: 2 / 3; }
 
          .wcu-card-dark {
            grid-column: 1 / 3;
            grid-row: 3 / 4;
            min-height: 200px;

          }
            .wcu-card-dark {
  display: flex;
  flex-direction: column;
}
 
          .wcu-star-wrap {
            width: clamp(80px, 28vw, 220px) !important;
            top: -6% !important;
            right: -20px !important;
          }
 
          .wcu-card { min-height: 200px !important; }
        }
 
        /* ─── MOBILE GRID (<640px) ─── */
        @media (max-width: 639px) {
          .wcu-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            gap: 12px;
          }
 
          .wcu-card-1,
          .wcu-card-2,
          .wcu-card-3 {
            grid-column: 1 / 2;
            grid-row: auto;
          }
 
          .wcu-card-dark {
            grid-column: 1 / 2;
            grid-row: auto;
            min-height: 200px;
          }
 
          .wcu-star-wrap { display: none !important; }
 
          .wcu-card { padding: 24px !important; min-height: unset !important; }
 
          .wcu-heading { font-size: clamp(28px, 8vw, 40px) !important; }
 
          .wcu-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }
 
        /* ─── SHARED CARD STYLES ─── */
        .wcu-card {
          border-radius: 22px;
          padding: 34px;
          position: relative;
          cursor: pointer;
          transition: box-shadow 0.3s ease;
          height: 100%;
          min-height: 220px;
        }
 
        .wcu-card-light {
          background: #ffffff;
          border: 1.5px solid #e8eaf0;
        }
 
        
 
        .wcu-card-icon {
          width: 44px;
          height: 40px;
          border-radius: 12px;
          background:white;
          display: flex;
          align-items: center;
          justify-content: center;
          
        }
 
        .wcu-card-title {
          font-family: sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #0d1b3e;
          margin: 0 0 10px 0;
          line-height: 1.3;
        }
 
        .wcu-card-dark .wcu-card-title { color: #fff; }
 
        .wcu-card-body {
          font-size: 16px;
          color: #6b7590;
          line-height: 1.65;
          margin: 0;
        }
 
        .wcu-card-dark .wcu-card-body { color: #a8bbd8; }
 
        
 
        
 
        /* On touch devices, always show learn more */
        @media (hover: none) {
          .wcu-learn-more { opacity: 1; transform: translateY(0); }
        }
 
        .wcu-connect-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 999px;
          border: 1.5px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.1);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease;
          font-family:  sans-serif;
          white-space: nowrap;
          margin-left: auto;
        }
 
        .wcu-connect-btn:hover {
          background: rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.5);
        }
 
        .wcu-star-wrap {
          position: absolute;
          top: -10%;
          right: -37px;
          width: clamp(90px, 51vw, 400px);
          pointer-events: none;
          z-index: 10;
        }
 
        .wcu-blob-1 {
          position: absolute;
          width: 340px; height: 340px;
          border-radius: 50%;
          background: #dce9ff;
          top: 10%; left: -80px;
          filter: blur(80px);
          opacity: 0.35;
          pointer-events: none;
        }
 
        .wcu-blob-2 {
          position: absolute;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: #e8ecf8;
          top: 40%; right: -60px;
          filter: blur(80px);
          opacity: 0.3;
          pointer-events: none;
        }
 
        .wcu-dark-glow {
          position: absolute;
          top: -40px; right: -40px;
          width: 180px; height: 180px;
          border-radius: 50%;
          background: rgba(70,130,255,0.12);
          filter: blur(40px);
          pointer-events: none;
        }
 
        .wcu-shimmer {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%);
          background-size: 200% 100%;
          animation: wcu-shimmer 3s infinite;
          pointer-events: none;
        }
 
        @keyframes wcu-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
 
        .wcu-heading-wrap { margin-bottom: 52px; }
 
        .wcu-heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(36px, 5vw, 54px);
          font-weight: 400;
          line-height: 1.1;
          color: #0d1b3e;
          margin: 0 0 16px 0;
        }
 
        .wcu-heading-accent {
          color: #1a3a8f;
          font-style: italic;
        }
 
        .wcu-subtitle {
          font-size: 16px;
          color: #6b7590;
          max-width: 600px;
          margin: 0;
          line-height: 1.6;
        }
 
        .wcu-bottom-bar {
          margin-top: 48px;
          display: flex;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
        }
 
        .wcu-bottom-text {
          font-size: 14px;
          color: #6b7590;
          max-width: 360px;
          line-height: 1.6;
          margin: 0;
        }
 
        .wcu-talk-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 8px;
  background: #0d1b3e;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  font-family: sans-serif;
  white-space: nowrap;

  transition:
    transform 0.28s ease,
    background 0.25s ease,
    box-shadow 0.28s ease;

  transform-origin: center;
}

.wcu-talk-btn:hover {
  

  transform: scale(1.08);

  box-shadow:
    0 14px 30px rgba(13, 27, 62, 0.28);
}
 
        
        /* Disable GSAP entrance animations on mobile */
        @media (max-width: 767px) {
          .wcu-line-1, .wcu-line-2, .wcu-subtitle { opacity: 1 !important; transform: none !important; }
          [data-wcu-card] { opacity: 1 !important; transform: none !important; }
        }

.wcu-mobile-heading {
  display: none;
}

.wcu-desktop-heading {
  display: block;
}

@media (max-width: 767px) {
  .wcu-mobile-heading {
    display: block;
  }

  .wcu-desktop-heading {
    display: none;
  }
}



      `}</style>
 

      {/* Ambient blobs */}
      <div className="wcu-blob-1" />
      <div className="wcu-blob-2" />

      <div className="wcu-section" style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
      {/* Desktop / Tablet */}
<div className="wcu-desktop-heading">
  <ScrollHeadingDesktop />
</div>

{/* Mobile */}
<div className="wcu-mobile-heading">
  <ScrollHeadingMobile />
</div>

        {/* Grid */}
        <div style={{ position: 'relative' }}>
          {/* Star decoration */}
          <div className="wcu-star-wrap wcu-star">
            <img src="/star.png" alt="" style={{ width: '100%' }} />
          </div>

          <div className="wcu-grid" style={{ marginRight: 'clamp(0px, 8vw, 100px)' }}>

            {/* Card 1 — Expert Business Solutions */}
            <div className="wcu-card wcu-card-light wcu-card-1" data-wcu-card="1">
              
              <h3 className="wcu-card-title">Expert Business Solutions</h3>
              <p className="wcu-card-body">
                We sit together with you, refine<br></br> your ideas, and deliver tailored <br></br>digital solutions that achieve results.
              </p>
              
            </div>

            {/* Card 2 — Results That Matter */}
            <div className="wcu-card wcu-card-light wcu-card-2" data-wcu-card="2">
              
              <h3 className="wcu-card-title">Results That Matter</h3>
              <p className="wcu-card-body">
                Focused on outcomes that amplify<br></br> your business, not just activities.
              </p>
              
            </div>

            {/* Card 3 — Dedicated Teamwork */}
            <div className="wcu-card wcu-card-light wcu-card-3" data-wcu-card="3">
              
              <h3 className="wcu-card-title">Dedicated Teamwork</h3>
              <p className="wcu-card-body">
                We work as one team, ensuring<br></br> results that stand out and speak<br></br> for themselves.
              </p>
              
            </div>

            {/* Card 4 — Always Connected (dark) */}
            <div className="wcu-card wcu-card-dark" data-wcu-card="4" style={{ overflow: 'hidden' }}>
              <div className="wcu-dark-glow" />
              <div className="wcu-shimmer" />

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <svg width="22" height="22" fill="none" stroke="#7eb3ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                </svg>
                
              </div>
              <h3 className="wcu-card-title" style={{ margin: 0 }}>Always Connected</h3>

              <p className="wcu-card-body" style={{ marginBottom: 24 }}>
                We keep you in touch throughout the process—call anytime<br></br> to check your project status.
              </p>

              <a href="/contact" className="wcu-connect-btn">
                Let's Connect
                <img
  src="/assets/connect.svg"
  alt="Arrow Icon"
  width={14}
  height={14}
  className="tw-object-contain"
/>
              </a>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        {/*<div className="wcu-bottom-bar">
          <p className="wcu-bottom-text">
            Designing seamless user interfaces that <br></br>transform ideas into exceptional digital<br></br> experiences.
          </p>
          <a href="/contact" className="wcu-talk-btn">
            Let's Talk
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div> */}

      </div>
    </section>
  )
}