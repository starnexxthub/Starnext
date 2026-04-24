'use client';
import { useState } from "react";

export default function ContactForm() {

  const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  service: "",
  message: ""
});

const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
  },
    body: JSON.stringify(form),
  });

  const data = await res.json();
  setLoading(false);

  if (data.success) {
    alert("Message sent ✅");
    setForm({ name: "", email: "", phone: "", service: "", message: "" });
  } else {
    alert("Error ❌");
  }
};
  
  const inputStyle = {
    height: "50px",
    backgroundColor: "rgba(255,255,255,0.12)",
    border: "none",
    color: "#fff",
    fontSize: "14px",
    padding: "0 14px",
  };

  return (
    <>
      <style>{`
        .form-control::placeholder {
          color: #cbd5e1;
        }
        


   /* MOBILE OPTIMIZATION */
@media (max-width:768px){

  section{
    padding:3rem 0 !important;
  }

  h1{
    margin-bottom:2.5rem !important;
    margin-top:30px;
  }

  .form-card{
    padding:1.5rem !important;
    
  }

  .form-fields{
    gap:1.25rem !important;
  }

}

}
      `}</style>

      <section
        className="position-relative text-white d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh",padding: "clamp(3rem, 6vw, 6rem) 0", }}
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="position-absolute w-100 h-100"
          style={{ objectFit: "cover", zIndex: -1 }}
        >
          <source src="/assets/ContactUs-video.mp4" type="video/mp4" />
        </video>

        <div className="text-center w-100 px-3">
          
          {/* HEADING */}
          <h1
            className="mx-auto text-center"
            style={{
              maxWidth: "759px",
              width: "100%",
              fontSize: "clamp(32px, 6vw, 60px)",
              lineHeight: "1.2",
              marginBottom: "clamp(2rem, 5vw, 5rem)",
              fontWeight: "500"
            }}
          >
            Let’s Build Clarity Together
          </h1>

          {/* FORM CARD */}
          <div
  className="form-card mx-auto rounded-4 p-4 p-sm-5 text-center"
            style={{
              background: "rgba(10,30,60,0.85)",
              width: "100%",
              maxWidth: "658px",
              border: "1px solid rgba(255,255,255,0.08)",
              marginBottom: "3rem",
            }}
          >
            <h4 className="mb-2" style={{ fontSize: "30px",fontWeight: "500" }}>
              Send us a message
            </h4>

            <p className=" mx-auto text-center " style={{ fontSize: "20px" , maxWidth:"498px", fontWeight: "400"}}>
              Share a few details and our team will get back to you within one business day.
            </p>

            {/* FORM */}
            <div
              className=" form-fields d-flex flex-column align-items-center justify-content-center gap-5 mx-auto"
              style={{ maxWidth: "498px", width: "100%", gap: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              <input
  className="form-control w-100"
  placeholder="Name"
  style={inputStyle}
  value={form.name}
  onChange={(e) => setForm({ ...form, name: e.target.value })}
/>
              <input
  className="form-control w-100"
  placeholder="Email"
  style={inputStyle}
  value={form.email}
  onChange={(e) => setForm({ ...form, email: e.target.value })}
/>
              <input
  className="form-control w-100"
  placeholder="Phone"
  style={inputStyle}
  value={form.phone}
  onChange={(e) => setForm({ ...form, phone: e.target.value })}
/>

              <select
  className="form-select w-100"
  style={inputStyle}
  value={form.service}
  onChange={(e) => setForm({ ...form, service: e.target.value })}
>
  <option style={{ color: "#000" }}>Service</option>
  <option style={{ color: "#000" }}>Web Development</option>
  <option style={{ color: "#000" }}>UI/UX</option>
</select>
              <textarea
  className="form-control w-100"
  placeholder="Brief Description"
  style={{ ...inputStyle, height: "170px" }}
  value={form.message}
  onChange={(e) => setForm({ ...form, message: e.target.value })}
/>

<button
  onClick={handleSubmit}
  disabled={loading}
  className="w-100 mt-2"
  style={{
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    borderRadius: "30px",
    padding: "12px",
    fontSize: "16px",
    border: "none",
    color: "#fff",
    fontWeight: "500",
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.7 : 1,
  }}
>
  {loading ? "Sending..." : "Send Message"}
</button>            </div>
          </div>
        </div>
      </section>
    </>
  );
}