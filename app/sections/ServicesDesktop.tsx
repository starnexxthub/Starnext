'use client'

import { useEffect, useRef, useState } from 'react'

const servicesData = [
  {
    step: '01 — Digital',
    title: 'DIGITAL MARKETING',
    sub: 'Best Digital Marketing Company',
    body: 'StarNext Softech delivers performance-focused digital marketing solutions for businesses and individuals aiming to grow online. Our strategies are built to create measurable impact and long-term brand value.',
    img: '/img/DigitalM-2.webp',
    label: 'Digital Marketing',
  },
  {
    step: '02 — Social',
    title: 'SOCIAL MEDIA MARKETING',
    sub: 'Best Social Media Marketing Company',
    body: 'StarNext Softech is a results-driven social media marketing company with deep expertise in delivering high-impact social media solutions. Our mission is to establish ourselves as the leading social media marketing company globally.',
    img: '/img/social.webp',
    label: 'Social Media Marketing',
  },
  {
    step: '03 — Search',
    title: 'SEO',
    sub: 'Best SEO Company',
    body: "If you're a business owner seeking a reliable digital marketing company in India, StarNext Softech stands out as a strong choice. We drive growth through strategic search optimisation while our local SEO services boost visibility and attract nearby customers.",
    img: '/img/seo.webp',
    label: 'SEO',
  },
  {
    step: '04 — Design',
    title: 'WEB DESIGNING',
    sub: 'Best Web Designing Company',
    body: 'StarNext Softech is a fast-growing and trusted web designing company in Dehradun, Uttarakhand. We specialise in high-quality website design and development services that combine clean UI/UX, strong performance, and business-focused functionality.',
    img: '/img/Development.webp',
    label: 'Web Designing',
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

  // Dot click scrolls to the corresponding point
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
        // Fire when the element occupies the middle 30% of the viewport
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
          padding: 2.5rem 0;
          border-top: 0.5px solid rgba(0,0,0,0.12);
          opacity: 0.35;
          transition: opacity 0.45s ease;
        }

        .js-point:last-of-type {
          border-bottom: 0.5px solid rgba(0,0,0,0.12);
          margin-bottom: 4rem;
        }

        .js-point.active {
          opacity: 1;
        }

        .js-point .service-step {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 0.5rem;
          transition: color 0.3s;
        }

        .js-point.active .service-step {
          color: #D85A30;
        }

        /* ── right card ── */
        #rightCard {
          position: sticky;
          top: 90px;
          height: calc(100vh - 180px);
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
                  <p className="service-step">{svc.step}</p>
                  <h3>{svc.title}</h3>
                  <p className="fw-semibold">{svc.sub}</p>
                  <p>{svc.body}</p>
                  <button className="about-btn btn-navy">
                    MORE ABOUT US
                    <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              ))}

              <div style={{ height: '5vh' }} />
            </div>

            {/* ── RIGHT ── */}
            <div className="col-lg-6">
              <div id="rightCard">

                {/* One image per service — only the active one is visible */}
                {servicesData.map((svc, idx) => (
                  <img
                    key={idx}
                    src={svc.img}
                    alt={svc.label}
                    className={`img-layer${activeIndex === idx ? ' visible' : ''}`}
                  />
                ))}

                <div className="right-overlay" />

                {/* Bottom label updates with active service 
                <div className="right-label">
                  <p className="right-label-step">{servicesData[activeIndex].step}</p>
                  <p className="right-label-title">{servicesData[activeIndex].label}</p>
                </div>
                */}

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