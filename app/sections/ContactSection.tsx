'use client'

export default function ContactSection() {
  return (
    <section className="starnext-contact py-5">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-start">
          <div className="col-12 col-lg-6">
            <h2 className="contact-title mb-4">Let&apos;s Get<br />in Touch</h2>

            <div className="contact-cards d-grid gap-4">
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

              <div className="info-card">
                <div className="info-label">Opening Hours</div>
                <div className="hours-row">
                  <div className="info-value mb-0">Mon - Fri</div>
                  <div className="info-value mb-0">9:00 AM - 5:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="contact-form-wrap">
              <h3 className="form-title mb-2">Contact Us</h3>
              <p className="form-sub mb-4">
                Let&apos;s build something that moves the needle.<br /><br />
                Share a few details and our team will get back to you within one business day.
              </p>

              <form className="contact-form" action="#" method="post">
                <div className="mb-4">
                  <label className="form-label sr-only" htmlFor="name">Name</label>
                  <input id="name" type="text" className="form-control line-input" placeholder="Name" />
                </div>

                <div className="mb-4">
                  <label className="form-label sr-only" htmlFor="email">Email</label>
                  <input id="email" type="email" className="form-control line-input" placeholder="Email" />
                </div>

                <div className="mb-4">
                  <label className="form-label sr-only" htmlFor="phone">Phone</label>
                  <input id="phone" type="tel" className="form-control line-input" placeholder="Phone" />
                </div>

                <div className="mb-4 position-relative">
                  <label className="form-label sr-only" htmlFor="service">Service</label>
                  <select id="service" className="form-select line-select">
                    <option value="" selected disabled>Service</option>
                    <option>Website Development</option>
                    <option>SEO</option>
                    <option>Branding</option>
                    <option>Social Media Marketing</option>
                    <option>Performance Ads</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label sr-only" htmlFor="desc">Brief Description</label>
                  <textarea id="desc" rows={3} className="form-control line-input" placeholder="Brief Description"></textarea>
                </div>

                <button type="submit" className="btn send-btn w-100">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}