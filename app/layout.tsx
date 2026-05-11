import type { Metadata } from 'next'
import Script from 'next/script'
import { Figtree } from 'next/font/google'
import './globals.css'

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-figtree',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Starnext Softech - Best Digital Marketing & Web Development in Uttarakhand',
  description: 'Best Digital Marketing & Web Development in Uttarakhand',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* FIXED PATH */}
        <link rel="stylesheet" href="/css/sr7.css" />

        {/* Bootstrap */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />

        {/* Bootstrap Icons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />

        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>

      <body className={figtree.className}>
        {children}

        {/* Bootstrap JS */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />

        {/* GSAP */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"
          strategy="beforeInteractive"
          id="gsap-script"
        />

        {/* ScrollTrigger */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"
          strategy="beforeInteractive"
          id="gsap-scrolltrigger"
        />
      </body>
    </html>
  )
}