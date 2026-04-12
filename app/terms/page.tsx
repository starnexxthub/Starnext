'use client';

import Navbar from "@/app/sections/Navbar";
import Footer from "@/app/sections/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <section className="terms-wrapper">
        <div className="container">

          {/* TITLE */}
          <h1 className="terms-title">Terms & Conditions</h1>
          <p className="terms-subtitle">
            Working with our rules and regulations is a priority.
          </p>

          {/* CONTENT */}
          <div className="terms-content">

            <p>
              StarNext Softech Pvt Ltd maintains the interactive portion(s) of this website as a service.
              By using any services provided herein, you agree to comply with and be bound by the terms,
              conditions, and notices relating to its use.
            </p>

            <p>
              As a condition of your use of this website and the services contained therein, you represent
              and warrant that you will not use this website for any purpose that is unlawful or prohibited
              by these terms, conditions, and notices.
            </p>

            <h2>Use of Services</h2>

            <p>
              This website may include services such as bulletin boards, chat areas, news groups, forums,
              communities, and other communication facilities.
            </p>

            <p>
              You agree to use these services only to send and receive messages and material that are proper
              and related to the respective service.
            </p>

            <h2>Prohibited Activities</h2>

            <ul>
              <li>Publishing or sharing inappropriate, offensive, or unlawful content</li>
              <li>Uploading copyrighted material without permission</li>
              <li>Uploading viruses or harmful software</li>
              <li>Using the platform for unauthorized commercial purposes</li>
            </ul>

            <h2>Monitoring & Control</h2>

            <p>
              StarNext Softech Pvt Ltd is not obligated to monitor communication platforms but reserves
              the right to review, edit, or remove any content when necessary to comply with laws or policies.
            </p>

            <h2>Legal Compliance</h2>

            <p>
              We may disclose any information required to satisfy legal obligations, government requests,
              or regulatory requirements.
            </p>

            <h2>Contact Information</h2>

            <p>
              For any queries, you can contact us at:
              <br />
              <b>Email:</b> starnext001@gmail.com
            </p>

            <h2>Copyright</h2>

            <p>
              All content on this website is the property of StarNext Softech Pvt Ltd and is protected
              by copyright laws.
            </p>

          </div>
        </div>
      </section>

      <Footer />

      {/* ✅ STYLES */}
      <style jsx>{`
        .terms-wrapper {
          padding: 120px 20px;
          background: #f5f5f5;
        }

        .terms-title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 10px;
          text-align: center;
        }

        .terms-subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 50px;
        }

        .terms-content {
          max-width: 900px;
          margin: auto;
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .terms-content p {
          font-size: 15px;
          line-height: 1.8;
          color: #444;
          margin-bottom: 20px;
        }

        .terms-content h2 {
          font-size: 20px;
          margin-top: 30px;
          margin-bottom: 10px;
          color: #111;
        }

        .terms-content ul {
          padding-left: 20px;
          margin-bottom: 20px;
        }

        .terms-content li {
          margin-bottom: 10px;
          color: #444;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .terms-title {
            font-size: 26px;
          }

          .terms-content {
            padding: 25px;
          }
        }
      `}</style>
    </>
  );
}