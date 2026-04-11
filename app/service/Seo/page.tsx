

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
        .floating-card-wrapper {
  margin-top: 1.5rem;
  /* Changed from 20% to 100% for mobile, with a max-width for sanity */
  width: 100%; 
  max-width: 420px;
  z-index: 10;
  /* Center it on mobile if the parent is a flex column */
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 768px) {
  .floating-card-wrapper {
    position: absolute;
    right: 0;
    /* Return to your preferred width for desktop */
    width: 25%; 
    margin-top: 0;
    max-width: none;
    padding-right: clamp(1rem, 4vw, 4rem);
    /* Reset margins for absolute positioning */
    margin-left: 0;
    margin-right: 0;
  }
}

/* Optional: extra polish for very small screens */
@media (max-width: 480px) {
  .floating-card-inner {
    padding: 1.25rem !important;
  }
}
      `}</style>
      <Navbar />

      <main style={{ backgroundColor: "#f5f5f5", color: "black", overflowX: "hidden" }}>
        {/* HERO */}
        <section
          className="position-relative d-flex flex-column align-items-center px-3 px-sm-4"
          style={{ minHeight: "100vh", paddingTop: "clamp(4rem, 5vw, 5rem)" }}
        >
          <h1
            className="fw-semibold text-center"
            style={{ fontSize: "clamp(1.875rem, 5vw, 3.75rem)", letterSpacing: "-0.025em",marginTop:"15px" }}
          >
            Search Engine Optimization
          </h1>

          {/* Floating Card */}
          <div className="floating-card-wrapper">
            <div className="w-100 d-flex justify-content-end d-md-block">
              <div className="floating-card-inner bg-white rounded-3 p-3 p-sm-4">
                <p className="text-secondary lh-base mb-0" style={{ fontSize: "12px" }}>
                  With user experience in mind, transform your business's digital
                  presence into a powerful lead-generation engine with websites
                  meticulously designed to convert your ideal clients.
                </p>
                <div className="mt-3 mt-sm-4 d-flex flex-column gap-2">
                  <button className="btn btn-dark w-100 rounded-2" style={{ fontSize: "12px", padding: "0.5rem" }}>
                    Claim your free consultation
                  </button>
                  <button className="btn btn-primary w-100 rounded-2" style={{ fontSize: "12px", padding: "0.5rem" }}>
                    View Case Studies
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Hero */}
          <div className="mt-5 w-100" >
            <ScrollHero />
          </div>
          
<section className="px-3 px-sm-4" style={{ paddingBottom: "2rem" }}>
  <div className="container-fluid">
    <div className="row g-4 align-items-start ms-auto" style={{ maxWidth: "1200px", width: "100%" }}>
      
      {/* LEFT CONTENT */}
      <div className="col-12 col-lg-7 ">
        <div
          className="rounded-4 p-4 p-sm-5 text-white"
          style={{ backgroundColor: "#1e2f3f" }}
        >
          <p className="mb-0" style={{ fontSize: "16px", lineHeight: "1.8" }}>
           If you’re a business owner seeking a reliable digital marketing company in India, StarNext Softech stands out as a strong choice. As a leading SEO company, we drive business growth through strategic search optimisation, while our local SEO services boost visibility, attract nearby customers, and give your brand a competitive edge.
          </p>
        </div>

        <p
          className="mt-4 text-secondary"
          style={{ fontSize: "18px", lineHeight: "1.8" }}
        >
          Our e-commerce marketing agency helps businesses lower dependency on paid advertising by building a strong, sustainable organic traffic funnel for long-term growth. With hands-on expertise in e-commerce digital marketing, StarNext delivers measurable results. Partner with our e-commerce marketing company to strengthen your online presence and increase revenue through result-driven e-commerce marketing services
        </p>
      </div>

      {/* RIGHT CARD */}
      <div className="col-12 col-lg-5 d-flex justify-content-lg-end">
  <div
    className="rounded-4 p-4 p-sm-5 text-white"
    style={{
      backgroundColor: "#1f3142",
      width: "100%",
maxWidth: "458px",
    }}
  >
    {/* TOP LABEL */}
    <small
      className="text-uppercase d-block mb-2"
      style={{
        color: "#3aa0ff",
        fontSize: "12px",
        letterSpacing: "1px",
      }}
    >
      WORKING ON A PROJECT ?
    </small>

    {/* HEADING */}
    <h2
      className="mb-4"
      style={{
        fontSize: "clamp(28px, 5vw, 52px)",
        fontWeight: "500",
        lineHeight: "1.1",
      }}
    >
      Get Started
    </h2>

    {/* INFO BOXES */}
    <div className="d-flex flex-column gap-3">

      {/* EMAIL */}
      <div
        className="d-flex justify-content-between align-items-center px-3 py-3 rounded-3"
        style={{ backgroundColor: "#2b3d4f" }}
      >
        <small className="text-uppercase text-secondary" style={{ fontSize: "11px" }}>
          EMAIL
        </small>
        <span style={{ fontSize: "14px" }}>
          support@stanexxt.com
        </span>
      </div>

      {/* PHONE */}
      <div
        className="d-flex justify-content-between align-items-center px-3 py-3 rounded-3"
        style={{ backgroundColor: "#2b3d4f" }}
      >
        <small className="text-uppercase text-secondary" style={{ fontSize: "11px" }}>
          PHONE
        </small>
        <span style={{ fontSize: "14px" }}>
          + 44 (0) 208 050 8035
        </span>
      </div>

      {/* OFFICE */}
      <div
        className="d-flex justify-content-between align-items-center px-3 py-3 rounded-3"
        style={{ backgroundColor: "#2b3d4f" }}
      >
        <small className="text-uppercase text-secondary" style={{ fontSize: "11px" }}>
          OFFICE
        </small>
        <span style={{ fontSize: "14px" }}>
          42 York Street, TW1 3BW
        </span>
      </div>

      {/* BUTTON */}
      <button
        className="btn w-100 mt-2 rounded-3 fw-semibold"
        style={{
          backgroundColor: "#1e88e5",
          color: "#fff",
          padding: "14px",
          fontSize: "18px",
          border: "none",
        }}
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
        

        {/* TEXT SECTION */}
        <section
  className="text-center mx-auto px-3 px-sm-4"
  style={{
    paddingTop: "clamp(3rem, 6vw, 6rem)",
    paddingBottom: "clamp(3rem, 6vw, 6rem)",
  }}
>
  <h2
    className="fw-bold mb-3 mb-sm-4"
    style={{
      fontSize: "clamp(26px, 4vw, 40px)",
      marginBottom: "clamp(2rem, 5vw, 6.5rem)",
      lineHeight: "1.2",
    }}
  >
    Your Success is Our Blueprint
  </h2>

  <p
    className="text-secondary lh-base"
    style={{
      fontSize: "clamp(14px, 2vw, 18px)",
      maxWidth: "75rem",
      margin: "0 auto",
      padding: "0 0.5rem",
    }}
  >
    Having delivered over 130 successful projects for ambitious service businesses, we understand how to create websites that drive real business growth.
  </p>
</section>

        {/* PROJECTS */}
        <section className="mx-auto px-3 px-sm-4" style={{ paddingBottom: "clamp(0.5rem, 2.5vw, 2.5rem)" }}> <h2 className="text-center fw-bold" style={{ fontSize: "40px" }}> Recent Projects </h2> <ProjectCard /> </section>
      </main>
      <Newsletter />
      <SocialBar />
      
      <Footer />
    </>

  );
}


