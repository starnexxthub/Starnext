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
          //top: `calc(5vh + ${i * 20}px)`,
           

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
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scroll-container::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scroll-container {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
          overflow-y: scroll; /* Ensure scrolling still works */
          height: 100vh; /* Set height to viewport */
        }

        .card-container {
          height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: sticky;
          top: 0;
        }

        .project-card-inner {
          position: relative;
          width: 100%;
          max-width: 1024px;
          height: 500px;
          background-color: #EDF2F7;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 -10px 50px rgba(0,0,0,0.1);
          padding: 2.5rem;
          transform-origin: top;
        }

        .project-card-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          height: 100%;
          align-items: center;
        }

        .project-img-rotated {
          width: 100%;
          border-radius: 12px;
          transform: rotate(-3deg);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .project-card-title {
          font-size: 30px;
          font-weight: 500;
          margin-bottom: 1rem;
        }
        .project-card-desc {
          font-size: 14px;
          font-weight: 400;
          color: #4A5568;
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
      
      <div style={{ height: "10vh" }} />
    </main>
  );
}