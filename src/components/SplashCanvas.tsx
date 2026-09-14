import { useEffect, useRef } from 'react'
import { initSplash } from '@/lib/splash'

/**
 * Water-splash canvas for the site header. Renders nothing on the server
 * (effects don't run during prerender) and mounts the engine after hydration
 * so the animation never blocks first paint. Fully removed again on unmount.
 */
export default function SplashCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const { destroy } = initSplash(ref.current)
    return destroy
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 block h-full w-full"
    />
  )
}
