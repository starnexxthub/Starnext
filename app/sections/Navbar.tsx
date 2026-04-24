'use client'

import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";



export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isServiceOpen, setIsServiceOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  useEffect(() => {
  if (isMenuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [isMenuOpen]);


  

  return (
    <nav className={`custom-navbar fixed-top ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between w-100">
          
          {/* Logo */}
          <a href="/" className="logo-wrapper" id="logo">
            <img src="/img/star-logo.png" className="w-50" alt="Starnext" />
            <div className="logo-icon"></div>
            <div className="logo-text-group"></div>
          </a>

          {/* Desktop Navigation */}
          <div className="nav-menu-wrapper d-none d-lg-block" id="navMenu">
            <ul className="nav-menu">
              <li className="nav-item">
                <a href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="/about" className={`nav-link ${pathname === "/about" ? "active" : ""}`}>
                  About
                </a>
              </li>
              <li className="nav-item dropdown">
  <a
  href="/service"
  className={`nav-link dropdown-toggle d-flex align-items-center gap-1 ${pathname === "/service" ? "active" : ""}`}
>
  Services
  <span className="dropdown-arrow"></span>
</a>

  <ul className="dropdown-menu-custom">
    <li>
      <a href="/service/Digital" className="dropdown-item">
        Digital Marketing
      </a>
    </li>
    <li>
      <a href="/service" className="dropdown-item">
        Web & App Development
      </a>
    </li>
    <li>
      <a href="/service/Seo" className="dropdown-item">
        Search Engine Optimization
      </a>
    </li>
    <li>
      <a href="/service/SocialMedia" className="dropdown-item">
        Social Media Marketing
      </a>
    </li>
  </ul>
</li>
              <li className="nav-item">
                <a href="/blogs" className={`nav-link ${pathname === "/blogs" ? "active" : ""}`}>
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
              onClick={() => window.location.href = "/contact"}
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
              <a
                href="/"
                className={`nav-link-custom ${pathname === "/" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault()
                  router.push("/")
                  setIsMenuOpen(false)
                }}
              >
                Home
              </a>
            </li>

            <li className="nav-item">
              <a
                href="/about"
                className={`nav-link-custom ${pathname === "/about" ? "active" : ""}`}
                onClick={() => {
  setIsMenuOpen(false); // close menu FIRST

  setTimeout(() => {
    router.push("/about"); // THEN navigate
  }, 200); // 🔥 important delay
}}
              >
                About
              </a>
            </li>

     <li className="nav-item">
  <div
    className="nav-link-custom d-flex justify-content-between align-items-center"
    onClick={() => setIsServiceOpen(!isServiceOpen)}
  >
    Services
    <span style={{
      fontSize: '1.4rem',
      fontWeight: '300',
      lineHeight: 1,
      userSelect: 'none'
    }}>
      {isServiceOpen ? '−' : '+'}
    </span>
  </div>

  <ul className={`mobile-dropdown ${isServiceOpen ? 'open' : ''}`}>
    <li><a href="/service/Digital" onClick={() => setIsMenuOpen(false)}>Digital Marketing</a></li>
    <li><a href="/service" onClick={() => setIsMenuOpen(false)}>Web & App Development</a></li>
    <li><a href="/service/Seo" onClick={() => setIsMenuOpen(false)}>Search Engine Optimization</a></li>
    <li><a href="/service/SocialMedia" onClick={() => setIsMenuOpen(false)}>Social Media Marketing</a></li>
  </ul>
</li>

            <li className="nav-item">
              <a
                href="/blogs"
                className={`nav-link-custom ${pathname === "/blogs" ? "active" : ""}`}
                onClick={() => {
  setIsMenuOpen(false); // close menu FIRST

  setTimeout(() => {
    router.push("/blogs"); // THEN navigate
  }, 200); // 🔥 important delay
}}
              >
                Blogs
              </a>
            </li>

            

            
          </ul>

          <div className="nav-actions">
            <button
              className="btn-contact w-100"
              onClick={() => {
  setIsMenuOpen(false); 

  setTimeout(() => {
    router.push("/contact"); 
  }, 200); 
}}
            >
              Contact Us
            </button>
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