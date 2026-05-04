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

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // 🚨 prevent reload

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 🔥 IMPORTANT
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Message sent successfully ✅");

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
    </section>
  );
}