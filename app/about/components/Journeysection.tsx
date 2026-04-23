"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * JourneySection — Scroll-driven cinematic section
 *
 * Scroll phases (each ~1 viewport height of scroll travel):
 *  0 → 1  : Three images appear; middle rises to front
 *  1 → 2  : Middle image expands fullscreen; side images hide
 *  2 → 3  : Replacement image cross-fades in at fullscreen
 *  3 → 4  : Stats slide in from left & right over the image
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
 * Then simply render <JourneySection /> in any page.
 */

// ─── Unsplash image URLs ─────────────────────────────────────────────────────
// Left panel  — architecture / urban texture
const IMAGE_LEFT =
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&fit=crop";

// Center hero — cinematic mountain landscape
const IMAGE_CENTER =
  "img/Founders.png";

// Right panel — people / creative collaboration
const IMAGE_RIGHT =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&fit=crop";


const IMAGE_FULL =
  "img/Black.png";
// ─────────────────────────────────────────────────────────────────────────────

const TOTAL_PHASES = 5;

interface Stat {
  value: string;
  label: string;
}

const STATS_LEFT: Stat[] = [
  { value: "2013", label: "The year we founded our company" },
  { value: "17",   label: "Years of designing Experience" },
];

const STATS_RIGHT: Stat[] = [
  { value: "23",  label: "Industries impacted growth" },
  { value: "200", label: "Global Collaborations" },
  { value: "23",  label: "Digital experiences launched" },
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

  const N  = TOTAL_PHASES;
  const p0 = ease(phaseProgress(0, N, progress)); // images arrive, center rises
  const p1 = ease(phaseProgress(1, N, progress)); // center expands fullscreen
  const p2 = ease(phaseProgress(2, N, progress)); // replacement fades in
  const p3 = ease(phaseProgress(3, N, progress)); // stats slide in
  const p4 = ease(phaseProgress(4, N, progress)); // curtain closes

  const sidesOpacity   = p0 * (1 - p1);
  const leftX          = lerp(80, 0, p0);
  const rightX         = lerp(-80, 0, p0);
  const centerZ        = p0 > 0.01 ? 10 : 5;
  const centerScale    = lerp(0.32, 1, p1);
  const centerOpacity  = 1 - p2 * 0.8;
  const replaceOpacity = p2;
  const statsLeftX     = lerp(-60, 0, p3);
  const statsRightX    = lerp(60, 0, p3);
  const statsOpacity   = p3 * (1 - p4);
  const curtainTop     = lerp(-100, 0, p4);
  const curtainBottom  = lerp(100, 0, p4);

  return (
    <>
      {/* Scroll travel container */}
      <div
        ref={containerRef}
        style={{ height: `${(TOTAL_PHASES + 1) * 100}vh`, position: "relative" }}
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

          {/* CENTER IMAGE — hero that expands fullscreen */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "100vw",
            height: "120vh",
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

          {/* REPLACEMENT FULLSCREEN IMAGE */}
          <div style={{
            position: "absolute",
            inset: 0,
            opacity: replaceOpacity,
            zIndex: 15,
            overflow: "hidden",
          }}>
            <Image
              src={IMAGE_FULL}
              alt="Our journey — city skyline"
              fill
              sizes="100vw"
              style={{ objectFit: "cover",objectPosition: "center top" }}
            />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)",
              pointerEvents: "none",
            }} />
          </div>

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