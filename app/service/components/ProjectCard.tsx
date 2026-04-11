"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

type Project = {
  title: string;
  img: string;
  label: string;
  description: string;
};

const PROJECTS: Project[] = [
  {
    title: "Bold Design For A Creative Construction Powerhouse",
    img: "/assets/cre.png",
    label: "Full Website Design & Build",
    description: "Scena Pro, a creative construction company specialising in sets for TV, theatre, and exhibitions, needed a website that could showcase their impressive portfolio while providing intuitive content management for their growing business. After weighing us up against other agencies for over a year, they chose Fourseven Media due to our consultative approach and future SEO growth opportunities. We built a sophisticated Framer website with three interconnected CMS collections (workshops, disciplines, and projects) that link through relationship fields, allowing content to dynamically pull through and interlink across the site. The design leverages bold, image-led storytelling with full-bleed imagery on a dark theme, punctuated by striking orange accents and subtle micro-animations.",
  },
  {
    title: "Bringing a New Jewellery Store to Life",
    img: "/assets/jwel.png",
    label: "E-Commerce & Branding",
    description: "Veylaa Jewellery is a brand built on moments, the client wanted to reflect this in their website design, emphisising quality and their passion for jewellery. Working besides a leading London based designer, we focused on implementing muted pallette tones to the site to bring a beach vibe, while keeping it modern and clean.",
  },
  {
    title: "Bringing Corporate Training to Life",
    img: "/assets/enga.png",
    label: "Platform Design & Development",
    description: "Actors in Industry, a corporate training provider specializing in role play-based learning, needed a website that would effectively communicate their unique value proposition while generating quality leads. Our task was to create a high-converting webiste which clearly articulated their services and brand message.",
  },
];

const Card = ({ project, i, progress, range, targetScale }: { 
  project: Project; 
  i: number; 
  progress: any; 
  range: [number, number]; 
  targetScale: number 
}) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="card-container">
      <motion.div
        style={{ 
          scale,
          zIndex: i 
        }}
        className="project-card-inner"
      >
        <div className="project-card-grid">
          <div className="project-img-side">
            <img src={project.img} alt={project.title} className="project-img-rotated" />
          </div>
          <div className="project-content-side">
            <span className="project-card-label">{project.label}</span>
            <h3 className="project-card-title">{project.title}</h3>
            <p className="project-card-desc">{project.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function ProjectCard() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={container} className="scroll-container relative">
      <style>{`
        /* ── Scrollbar ── */
        .scroll-container::-webkit-scrollbar { display: none; }
        .scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
          overflow-y: scroll;
          height: 80vh;
        }

        /* ── Card container ── */
        .card-container {
          height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: sticky;
          top: 0;
          padding: 0 clamp(12px, 4vw, 40px);
          box-sizing: border-box;
        }

        /* ── Card ── */
        .project-card-inner {
          position: relative;
          width: 100%;
          max-width: 924px;
          background-color: #EDF2F7;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 -10px 50px rgba(0,0,0,0.1);
          padding: clamp(1.25rem, 3vw, 2.5rem);
          transform-origin: top;
          box-sizing: border-box;
        }

        /* ── Grid ── */
        .project-card-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1rem, 2.5vw, 2rem);
          align-items: center;
        }

        /* ── Image ── */
        .project-img-side {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .project-img-rotated {
          width: 100%;
          max-width: 420px;
          height: auto;
          border-radius: 12px;
          transform: rotate(-3deg);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          display: block;
        }

        /* ── Label ── */
        .project-card-label {
          display: inline-block;
          font-size: clamp(11px, 1.2vw, 13px);
          font-weight: 500;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        /* ── Title ── */
        .project-card-title {
          font-size: clamp(18px, 2.5vw, 30px);
          font-weight: 500;
          margin: 0 0 0.75rem;
          line-height: 1.3;
        }

        /* ── Description ── */
        .project-card-desc {
          font-size: clamp(12px, 1.2vw, 14px);
          font-weight: 400;
          color: #4A5568;
          line-height: 1.6;
          margin: 0;

          /* Clamp visible lines so tall text doesn't overflow the card */
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 7;
          overflow: hidden;
        }

        /* ── Tablet (≤1024px) ── */
        @media (max-width: 1024px) {
          .project-card-inner { max-width: 760px; }
        }

        /* ── Mobile landscape / large phones (≤768px) ── */
        @media (max-width: 768px) {
          .scroll-container,
          .card-container { height: 80svh; }

          .project-card-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .project-img-rotated {
            max-width: min(260px, 55vw);
            margin: 0 auto;
          }

          .project-card-desc {
            -webkit-line-clamp: 5;
          }
        }

        /* ── Small phones (≤480px) ── */
        @media (max-width: 480px) {
          .project-img-rotated { max-width: min(200px, 65vw); }

          .project-card-desc { -webkit-line-clamp: 4; }
        }

        /* ── Very small phones (≤360px) ── */
        @media (max-width: 360px) {
          .project-card-inner { border-radius: 14px; }
          .project-img-rotated { max-width: 160px; }
          .project-card-desc { -webkit-line-clamp: 3; }
        }

        /* ── Landscape phones — tighter vertical space ── */
        @media (max-width: 768px) and (orientation: landscape) {
          .project-card-grid {
            grid-template-columns: 1fr 1fr;
            text-align: left;
          }

          .project-img-rotated {
            max-width: min(200px, 40vw);
            margin: 0;
          }

          .project-card-desc { -webkit-line-clamp: 4; }
        }
      `}</style>

      {PROJECTS.map((project, i) => {
        const targetScale = 1 - ((PROJECTS.length - i) * 0.05);
        return (
          <Card 
            key={i} 
            i={i} 
            project={project} 
            progress={scrollYProgress} 
            range={[i * 0.25, 1]} 
            targetScale={targetScale}
          />
        );
      })}
    </main>
  );
}