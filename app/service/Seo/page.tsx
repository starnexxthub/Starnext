"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/sections/Navbar";
import Footer from "@/app/sections/Footer";
import SocialBar from "@/app/sections/SocialBar";
import Newsletter from "@/app/sections/Newsletter";
import ScrollHero from "@/app/service/components/ScrollHero";
import ProjectCard from "@/app/service/components/ProjectCard";

export default function Seo() {
  return (
    <>
      <style>{`

        /* ── Floating Card ── */
        .floating-card-wrapper {
          margin-top: 1.5rem;
          width: 100%;
          max-width: 420px;
          z-index: 10;
          margin-left: auto;
          margin-right: auto;
        }

        @media (min-width: 768px) {
          .floating-card-wrapper {
            position: absolute;
            right: 0;
            width: 25%;
            margin-top: 0;
            max-width: none;
            padding-right: clamp(1rem, 4vw, 4rem);
            margin-left: 0;
            margin-right: 0;
          }
        }

        @media (max-width: 480px) {
          .floating-card-inner {
            padding: 1.25rem !important;
          }
        }

        .floating-card-close {
          position: absolute;
          top: 8px;
          right: 10px;
          background: none;
          border: none;
          color: black;
          font-size: 16px;
          cursor: pointer;
          line-height: 1;
          padding: 2px 6px;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .floating-card-close:hover {
          color: #333;
        }

        /* ── Content Section ── */
        .seo-content-row {
          max-width: 1200px;
          width: 100%;
        }

        /* ── Get Started Card ── */
        .get-started-card {
          background-color: #031E4C;
          width: 100%;
          max-width: 458px;
        }

        /* ── Small laptops: 992px – 1199px ── */
        @media (min-width: 992px) and (max-width: 1199px) {
          .seo-hero-title {
            font-size: clamp(1.6rem, 3.5vw, 2.8rem) !important;
          }
          .seo-content-row {
            max-width: 960px;
          }
          .seo-left-card p {
            font-size: 14px !important;
          }
          .seo-left-desc {
            font-size: 15px !important;
          }
          .get-started-card {
            max-width: 380px;
          }
          .get-started-card h2 {
            font-size: clamp(22px, 3.5vw, 36px) !important;
          }
          .get-started-card .info-box span {
            font-size: 13px !important;
          }
          .get-started-card .book-btn {
            font-size: 15px !important;
            padding: 11px !important;
          }
          .seo-blueprint-title {
            font-size: clamp(22px, 3vw, 32px) !important;
          }
          .seo-blueprint-desc {
            font-size: clamp(13px, 1.5vw, 16px) !important;
          }
          .seo-projects-title {
            font-size: 32px !important;
          }
          .floating-card-wrapper {
            width: 22%;
            padding-right: clamp(0.5rem, 2vw, 2rem);
          }
        }

        /* ── Medium laptops: 1200px – 1399px ── */
        @media (min-width: 1200px) and (max-width: 1399px) {
          .seo-content-row {
            max-width: 1100px;
          }
          .seo-left-card p {
            font-size: 15px !important;
          }
          .seo-left-desc {
            font-size: 16px !important;
          }
          .get-started-card {
            max-width: 420px;
          }
          .get-started-card h2 {
            font-size: clamp(26px, 4vw, 44px) !important;
          }
          .seo-blueprint-title {
            font-size: clamp(24px, 3.5vw, 36px) !important;
          }
          .seo-blueprint-desc {
            font-size: clamp(14px, 1.8vw, 17px) !important;
          }
          .floating-card-wrapper {
            width: 24%;
          }
        }

        /* ── Large screens 1400px+ — defaults are fine ── */
      `}</style>

      <Navbar />

      <main style={{ backgroundColor: "#f5f5f5", color: "black", overflowX: "hidden" }}>

        {/* HERO */}
        <section
          className="position-relative d-flex flex-column align-items-center"
          style={{ minHeight: "100vh", paddingTop: "clamp(4rem, 5vw, 5rem)" }}
        >
          <h1
            className="fw-semibold text-center seo-hero-title"
            style={{
              fontSize: "clamp(1.875rem, 5vw, 3.75rem)",
              letterSpacing: "-0.025em",
              marginTop: "25px",
            }}
          >
            Search Engine Optimization
          </h1>

          {/* Floating Card */}
          <FloatingCard />

          {/* Scroll Hero */}
          <div className="mt-5 w-100">
            <ScrollHero />
          </div>

          {/* Content Section */}
          <section className="px-3 px-sm-4" style={{ paddingBottom: "2rem" }}>
            <div className="container-fluid">
              <div className="row g-4 align-items-start ms-auto" style={{ maxWidth: "1200px", width: "100%" }}>

                {/* LEFT CONTENT */}
                <div className="col-12 col-lg-7">
                  <div
                    className="rounded-4 p-4 p-sm-5 text-white seo-left-card"
                    style={{ backgroundColor: "#031E4C" }}
                  >
                    <p className="mb-0" style={{ fontSize: "16px", lineHeight: "1.8" }}>
                      If you're a business owner seeking a reliable digital marketing
                      company in India, StarNext Softech stands out as a strong choice.
                      As a leading SEO company, we drive business growth through
                      strategic search optimisation, while our local SEO services boost
                      visibility, attract nearby customers, and give your brand a
                      competitive edge.
                    </p>
                  </div>

                  <p
                    className="mt-4 text-secondary seo-left-desc"
                    style={{ fontSize: "18px", lineHeight: "1.8" }}
                  >
                    Our e-commerce marketing agency helps businesses lower dependency
                    on paid advertising by building a strong, sustainable organic
                    traffic funnel for long-term growth. With hands-on expertise in
                    e-commerce digital marketing, StarNext delivers measurable results.
                    Partner with our e-commerce marketing company to strengthen your
                    online presence and increase revenue through result-driven
                    e-commerce marketing services.
                  </p>
                </div>

                {/* RIGHT CARD */}
                <div className="col-12 col-lg-5 d-flex justify-content-lg-end">
                  <div className="rounded-4 p-4 p-sm-5 text-white get-started-card">
                    <small
                      className="text-uppercase d-block mb-2"
                      style={{ color: "#3aa0ff", fontSize: "12px", letterSpacing: "1px" }}
                    >
                      WORKING ON A PROJECT ?
                    </small>
                    <h2
                      className="mb-4"
                      style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: "500", lineHeight: "1.1" }}
                    >
                      Get Started
                    </h2>
                    <div className="d-flex flex-column gap-3">
                      <div
                        className="info-box d-flex justify-content-between align-items-center px-3 py-3 rounded-3"
                        style={{ backgroundColor: "#2b3d4f" }}
                      >
                        <small className="text-uppercase text-secondary" style={{ fontSize: "11px" }}>EMAIL</small>
                        <span style={{ fontSize: "14px" }}>info@starnexxt.com</span>
                      </div>
                      <div
                        className="info-box d-flex justify-content-between align-items-center px-3 py-3 rounded-3"
                        style={{ backgroundColor: "#2b3d4f" }}
                      >
                        <small className="text-uppercase text-secondary" style={{ fontSize: "11px" }}>PHONE</small>
                        <span style={{ fontSize: "14px" }}>+ 91 8267016702</span>
                      </div>
                      <div
                        className="info-box d-flex justify-content-between align-items-center px-3 py-3 rounded-3"
                        style={{ backgroundColor: "#2b3d4f" }}
                      >
                        <small className="text-uppercase text-secondary" style={{ fontSize: "11px" }}>OFFICE</small>
                        <span style={{ fontSize: "14px", marginLeft: "25px" }}>
                          Dwarka Store,<br />Shagun Tower<br /> 2nd Floor,<br />New Rd, Dehradun
                        </span>
                      </div>
                      <button
                        className="btn w-100 mt-2 rounded-3 fw-semibold book-btn"
                        style={{ backgroundColor: "#1e88e5", color: "#fff", padding: "14px", fontSize: "18px", border: "none" }}
                      >
                        Book Call
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </section>

        {/* BLUEPRINT SECTION */}
        <section
          className="text-center mx-auto px-3 px-sm-4"
          style={{
            paddingTop: "clamp(3rem, 6vw, 6rem)",
            paddingBottom: "clamp(3rem, 6vw, 6rem)",
          }}
        >
          <h2
            className="fw-bold mb-3 mb-sm-4 seo-blueprint-title"
            style={{ fontSize: "clamp(26px, 4vw, 40px)", marginBottom: "clamp(2rem, 5vw, 6.5rem)", lineHeight: "1.2" }}
          >
            Your Success is Our Blueprint
          </h2>
          <p
            className="text-secondary lh-base seo-blueprint-desc"
            style={{ fontSize: "clamp(14px, 2vw, 18px)", maxWidth: "75rem", margin: "0 auto", padding: "0 0.5rem" }}
          >
            Having delivered over 130 successful projects for ambitious service
            businesses, we understand how to create websites that drive real
            business growth.
          </p>
        </section>

        {/* PROJECTS */}
        <section
          id="recent-projects"
          className="mx-auto px-3 px-sm-4"
          style={{ paddingBottom: "clamp(0.5rem, 2.5vw, 2.5rem)" }}
        >
          <h2
            className="text-center fw-bold seo-projects-title"
            style={{ fontSize: "40px" }}
          >
            Recent Projects
          </h2>
          <ProjectCard />
        </section>

      </main>

      <Newsletter />
      <SocialBar />
      <Footer />
    </>
  );
}


