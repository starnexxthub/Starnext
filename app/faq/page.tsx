'use client';

import { useState } from "react";
import Navbar from "@/app/sections/Navbar";
import Footer from "@/app/sections/Footer";
import Newsletter from "../sections/Newsletter";
import SocialBar from "../sections/SocialBar";

const faqs = [
  {
    question: "How is Branding used in marketing?",
    answer: "Branding helps create a unique identity for your business, builds trust, and makes your products or services memorable to customers."
  },
  {
    question: "What is the impact of SEO and digital marketing on business?",
    answer: "SEO and digital marketing increase visibility, drive organic traffic, improve lead generation, and boost overall business growth."
  },
  {
    question: "Does my website will be SSL secured?",
    answer: "Yes, we ensure your website is SSL secured to protect user data and improve trust and SEO rankings."
  },
  {
    question: "Will you buy domain for me or I have to buy?",
    answer: "We can assist you in purchasing the domain, or you can buy it yourself — both options are available."
  },
  {
    question: "What kind of social media marketing services you provide?",
    answer: "We provide content creation, ad campaigns, audience targeting, analytics tracking, and full social media management."
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

      {/* ✅ STYLES */}
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