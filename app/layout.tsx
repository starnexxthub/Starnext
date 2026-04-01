import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Starnext - Creative GSAP Animations',
  description: 'Best Digital Marketing & Web Development in Uttarakhand',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
         <link rel='stylesheet' href='/public/css/sr7.css' />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </head>
      <body>
        {children}
        
        {/* Load Bootstrap JS */}
        <Script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" 
          strategy="afterInteractive"
        />
        
        {/* Load GSAP */}
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js" 
          strategy="beforeInteractive"
          id="gsap-script"
        />
        
        {/* Load ScrollTrigger */}
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js" 
          strategy="beforeInteractive"
          id="gsap-scrolltrigger"
        />
      </body>
    </html>
  )
}