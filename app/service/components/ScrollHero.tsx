"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const IMAGES = [
  { src: "/assets/image.webp", rotate: -24, x: "-120%", y: [-300, -220] },
  { src: "/assets/bmw.webp",   rotate: 20,  x: "-90%",  y: [-100,  200] },
  { src: "/assets/art.webp",   rotate: -27, x: "-125%", y: [ 140,  360] },
  { src: "/assets/cour.webp",  rotate: 27,  x: "70%",   y: [ 140,   80] },
  { src: "/assets/love.webp",  rotate: 27,  x: "100%",  y: [-150, -470] },
  { src: "/assets/est.webp",   rotate: 10,  x: "20%",   y: [ -96, -120] },
  { src: "/assets/fact.webp",  rotate: -17, x: "-10%",  y: [ 420, -120] },
];

export default function ScrollHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <>
      <style>{`
        /* ── SECTION ── */
        .scroll-hero-section {
          position: relative;
          height: 120vh;
          width: 100%;
          background-color: #f5f5f5;
        }

        /* ── STICKY WRAPPER ── */
        .scroll-hero-sticky {
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
        .scroll-hero-card {
          position: absolute;

          /* ~20vh on mobile ≈ old height:20% feel, floored at 130px */
          width:  clamp(130px, 20vh, 420px);
          height: clamp(130px, 20vh, 420px);

          border-radius: 1rem;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.3);
          will-change: transform;
        }

        /* ── 576 px — old version used 200px ── */
        @media (min-width: 576px) {
          .scroll-hero-card {
            width:  200px;
            height: 200px;
          }
        }

        /* ── 768 px — old version used 280px ── */
        @media (min-width: 768px) {
          .scroll-hero-sticky {
            margin-left: 0;
          }
          .scroll-hero-card {
            width:  280px;
            height: 280px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          }
        }

        /* ── 992 px — old version used 415px ── */
        @media (min-width: 992px) {
          .scroll-hero-sticky {
            margin-left: 50px;   /* preserved from old version */
          }
          .scroll-hero-card {
            width:  315px;
            height: 315px;
          }
        }

        .scroll-hero-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      `}</style>

      <section ref={containerRef} className="scroll-hero-section">
        <div className="scroll-hero-sticky">
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
                className="scroll-hero-card"
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