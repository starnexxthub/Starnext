"use client";
import React, { useRef, useState, useEffect } from "react";

export default function TestimonialSection() {

  const testimonials = [
    {
      img: "/img/b4.png",
      text: `Working with StarNext really helped us. Their strategic approach, consistent communication, and result-driven campaigns significantly boosted our leads, visibility, and overall brand growth in a competitive real estate market.`
    },
    {
      img: "/img/b2.png",
      text: `StarNext transformed our website into a sleek, modern one that showcases our engineering expertise and innovations. Their team delivered good designs and fast performance—all within budget. We can recommend Star Next for anyone serious about standing out online.`
    },
    {
      img: "/img/b3.png",
      text: `Our experience with StarNext elevated our real estate brand presence. Through strategic social media execution and performance-driven Meta ads, they consistently generated premium leads and strengthened our market positioning.`
    }
  ];

  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Update dot indicator on scroll
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const handler = () => {
      const index = Math.round(el.scrollLeft / el.offsetWidth);
      setActiveIndex(index);
    };
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.offsetWidth, behavior: "smooth" });
    setActiveIndex(index);
  };

  return (
    <section className="testimonial-section">

      <div className="testimonial-header">
        <span>TESTIMONIAL</span>
      </div>

      {/* ── DESKTOP: animated infinite track ── */}
      <div className="testimonial-slider desktop-slider">
        <div className="testimonial-track">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-img">
                <img src={item.img} alt="" />
              </div>
              <div className="testimonial-divider"></div>
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE: snap carousel ── */}
      <div className="mobile-carousel-wrapper">
        <div className="mobile-carousel" ref={carouselRef}>
          {testimonials.map((item, index) => (
            <div className="mobile-carousel-slide" key={index}>
              <div className="testimonial-img">
                <img src={item.img} alt="" />
              </div>
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="carousel-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot${i === activeIndex ? " active" : ""}`}
              onClick={() => scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        /* ─── BASE ─── */
        .testimonial-section {
          background: linear-gradient(90deg, #000814, #0b2a55);
          padding: 100px 0;
          overflow: hidden;
          color: white;
        }

        .testimonial-header {
          max-width: 1200px;
          margin: auto;
          padding: 0 20px;
          margin-bottom: 40px;
        }

        .testimonial-header span {
          letter-spacing: 3px;
          font-size: 22px;
          color: #cbd5e1;
        }

        /* ─── DESKTOP SLIDER ─── */
        .testimonial-slider {
          overflow: hidden;
          width: 100%;
        }

        .testimonial-track {
          display: flex;
          gap: 60px;
          animation: scrollTestimonial 25s linear infinite;
        }

        @keyframes scrollTestimonial {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .testimonial-card {
          display: flex;
          align-items: center;
          gap: 40px;
          min-width: 750px;
        }

        .testimonial-img img {
          width: 160px;
          height: 200px;
          object-fit: cover;
          border-radius: 6px;
        }

        .testimonial-divider {
          width: 1px;
          height: 200px;
          background: #6b7280;
          opacity: .5;
        }

        .testimonial-content {
          max-width: 480px;
        }

        .quote-icon {
          font-size: 60px;
          color: #9fb7d3;
          line-height: 1;
          margin-bottom: 10px;
        }

        .testimonial-content p {
          font-size: 18px;
          line-height: 1.6;
          color: #e5e7eb;
        }

        /* ─── MOBILE CAROUSEL (hidden on desktop) ─── */
        .mobile-carousel-wrapper {
          display: none;
        }

        /* ─── TABLET ─── */
        @media (max-width: 1024px) {
          .testimonial-card {
            min-width: 600px;
            gap: 30px;
          }
          .testimonial-img img {
            width: 140px;
            height: 180px;
          }
          .testimonial-content p {
            font-size: 17px;
          }
        }

        /* ─── MOBILE ─── */
        @media (max-width: 768px) {
          .testimonial-section {
            padding: 80px 0;
          }

          /* hide desktop animated slider */
          .desktop-slider {
            display: none;
          }

          /* show snap carousel */
          .mobile-carousel-wrapper {
            display: block;
            width: 100%;
          }

          .mobile-carousel {
            display: flex;
            overflow-x: scroll;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;        /* Firefox */
          }
          .mobile-carousel::-webkit-scrollbar {
            display: none;               /* Chrome/Safari */
          }

          .mobile-carousel-slide {
            flex: 0 0 100%;
            scroll-snap-align: start;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 0 24px;
            box-sizing: border-box;
          }

          .mobile-carousel-slide .testimonial-img img {
            width: 140px;
            height: 170px;
            object-fit: cover;
            border-radius: 6px;
            margin-bottom: 24px;
          }

          .mobile-carousel-slide .quote-icon {
            font-size: 50px;
          }

          .mobile-carousel-slide .testimonial-content p {
            font-size: 16px;
            line-height: 1.6;
            color: #e5e7eb;
          }

          /* dots */
          .carousel-dots {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 28px;
          }

          .carousel-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: none;
            background: #6b7280;
            cursor: pointer;
            padding: 0;
            transition: background 0.3s, transform 0.3s;
          }

          .carousel-dot.active {
            background: #9fb7d3;
            transform: scale(1.35);
          }
        }

        /* ─── SMALL PHONES ─── */
        @media (max-width: 480px) {
          .mobile-carousel-slide .testimonial-img img {
            width: 120px;
            height: 150px;
          }

          .mobile-carousel-slide .testimonial-content {
            max-width: 90%;
          }

          .mobile-carousel-slide .testimonial-content p {
            font-size: 15px;
          }
        }
      `}</style>

    </section>
  );
}