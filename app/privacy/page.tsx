'use client';

import Navbar from "@/app/sections/Navbar";
import Footer from "@/app/sections/Footer";
import Newsletter from "../sections/Newsletter";
import SocialBar from "../sections/SocialBar";


export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <section className="privacy-wrapper">
        <div className="container">

          {/* TITLE */}
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-subtitle">
            Transparency is part of who we are.
          </p>

          {/* CONTENT */}
          <div className="privacy-content">

            <h2>1. What information do we collect?</h2>
            <p>
              We collect information when you subscribe to our newsletter or fill out a form.
              You may be asked to enter your name, email address, or phone number.
              However, you can also visit our site anonymously.
            </p>
            <p>
              Google, as a third-party vendor, uses cookies (DART cookie) to serve ads based on user visits.
              Users may opt out by visiting Google’s ad and content network privacy policy.
            </p>

            <h2>2. What do we use your information for?</h2>
            <ul>
              <li>To personalize your experience</li>
              <li>To improve our website</li>
              <li>To improve customer service</li>
              <li>To send periodic emails</li>
            </ul>
            <p>
              You may unsubscribe from emails anytime using the link provided in our emails.
            </p>

            <h2>3. How do we protect your information?</h2>
            <p>
              We implement security measures to protect your personal information when you submit or access it.
            </p>

            <h2>4. Do we use cookies?</h2>
            <p>
              Yes. Cookies help us understand user behavior, track advertisements, and improve user experience.
            </p>

            <h2>5. Do we disclose any information to outside parties?</h2>
            <p>
              We do not sell or trade your personal information. However, trusted third parties may assist us
              in operating our website, provided they agree to keep information confidential.
            </p>
            <p>
              We may release information when required to comply with legal obligations or protect rights and safety.
            </p>

            <h2>6. Children’s Online Privacy Protection Act (COPPA)</h2>
            <p>
              We do not collect information from individuals under 13 years of age.
              Our services are intended for users aged 13 and above.
            </p>

            <h2>7. Online Privacy Policy Only</h2>
            <p>
              This policy applies only to information collected online and not offline.
            </p>

            <h2>8. Your Consent</h2>
            <p>
              By using our site, you consent to our privacy policy.
            </p>

            <h2>9. Changes to our Privacy Policy</h2>
            <p>
              Any updates to this policy will be posted on this page.
            </p>

            <h2>10. About This Page</h2>
            <p>
              This privacy policy explains how we collect, use, disclose, transfer, and store information.
            </p>

          </div>
        </div>
      </section>
      <Newsletter/>
      <SocialBar/>

      <Footer />

      {/* ✅ STYLES */}
      <style jsx>{`
        .privacy-wrapper {
          padding: 120px 20px;
          background: #f5f5f5;
        }

        .privacy-title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 10px;
          text-align: center;
        }

        .privacy-subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 50px;
        }

        .privacy-content {
          max-width: 900px;
          margin: auto;
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .privacy-content h2 {
          font-size: 20px;
          margin-top: 30px;
          margin-bottom: 10px;
          color: #111;
        }

        .privacy-content p {
          font-size: 15px;
          line-height: 1.8;
          color: #444;
          margin-bottom: 20px;
        }

        .privacy-content ul {
          padding-left: 20px;
          margin-bottom: 20px;
        }

        .privacy-content li {
          margin-bottom: 10px;
          color: #444;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .privacy-title {
            font-size: 26px;
          }

          .privacy-content {
            padding: 25px;
          }
        }
      `}</style>
    </>
  );
}