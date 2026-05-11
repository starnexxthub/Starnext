'use client';

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from "next/link";
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import Newsletter from '../sections/Newsletter';
import SocialBar from '../sections/SocialBar';

export default function BlogPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<any[]>([]);

  const blogPosts = [
    { id: 1, title: "Best Digital Marketing Company—One-Stop Solution for Success", image: "/img/b2.png" },
    { id: 2, title: "Now Get SEO Services For Your Company At Ease", image: "/img/b3.png" },
    { id: 3, title: "Your Number 1 Digital Marketing Company In Dehradun", image: "/img/b4.png" },
    { id: 4, title: "2x customers with lead generation service for your institute", image: "/img/b6.png" },
    { id: 5, title: "Your Best Web Development Company in Dehradun", image: "/img/b3.png" },
    { id: 6, title: "How Algorithm of Google Work?", image: "/img/b2.png" },
    { id: 7, title: "Your Best Website Development Company for Excellence", image: "/img/b3.png" },
  ];

  useEffect(() => {
    const generated = [...Array(30)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 15}s`,
      animationDuration: `${10 + Math.random() * 10}s`
    }));
    setParticles(generated);
  }, []);

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
          font-family:  sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
          color: var(--text-primary);
          position: relative;
          margin-top: 90px;
        }

        .bg-animation {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: -1;
          background: 
            radial-gradient(ellipse at 20% 80%, rgba(0, 100, 255, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 40%, rgba(100, 0, 255, 0.05) 0%, transparent 40%),
            linear-gradient(135deg, #0a1628 0%, #0d1f35 50%, #0a1628 100%);
        }

        .grid-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-image: 
            linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          z-index: -1;
        }

        .floating-particles {
          position: fixed;
          width: 100%; height: 100%;
          top: 0; left: 0;
          z-index: -1;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 2px; height: 2px;
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
          background: rgba(10, 20, 35, 0.9);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 25px;
          position: sticky;
          top: 30px;
        }

        .sidebar-title {
          font-size: 18px;
          letter-spacing: 4px;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .blog-list {
          list-style: none;
          padding: 0;
          margin-bottom: 30px;
        }

        .blog-list-item {
          font-size: 12px;
          color: #cbd5e1;
          letter-spacing: 1px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          cursor: pointer;
          transition: 0.3s ease;
        }

        .blog-list-item:hover {
          color: var(--accent-blue);
          padding-left: 10px;
        }

        .connect-section {
          margin-top: 20px;
          padding-top: 15px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .connect-title {
          font-size: 14px;
          color: #cbd5e1;
          margin-bottom: 15px;
        }

        .social-icons {
          display: flex;
          gap: 15px;
        }

        .social-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease;
        }

        .social-icon:hover { transform: scale(1.25); }
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
          height: 1000px;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }

        .blog-cards-track {
          position: relative;
        }

        /* Card is now a full Link */
        .blog-card {
          height: 200px;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 20px;
          display: block;              /* Link is inline by default */
          text-decoration: none;
          cursor: pointer;
        }

        .blog-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .blog-card:hover .blog-card-inner {
          transform: scale(1.02);
        }

        .blog-card-bg {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-size: cover;
          background-position: center;
          transition: all 0.5s ease;
        }

        /* Slight zoom on bg image for extra polish */
        .blog-card:hover .blog-card-bg {
          transform: scale(1.05);
        }

        .blog-card-overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: linear-gradient(
            90deg,
            rgba(0,0,0,0.9) 0%,
            rgba(0,0,0,0.6) 40%,
            rgba(0,0,0,0.2) 70%,
            transparent 100%
          );
          transition: background 0.3s ease;
        }

        /* Slightly lighten overlay on hover for clickable feel */
        .blog-card:hover .blog-card-overlay {
          background: linear-gradient(
            90deg,
            rgba(0,0,0,0.75) 0%,
            rgba(0,0,0,0.45) 40%,
            rgba(0,0,0,0.15) 70%,
            transparent 100%
          );
        }

        .blog-card-content {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
        }

        .blog-card-title {
          font-size: 16px;
          font-weight: 600;
          max-width: 280px;
          line-height: 1.4;
          color: #fff;
          margin: 0;
        }

        /* Cyan underline hint on hover */
        .blog-card:hover .blog-card-title {
          color: var(--accent-blue);
          transition: color 0.3s ease;
        }

        @media (max-width: 991px) {
          .sidebar { position: relative; top: 0; margin-bottom: 30px; }
          .blog-cards-wrapper { height: 500px; }
          .blog-card { height: 180px; }
          .blog-card-title { font-size: 18px; }
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        ::-webkit-scrollbar-thumb { background: var(--accent-blue); border-radius: 3px; }
      `}</style>

      <div className="blog-page">
        <div className="bg-animation"></div>
        <div className="grid-overlay"></div>
        <div className="floating-particles">
          {particles.map((p, i) => (
            <div key={i} className="particle" style={p} />
          ))}
        </div>

        <section className="blogs-section">
          <div className="container-fluid px-4 px-lg-5">
            <div className="row g-4">

              {/* Left Sidebar */}
              <div className="col-lg-3">
                <div className="sidebar">
                  <h2 className="sidebar-title">BLOGS</h2>
                  <ul className="blog-list">
                    {blogPosts.map((post) => (
                      <li
                        key={post.id}
                        className="blog-list-item"
                        onClick={() => {
                          const el = document.getElementById(`blog-${post.id}`);
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                        }}
                      >
                        {post.title}
                      </li>
                    ))}
                  </ul>

                  <div className="connect-section">
                    <h3 className="connect-title">Connect us</h3>
                    <div className="social-icons">
                      <a href="https://www.linkedin.com/company/star-next-softech-private-ltd/" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                        <img src="/img/_Linkedin.svg" alt="LinkedIn" />
                      </a>
                      <a href="https://www.youtube.com/@starnextsoftech-technology" target="_blank" rel="noopener noreferrer" className="social-icon youtube">
                        <img src="/img/_YouTube.svg" alt="YouTube" />
                      </a>
                      <a href="https://www.instagram.com/starnextsoftech_?igsh=MXY3Y2NyenR6ejBvZw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                        <img src="/img/_Instagram.svg" alt="Instagram" />
                      </a>
                      <a href="https://wa.me/918267016702" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
                        <img src="/img/_WhatsApp.svg" alt="WhatsApp" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — Blog Cards */}
              <div className="col-lg-9">
                <div className="blog-cards-wrapper" ref={wrapperRef}>
                  <div className="blog-cards-track">
                    {blogPosts.map((post) => (
                      <Link
                        href={`/blogs/${post.id}`}
                        className="blog-card"
                        key={post.id}
                        id={`blog-${post.id}`}
                      >
                        <div className="blog-card-inner">
                          <div className="blog-card-bg" style={{ backgroundImage: `url(${post.image})` }} />
                          <div className="blog-card-overlay" />
                          <div className="blog-card-content">
                            <h3 className="blog-card-title">{post.title}</h3>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      <Newsletter />
      <SocialBar />
      <Footer />
    </>
  );
}