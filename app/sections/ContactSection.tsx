'use client'
import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [refId, setRefId] = useState("");

  const generateRef = () => {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `SN-${today}-${rand}`;
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setRefId(generateRef());
        setShowSuccess(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: ""
        });
      } else {
        alert("Failed to send ❌");
      }

    } catch (err) {
      alert("Error sending message ❌");
    }

    setLoading(false);
  };

  return (
    <section className="starnext-contact py-5">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-start">

          {/* LEFT SIDE SAME */}
          <div className="col-12 col-lg-6">
            <h2 className="contact-title mb-4">Let&apos;s Get<br />in Touch</h2>
            <div className="contact-cards d-grid">
              <div className="info-card">
                <div className="info-label">Phone</div>
                <div className="info-value">+91 8267016702, +91 7248777724</div>
              </div>
              <div className="info-card">
                <div className="info-label">Email</div>
                <div className="info-value">info@starnexxt.com</div>
              </div>
              <div className="info-card">
                <div className="info-label">Office</div>
                <div className="info-value">
                  2nd Floor, Dwarka Store, Shagun Tower,<br />
                  New Rd, Dehradun, Uttarakhand 248001
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="col-12 col-lg-6">
            <div className="contact-form-wrap">
              <h3 className="form-title mb-2">Contact Us</h3>
              <p className="form-sub mb-3">
                Let&apos;s build something that moves the needle.<br /><br />
                Share a few details and our team will get back to you within one business day.
              </p>

              <form className="contact-form" onSubmit={handleSubmit}>

                <div className="mb-4">
                  <input
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    className="form-control line-input"
                    placeholder="Name"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    className="form-control line-input"
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    id="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="tel"
                    className="form-control line-input"
                    placeholder="Phone"
                  />
                </div>

                <div className="mb-4">
                  <select
                    id="service"
                    value={form.service}
                    onChange={handleChange}
                    className="form-select line-select"
                  >
                    <option value="">Service</option>
                    <option value="web">Website Development</option>
                    <option value="seo">SEO</option>
                    <option value="branding">Branding</option>
                    <option value="social">Social Media Marketing</option>
                    <option value="digital">Digital Marketing</option>
                  </select>
                </div>

                <div className="mb-4">
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    className="form-control line-input"
                    placeholder="Brief Description"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn send-btn w-100"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 999
          }}
          onClick={() => setShowSuccess(false)}
        >
          <div
            style={{
              background: "#fff", borderRadius: "12px",
              padding: "2rem", maxWidth: "400px", width: "90%",
              textAlign: "center"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              width: "52px", height: "52px", borderRadius: "50%",
              background: "#ecfdf5", color: "#059669",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 1.25rem"
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "0.5rem" }}>
              Message Received
            </h2>
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6, marginBottom: "0.75rem" }}>
              Thank you for reaching out. A member of our team will review your enquiry and get back to you shortly.
            </p>
            <p style={{ fontSize: "12px", color: "#9ca3af", letterSpacing: "0.03em", marginBottom: "1.5rem" }}>
              Reference: {refId}
            </p>

            <hr style={{ border: "none", borderTop: "1px solid #f3f4f6", marginBottom: "1.25rem" }} />

            <button
              onClick={() => setShowSuccess(false)}
              className="btn send-btn"
              style={{ minWidth: "140px" }}
            >
              ← Back to site
            </button>
          </div>
        </div>
      )}

    </section>
  );
}