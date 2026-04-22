'use client'

import { useState } from "react";

export default function Newsletter() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert("Subscribed successfully 🎉");
      setEmail("");
    } else {
      alert("Something went wrong ❌");
    }
  };

  return (
    <section className="newsletter-bar">
      <div className="newsletter-inner">

        <div className="newsletter-title">
          Subscribe to our newsletter
        </div>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="newsletter-inputWrap">

            <span className="newsletter-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 6.5h16a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8"/>
                <path d="m22 9-8.7 6.2a2 2 0 0 1-2.3 0L2 9" stroke="currentColor" strokeWidth="1.8"/>
              </svg>
            </span>

            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "..." : "Subscribe"}
            </button>

          </div>

          <p className="newsletter-note">
            You can unsubscribe anytime.
          </p>
        </form>

      </div>
    </section>
  )
}