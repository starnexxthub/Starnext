'use client'

import { useState } from 'react'

export default function FloatingCard() {
  const [closed, setClosed] = useState(false)

  if (closed) return null

  return (
    <a
      href="https://www.google.com/search?q=starnext+softech-%7C%7Cbest+digital+marketing+company+in+uttarakhand%7C%7Cbest+digital+marketing+company+in+dehradun%7C%7C+photos&sca_esv=3037e92767d15074&sxsrf=ANbL-n7ljiqsI3LCtPk81Vui--e6otAw8g%3A1778228265059&ei=KZz9aaGiA5Cz4-EPzo-F4Qw&biw=1536&bih=826&oq=starnext&gs_lp=Egxnd3Mtd2l6LXNlcnAiCHN0YXJuZXh0KgIIADIHECMYsAMYJzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzIKEAAYRxjWBBiwAzINEAAYgAQYigUYQxiwA0jVJlAAWABwAXgBkAEAmAEAoAEAqgEAuAEByAEAmAIBoAIHmAMAiAYBkAYKkgcBMaAHALIHALgHAMIHAzItMcgHBoAIAQ&sclient=gws-wiz-serp"
      target="_blank"
      rel="noopener noreferrer"
      className="floating-card"
    >
      
      {/* CLOSE BUTTON */}
      <button
        className="floating-close"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setClosed(true)
        }}
      >
        ✕
      </button>

      {/* IMAGE */}
      <img
        src="/img/gmv.webp"
        alt="Preview"
        className="floating-image"
      />
      
    </a>
  )
}