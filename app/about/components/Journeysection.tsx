"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * JourneySection — Scroll-driven cinematic section
 *
 * Scroll phases (each ~1 viewport height of scroll travel):
 *  0 → 1  : Three images appear; middle rises to front
 *  1 → 2  : Middle image expands fullscreen; side images hide
 *  2 → 3  : Video fades in and scrubs with scroll
 *  3 → 4  : Stats slide in from left & right over the video
 *  4 → 5  : Curtain panels close, concealing everything
 *
 * Everything reverses on scroll up.
 *
 * NEXT.JS SETUP
 * -------------
 * Add to your next.config.js / next.config.ts:
 *
 *   images: {
 *     remotePatterns: [
 *       { protocol: "https", hostname: "images.unsplash.com" },
 *     ],
 *   }
 *
 * Place your video at: /public/video/journey.mp4  (or update VIDEO_SRC below)
 * Then simply render <JourneySection /> in any page.
 */

// ─── Asset paths ──────────────────────────────────────────────────────────────
const IMAGE_LEFT   = "img/j1.webp";
const IMAGE_CENTER = "img/Founders.webp";
const IMAGE_RIGHT  = "img/Image_.webp";

// ↓ Replace with your actual video file path
const VIDEO_SRC    = "img/web.mp4";
// ─────────────────────────────────────────────────────────────────────────────

const TOTAL_PHASES = 5;

interface Stat {
  value: string;
  label: string;
}

const STATS_LEFT: Stat[] = [
  { value: "2021", label: "The year we founded our company" },
  { value: "5+",   label: "Years of Website & App Development" },
  { value: "5+",   label: "Years of Branding Experience" },
];

