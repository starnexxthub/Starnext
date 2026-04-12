'use client';

import { useParams } from "next/navigation";
import { blogs } from "../../data/blogs";
import Navbar from "@/app/sections/Navbar";
import Footer from "@/app/sections/Footer";

export default function BlogDetail() {
  const params = useParams();
  const blog = blogs.find(b => b.id === Number(params.id));

  if (!blog) return <div>Blog not found</div>;

  return (
    <>
      <Navbar />

      <section className="blog-wrapper">
        <div className="container">

          <div className="row">

            {/* LEFT CONTENT */}
            <div className="col-lg-8">

              {/* TITLE */}
              <h1 className="blog-title">{blog.title}</h1>

              {/* META */}
              <div className="blog-meta">
                <span>Written by <b>Admin</b></span>
                <span>November 14, 2022</span>
                <span>2 min read</span>
              </div>

              {/* IMAGE */}
              <img src={blog.image} className="blog-image" />

              {/* CONTENT */}
              <div className="blog-content">
                {blog.content.split("\n").map((para, i) => {
                  if (para.startsWith("##")) {
                    return <h2 key={i}>{para.replace("##", "")}</h2>;
                  }
                  return <p key={i}>{para}</p>;
                })}
              </div>

            </div>

            {/* RIGHT SIDEBAR */}
            <div className="col-lg-4">

              <div className="sidebar">

                <h6>POPULAR POSTS</h6>

                {blogs.map(item => (
                  <div className="sidebar-post" key={item.id}>
                    <img src={item.image} />
                    <div>
                      <span className="tag">PRODUCT</span>
                      <p>{item.title}</p>
                    </div>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>
      </section>

      <Footer />

      {/* ✅ STYLES */}
      <style jsx>{`
        .blog-wrapper {
          background: #f5f5f5;
          padding: 120px 0;
        }

        .blog-title {
          font-size: 32px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .blog-meta {
          display: flex;
          gap: 20px;
          font-size: 13px;
          color: #666;
          margin-bottom: 20px;
        }

        .blog-image {
          width: 100%;
          border-radius: 12px;
          margin-bottom: 30px;
        }

        .blog-content p {
          font-size: 15px;
          line-height: 1.8;
          color: #444;
          margin-bottom: 18px;
        }

        .blog-content h2 {
          font-size: 22px;
          margin-top: 30px;
          margin-bottom: 15px;
          font-weight: 600;
          color: #1e2a44;
        }

        /* SIDEBAR */
        .sidebar {
          padding-left: 20px;
        }

        .sidebar h6 {
          font-size: 12px;
          color: #888;
          margin-bottom: 20px;
        }

        .sidebar-post {
          display: flex;
          gap: 12px;
          margin-bottom: 15px;
        }

        .sidebar-post img {
          width: 80px;
          height: 60px;
          object-fit: cover;
          border-radius: 6px;
        }

        .sidebar-post p {
          font-size: 13px;
          margin: 0;
          color: #222;
        }

        .tag {
          font-size: 10px;
          color: #999;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .blog-title {
            font-size: 22px;
          }

          .blog-meta {
            flex-wrap: wrap;
            gap: 10px;
          }

          .sidebar {
            padding-left: 0;
            margin-top: 40px;
          }
        }
      `}</style>
    </>
  );
}