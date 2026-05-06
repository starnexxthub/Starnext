'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useAnimation, motion, AnimatePresence } from 'framer-motion'

const servicesData = [
  { title: '', desc: '', img: '/img/DigitalM-2.webp' },
  { title: '', desc: '', img: '/img/social.webp' },
  { title: '', desc: '', img: '/img/seo.webp' },
  { title: '', desc: '', img: '/img/Development.webp' }
]

const services = [
  {
    step: 0,
    heading: 'DIGITAL MARKETING',
    sub: 'Best Digital Marketing Company',
    body: 'StarNext Softech, the best digital marketing company, brings years of industry experience to help businesses achieve growth through innovative digital solutions.',
    href: '/service/Digital'
  },
  {
    step: 1,
    heading: 'SOCIAL MEDIA MARKETING',
    sub: 'Best Social Media Marketing Company',
    body: "StarNext's social media marketing drives growth with engaging campaigns, data-driven strategies, and stunning content, boosting reach, engagement, and loyalty.",
    href: '/service/SocialMedia'
  },
  {
    step: 2,
    heading: 'SEO',
    sub: 'Best SEO Company',
    body: 'We help brands dominate search rankings through data-led SEO that drives qualified traffic and conversions.',
    href: '/service/Seo'
  },
  {
    step: 3,
    heading: 'WEB DESIGNING',
    sub: 'Best Web Designing Company',
    body: 'From concept to launch, we deliver high-performance, visually refined websites that engage audiences, convert customers, and accelerate measurable business growth.',
    href: '/service'
  }
]

const ArrowIcon = () => (
  <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

// Staggered point entrance — each child slides up in sequence
function ServicePoint({
  step, heading, sub, body, href, isActive
}: {
  step: number; heading: string; sub: string; body: string; href: string; isActive: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -18% 0px' })

  const items = [
    { el: 'h3', content: heading, className: `js-anim${step === 0 ? ' fw-semibold' : ''}` },
    { el: 'p',  content: sub,     className: 'fw-semibold js-anim' },
    { el: 'p',  content: body,    className: 'js-anim' },
  ]

  return (
    <div
      ref={ref}
      className={`point js-point ${isActive ? 'active' : ''}`}
      data-step={step}
    >
      {items.map(({ el, content, className }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
        >
          {el === 'h3'
            ? <h3 className={className}>{content}</h3>
            : <p  className={className}>{content}</p>
          }
        </motion.div>
      ))}

      <motion.div
        className="magnetic-wrap js-anim"
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        <a href={href} className="btn faq-btn">
          MORE ABOUT US <ArrowIcon />
        </a>
      </motion.div>
    </div>
  )
}

// Right card — scale+fade entrance, image crossfade via AnimatePresence
function RightCard({ activeIndex }: { activeIndex: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })

  return (
    <motion.div
      ref={ref}
      className="right-card"
      id="rightCard"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="media" style={{ overflow: 'hidden', position: 'relative' }}>
        <AnimatePresence mode="sync">
          <motion.img
            key={activeIndex}
            id="rightImg"
            src={servicesData[activeIndex].img}
            alt={services[activeIndex].heading}
            style={{ willChange: 'transform, opacity', width: '100%', height: '100%', objectFit: 'cover' }}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
      </div>
      <div className="overlay" />
      <div className="content">
        <h2 className="right-title" id="rightTitle">{servicesData[activeIndex].title}</h2>
        <p className="right-desc" id="rightDesc">{servicesData[activeIndex].desc}</p>
      </div>
    </motion.div>
  )
}

export default function ServicesDesktop() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  // ScrollTrigger for pinning right card + active index tracking — still uses GSAP
  // only for the pin + scroll position detection (no animation logic)
  useEffect(() => {
    if (typeof window === 'undefined') return

    let rafId: number
    const wait = () => {
      const gsap = (window as any).gsap
      const ScrollTrigger = (window as any).ScrollTrigger
      if (!gsap || !ScrollTrigger) { rafId = requestAnimationFrame(wait); return }

      const section = sectionRef.current
      const rightCard = document.getElementById('rightCard')
      const points = sectionRef.current?.querySelectorAll<HTMLElement>('.js-point')

      if (!section || !rightCard || !points?.length) return

      const triggers: any[] = []

      ScrollTrigger.matchMedia({
        '(min-width: 992px)': function () {
          triggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: 'top top+=30',
              end: () => '+=' + (section.offsetHeight - rightCard.offsetHeight),
              pin: rightCard,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true
            })
          )
        }
      })

      points.forEach((el) => {
        const index = Number(el.getAttribute('data-step'))
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index)
          })
        )
      })

      const onLoad = () => ScrollTrigger.refresh()
      window.addEventListener('load', onLoad)

      // store cleanup
      ;(wait as any)._cleanup = () => {
        window.removeEventListener('load', onLoad)
        triggers.forEach(t => t.kill())
      }
    }

    rafId = requestAnimationFrame(wait)
    return () => {
      cancelAnimationFrame(rafId)
      ;(wait as any)._cleanup?.()
    }
  }, [])

  return (
    <section ref={sectionRef} className="section-wrap d-none d-md-block" id="brandSection">
      <div className="container-xxl">
        <div className="row g-5">

          {/* LEFT SIDE */}
          <div className="col-lg-6">
            <h1 className="big-title mb-4">Our Services</h1>
            <p className="desc mb-5">We help shape how your audience sees and remembers you.</p>

            {services.map(({ step, heading, sub, body, href }) => (
              <ServicePoint
                key={step}
                step={step}
                heading={heading}
                sub={sub}
                body={body}
                href={href}
                isActive={activeIndex === step}
              />
            ))}

            <div style={{ height: '5vh' }} />
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-6">
            <RightCard activeIndex={activeIndex} />
          </div>

        </div>
      </div>
    </section>
  )
}