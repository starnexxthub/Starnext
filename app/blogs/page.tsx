'use client';

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import gsap from 'gsap';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import Newsletter from '../sections/Newsletter';
import SocialBar from '../sections/SocialBar';

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentY = useRef(0);
  const targetY = useRef(0);
  const isHovering = useRef(false);
  const touchStartY = useRef(0);
  const lastTouchY = useRef(0);
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);

  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Digital Marketing Agencies in Dehradun",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Top 10 Digital Marketing Agencies in Dehradun",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      title: "Top 10 Digital Marketing Agencies in Dehradun",
      image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      title: "Top 10 Digital Marketing Agencies in Dehradun",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80"
    }
  ];

  // Duplicate for infinite scroll
  const allPosts = [...blogPosts, ...blogPosts];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      initAnimations();
      initSmoothScroll();
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const initAnimations = () => {
    // Sidebar entrance
    gsap.from('.sidebar', {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Blog list items
    gsap.to('.blog-list-item', {
      x: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.08,
      delay: 0.2,
      ease: 'power2.out'
    });

    // Social icons
    gsap.from('.social-icon', {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      stagger: 0.08,
      delay: 0.6,
      ease: 'back.out(1.7)'
    });

    // Cards entrance
    gsap.from('.blog-card', {
      y: 60,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.1,
      ease: 'power3.out'
    });
  };

  const initSmoothScroll = () => {
    const cardHeight = 240;
    const totalOriginalCards = 4;
    const totalHeight = cardHeight * totalOriginalCards;
    const autoScrollSpeed = 0.3;

    const updateScroll = () => {
      if (!isHovering.current) {
        targetY.current -= autoScrollSpeed;
      }

      // Infinite loop logic
      if (Math.abs(targetY.current) >= totalHeight) {
        targetY.current = 0;
        currentY.current = 0;
        if (trackRef.current) {
          trackRef.current.style.transform = `translateY(${currentY.current}px)`;
        }
      }

      // Smooth interpolation
      currentY.current += (targetY.current - currentY.current) * 0.08;
      
      if (trackRef.current) {
        trackRef.current.style.transform = `translateY(${currentY.current}px)`;
      }

      requestAnimationFrame(updateScroll);
    };

    requestAnimationFrame(updateScroll);
  };

  const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    isHovering.current = true;
    const cardBg = e.currentTarget.querySelector('.blog-card-bg');
    if (cardBg) {
      gsap.to(cardBg, { scale: 1.1, duration: 0.5, ease: 'power2.out' });
    }
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    isHovering.current = false;
    const cardBg = e.currentTarget.querySelector('.blog-card-bg');
    if (cardBg) {
      gsap.to(cardBg, { scale: 1, duration: 0.5, ease: 'power2.out' });
    }
    
    // Reset 3D tilt effect
    const inner = e.currentTarget.querySelector('.blog-card-inner');
    if (inner) {
      gsap.to(inner, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;

    const inner = card.querySelector('.blog-card-inner');
    if (inner) {
      gsap.to(inner, {
        rotateX,
        rotateY,
        duration: 0.2,
        ease: 'power2.out'
      });
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
    
    isHovering.current = true;
    const scrollAmount = e.deltaY * 0.5;
    targetY.current -= scrollAmount;

    const cardHeight = 240;
    const totalOriginalCards = 4;
    const totalHeight = cardHeight * totalOriginalCards;
    const maxScroll = -(totalHeight + cardHeight);
    const minScroll = cardHeight;

    if (targetY.current > minScroll) targetY.current = minScroll;
    if (targetY.current < maxScroll) targetY.current = maxScroll;

    wheelTimeout.current = setTimeout(() => {
      isHovering.current = false;
    }, 150);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    lastTouchY.current = touchStartY.current;
    isHovering.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchY = e.touches[0].clientY;
    const deltaY = lastTouchY.current - touchY;
    lastTouchY.current = touchY;
    targetY.current -= deltaY;

    const cardHeight = 240;
    const totalOriginalCards = 4;
    const totalHeight = cardHeight * totalOriginalCards;
    const maxScroll = -(totalHeight + cardHeight);
    const minScroll = cardHeight;

    if (targetY.current > minScroll) targetY.current = minScroll;
    if (targetY.current < maxScroll) targetY.current = maxScroll;
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      isHovering.current = false;
    }, 300);
  };

  const scrollToCard = (index: number) => {
    const cardHeight = 240;
    const targetPosition = -(index * cardHeight);
    const track = trackRef.current;
    
    if (!track) return;

    const currentTransform = track.style.transform;
    const currentYValue = parseFloat(currentTransform.replace('translateY(', '').replace('px)', '')) || 0;

    gsap.to({ y: currentYValue }, {
      y: targetPosition,
      duration: 0.8,
      ease: 'power3.inOut',
      onUpdate: function() {
        const y = (this.targets()[0] as { y: number }).y;
        track.style.transform = `translateY(${y}px)`;
        targetY.current = y;
        currentY.current = y;
      }
    });
  };

  const handleSocialHover = (e: React.MouseEvent<HTMLDivElement>, isEnter: boolean) => {
    gsap.to(e.currentTarget, {
      scale: isEnter ? 1.15 : 1,
      y: isEnter ? -3 : 0,
      duration: 0.3,
      ease: isEnter ? 'back.out(1.7)' : 'power2.out'
    });
  };

  return (
    
    <>
    <Navbar />
      <Head>
        <title>Creative Blogs Section - StarNext UI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <style jsx global>{`
        :root {
          --primary-bg: #0a1628;
          --card-bg: rgba(20, 30, 48, 0.6);
          --accent-blue: #00d4ff;
          --text-primary: #ffffff;
          --text-secondary: #a0aec0;
          --hover-glow: rgba(0, 212, 255, 0.3);
        }

        .blog-page {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
          color: var(--text-primary);
          position: relative;
          margin-top:90px;
        }

        .bg-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background: 
            radial-gradient(ellipse at 20% 80%, rgba(0, 100, 255, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 40%, rgba(100, 0, 255, 0.05) 0%, transparent 40%),
            linear-gradient(135deg, #0a1628 0%, #0d1f35 50%, #0a1628 100%);
        }

        .grid-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          z-index: -1;
        }

        .floating-particles {
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: -1;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: var(--accent-blue);
          border-radius: 50%;
          opacity: 0.5;
          animation: float 15s infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }

        .blogs-section {
          padding: 40px 0;
          min-height: 100vh;
        }

        .sidebar {
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 30px;
          height: fit-content;
          position: sticky;
          top: 30px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .sidebar-title {
          font-size: 28px;
          font-weight: 600;
          letter-spacing: 3px;
          margin-bottom: 25px;
          position: relative;
          display: inline-block;
        }

        .sidebar-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-blue), transparent);
        }

        .blog-list {
          list-style: none;
          padding: 0;
          margin-bottom: 30px;
        }

        .blog-list-item {
          padding: 15px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateX(-20px);
          font-size: 14px;
          line-height: 1.5;
        }

        .blog-list-item:hover {
          color: var(--accent-blue);
          padding-left: 10px;
        }

        .blog-list-item::before {
          content: '';
          margin-right: 8px;
          color: var(--accent-blue);
          font-weight: 600;
        }

        .connect-section {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .connect-title {
          font-size: 20px;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .social-icons {
          display: flex;
          gap: 15px;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.05);
        }

        .social-icon::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .social-icon:hover::before {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .social-icon.linkedin { color: #0077b5; }
        .social-icon.youtube { color: #ff0000; }
        .social-icon.instagram { 
          background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .social-icon.whatsapp { color: #25d366; }

        .blog-cards-wrapper {
          position: relative;
          height: 600px;
          overflow: hidden;
          mask-image: linear-gradient(to bottom, 
            transparent 0%, 
            black 5%, 
            black 95%, 
            transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, 
            transparent 0%, 
            black 5%, 
            black 95%, 
            transparent 100%);
        }

        .blog-cards-track {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: absolute;
          width: 100%;
          will-change: transform;
          top: 0;
        }

        .blog-card {
          position: relative;
          height: 220px;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transform-style: preserve-3d;
          perspective: 1000px;
          flex-shrink: 0;
          background: #000;
        }

        .blog-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .blog-card:hover .blog-card-inner {
          transform: translateZ(20px) scale(1.02);
        }

        .blog-card-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: all 0.5s ease;
        }

        .blog-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, transparent 100%);
          transition: all 0.4s ease;
        }

        .blog-card:hover .blog-card-overlay {
          background: linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, transparent 100%);
        }

        .blog-card-content {
          position: absolute;
          bottom: 25px;
          left: 25px;
          z-index: 2;
          max-width: 280px;
        }

        .blog-card-title {
          font-size: 22px;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
        }

        .read-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          color: white;
          font-size: 13px;
          font-weight: 500;
          opacity: 0;
          transform: translateY(15px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }

        .blog-card:hover .read-btn {
          opacity: 1;
          transform: translateY(0);
        }

        .read-btn:hover {
          background: var(--accent-blue);
          border-color: var(--accent-blue);
          box-shadow: 0 0 20px var(--hover-glow);
        }

        .blog-card::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, var(--accent-blue), transparent, var(--accent-blue));
          border-radius: 18px;
          opacity: 0;
          z-index: -1;
          transition: opacity 0.4s ease;
          filter: blur(10px);
        }

        .blog-card:hover::after {
          opacity: 0.5;
        }

        .loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--primary-bg);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.5s ease;
        }

        .loader.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .loader-circle {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(0, 212, 255, 0.1);
          border-top-color: var(--accent-blue);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 991px) {
          .sidebar {
            position: relative;
            top: 0;
            margin-bottom: 30px;
          }
          
          .blog-cards-wrapper {
            height: 500px;
          }
          
          .blog-card {
            height: 180px;
          }
          
          .blog-card-title {
            font-size: 18px;
          }
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        ::-webkit-scrollbar-thumb {
          background: var(--accent-blue);
          border-radius: 3px;
        }
      `}</style>

      {/* Loading Screen */}
      <div className={`loader ${!isLoading ? 'hidden' : ''}`}>
        <div className="loader-circle"></div>
      </div>

      <div className="blog-page">
        {/* Background Elements */}
        <div className="bg-animation"></div>
        <div className="grid-overlay"></div>
        <div className="floating-particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <section className="blogs-section">
          <div className="container-fluid px-4 px-lg-5">
            <div className="row g-4">
              
              {/* Left Sidebar */}
              <div className="col-lg-3">
                <div className="sidebar">
                  <h2 className="sidebar-title">BLOGS</h2>
                  
                  <ul className="blog-list">
                    {blogPosts.map((post, index) => (
                      <li 
                        key={post.id} 
                        className="blog-list-item" 
                        onClick={() => scrollToCard(index)}
                      >
                        {post.title}
                      </li>
                    ))}
                  </ul>

                  <div className="connect-section">
                    <h3 className="connect-title">Connect us</h3>
                    <div className="social-icons">
                      <div 
                        className="social-icon linkedin"
                        onMouseEnter={(e) => handleSocialHover(e, true)}
                        onMouseLeave={(e) => handleSocialHover(e, false)}
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </div>
                      <div 
                        className="social-icon youtube"
                        onMouseEnter={(e) => handleSocialHover(e, true)}
                        onMouseLeave={(e) => handleSocialHover(e, false)}
                      >
                        <i className="fab fa-youtube"></i>
                      </div>
                      <div 
                        className="social-icon instagram"
                        onMouseEnter={(e) => handleSocialHover(e, true)}
                        onMouseLeave={(e) => handleSocialHover(e, false)}
                      >
                        <i className="fab fa-instagram"></i>
                      </div>
                      <div 
                        className="social-icon whatsapp"
                        onMouseEnter={(e) => handleSocialHover(e, true)}
                        onMouseLeave={(e) => handleSocialHover(e, false)}
                      >
                        <i className="fab fa-whatsapp"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - Blog Cards */}
              <div className="col-lg-9">
                <div 
                  className="blog-cards-wrapper" 
                  ref={wrapperRef}
                  onWheel={handleWheel}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className="blog-cards-track" ref={trackRef}>
                    {allPosts.map((post, index) => (
                      <div 
                        key={`${post.id}-${index}`}
                        className="blog-card"
                        onMouseEnter={handleCardMouseEnter}
                        onMouseLeave={handleCardMouseLeave}
                        onMouseMove={handleCardMouseMove}
                      >
                        <div className="blog-card-inner">
                          <div 
                            className="blog-card-bg" 
                            style={{ backgroundImage: `url('${post.image}')` }}
                          ></div>
                          <div className="blog-card-overlay"></div>
                          <div className="blog-card-content">
                            <h3 className="blog-card-title">{post.title}</h3>
                            <button className="read-btn">
                              Read <i className="fas fa-arrow-right"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      {/* External Scripts */}
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      <link 
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
        rel="stylesheet"
      />
      <Newsletter/>
      <SocialBar />
      <Footer/>
    </>
    
  );
  
  
}