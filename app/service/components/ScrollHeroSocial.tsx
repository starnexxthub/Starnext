"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const IMAGES = [
  { src: "/assets/1.webp", rotate: -24, x: "-120%", y: [-300, -120] },
  { src: "/assets/2.webp", rotate: 20, x: "-90%", y: [-100, 200] },
  { src: "/assets/3.webp", rotate: -27, x: "-125%", y: [140, 360] },
  { src: "/assets/4.webp", rotate: 27, x: "70%", y: [140, 80] },
  { src: "/assets/5.webp", rotate: 27, x: "100%", y: [-150, -470] },
  { src: "/assets/6.webp", rotate: 10, x: "20%", y: [-96, -120] },
  { src: "/assets/7.webp", rotate: -17, x: "-10%", y: [420, -120] },
];

export default function ScrollHeroSocial() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <>
      <style>{`
        /* ── SECTION ── */
        .scroll-hero-social-section {
          position: relative;
          height: 120vh;
          width: 100%;
          background-color: #f5f5f5;
        }

        /* ── STICKY WRAPPER ── */
        .scroll-hero-social-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── CARD — mobile-first, square via matching clamp on both axes ── */
        .scroll-hero-social-card {
          position: absolute;

          /* ~20vh on mobile mirrors old height:20% feel, floored at 130px */
          width:  clamp(130px, 20vh, 420px);
          height: clamp(130px, 20vh, 420px);

          border-radius: 1rem;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.3);
          will-change: transform;
        }

        /* ── 576px ── */
        @media (min-width: 576px) {
          .scroll-hero-social-card {
            width:  200px;
            height: 200px;
          }
        }

        /* ── 768px ── */
        @media (min-width: 768px) {
          .scroll-hero-social-sticky {
            margin-left: 0;
          }
          .scroll-hero-social-card {
            width:  250px;
            height: 250px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          }
        }

        /* ── 992px ── */
        @media (min-width: 992px) {
          .scroll-hero-social-sticky {
            margin-left: 50px;
          }
          .scroll-hero-social-card {
            width:  315px;
            height: 315px;
          }
        }

        .scroll-hero-social-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      `}</style>

      <section ref={containerRef} className="scroll-hero-social-section">
        <div className="scroll-hero-social-sticky">
          {IMAGES.map((img, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const yTranslate = useTransform(scrollYProgress, [0, 1], img.y);
            return (
              <motion.div
                key={i}
                style={{
                  y: yTranslate,
                  rotate: img.rotate,
                  x: img.x,
                  zIndex: 10 - i,
                }}
                className="scroll-hero-social-card"
              >
                <img src={img.src} alt={`Project ${i}`} />
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}