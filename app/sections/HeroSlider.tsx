'use client'

import { useState, useEffect } from 'react'

const slides = [
  {
    image: '/assets/s-bg1.jpg',
    title: 'Starnext',
    subtitle: 'Best Digital Marketing In uttrakhand',
    desc: 'With the years of experience in Digital and Development industry Starnext Softech delivering, fulfilling and achieving their customers dreams and needs.'
  },
  {
    image: '/assets/s-bg3.jpg',
    title: 'Website',
    subtitle: 'Best Web Designing Company in Dehradun',
    desc: 'StarNext Softech is a fast-growing and best website designing company in Dehradun, Uttarakhand.'
  },
  {
    image: '/assets/s-bg2.jpg',
    title: 'Video',
    subtitle: 'Best Graphics Video and Photography Company in Dehradun',
    desc: 'At StarNext Softech we have a team of photo stylists, photo editors, photographer and videographers.'
  },
  {
    image: '/assets/s-bg4-1.jpg',
    title: 'Social Media',
    subtitle: 'Best Social Media Marketing Company in Dehradun',
    desc: 'StarNext Softech is a social media marketing company with extensive experience in social media marketing services.'
  }
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hero-slider" style={{ 
      height: '100vh', 
      position: 'relative', 
      overflow: 'hidden',
      background: '#0c0c0c'
    }}>
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: currentSlide === index ? 1 : 0,
            transition: 'opacity 1s ease',
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ 
            textAlign: 'center', 
            color: 'white',
            background: 'rgba(0,0,0,0.5)',
            padding: '3rem',
            borderRadius: '1rem',
            maxWidth: '800px'
          }}>
            <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '1rem' }}>
              {slide.title}
            </h1>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
              {slide.subtitle}
            </h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '2rem' }}>
              {slide.desc}
            </p>
            <a 
              href="tel:+9198876543210" 
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                background: '#00d4ff',
                color: '#000',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: 600
              }}
            >
              Call Now
            </a>
          </div>
        </div>
      ))}
      
      {/* Dots */}
      <div style={{ 
        position: 'absolute', 
        bottom: '2rem', 
        left: '50%', 
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '0.5rem'
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              background: currentSlide === index ? '#00d4ff' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>
    </div>
  )
}