// ── Floating card ──────────────────────────────────────────────────────────
function FloatingCard() {
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  if (!visible) return null;

  return (
    <div className="floating-card-wrapper" style={{ marginTop: "45px" }}>
      <div className="w-100 d-flex justify-content-end d-md-block">
        <div
          className="floating-card-inner rounded-3 p-3 p-sm-4 position-relative"
          style={{
            background: "#efdddd33",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {/* Close button */}
          <button
            className="floating-card-close"
            onClick={() => setVisible(false)}
            aria-label="Close"
          >
            ✕
          </button>

          <p className="lh-base mb-0" style={{ fontSize: "12px", color: "black" }}>
            With user experience in mind, transform your business's digital
            presence into a powerful lead-generation engine with websites
            meticulously designed to convert your ideal clients.
          </p>

          <div className="mt-3 mt-sm-4 d-flex flex-column gap-2">
            <button
              className="btn btn-dark w-100 rounded-2"
              style={{ fontSize: "12px", padding: "0.5rem" }}
              onClick={() => router.push("/contact")}
            >
              Claim your free consultation
            </button>
            <button
              className="btn btn-primary w-100 rounded-2"
              style={{ fontSize: "12px", padding: "0.5rem" }}
              onClick={() => {
                const el = document.getElementById("recent-projects");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Case Studies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}