"use client";
import React from "react";
import styles from '../AboutPage.module.css';


export default function TestimonialSection() {

const testimonials = [
{
img:"/img/b4.png",
text:`Working with Starnext was an absolute game-changer for our brand. Their creativity, attention to detail, and 100% passionate approach truly transformed our vision into reality. From the initial brainstorming sessions to the final execution, professionalism and enthusiasm.`
},
{
img:"/img/b2.png",
text:`Their creativity, attention to detail, and passionate approach helped our business scale faster than expected. The team delivered excellent results with professionalism and strong communication.`
},
{
img:"/img/b3.png",
text:`Starnext understood our vision perfectly and turned it into something even better than we imagined. Highly professional team and outstanding delivery.`
}
]

return (

<section className="testimonial-section">

<div className="testimonial-header">
<span>TESTIMONIAL</span>
</div>

<div className="testimonial-slider">

<div className="testimonial-track">

{[...testimonials,...testimonials].map((item,index)=>(
<div className="testimonial-card" key={index}>

<div className="testimonial-img">
<img src={item.img}/>
</div>

<div className="testimonial-divider"></div>

<div className="testimonial-content">

<div className="quote-icon">"</div>

<p>{item.text}</p>

</div>

</div>
))}

</div>

</div>
<style>{`
        .testimonial-section{
  background:linear-gradient(90deg,#000814,#0b2a55);
  padding:100px 0;
  overflow:hidden;
  color:white;
}

/* header */
.testimonial-header{
  max-width:1200px;
  margin:auto;
  padding:0 20px;
  margin-bottom:40px;
}

.testimonial-header span{
  letter-spacing:3px;
  font-size:22px;
  color:#cbd5e1;
}

/* slider */
.testimonial-slider{
  overflow:hidden;
  width:100%;
}

.testimonial-track{
  display:flex;
  gap:60px;
  animation:scrollTestimonial 25s linear infinite;
}

@keyframes scrollTestimonial{
  0%{ transform:translateX(0); }
  100%{ transform:translateX(-50%); }
}

/* card */
.testimonial-card{
  display:flex;
  align-items:center;
  gap:40px;
  min-width:750px;
}

/* image */
.testimonial-img img{
  width:160px;
  height:200px;
  object-fit:cover;
  border-radius:6px;
}

/* divider */
.testimonial-divider{
  width:1px;
  height:200px;
  background:#6b7280;
  opacity:.5;
}

/* content */
.testimonial-content{
  max-width:480px;
}

.quote-icon{
  font-size:60px;
  color:#9fb7d3;
  line-height:1;
  margin-bottom:10px;
}

.testimonial-content p{
  font-size:18px;
  line-height:1.6;
  color:#e5e7eb;
}

/* ---------- TABLET ---------- */

@media (max-width:1024px){

  .testimonial-card{
    min-width:600px;
    gap:30px;
  }

  .testimonial-img img{
    width:140px;
    height:180px;
  }

  .testimonial-content p{
    font-size:17px;
  }

}

/* ---------- MOBILE ---------- */

@media (max-width:768px){

  .testimonial-section{
    padding:80px 0;
  }

  .testimonial-track{
    gap:40px;
  }

  .testimonial-card{
    flex-direction:column;
    text-align:center;
    min-width:320px;
  }

  .testimonial-divider{
    display:none;
  }

  .testimonial-img img{
    width:140px;
    height:170px;
  }

  .quote-icon{
    font-size:50px;
  }

  .testimonial-content p{
    font-size:16px;
  }

}

/* ---------- SMALL PHONES ---------- */

@media (max-width:480px){

  .testimonial-img img{
    width:120px;
    height:150px;
  }

  .testimonial-content{
    max-width:90%;
  }

  .testimonial-content p{
    font-size:15px;
  }

}
      `}</style>

</section>

)
}