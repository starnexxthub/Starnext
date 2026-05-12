'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const servicesData = [
  {
    title: 'DIGITAL MARKETING',
    sub: 'Best Digital Marketing Company',
    body: 'StarNext Softech delivers performance-focused digital marketing solutions for businesses and individuals aiming to grow online. Our strategies are built to create measurable impact and long-term brand value.',
    img: '/img/DigitalM-2.webp',
    label: 'Digital Marketing',
    href: '/service/Digital',   // ← added
  },
  {
    title: 'SOCIAL MEDIA MARKETING',
    sub: 'Best Social Media Marketing Company',
    body: 'StarNext Softech is a results-driven social media marketing company with deep expertise in delivering high-impact social media solutions. Our mission is to establish ourselves as the leading social media marketing company globally.',
    img: '/img/social.webp',
    label: 'Social Media Marketing',
    href: '/service/SocialMedia',  // ← added
  },
  {
    title: 'SEO',
    sub: 'Best SEO Company',
    body: "If you're a business owner seeking a reliable digital marketing company in India, StarNext Softech stands out as a strong choice. We drive growth through strategic search optimisation while our local SEO services boost visibility and attract nearby customers.",
    img: '/img/seo.webp',
    label: 'SEO',
    href: '/service/Seo',   // ← added
  },
  {
    title: 'WEB DESIGNING',
    sub: 'Best Web Designing Company',
    body: 'StarNext Softech is a fast-growing and trusted web designing company in Dehradun, Uttarakhand. We specialise in high-quality website design and development services that combine clean UI/UX, strong performance, and business-focused functionality.',
    img: '/img/Development.webp',
    label: 'Web Designing',
    href: '/service',   // ← added
  },
]
export default function ServicesDesktop() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  const pointRefs = useRef<(HTMLDivElement | null)[]>([])

  const activate = (idx: number) => {
    if (idx === activeIndexRef.current) return
    activeIndexRef.current = idx
    setActiveIndex(idx)
  }

  const scrollToPoint = (idx: number) => {
    pointRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.step)
            activate(idx)
          }
        })
      },
      {
        rootMargin: '-35% 0px -35% 0px',
        threshold: 0,
      }
    )

    pointRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        /* ── section wrapper ── */
        #brandSection {
          display: none;
        }

        @media (min-width: 768px) {
          #brandSection {
            display: block;
          }
        }

        /* ── left points ── */
        .js-point {
          padding: 2rem 0;
          border-top: 0.5px solid rgba(0,0,0,0.12);
          opacity: 0.35;
          transition: opacity 0.45s ease;
        }

        .js-point:last-of-type {
          border-bottom: 0.5px solid rgba(0,0,0,0.12);
          margin-bottom: 3rem;
        }

        .js-point.active {
          opacity: 1;
        }

        .js-point .service-step {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 0.4rem;
          transition: color 0.3s;
        }

        .js-point.active .service-step {
          color: #D85A30;
        }

        /* ── Fluid typography for left column ── */
        .js-point h3 {
          font-size: clamp(1rem, 1.5vw, 1.4rem);
          margin-bottom: 0.3rem;
          line-height: 1.2;
        }

        .js-point p {
          font-size: clamp(0.8rem, 1vw, 0.95rem);
          line-height: 1.55;
          margin-bottom: 0.4rem;
        }

        /* Section heading fluid scaling */
        #brandSection .big-title {
          font-size: clamp(1.6rem, 3vw, 2.8rem);
        }

        #brandSection .desc {
          font-size: clamp(0.85rem, 1.1vw, 1rem);
        }

        /* ── RIGHT CARD — responsive sticky panel ── */
        #rightCard {
          position: sticky;
          /* Fluid top offset: comfortable on all laptop navbars */
          top: clamp(60px, 8vh, 100px);
          /* Height fills viewport minus top offset + bottom margin */
          height: clamp(340px, calc(100vh - clamp(120px, 16vh, 200px)), 780px);
          border-radius: 12px;
          overflow: hidden;
        }

        /* ── image layers ── */
        #rightCard .img-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transform: scale(1.05);
          transition: opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
        }

        #rightCard .img-layer.visible {
          opacity: 1;
          transform: scale(1);
          z-index: 2;
        }

        /* ── overlay & label ── */
        .right-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
        }

        .right-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          z-index: 4;
        }

        .right-label-step {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          margin-bottom: 4px;
        }

        .right-label-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
        }

        /* ── progress dots ── */
        .progress-dots {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 5;
        }

        .progress-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.35);
          cursor: pointer;
          border: none;
          padding: 0;
          transition: background 0.3s, transform 0.3s;
        }

        .progress-dot.active {
          background: #fff;
          transform: scale(1.6);
        }

        /* ══════════════════════════════════════════
           LAPTOP BREAKPOINTS
        ══════════════════════════════════════════ */

        /* Small laptops / large tablets: 768px – 1023px */
        @media (min-width: 768px) and (max-width: 1023px) {
          #brandSection .container-xxl {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }

          /* Stack columns vertically — right card goes below */
          #brandSection .row {
            flex-direction: column;
          }

          #brandSection .col-lg-6 {
            width: 100%;
            max-width: 100%;
            flex: 0 0 100%;
          }

          /* Right card becomes a fixed-height banner, not sticky */
          #rightCard {
            position: relative;
            top: 0;
            height: clamp(260px, 45vw, 420px);
            margin-bottom: 2rem;
          }

          .js-point {
            padding: 1.5rem 0;
          }

          .js-point:last-of-type {
            margin-bottom: 2rem;
          }
        }

        /* Standard laptops: 1024px – 1279px */
        @media (min-width: 1024px) and (max-width: 1279px) {
          #brandSection .container-xxl {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }

          #brandSection .row {
            gap: 1.5rem !important;
          }

          #rightCard {
            top: clamp(60px, 8vh, 80px);
            height: clamp(360px, calc(100vh - 140px), 620px);
            border-radius: 10px;
          }

          .js-point {
            padding: 1.6rem 0;
          }

          .js-point:last-of-type {
            margin-bottom: 2.5rem;
          }
        }

        /* Medium laptops: 1280px – 1439px */
        @media (min-width: 1280px) and (max-width: 1439px) {
          #brandSection .container-xxl {
            padding-left: 2rem;
            padding-right: 2rem;
          }

          #rightCard {
            top: clamp(70px, 8.5vh, 90px);
            height: clamp(400px, calc(100vh - 160px), 680px);
          }

          .js-point {
            padding: 2rem 0;
          }

          .js-point:last-of-type {
            margin-bottom: 3.5rem;
          }
        }

        /* Large laptops / small desktops: 1440px – 1599px */
        @media (min-width: 1440px) and (max-width: 1599px) {
          #rightCard {
            top: clamp(80px, 9vh, 100px);
            height: clamp(440px, calc(100vh - 180px), 720px);
          }

          .js-point {
            padding: 2.25rem 0;
          }
        }

        /* Large desktops: 1600px+ */
        @media (min-width: 1600px) {
          #rightCard {
            top: 100px;
            height: calc(100vh - 200px);
            max-height: 800px;
          }

          .js-point {
            padding: 2.5rem 0;
          }

          .js-point:last-of-type {
            margin-bottom: 4rem;
          }
        }

        /* ── about button fluid sizing ── */
        .about-btn {
          font-size: clamp(0.7rem, 0.85vw, 0.8rem);
          padding: clamp(0.4rem, 0.6vw, 0.55rem) clamp(0.8rem, 1.2vw, 1.1rem);
          margin-top: 0.6rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .about-btn svg {
          width: clamp(0.75rem, 0.9vw, 1rem);
          height: clamp(0.75rem, 0.9vw, 1rem);
          flex-shrink: 0;
        }
      `}</style>

      <section id="brandSection">
        <div className="container-xxl">
          <div className="row g-5">

            {/* ── LEFT ── */}
            <div className="col-lg-6">
              <h1 className="big-title mb-3">Our Services</h1>
              <p className="desc mb-5">We help shape how your audience sees and remembers you.</p>

              {servicesData.map((svc, idx) => (
                <div
                  key={idx}
                  ref={(el) => { pointRefs.current[idx] = el }}
                  className={`js-point${activeIndex === idx ? ' active' : ''}`}
                  data-step={idx}
                >
                  {/* <p className="service-step">{svc.step}</p> */}
                  <h3>{svc.title}</h3>
                  <p className="fw-semibold">{svc.sub}</p>
                  <p>{svc.body}</p>
         <Link href={svc.href} className="about-btn btn-navy">
  MORE ABOUT US
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
</Link>
                </div>
              ))}

              <div style={{ height: '5vh' }} />
            </div>

            {/* ── RIGHT ── */}
            <div className="col-lg-6">
              <div id="rightCard">

                {servicesData.map((svc, idx) => (
                  <img
                    key={idx}
                    src={svc.img}
                    alt={svc.label}
                    className={`img-layer${activeIndex === idx ? ' visible' : ''}`}
                  />
                ))}

                <div className="right-overlay" />

                {/* Dot navigation */}
                <div className="progress-dots">
                  {servicesData.map((_, idx) => (
                    <button
                      key={idx}
                      className={`progress-dot${activeIndex === idx ? ' active' : ''}`}
                      aria-label={`Go to ${servicesData[idx].label}`}
                      onClick={() => scrollToPoint(idx)}
                    />
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}