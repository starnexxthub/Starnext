'use client'

import { useEffect } from 'react'

export default function Footer() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const gsap = (window as any).gsap
    const ScrollTrigger = (window as any).ScrollTrigger
    
    if (!gsap || !ScrollTrigger) return

    gsap.to('.footer-image-wrap', {
      scrollTrigger: {
        trigger: '.footer-image-wrap',
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true
      },
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.2
    })
  }, [])

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row footer-row">
          <div className="col-6 col-lg-3">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-my-list">
              <li><a href="/about">About Us</a></li>
              <li><a href="/team">Our Team</a></li>
             
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="col-6 col-lg-3">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-my-list">
              <li><a href="/service/Digital">Digital Marketing</a></li>
              <li><a href="/service">Web & App Development</a></li>
              <li><a href="/service/Seo">Search Engine Optimization</a></li>
              <li><a href="/service/SocialMedia">Social Media Marketing</a></li>
            </ul>
          </div>
          <div className="col-6 col-lg-3 mt-4 mt-lg-0">
            <h4 className="footer-title">Resources</h4>
            <ul className="footer-my-list">
              <li><a href="/blogs">Blogs</a></li>
              <li><a href="#">Case Studies</a></li>
              <li><a href="#">Design Insights</a></li>
              <li><a href="#">Tutorials</a></li>
            </ul>
          </div>
          <div className="col-6 col-lg-3 mt-4 mt-lg-0">
            <h4 className="footer-title">Legal</h4>
            <ul className="footer-my-list">
              <li><a href="/faq">FAQs</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-image-wrap">
          <img src="/img/footer3.png" alt="Footer graphic" className="footer-image w-100" />
        </div>
      </div>
      <div className="d-flex noww align-items-center px-md-5" style={{ borderTop: '1px solid white', height: '10vh' }}>
        <div className="d-flex justify-content-between align-items-center container px-md-5">
          <div>
            <h6 className="noww">© 2026 Starnext Softech Private Limited. All rights reserved.</h6>
          </div>
          <div>
            <h6 className="noww">Terms & Conditions | Privacy Policy</h6>
          </div>
        </div>
      </div>
    </footer>
  )
}