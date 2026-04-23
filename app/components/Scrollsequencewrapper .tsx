'use client'

import { useEffect, useState } from 'react'
import ScrollSequence       from './ScrollSequence'        // your existing desktop component
import ScrollSequenceMobile from './Scrollsequencemobile'  // new mobile component

/**
 * ScrollSequenceWrapper
 * ---------------------
 * Renders the desktop canvas frame-sequence on screens ≥ 768 px,
 * and the mobile video-scrub version on smaller screens.
 *
 * Using CSS-based detection (not JS matchMedia) for the initial render
 * avoids layout shift — both components are rendered but one is hidden
 * via CSS. The JS state then takes over after mount.
 */
export default function ScrollSequenceWrapper() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)

    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // SSR / first paint: render nothing until we know the screen size.
  // Both components are heavy (canvas / video), so avoid hydration mismatch.
  if (isMobile === null) return null

  return isMobile ? <ScrollSequenceMobile /> : <ScrollSequence />
}