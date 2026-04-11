"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const IMAGES = [
  { src: "/assets/image.png", rotate: -24, x: "-90%", y: [-300, -120] },
  { src: "/assets/bmw.png", rotate: 20, x: "-90%", y: [-100, 200] },
  { src: "/assets/art.png", rotate: -27, x: "-105%", y: [140, 360] },
  { src: "/assets/cour.png", rotate: 27, x: "70%", y: [140, 80] },
  { src: "/assets/love.png", rotate: 27, x: "40%", y: [-150, -470] },
  { src: "/assets/est.png", rotate: 10, x: "20%", y: [-96, -120] },
  { src: "/assets/fact.png", rotate: -17, x: "-10%", y: [420, -120] },
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
        .scroll-hero-section {
          position: relative;
          height: 120vh;
          width: 100%;
          background-color: #f5f5f5;
        }
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
        .scroll-hero-card {
          position: absolute;
          aspect-ratio: 4 / 3;
          border-radius: 1rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.3);
          
          height: 20%;
        }
        @media (min-width: 576px) {
          .scroll-hero-card {
            width: 200px;
          }
            .scroll-hero-sticky{
             margin-left:0px;
            }
        }
        @media (min-width: 768px) {
          .scroll-hero-card {
            width: 280px;
          }
            .scroll-hero-sticky{
             margin-left:0px;
            }
        }
        @media (min-width: 992px) {
          .scroll-hero-card {
            width: 415px;
            
          }
            .scroll-hero-sticky{
             margin-left:50px;
            }
        }
        .scroll-hero-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>

      <section ref={containerRef} className="scroll-hero-section">
        <div className="scroll-hero-sticky">
          {IMAGES.map((img, i) => {
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