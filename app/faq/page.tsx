'use client';

import { useState } from "react";
import Navbar from "@/app/sections/Navbar";
import Footer from "@/app/sections/Footer";
import Newsletter from "../sections/Newsletter";
import SocialBar from "../sections/SocialBar";

const faqs = [
  {
    question: "How is Branding used in marketing?",
    answer: "Branding includes creating and implementing a variety of identifiable options to your business so that customers can relate themselves with your business. Further, Branding boosts the recognisability of your products & services among your customers, providing you that competitive position in the market."
  },
  {
    question: "What is the impact of SEO and digital marketing on business?",
    answer: "SEO and digital marketing improve visibility, increase qualified traffic, reduce customer acquisition costs over time, and build brand trust—leading to higher conversions and better ROI."
  },
  {
    question: "Does my website will be SSL secured?",
    answer: "Yes. We ensure SSL is enabled so your website runs securely on HTTPS. (SSL availability can depend on your hosting/domain provider, but we handle setup and verification.)"
  },
  {
    question: "Will you buy domain for me or I have to buy?",
    answer: "Either works. You can purchase it yourself (recommended for ownership), or we can purchase on your behalf and transfer/control it to you."
  },
  {
    question: "What kind of social media marketing services you provide?",
    answer: "Strategy, content planning, creatives, Reels, ad campaigns, audience targeting, reporting, and ongoing optimization—tailored to your business goals and budget."
  }
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />

      <section className="faq-wrapper">
        <div className="container">

          {/* HEADER */}
          <h1 className="faq-title">
            Frequently Asked <br /> Question.
          </h1>

          <p className="faq-subtitle">
            Let's discuss your needs and see how we can help you digitally.
            Connect with one of our expert strategists to grow your business.
          </p>

          {/* HIGHLIGHTS */}
          <div className="faq-highlights">
            <span>✔ 24×7 Support</span>
            <span>✔ We meet deadlines</span>
            <span>✔ High-quality code</span>
          </div>

          {/* FAQ LIST */}
          <div className="faq-list">
            {faqs.map((item, index) => (
              <div key={index} className="faq-item">

                <div
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  {item.question}
                  <span>{activeIndex === index ? "−" : "+"}</span>
                </div>

                {activeIndex === index && (
                  <div className="faq-answer">
                    {item.answer}
                  </div>
                )}

              </div>
            ))}
          </div>

        </div>
      </section>
      <Newsletter/>
      <SocialBar/>

      <Footer />

      {/*  STYLES */}
      <style jsx>{`
        .faq-wrapper {
          padding: 120px 20px;
          background: #f5f5f5;
        }

        .faq-title {
          font-size: 40px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 20px;
        }

        .faq-subtitle {
          text-align: center;
          color: #666;
          max-width: 700px;
          margin: auto;
          margin-bottom: 30px;
        }

        .faq-highlights {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 40px;
          font-size: 14px;
          color: #333;
        }

        .faq-list {
          max-width: 800px;
          margin: auto;
        }

        .faq-item {
          background: white;
          border-radius: 10px;
          margin-bottom: 15px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
        }

        .faq-question {
          padding: 18px 20px;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
        }

        .faq-answer {
          padding: 15px 20px;
          font-size: 14px;
          color: #555;
          border-top: 1px solid #eee;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .faq-title {
            font-size: 26px;
          }

          .faq-highlights {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
}