const STATS_RIGHT: Stat[] = [
  { value: "100%", label: "Success rate" },
  { value: "400+", label: "Clients covered" },
  { value: "50+",  label: "Brands launched" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function phaseProgress(phase: number, total: number, v: number): number {
  const lo = phase / total;
  const hi = (phase + 1) / total;
  return Math.min(1, Math.max(0, (v - lo) / (hi - lo)));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function ease(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect     = el.getBoundingClientRect();
      const total    = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(Math.min(1, Math.max(0, scrolled / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Scrub video to match scroll position within phase 2-3 ──────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    // p2 raw (0→1) maps to phase 2 progress; video plays during phases 2 & 3
    const rawP2 = phaseProgress(2, TOTAL_PHASES, progress);
    const rawP3 = phaseProgress(3, TOTAL_PHASES, progress);

    // Combine: phase2 handles first half of video, phase3 the rest
    const videoProgress = Math.min(1, rawP2 * 0.5 + rawP3 * 0.5);
    video.currentTime = videoProgress * video.duration;
  }, [progress]);

  const N  = TOTAL_PHASES;
  const p0 = ease(phaseProgress(0, N, progress)); // images arrive, center rises
  const p1 = ease(phaseProgress(1, N, progress)); // center expands fullscreen
  const p2 = ease(phaseProgress(2, N, progress)); // video fades in
  const p3 = ease(phaseProgress(3, N, progress)); // stats slide in
  const p4 = ease(phaseProgress(4, N, progress)); // curtain closes

  const sidesOpacity  = p0 * (1 - p1);
  const leftX         = lerp(80, 0, p0);
  const rightX        = lerp(-80, 0, p0);
  const centerZ       = p0 > 0.01 ? 10 : 5;
  const centerScale   = lerp(0.32, 1, p1);
  const centerOpacity = 1 - p2 * 0.9;     // center image fades as video fades in
  const videoOpacity  = p2;               // video fades in during phase 2
  const statsLeftX    = lerp(-60, 0, p3);
  const statsRightX   = lerp(60, 0, p3);
  const statsOpacity  = p3 * (1 - p4);
  const curtainTop    = lerp(-100, 0, p4);
  const curtainBottom = lerp(100, 0, p4);

  return (
    <>
      {/* Scroll travel container */}
      <div
        ref={containerRef}
        style={{ height: `${(TOTAL_PHASES + 1) * 100}vh`, position: "relative",zIndex: 99999 }}
      >
        {/* Sticky viewport */}
        <div style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#0a0a0a",
        }}>

          {/* TITLE */}
          <div style={{
            position: "absolute",
            top: "10%",
            left: "4vw",
            zIndex: 20,
            opacity: Math.max(0, 1 - p1 * 2) * p0,
            transform: `translateY(${lerp(30, 0, p0)}px)`,
            pointerEvents: "none",
          }}>
            <p style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 400,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
            }}>
              OUR<br />JOURNEY<br />SO FAR
            </p>
          </div>

          {/* LEFT IMAGE */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "28vw",
            height: "60vh",
            transform: `translate(calc(-50% - 32vw + ${leftX}vw), -50%)`,
            opacity: sidesOpacity,
            zIndex: 5,
            borderRadius: 4,
            overflow: "hidden",
          }}>
            <Image
              src={IMAGE_LEFT}
              alt="Our journey — architecture"
              fill
              sizes="28vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          {/* CENTER IMAGE — hero that expands fullscreen then fades out as video appears */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "100vw",
            height: "100vh",
            transform: `translate(-50%, -50%) scale(${centerScale})`,
            opacity: centerOpacity * (p0 > 0 ? 1 : 0),
            zIndex: centerZ,
            overflow: "hidden",
          }}>
            <Image
              src={IMAGE_CENTER}
              alt="Our journey — landscape"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority
            />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
              pointerEvents: "none",
            }} />
          </div>

          {/* RIGHT IMAGE */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "28vw",
            height: "60vh",
            transform: `translate(calc(-50% + 32vw + ${rightX}vw), -50%)`,
            opacity: sidesOpacity,
            zIndex: 5,
            borderRadius: 4,
            overflow: "hidden",
          }}>
            <Image
              src={IMAGE_RIGHT}
              alt="Our journey — collaboration"
              fill
              sizes="28vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          {/* ── FULLSCREEN VIDEO (replaces black-and-white image) ─────────────── */}
          <div style={{
            position: "absolute",
            inset: 0,
            opacity: videoOpacity,
            zIndex: 15,
            overflow: "hidden",
          }}>
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              muted
              playsInline
              preload="auto"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
            {/* Subtle vignette over video */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)",
              pointerEvents: "none",
            }} />
          </div>
          {/* ──────────────────────────────────────────────────────────────────── */}

          {/* STATS OVERLAY */}
          <div style={{
            position: "absolute",
            inset: 0,
            zIndex: 25,
            opacity: statsOpacity,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 4vw",
          }}>
            {/* Left stats */}
            <div style={{
              transform: `translateX(${statsLeftX}vw)`,
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem",
            }}>
              {STATS_LEFT.map((s, i) => (
                <StatItem key={i} value={s.value} label={s.label} />
              ))}
            </div>
            {/* Right stats */}
            <div style={{
              transform: `translateX(${statsRightX}vw)`,
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem",
              textAlign: "right",
            }}>
              {STATS_RIGHT.map((s, i) => (
                <StatItem key={i} value={s.value} label={s.label} align="right" />
              ))}
            </div>
          </div>

          {/* CURTAIN — top panel */}
          <div style={{
            position: "absolute", left: 0, right: 0, top: 0, height: "50%",
            background: "#0a0a0a", zIndex: 50,
            transform: `translateY(${curtainTop}%)`,
          }} />
          {/* CURTAIN — bottom panel */}
          <div style={{
            position: "absolute", left: 0, right: 0, bottom: 0, height: "50%",
            background: "#0a0a0a", zIndex: 50,
            transform: `translateY(${curtainBottom}%)`,
          }} />

          {/* SCROLL HINT */}
          <div style={{
            position: "absolute",
            bottom: "3vh",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 60,
            opacity: p0 < 0.1 ? Math.max(0, 1 - p0 * 10) : 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            pointerEvents: "none",
          }}>
            <span style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: "sans-serif",
            }}>Scroll</span>
            <div style={{
              width: 1,
              height: 40,
              background: "rgba(255,255,255,0.3)",
              animation: "scrollPulse 1.5s ease-in-out infinite",
            }} />
          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap');
        @keyframes scrollPulse {
          0%   { opacity: 0.3; transform: scaleY(0.6); transform-origin: top; }
          50%  { opacity: 1;   transform: scaleY(1);   transform-origin: top; }
          100% { opacity: 0.3; transform: scaleY(0.6); transform-origin: top; }
        }
      `}</style>
    </>
  );
}

// ─── StatItem ─────────────────────────────────────────────────────────────────

function StatItem({
  value,
  label,
  align = "left",
}: {
  value: string;
  label: string;
  align?: "left" | "right";
}) {
  return (
    <div style={{ textAlign: align }}>
      <p style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: "clamp(2.5rem, 5vw, 4rem)",
        fontWeight: 400,
        color: "#ffffff",
        margin: 0,
        lineHeight: 1,
        letterSpacing: "-0.02em",
      }}>
        {value}
      </p>
      <p style={{
        fontFamily: "system-ui, sans-serif",
        fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)",
        color: "rgba(255,255,255,0.65)",
        margin: "0.4rem 0 0",
        letterSpacing: "0.02em",
      }}>
        {label}
      </p>
    </div>
  );
}