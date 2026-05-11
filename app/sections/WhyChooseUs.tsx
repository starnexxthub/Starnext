'use client'

import { useEffect } from 'react'

export default function WhyChooseUs() {
  useEffect(() => {
  if (typeof window === 'undefined') return

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
    <section style={{ position: 'relative', padding: '80px 24px', background: '#fff', overflow: 'hidden', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
 
        .wcu-section * { box-sizing: border-box; }
 
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
 
        .wcu-card-light:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(20,30,80,0.08);
          border-color: #c8cde0;
        }
 
        .wcu-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #f0f3ff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
 
        .wcu-card-title {
          font-family: sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #0d1b3e;
          margin: 0 0 10px 0;
          line-height: 1.3;
        }
 
        .wcu-card-dark .wcu-card-title { color: #fff; }
 
        .wcu-card-body {
          font-size: 14px;
          color: #6b7590;
          line-height: 1.65;
          margin: 0;
        }
 
        .wcu-card-dark .wcu-card-body { color: #a8bbd8; }
 
        .wcu-learn-more {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: #1a3a8f;
          margin-top: 20px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
 
        .wcu-card-light:hover .wcu-learn-more {
          opacity: 1;
          transform: translateY(0);
        }
 
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
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease;
          font-family: 'DM Sans', sans-serif;
          white-space: nowrap;
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
          transition: background 0.2s ease;
          font-family: sans-serif;
          white-space: nowrap;
        }
 
        .wcu-talk-btn:hover { background: #1a3a8f; }
 
        /* Disable GSAP entrance animations on mobile */
        @media (max-width: 767px) {
          .wcu-line-1, .wcu-line-2, .wcu-subtitle { opacity: 1 !important; transform: none !important; }
          [data-wcu-card] { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
 

      {/* Ambient blobs */}
      <div className="wcu-blob-1" />
      <div className="wcu-blob-2" />

      <div className="wcu-section" style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="wcu-heading-wrap">
          <h2 className="wcu-heading">
            <span className="wcu-line-1" style={{ display: 'block' }}>Why Choose</span>
            <span className="wcu-line-1" style={{ display: 'block' }}>Starnext Softech</span>
          </h2>
          <p className="wcu-subtitle wcu-subtitle">
            Trusted by 100+ clients, we deliver solutions with precision and excellence.
          </p>
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
              <div className="wcu-card-icon">
                <svg width="22" height="22" fill="none" stroke="#1a3a8f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                </svg>
              </div>
              <h3 className="wcu-card-title">Expert Business Solutions</h3>
              <p className="wcu-card-body">
                We sit together with you, refine<br></br> your ideas, and deliver tailored <br></br>digital solutions that achieve results.
              </p>
              <span className="wcu-learn-more">
                Learn more
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            {/* Card 2 — Results That Matter */}
            <div className="wcu-card wcu-card-light wcu-card-2" data-wcu-card="2">
              <div className="wcu-card-icon">
                <svg width="22" height="22" fill="none" stroke="#1a3a8f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <h3 className="wcu-card-title">Results That Matter</h3>
              <p className="wcu-card-body">
                Focused on outcomes that amplify<br></br> your business, not just activities.
              </p>
              <span className="wcu-learn-more">
                Learn more
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            {/* Card 3 — Dedicated Teamwork */}
            <div className="wcu-card wcu-card-light wcu-card-3" data-wcu-card="3">
              <div className="wcu-card-icon">
                <svg width="22" height="22" fill="none" stroke="#1a3a8f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <h3 className="wcu-card-title">Dedicated Teamwork</h3>
              <p className="wcu-card-body">
                We work as one team, ensuring<br></br> results that stand out and speak<br></br> for themselves.
              </p>
              <span className="wcu-learn-more">
                Learn more
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>

            {/* Card 4 — Always Connected (dark) */}
            <div className="wcu-card wcu-card-dark" data-wcu-card="4" style={{ overflow: 'hidden' }}>
              <div className="wcu-dark-glow" />
              <div className="wcu-shimmer" />

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <svg width="22" height="22" fill="none" stroke="#7eb3ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                </svg>
                <h3 className="wcu-card-title" style={{ margin: 0 }}>Always Connected</h3>
              </div>

              <p className="wcu-card-body" style={{ marginBottom: 24 }}>
                We keep you in touch throughout the process—call anytime<br></br> to check your project status.
              </p>

              <a href="/contact" className="wcu-connect-btn">
                Let's Connect
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="wcu-bottom-bar">
          <p className="wcu-bottom-text">
            Designing seamless user interfaces that <br></br>transform ideas into exceptional digital<br></br> experiences.
          </p>
          <a href="/contact" className="wcu-talk-btn">
            Let's Talk
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}