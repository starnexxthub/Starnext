'use client'

import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";



export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`custom-navbar fixed-top ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between w-100">
          
          {/* Logo */}
          <a href="#" className="logo-wrapper" id="logo">
            <img src="/img/star-logo.png" className="w-50" alt="Starnext" />
            <div className="logo-icon"></div>
            <div className="logo-text-group"></div>
          </a>

          {/* Desktop Navigation */}
          <div className="nav-menu-wrapper d-none d-lg-block" id="navMenu">
            <ul className="nav-menu">
              <li className="nav-item">
                <a href="#" className="nav-link-custom active">
                  <span className="nav-dot"></span>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="/about" className="nav-link-custom">
                  <span className="nav-dot"></span>
                  About
                </a>
              </li>
              <li className="nav-item">
                <a href="/service" className="nav-link-custom">
                  <span className="nav-dot"></span>
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a href="/blogs" className="nav-link-custom">
                  <span className="nav-dot"></span>
                  Blogs
                </a>
              </li>
              
            </ul>
          </div>

          {/* Right Actions */}
          <div className="nav-actions d-none d-lg-flex">
            <button
      className="btn-contact"
      id="contactBtn"
      onClick={() => router.push("/contact")}
    >
      Contact Us
    </button>
            <a href="tel:+9198876543210" className="phone-link" id="phoneLink">
              <span className="phone-icon">
                <i className="bi bi-telephone-fill"></i>
              </span>
              <span>+91 98876 543210</span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="mobile-toggle d-lg-none" 
            id="mobileToggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'}`} id="toggleIcon"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`nav-menu-wrapper d-lg-none ${isMenuOpen ? 'active' : ''}`} id="mobileMenu">
        <div className="container">
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#" className="nav-link-custom active">Home</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link-custom">About</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link-custom">Services</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link-custom">Portfolio</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link-custom">Testimonials</a>
            </li>
          </ul>
          <div className="nav-actions">
            <button className="btn-contact w-100">Contact Us</button>
            <a href="tel:+9198876543210" className="phone-link">
              <span className="phone-icon">
                <i className="bi bi-telephone-fill"></i>
              </span>
              <span>+91 98876 543210</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}