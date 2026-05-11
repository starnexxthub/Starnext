export default function ContactInfo() {
  return (
    <>
      <style>{`
        .contact-section {
          background-color: black;
          color: white;
          padding: 40px 0;
        }

        .contact-box {
          background-color: rgba(10, 30, 60, 0.85);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          min-height: 200px;
          box-sizing: border-box;
        }

        .contact-icon {
          width: 42px;
          height: 42px;
          min-width: 42px;
          background-color: #d1d5db;
          border-radius: 10px;
          border: 1px solid black;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .contact-icon i {
          font-size: 20px;
          color: black;
        }

        .contact-title {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 8px;
          /* Keep on one line on larger screens */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #d1d5db;
        }

        .contact-desc {
          font-size: 13.5px;
          color: #d1d5db;
          margin: 0;
          line-height: 1.5;
        }

        /* ── Desktop / large laptops (≥1200px) ── */
        @media (min-width: 1200px) {
          .contact-row {
            display: flex;
            flex-wrap: nowrap;
            gap: 16px;
            justify-content: center;
          }
          .contact-col {
            flex: 1 1 0;
            max-width: 370px;
          }
          .contact-title {
            font-size: 15px;
            white-space: nowrap;
          }
        }

        /* ── Medium laptops (992px – 1199px) ── */
        @media (min-width: 992px) and (max-width: 1199px) {
          .contact-row {
            display: flex;
            flex-wrap: nowrap;
            gap: 14px;
            justify-content: center;
          }
          .contact-col {
            flex: 1 1 0;
            max-width: 320px;
          }
          .contact-title {
            font-size: 14px;
            white-space: nowrap;
          }
          .contact-desc {
            font-size: 13px;
          }
        }

        /* ── Small laptops / tablets landscape (768px – 991px) ── */
        @media (min-width: 768px) and (max-width: 991px) {
          .contact-row {
            display: flex;
            flex-wrap: nowrap;
            gap: 12px;
            justify-content: center;
          }
          .contact-col {
            flex: 1 1 0;
            max-width: 280px;
          }
          .contact-title {
            font-size: 13px;
            white-space: nowrap;
          }
          .contact-desc {
            font-size: 12.5px;
          }
          .contact-box {
            min-height: 190px;
            padding: 20px;
          }
        }

        /* ── Mobile (< 768px) ── */
        @media (max-width: 767px) {
          .contact-section {
            padding: 30px 16px;
          }
          .contact-row {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .contact-col {
            width: 100%;
          }
          .contact-box {
            min-height: auto;
            padding: 20px;
          }
          /* Phone numbers wrap to two lines on mobile */
          .contact-title {
            font-size: 15px;
            white-space: normal;
            word-break: break-word;
          }
          .contact-desc {
            font-size: 13.5px;
          }
        }
      `}</style>

      <section className="contact-section">
        <div className="container-fluid px-3 px-md-4 px-lg-5">
          <div className="contact-row">

            {/* BOX 1 — Email */}
            <div className="contact-col">
              <div className="contact-box">
                <div className="contact-icon">
                  <i className="bi bi-envelope"></i>
                </div>
                <div>
                  <h6 className="contact-title">info@stanexxt.com</h6>
                  <p className="contact-desc">
                    Feel free to reach out via email if you have any questions before our call!
                  </p>
                </div>
              </div>
            </div>

            {/* BOX 2 — Phone */}
            <div className="contact-col">
              <div className="contact-box">
                <div className="contact-icon">
                  <i className="bi bi-telephone"></i>
                </div>
                <div>
                  {/*
                    On laptops: both numbers stay on one line (white-space: nowrap via CSS).
                    On mobile: white-space: normal allows wrapping to two lines.
                  */}
                  <h6 className="contact-title">+91 8267016702, +91 7248777724</h6>
                  <p className="contact-desc">
                    You can reach out to us by phone to discuss your needs.
                  </p>
                </div>
              </div>
            </div>

            {/* BOX 3 — Office */}
            <div className="contact-col">
              <div className="contact-box">
                <div className="contact-icon">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div>
                  <h6 className="contact-title">Office</h6>
                  <p className="contact-desc">
                    2nd Floor, Dwarka Store, Shagun Tower, New Rd, Dehradun, Uttarakhand 248001
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}